import * as lodash from 'lodash/fp';
import { Prop } from '../types';

function isLodashFunction(token: string): token is keyof typeof lodash {
  return token in lodash;
}
export function stringToFunction(funcStr: string): (data: unknown) => Prop[1] {
  // Extract the lodash tokens from the function string
  let lodashTokens: string[] = [];
  const matches = funcStr.match(/\(([^)]+)\) =>/);
  if (matches) {
    lodashTokens = matches[1].split(',').map((token) => token.trim());
  }

  // Create an object with references to the lodash functions
  const lodashFns = lodashTokens.map((token) => {
    if (isLodashFunction(token)) {
      return lodash[token];
    }
    return null;
  });
  return new Function(
    ...lodashTokens,
    `return (${funcStr})(${lodashTokens.join(',')})`
  )(...lodashFns);
}
