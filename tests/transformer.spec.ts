import { test, expect } from 'vitest'
import { NodeTypesEnum, RootNode } from '../src/parser'
import { transformer, TransformerNodeTypesEnum } from '../src/transformer'

test('traverse', () => {
	const ast: RootNode = {
		type: NodeTypesEnum.Program,
		body: [
			{
				type: NodeTypesEnum.CallExpression,
				name: 'add',
				params: [
					{
						type: NodeTypesEnum.NumberLiteral,
						value: '2',
					},
					{
						type: NodeTypesEnum.CallExpression,
						name: 'subtract',
						params: [
							{
								type: NodeTypesEnum.NumberLiteral,
								value: '4',
							},
							{
								type: NodeTypesEnum.NumberLiteral,
								value: '2',
							},
						],
					},
				],
			},
		],
	}

	const transformerAst = {
		type: TransformerNodeTypesEnum.Program,
		body: [
			{
				type: TransformerNodeTypesEnum.ExpressionStatement,
				expression: {
					type: TransformerNodeTypesEnum.CallExpression,
					callee: {
						type: TransformerNodeTypesEnum.Identifier,
						name: 'add',
					},
					arguments: [
						{
							type: TransformerNodeTypesEnum.NumberLiteral,
							value: '2',
						},
						{
							type: TransformerNodeTypesEnum.CallExpression,
							callee: {
								type: TransformerNodeTypesEnum.Identifier,
								name: 'subtract',
							},
							arguments: [
								{
									type: TransformerNodeTypesEnum.NumberLiteral,
									value: '4',
								},
								{
									type: TransformerNodeTypesEnum.NumberLiteral,
									value: '2',
								},
							],
						},
					],
				},
			},
		],
	}

	expect(transformer(ast)).toEqual(transformerAst)
})
