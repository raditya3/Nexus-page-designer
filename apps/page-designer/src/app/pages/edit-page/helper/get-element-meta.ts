import {elements,Element} from '../data/elements';
export const getElementMetaFromName = (name : string) : Element => {
    const foundElement = elements.find(el => el.name===name);
    if(!foundElement){
      throw Error("Invalid Element "+name);
    }
    return foundElement;
}
