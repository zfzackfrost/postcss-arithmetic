var postcss = require('postcss');
var math = require('mathjs');
var namedRegexp = require('named-js-regexp');
var _ = require('lodash');


module.exports = postcss.plugin('arithmetic', function arithmetic(options) {

	var baseUnitsRE = '(?<number>\\d+)(?<unit>%|cm|em|ex|in|mm|pc|pt|px|vh|vw|vmin|vmax|rem)';
	// Units regular expression
	var unitsRegExp = namedRegexp(baseUnitsRE, "g");
	var basicUnitsRegExp = namedRegexp(baseUnitsRE);

	return function (css) {

		options = options || {};
		_.defaults(options, {
			calcMultipleUnits : true
		});

		// Use CSS calc() function when expressions with multiple units are encountered
		// Default: true
		var calcMultipleUnits = options.calcMultipleUnits;

		var expressionRegExp 
		= /\(?(?:(?:\d*.\d+|\d+)(?:%|cm|em|ex|in|mm|pc|pt|px|vh|vw|vmin|vmax|rem)?(?:\s+)??(\+|-|\*|\/|\^|%)(?:\s+)??)+(?:\s+)?(?:\d*.\d+|\d+)(?:%|cm|em|ex|in|mm|pc|pt|px|vh|vw|vmin|vmax|rem)?\)?/g;

		// Iterate through css rules
		css.walkRules(function (rule) {
			// Iterate through properties
			rule.walkDecls(function(decl, i) {

				var value = decl.value;
				valueTmp = value;

				var matchResult;
				while((matchResult = expressionRegExp.exec(value)) !== null) {
					index = matchResult.index;
					len = matchResult[0].length;
					expr = value.substr(index, len);

					var exprNoUnits = expr;
					var unitsResult = unitsRegExp.exec(expr);
					var units = [];
					while (unitsResult !== null) {
						units = _.concat(units, unitsResult.group("unit"));

						exprNoUnits = basicUnitsRegExp.replace(exprNoUnits, "${number}");

						unitsResult = unitsRegExp.exec(expr);
					}
					units = _.uniq(units);
					if (_.size(units) == 1) {
						var exprValue = math.eval(exprNoUnits);
						var newExpr = exprValue + units[0];
						valueTmp = valueTmp.replace(expr, newExpr);
					} else if (calcMultipleUnits) {
						var newExpr = 'calc(' + expr + ')';
						valueTmp = valueTmp.replace(expr, newExpr);
					}
				}
				decl.value = valueTmp; 
			});
		});
	}

});