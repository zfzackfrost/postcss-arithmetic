# postcss-arithmetic
### PostCSS plugin to do +, -, *, /, %, and ^ operations.

Utilizes math.js to correctly parse order of operations. Also, 
when expressions can not be resolved (if there are are multiple
units types for example), postcss-arithmetic can replace the whole
expression with a CSS `calc()` statement.

## Options: 

- `calcMultipleUnits` --- Replace exrpessions with multiple units with CSS `calc()` functions; type: `Boolean`, Default: `true`

#### By: Zack Frost