import { assertEquals } from 'https://deno.land/std@0.168.0/testing/asserts.ts'
import { fmti } from './main.ts'

const d = 'D'
const cd = fmti`
  C-
   ${d}
`

Deno.test(function simpleIndent() {
  assertEquals(cd, 'C-\n D')
})

Deno.test(function nestedIndent() {
  const abcd = fmti`
    A---
     B--
      ${cd}
  `
  assertEquals(abcd, 'A---\n B--\n  C-\n   D')
})

Deno.test(function kotlinTrimIndent() {})
