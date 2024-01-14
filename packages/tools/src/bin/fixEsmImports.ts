import { readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import generateModule from '@babel/generator'
import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'

const targetDirectory = resolve(process.cwd(), process.argv[2])

const generate = generateModule.default
const traverse = traverseModule.default

async function getAllFilesByExtension(directory: string, extension: string): Promise<string[]> {
  const files = await readdir(directory, { withFileTypes: true })
  const filesByExtension = files.filter(file => file.name.endsWith(extension))
  const filesPaths = filesByExtension.map(file => resolve(directory, file.name))

  const directories = files.filter(file => file.isDirectory())
  const directoriesFiles = await Promise.all(
    directories.map(subDirectory => getAllFilesByExtension(resolve(directory, subDirectory.name), extension)),
  )
  return [...filesPaths, ...directoriesFiles.flat()]
}

async function fixImportsWithoutExtension(filePath: string) {
  const fileContent = await readFile(filePath, 'utf8')

  const abstractSyntaxTree = parse(fileContent, {
    plugins: ['typescript'],
    sourceType: 'module',
  })

  traverse(abstractSyntaxTree, {
    ImportDeclaration(path) {
      if (path.node.source.value.startsWith('.') && !path.node.source.value.endsWith('.js')) {
        path.node.source.value += '.js'
      }
    },
  })

  const { code } = generate(abstractSyntaxTree, { retainLines: true, retainFunctionParens: true }, fileContent)

  await writeFile(filePath, code)
}

const files = await getAllFilesByExtension(targetDirectory, '.ts')
await Promise.all(files.map(fileName => fixImportsWithoutExtension(fileName)))
