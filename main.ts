import dedent from 'npm:dedent-js'
import { dropWhileBoth } from './dropWhile.ts'

const isWhitespace = (s: string) => s.trim() === ''
const isNotWhitespace = (s: string) => !isWhitespace(s)

const indent = (s: string, indent: number) =>
  s
    .split('\n')
    .map(line => ' '.repeat(indent) + line)
    .join('\n')

const trimEmptyLines = (s: string) =>
  dropWhileBoth(s.split('\n'), isWhitespace).join('\n')

const indentSize = (s: string) => s.match(/^\s*/)?.[0].length ?? 0

export const fmti = (
  templateStrings: TemplateStringsArray | string,
  ...values: unknown[]
) => {
  const raw =
    typeof templateStrings === 'string'
      ? [templateStrings]
      : templateStrings.raw

  const result = raw
    .map((str, i) => {
      const value = values[i] ?? ''
      const lines = str.split('\n')
      const lastIsIndent = lines[lines.length - 1].trim() === ''
      if (lastIsIndent) {
        const lastIndent = indentSize(lines.at(-1) ?? '')
        const linesBeforeLast = lines.slice(0, -1)
        const valueFmt = trimEmptyLines(indent(dedent`${value}`, lastIndent))
        return linesBeforeLast.join('\n') + '\n' + valueFmt
      }
      return str + value
    })
    .join('')

  const lines = result.split('\n')
  const indents = lines
    .filter(isNotWhitespace)
    .map(indentSize)
    .reduce((a, b) => Math.min(a, b), Infinity)

  return trimEmptyLines(lines.map(line => line.slice(indents)).join('\n'))
}

if (import.meta.main) {
  const d = 'D'
  const cd = fmti`
  C-
   ${d}
`
  const abcd = fmti`
    A---
     B--
      ${cd}
  `
  const a = `
    |Hello
    |World
  `
  console.log(fmti`
    """
    ${a}

    ${a}
    """.trimIndent()
  `)

  console.log(cd)
  console.log(abcd)
}
