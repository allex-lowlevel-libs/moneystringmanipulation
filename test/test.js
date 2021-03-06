var expect = require('chai').expect,
  checks = require('allex_checkslowlevellib'),
  stringmanipulation = require('allex_stringmanipulationlowlevellib')(checks.isString),
  lib = require('..')(checks.isString, checks.isNumber, stringmanipulation.prependToString, checks.isNumber),
  MoneyStringManipulator = lib.MoneyStringManipulator,
  toMoney = lib.toMoney,
  fromMoney = lib.fromMoney;

describe('Testing \'MoneyStringManipulation\' lib', function () {
  it('2 decimal points toMoney', function () {
    var msm = new MoneyStringManipulator(2);
    expect(msm.toMoney('22.22')).to.equal(2222);
    expect(msm.toMoney('153.35')).to.equal(15335);
    expect(msm.toMoney(153.353212312312312313)).to.equal(15335);
    expect(msm.toMoney('0.89')).to.equal(89);
    expect(msm.toMoney('0.09')).to.equal(9);
    expect(msm.toMoney('0.00')).to.equal(0);
    expect(msm.toMoney(1050)).to.equal(105000);
    expect(msm.toMoney(1050.83)).to.equal(105083);
    expect(msm.toMoney.bind(msm, {string:'5'})).to.throw(Error);
    expect(msm.toMoney.bind(msm, '-125.353')).to.throw(Error);
    expect(msm.toMoney.bind(msm, '.353')).to.throw(Error);
    msm.destroy();
  });
  it('2 decimal points fromMoney', function () {
    var msm = new MoneyStringManipulator(2);
    expect(msm.fromMoney(352)).to.equal('3.52');
    expect(msm.fromMoney(9)).to.equal('0.09');
    expect(msm.fromMoney(0)).to.equal('0.00');
    expect(msm.fromMoney(-12353)).to.be.equal('-123.53');
    expect(msm.fromMoney.bind(msm, ['125.353'])).to.throw(Error);
    expect(msm.fromMoney.bind(msm, '125.353')).to.throw(Error);
    msm.destroy();
  });
});


describe('Testing static functions', function () {
  it('2 decimal points toMoney', function () {
    expect(toMoney('22.22', 2)).to.equal(2222);
    expect(toMoney('153.35', 2)).to.equal(15335);
    expect(toMoney(153.353212312312312313, 2)).to.equal(15335);
    expect(toMoney('0.89', 2)).to.equal(89);
    expect(toMoney('0.09', 2)).to.equal(9);
    expect(toMoney('0.00', 2)).to.equal(0);
    expect(toMoney(1050, 2)).to.equal(105000);
    expect(toMoney(1050.83,2)).to.equal(105083);
    expect(toMoney.bind(null, {string:'5'}, 2)).to.throw(Error);
    expect(toMoney.bind(null, '-125.353', 2)).to.throw(Error);
    expect(toMoney.bind(null, '.353', 2)).to.throw(Error);
  });
  it('2 decimal points fromMoney', function () {
    expect(fromMoney(352, 2)).to.equal('3.52');
    expect(fromMoney(9, 2)).to.equal('0.09');
    expect(fromMoney(0, 2)).to.equal('0.00');
    expect(fromMoney(-12353, 2)).to.equal('-123.53');
    expect(fromMoney.bind(null, ['125.353'], 2)).to.throw(Error);
    expect(fromMoney.bind(null, '125.353', 2)).to.throw(Error);
  });
});
