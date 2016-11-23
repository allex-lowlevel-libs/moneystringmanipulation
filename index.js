function createLib(isString, isNumber, prependToString, isInteger) {
  'use strict';

  function toMoneyError(str, decimalplaces) {
    return new Error('Money string '+str+' has to be a positive decimal number with '+decimalplaces+' decimal places');
  }


  function toMoney (str, power, regexp, decimalplaces) {
    var parts;
    if (!decimalplaces) throw new Error('No decimalplaces given');
    if (!(isNumber(decimalplaces) && isInteger(decimalplaces) && decimalplaces > 0)) throw new Error ('decimalplaces should be a positive integer: '+decimalplaces);
    if (!power) {
      throw new Error('MoneyStringManipulator got no power');
    }

    if (isNumber(str)) {
      return ~~(str*power);
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

    if (!isInteger(num)) throw new Error('num has to be a positive integer');
    if (!isNumber(num)) num = parseInt(num,10);

    var negative = num < 0;
    num = Math.abs(num);
    return (negative ? '-' : '')+(~~(num/power)+'.'+prependToString('0', decimalplaces, ''+num%power));
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
