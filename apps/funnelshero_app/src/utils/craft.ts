import { useNode, useEditor, Node, FreshNode } from "@craftjs/core";

export const insertNodeOnParent = (
    nodeId: string,
    parentId: string,
    indexToInsert: number,
    query: any,
    actions: any
) => {
    const node: Node = query.node(nodeId).get();
    const freshNode: FreshNode = {
        data: {
            ...node.data,
            nodes: [],
        },
    };
    const nodeToAdd = query.parseFreshNode(freshNode).toNode();
    actions.add(nodeToAdd, parentId, indexToInsert);
    if (node.data.nodes.length === 0) {
        return;
    }
    node.data.nodes.forEach((childNode: string, index: number) => {
        insertNodeOnParent(childNode, nodeToAdd.id, index);
    });
    actions.selectNode(nodeToAdd.id);
};
