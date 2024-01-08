export const cookTemplateString = (templateStr: string, token: string, value: string) => {
    const regex = new RegExp(`\\{%\\s*${token}\\s*%\\}`, 'g');
    return templateStr.replace(regex, value);
}