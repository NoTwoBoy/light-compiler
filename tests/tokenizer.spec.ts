import { expect, test } from 'vitest'
import { tokenizer, TokenTypesEnum } from '../src/tokenizer'

test('paren', () => {
	const code = '('

	const tokens = [{ type: TokenTypesEnum.Paren, value: '(' }]

	expect(tokenizer(code)).toEqual(tokens)
})

test('name', () => {
	const code = 'add'

	const tokens = [{ type: TokenTypesEnum.Name, value: 'add' }]

	expect(tokenizer(code)).toEqual(tokens)
})

test('Number', () => {
	const code = '2'

	const tokens = [{ type: TokenTypesEnum.Number, value: '2' }]

	expect(tokenizer(code)).toEqual(tokens)
})

test('add', () => {
	const code = `(add 2 1)`

	const tokens = [
		{ type: TokenTypesEnum.Paren, value: '(' },
		{ type: TokenTypesEnum.Name, value: 'add' },
		{ type: TokenTypesEnum.Number, value: '2' },
		{ type: TokenTypesEnum.Number, value: '1' },
		{ type: TokenTypesEnum.Paren, value: ')' },
	]

	expect(tokenizer(code)).toEqual(tokens)
})

test('tokenizer', () => {
	const code = '(add 2 (subtract 4 2))'

	const tokens = [
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

	expect(tokenizer(code)).toEqual(tokens)
})
