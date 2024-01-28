import * as lodash from 'lodash/fp';

type ExternalData = {
  [key: string]: never;
};

type CompileFunction = (
  _: {
    fns: typeof lodash;
  } & ExternalData
) => (data: never) => void;
function extractLodashTokens(str: string) {
  // Regular expression to match the pattern _.fns.<token>
  const regex = /_\.fns\.(\w+)/g;
  const tokens = [];

  let match;
  // Loop over all matches
  while ((match = regex.exec(str)) !== null) {
    // The first capturing group is the token
    tokens.push(match[1]);
  }

  return tokens;
}
export function compileToString(
  func: CompileFunction,
  externalData: ExternalData = {}
): string {
  let compiledStr = func.toString();
  lodash.keys(externalData).forEach((externalDataKey) => {
    const re = new RegExp(`_\\.${externalDataKey}`, 'g');
    compiledStr = compiledStr.replace(
      re,
      JSON.stringify(externalData[externalDataKey])
    );
  });
  const matched = extractLodashTokens(compiledStr);
  compiledStr = compiledStr.replace(/_\.fns\./g, '');
  compiledStr = compiledStr.replace('_', `(${matched.join(',')})`);
  return compiledStr;
}
