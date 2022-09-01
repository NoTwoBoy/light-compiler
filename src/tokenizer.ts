export enum TokenTypesEnum {
	Paren,
	Name,
	Number,
}

export interface TokenItem {
	type: TokenTypesEnum
	value: string
}

export function tokenizer(code: string) {
	const token: TokenItem[] = []
	let current = 0

	while (current < code.length) {
		let char = code[current]

		const WHITESPACE = /\s/
		if (WHITESPACE.test(char)) {
			current++

			continue
		}

		const PAREN = /[()]/
		if (PAREN.test(char)) {
			token.push({
				type: TokenTypesEnum.Paren,
				value: char,
			})

			current++

			continue
		}

		const LETTERS = /[a-z]/i
		if (LETTERS.test(char)) {
			let value = ''
			while (LETTERS.test(char) && current < code.length) {
				value += char
				char = code[++current]
			}

			token.push({
				type: TokenTypesEnum.Name,
				value,
			})

			continue
		}

		const NumberS = /[0-9]/
		if (NumberS.test(char)) {
			let value = ''
			while (NumberS.test(char) && current < code.length) {
				value += char
				char = code[++current]
			}

			token.push({
				type: TokenTypesEnum.Number,
				value,
			})

			continue
		}

		console.log(current, token)
	}

	return token
}
