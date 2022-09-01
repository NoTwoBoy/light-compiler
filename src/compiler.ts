import { codegen } from './codegen'
import { parser } from './parser'
import { tokenizer } from './tokenizer'
import { transformer } from './transformer'

export function compiler(sourceCode: string) {
	const tokens = tokenizer(sourceCode)
	const ast = parser(tokens)
	const transformedAst = transformer(ast)
	const targetCode = codegen(transformedAst)

	return targetCode
}
