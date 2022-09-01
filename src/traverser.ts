import { NodeTypesEnum, RootNode, ParentNode, ChildNode, Node } from './parser'
import {} from './parser'

export type VisitorFunc = (node: Node, parent: ParentNode) => void

export type VisitorOption = Partial<{
	enter: VisitorFunc
	exit: VisitorFunc
}>

export type Visitor = Partial<Record<NodeTypesEnum, VisitorOption>>

export function traverser(RootNode: RootNode, visitor: Visitor) {
	function traverserArray(nodeArr: ChildNode[], parent: ParentNode) {
		nodeArr.forEach(node => {
			traverserNode(node, parent)
		})
	}

	function traverserNode(node: Node, parent: ParentNode = null) {
		const visitorObj = visitor[node.type]

		if (visitorObj && visitorObj.enter) {
			visitorObj.enter(node, parent)
		}

		switch (node.type) {
			case NodeTypesEnum.NumberLiteral:
				break
			case NodeTypesEnum.CallExpression:
				traverserArray(node.params, node)
				break
			case NodeTypesEnum.Program:
				traverserArray(node.body, node)
				break
		}

		if (visitorObj && visitorObj.exit) {
			visitorObj.exit(node, parent)
		}
	}

	traverserNode(RootNode)
}
