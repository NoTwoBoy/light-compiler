import { test, expect } from 'vitest'
import { NodeTypesEnum, RootNode } from '../src/parser'
import { traverser, Visitor } from '../src/traverser'

test('traverse', () => {
	const callArr: (string | NodeTypesEnum | undefined)[][] = []

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

	const options: Visitor = {
		Program: {
			enter(node, parent) {
				callArr.push(['program-enter', node.type, parent?.type])
			},
			exit(node, parent) {
				callArr.push(['program-exit', node.type, parent?.type])
			},
		},
		CallExpression: {
			enter(node, parent) {
				callArr.push(['callExpression-enter', node.type, parent?.type])
			},
			exit(node, parent) {
				callArr.push(['callExpression-exit', node.type, parent?.type])
			},
		},
		NumberLiteral: {
			enter(node, parent) {
				callArr.push(['NumberLiteral-enter', node.type, parent?.type])
			},
			exit(node, parent) {
				callArr.push(['NumberLiteral-exit', node.type, parent?.type])
			},
		},
	}

	traverser(ast, options)

	expect(callArr).toEqual([
		['program-enter', NodeTypesEnum.Program, undefined],
		[
			'callExpression-enter',
			NodeTypesEnum.CallExpression,
			NodeTypesEnum.Program,
		],
		[
			'NumberLiteral-enter',
			NodeTypesEnum.NumberLiteral,
			NodeTypesEnum.CallExpression,
		],
		[
			'NumberLiteral-exit',
			NodeTypesEnum.NumberLiteral,
			NodeTypesEnum.CallExpression,
		],
		[
			'callExpression-enter',
			NodeTypesEnum.CallExpression,
			NodeTypesEnum.CallExpression,
		],
		[
			'NumberLiteral-enter',
			NodeTypesEnum.NumberLiteral,
			NodeTypesEnum.CallExpression,
		],
		[
			'NumberLiteral-exit',
			NodeTypesEnum.NumberLiteral,
			NodeTypesEnum.CallExpression,
		],
		[
			'NumberLiteral-enter',
			NodeTypesEnum.NumberLiteral,
			NodeTypesEnum.CallExpression,
		],
		[
			'NumberLiteral-exit',
			NodeTypesEnum.NumberLiteral,
			NodeTypesEnum.CallExpression,
		],
		[
			'callExpression-exit',
			NodeTypesEnum.CallExpression,
			NodeTypesEnum.CallExpression,
		],
		[
			'callExpression-exit',
			NodeTypesEnum.CallExpression,
			NodeTypesEnum.Program,
		],
		['program-exit', NodeTypesEnum.Program, undefined],
	])
})
