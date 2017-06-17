# postcss-arithmetic
### PostCSS plugin to do +, -, *, /, %, and ^ operations.

Utilizes math.js to correctly parse order of operations. Also, 
when expressions can not be resolved (if there are are multiple
units types for example), postcss-arithmetic can replace the whole
expression with a CSS `calc()` statement.

## Syntax

Use the operators just like in JavaScript. The following example has the
`calcMultipleUnits` option enabled. Use parentheses around side-by-side 
expressions to make sure everything inside is evaluated together. See the
code example for how to do this.

```css
/* Before running postcss-arithmetic */
.test1 {
	width: 100% - 200px;
}

.test2 {
	top: 200px - 150px;
}

.test3 {
	width: 3 * 10rem;
	font-size: 10pt * 4;
}

.test4 {
	width: 100% / 10%;
}

.test5 {
	border-width: (9px % 5) (10px / 2px); /* Parentheses ensure that expressions that are 
	                                        side by side are evaluated correctly.*/
}

/* After running postcss-arithmetic */
.test1 {
	width: calc(100% - 200px);
}

.test2 {
	top: 50px;
}

.test3 {
	width: 30rem;
	font-size: 40pt;
}

.test4 {
	width: 10%;
}

.test5 {
	border-width: 4px 5px;
}
```

## Options: 

- `calcMultipleUnits` --- Replace exrpessions with multiple units with CSS `calc()` functions; type: `Boolean`, Default: `true`

#### By: Zack Frost