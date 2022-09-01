import { expect, test } from 'vitest'
import { NodeTypesEnum, parser } from '../src/parser'
import { TokenTypesEnum } from '../src/tokenizer'

test('Number', () => {
	const tokens = [{ type: TokenTypesEnum.Number, value: '2' }]

	const ast = {
		type: NodeTypesEnum.Program,
		body: [{ type: NodeTypesEnum.NumberLiteral, value: '2' }],
	}

	expect(parser(tokens)).toEqual(ast)
})

test('callExpression', () => {
	const tokens = [
		{ type: TokenTypesEnum.Paren, value: '(' },
		{ type: TokenTypesEnum.Name, value: 'add' },
		{ type: TokenTypesEnum.Number, value: '2' },
		{ type: TokenTypesEnum.Number, value: '1' },
		{ type: TokenTypesEnum.Paren, value: ')' },
	]

	const ast = {
		type: NodeTypesEnum.Program,
		body: [
			{
				type: NodeTypesEnum.CallExpression,
				name: 'add',
				params: [
					{ type: NodeTypesEnum.NumberLiteral, value: '2' },
					{ type: NodeTypesEnum.NumberLiteral, value: '1' },
				],
			},
		],
	}

	expect(parser(tokens)).toEqual(ast)
})

test('parser', () => {
	const token = [
		{ type: TokenTypesEnum.Paren, value: '(' },
		{ type: TokenTypesEnum.Name, value: 'add' },
		{ type: TokenTypesEnum.Number, value: '2' },
		{ type: TokenTypesEnum.Paren, value: '(' },
		{ type: TokenTypesEnum.Name, value: 'subtract' },
		{ type: TokenTypesEnum.Number, value: '4' },
		{ type: TokenTypesEnum.Number, value: '2' },
		{ type: TokenTypesEnum.Paren, value: ')' },
		{ type: TokenTypesEnum.Paren, value: ')' },
	]

	const ast = {
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

	expect(parser(token)).toEqual(ast)
})
