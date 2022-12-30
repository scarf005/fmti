# fmti: Indented template strings

paste your indented code snippet into another indented code snippet

## Example

```ts
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
assertEquals(cd, 'C-\n D')
console.log(cd)
/* =>
C-
 D
*/

assertEquals(abcd, 'A---\n B--\n  C-\n   D')
console.log(abcd)
/* =>
A---
 B--
  C-
   D
*/
```
