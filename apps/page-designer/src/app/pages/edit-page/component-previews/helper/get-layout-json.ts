import { ILayout } from "@nexus/components";
import { elements, Element } from '../../data/elements';
export const getLayoutConfigFromElement = (element: Element["name"]): ILayout => {
    const validNames = elements.map(v => v.name);
    if (!validNames.includes(element)) {
        throw new Error("Invalid name");
    }
    const config: ILayout = {
        name: element,
        props: {
            id: Math.random().toString(23)
        }
    };
    if (element === "div") {
        config.children = [];
    } else if (element === "button") {
        config.props.innerHTML = "Click Here"
    }
    return config;
}