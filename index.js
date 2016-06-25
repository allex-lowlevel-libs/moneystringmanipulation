function createLib(isString, isNumber, prependToString) {
  'use strict';

  function toMoneyError(str, decimalplaces) {
    return new Error('Money string '+str+' has to be a positive decimal number with '+decimalplaces+' decimal places');
  }

  function MoneyStringManipulator (decimalplaces) {
    if (!isNumber(decimalplaces)) {
      throw new Error('decimalplases has to be a number');
    }
    this.decimalplaces = decimalplaces;
    this.regexp = new RegExp('^\\s*(\\d{1,})\.(\\d{'+this.decimalplaces+'})\\s*$');
    this.power = Math.pow(10, this.decimalplaces);
  }
  MoneyStringManipulator.prototype.destroy = function () {
    this.power = null;
    this.regexp = null;
    this.decimalplaces = null;
  };
  MoneyStringManipulator.prototype.toMoney = function (str) {
    var parts;
    if (!this.power) {
      throw new Error('MoneyStringManipulator already destroyed');
    }
    if (!isString(str)) {
      throw new Error('Input parameter has to be a string');
    }
    parts = this.regexp.exec(str);
    if (!(parts && parts.length===3)) {
      throw toMoneyError(str, this.decimalplaces);
    }
    return parseInt(parts[1])*this.power + parseInt(parts[2]);
  };
  MoneyStringManipulator.prototype.fromMoney = function (num) {
    if (!this.power) {
      throw new Error('MoneyStringManipulator already destroyed');
    }
    if (!(isNumber(num) && num>=0 && (~~(num) === num))) {
      throw new Error('Input parameter has to be a positive integer');
    }
    return (~~(num/this.power)+'.'+prependToString('0', this.decimalplaces, ''+num%this.power));
  };

  return {
    MoneyStringManipulator: MoneyStringManipulator
  };
}

module.exports = createLib;
