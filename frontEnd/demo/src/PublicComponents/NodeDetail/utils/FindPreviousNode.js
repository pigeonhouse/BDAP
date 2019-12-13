/**
 * 返回当前node的上一个于anchor连接的node
 * @param {Object} node 当前node
 * @param {int} sourceAnchor 当前node的anchor
 * @param {Object} propsAPI propsAPI
 */

//寻找目标node的上方anchor所连接的node
export default function findPreviousNode(node, anchor, propsAPI) {

    const { find, save } = propsAPI;
    const { edges } = save();

    if (edges === undefined) return null;

    for (let i in edges) {

        const edge = edges[i];

        //找到源node，返回
        if (edge.target === node.id && edge.targetAnchor === anchor) {
            const sourceNode = find(edge.source);
            return sourceNode;
        }
    }

    return null;
}