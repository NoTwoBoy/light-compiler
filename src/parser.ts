import { TokenItem, TokenTypesEnum } from './tokenizer'

export enum NodeTypesEnum {
	Program = 'Program',
	NumberLiteral = 'NumberLiteral',
	StringLiteral = 'StringLiteral',
	CallExpression = 'CallExpression',
}

export interface BaseNode {
	type: NodeTypesEnum
}

export interface NumberNode extends BaseNode {
	type: NodeTypesEnum.NumberLiteral
	value: string
}

export interface StringNode extends BaseNode {
	type: NodeTypesEnum.StringLiteral
	value: string
}

export interface CallExpressionNode extends BaseNode {
	type: NodeTypesEnum.CallExpression
	name: string
	params: ChildNode[]
	_context?: ChildNode[]
}

export interface RootNode extends BaseNode {
	type: NodeTypesEnum.Program
	body: ChildNode[]
	_context?: ChildNode[]
}

export type ChildNode = NumberNode | StringNode | CallExpressionNode

export type ParentNode = RootNode | CallExpressionNode | null

export type Node = RootNode | ChildNode

function createProgramNode(): RootNode {
	return {
		type: NodeTypesEnum.Program,
		body: [],
	}
}

function createNumberNode(value: string): NumberNode {
	return {
		type: NodeTypesEnum.NumberLiteral,
		value,
	}
}

function createCallExpressionNode(name: string): CallExpressionNode {
	return {
		type: NodeTypesEnum.CallExpression,
		name,
		params: [],
	}
}

export function parser(tokens: TokenItem[]) {
	let current = 0
	const RootNode = createProgramNode()

	function walk() {
		let token = tokens[current]
		if (token.type === TokenTypesEnum.Number) {
			current++
			return createNumberNode(token.value)
		}

		if (token.type === TokenTypesEnum.Paren && token.value === '(') {
			token = tokens[++current]
			const node = createCallExpressionNode(token.value)

			token = tokens[++current]
			while (!(token.type === TokenTypesEnum.Paren && token.value === ')')) {
				const a = walk()
				node.params.push(a)
				token = tokens[current]
			}

			current++
			return node
		}

		throw new Error(`undefined token: ${JSON.stringify(token)}`)
	}

	while (current < tokens.length) {
		RootNode.body.push(walk())
	}

	return RootNode
}
