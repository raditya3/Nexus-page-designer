export const getTokensFromString = (template: string) => {
  const matches = template.match(/\{%\s*([\w+.]+)\s*%}/g)?.map((match) => {
    return match.replace(/\{%/g, '').replace(/%}/, '').trim();
  });
  return matches?.map((match) => {
    const matchArray = match.split('.');
    const context = matchArray.shift()! as 'pageContext' | 'localContext';
    const contextVariable = matchArray.shift()!;
    const path = matchArray.join('.');
    return {
      context,
      contextVariable,
      path,
    };
  });
};
