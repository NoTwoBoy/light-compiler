import { test, expect } from 'vitest'
import { compiler } from '../src/compiler'

test('codegen', () => {
	const sourceCode = '(add 2 (subtract 4 2))'

	expect(compiler(sourceCode)).toMatchInlineSnapshot(
		'"add(2, subtract(4, 2));"'
	)
})
