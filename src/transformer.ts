import { NodeTypesEnum, RootNode } from './parser'
import { traverser } from './traverser'

export enum TransformerNodeTypesEnum {
	Program = 'Program',
	NumberLiteral = 'NumberLiteral',
	StringLiteral = 'StringLiteral',
	CallExpression = 'CallExpression',
	ExpressionStatement = 'ExpressionStatement',
	Identifier = 'Identifier',
}

export function transformer(ast: RootNode) {
	const newAst = {
		type: TransformerNodeTypesEnum.Program,
		body: [],
	}

	ast._context = newAst.body

	traverser(ast, {
		NumberLiteral: {
			enter(node, parent) {
				if (node.type === NodeTypesEnum.NumberLiteral) {
					parent?._context?.push(node)
				}
			},
		},

		StringLiteral: {
			enter(node, parent) {
				if (node.type === NodeTypesEnum.StringLiteral) {
					parent?._context?.push(node)
				}
			},
		},

		CallExpression: {
			enter(node, parent) {
				if (node.type === NodeTypesEnum.CallExpression) {
					let expression: any = {
						type: TransformerNodeTypesEnum.CallExpression,
						callee: {
							type: TransformerNodeTypesEnum.Identifier,
							name: node.name,
						},
						arguments: [],
					}

					node._context = expression.arguments

					if (parent?.type !== NodeTypesEnum.CallExpression) {
						expression = {
							type: TransformerNodeTypesEnum.ExpressionStatement,
							expression,
						}
					}

					parent?._context?.push(expression)
				}
			},
		},
	})

	return newAst
}
