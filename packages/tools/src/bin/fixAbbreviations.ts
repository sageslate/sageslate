import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import generateModule from '@babel/generator'
import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'

const filePath = resolve(process.cwd(), process.argv[2])

const generate = generateModule.default
const traverse = traverseModule.default

const fileContent = await readFile(filePath, 'utf8')

const abstractSyntaxTree = parse(fileContent, {
  plugins: ['typescript'],
  sourceType: 'module',
})

traverse(abstractSyntaxTree, {
  Identifier(path) {
    if (path.node.name.endsWith('Args')) {
      path.node.name = path.node.name.replace(/Args$/, 'Arguments')
    }
  },
})

const { code } = generate(abstractSyntaxTree, { retainLines: true, retainFunctionParens: true }, fileContent)

await writeFile(filePath, code)
