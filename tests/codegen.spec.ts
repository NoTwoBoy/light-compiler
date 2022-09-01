import { test, expect } from 'vitest'
import { codegen } from '../src/codegen'
import { TransformerNodeTypesEnum } from '../src/transformer'

test('codegen', () => {
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

	expect(codegen(transformerAst)).toMatchInlineSnapshot(
		'"add(2, subtract(4, 2));"'
	)
})
