import { IPage, compileToString } from '@nexus/components';
export const homePage: IPage = {
  style: require('./style.scss'),
  layout: {
    name: 'div',
    children: [
      {
        name: 'h1',
        props: {
          class: 'header-class',
          innerHTML: 'Sample Page Header',
        },
      },
      {
        name: 'div',
        props: {
          '[innerHTML]': '{% pageContext.divText %}',
        },
      },
      {
        name: 'button',
        props: {
          innerHTML: 'Click Here',
          class: 'base-btn',
        },
        events: {
          click: [
            [
              'pageContext.clicked',
              compileToString(() => (val) => {
                return val;
              }),
            ],
          ],
        },
      },
    ],
  },
  context: {
    properties: [
      ['clicked', false],
      ['init', true],
      ['divText', 'Click button to change the text'],
    ],
    derived: [
      {
        from: ['clicked'],
        name: 'divText',
        spec: compileToString(() => () => {
          return 'Text changed';
        }),
      },
    ],
  },
};
