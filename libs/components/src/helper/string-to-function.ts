
import * as lodash from 'lodash/fp';
export function stringToFunction(funcStr: string): (data: { [key: string]: any }) => any {
    // Extract the lodash tokens from the function string
    let lodashTokens: string[] = []
    const matches = funcStr.match(/\(([^)]+)\) =>/);
    if (matches) {
        lodashTokens = matches[1].split(',').map(token => token.trim());
    }


    // Create an object with references to the lodash functions
    const lodashFns = lodashTokens.map((token) => {
        return (lodash as any)[token] as Function;
    });
    const cookedFn = new Function(...lodashTokens, `return (${funcStr})(${lodashTokens.join(",")})`)(...lodashFns);
    return cookedFn;
}