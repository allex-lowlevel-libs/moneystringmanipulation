function createLib(isString, isNumber, prependToString) {
  'use strict';
  //TODO: introduce a bit more strict checks on input params and possible conversions string <-> integer ...

  function toMoneyError(str, decimalplaces) {
    return new Error('Money string '+str+' has to be a positive decimal number with '+decimalplaces+' decimal places');
  }


  function toMoney (str, power, regexp, decimalplaces) {
    var parts;
    if (!power) {
      throw new Error('MoneyStringManipulator already destroyed');
    }
    if (!isString(str)) {
      throw new Error('Input parameter has to be a string');
    }
    parts = regexp.exec(str);
    if (!(parts && parts.length===3)) {
      throw toMoneyError(str, decimalplaces);
    }
    return parseInt(parts[1])*power + parseInt(parts[2]);
  }

  function createRegexp (decimalplaces) {
    return new RegExp('^\\s*(\\d{1,})\.(\\d{'+decimalplaces+'})\\s*$');
  }

  function fromMoney (num, power, decimalplaces) {
    if (!power) {
      throw new Error('MoneyStringManipulator already destroyed');
    }
    if (!(isNumber(num) && num>=0 && (~~(num) === num))) {
      throw new Error('Input parameter has to be a positive integer');
    }
    return (~~(num/power)+'.'+prependToString('0', decimalplaces, ''+num%power));
  }

  function MoneyStringManipulator (decimalplaces) {
    if (!isNumber(decimalplaces)) {
      throw new Error('decimalplases has to be a number');
    }
    this.decimalplaces = decimalplaces;
    this.regexp = createRegexp(decimalplaces);
    this.power = Math.pow(10, this.decimalplaces);
  }
  MoneyStringManipulator.prototype.destroy = function () {
    this.power = null;
    this.regexp = null;
    this.decimalplaces = null;
  };

  MoneyStringManipulator.prototype.toMoney = function (str) {
    return toMoney(str, this.power, this.regexp, this.decimalplaces);
  };

  MoneyStringManipulator.prototype.fromMoney = function (num) {
    return fromMoney (num, this.power, this.decimalplaces);
  };

  return {
    MoneyStringManipulator: MoneyStringManipulator,
    toMoney : function (str, decimalplaces) {
      return toMoney (str, Math.pow(10, decimalplaces), createRegexp(decimalplaces), decimalplaces);
    },
    fromMoney : function (num, decimalplaces) {
      return fromMoney (num, Math.pow(10, decimalplaces), decimalplaces);
    }
  };
}

module.exports = createLib;
