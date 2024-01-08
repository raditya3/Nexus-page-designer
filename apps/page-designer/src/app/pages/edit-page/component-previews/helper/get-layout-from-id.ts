import { ILayout } from "@nexus/components";

export function getLayoutFromId(id: string, layout: ILayout): ILayout | null {
    if (layout.props!.id === id) {
        return layout;
    }
    if (!layout.children?.length) {
        return null;
    }
    else {
        for (let i = 0; i < layout.children.length; i++) {
            const identifiedLayout = getLayoutFromId(id, layout.children[i]);
            if (identifiedLayout) {
                return identifiedLayout;
            }
        }
    }
    return null;
}