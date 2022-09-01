import { Node } from './parser'
import { TransformerNodeTypesEnum } from './transformer'

export function codegen(node) {
	switch (node.type) {
		case TransformerNodeTypesEnum.Program:
			return node.body.map(codegen).join('')
		case TransformerNodeTypesEnum.ExpressionStatement:
			return codegen(node.expression) + ';'
		case TransformerNodeTypesEnum.CallExpression:
			return (
				node.callee.name + '(' + node.arguments.map(codegen).join(', ') + ')'
			)
		case TransformerNodeTypesEnum.NumberLiteral:
			return node.value
		default:
			break
	}
}
