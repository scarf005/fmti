import { fmti } from './main.ts'

const a = 'a'
Deno.bench(function addSmall() {
  fmti(`
    ${a}
      ${a}
    ${a}
  `)
})
