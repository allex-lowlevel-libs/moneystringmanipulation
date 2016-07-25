var expect = require('chai').expect,
  checks = require('allex_checkslowlevellib'),
  stringmanipulation = require('allex_stringmanipulationlowlevellib')(checks.isString),
  lib = require('..')(checks.isString, checks.isNumber, stringmanipulation.prependToString),
  MoneyStringManipulator = lib.MoneyStringManipulator;

describe('Testing \'MoneyStringManipulation\' lib', function () {
  it('2 decimal points toMoney', function () {
    var msm = new MoneyStringManipulator(2);
    expect(msm.toMoney('22.22')).to.equal(2222);
    expect(msm.toMoney('153.35')).to.equal(15335);
    expect(msm.toMoney('0.89')).to.equal(89);
    expect(msm.toMoney('0.09')).to.equal(9);
    expect(msm.toMoney('0.00')).to.equal(0);
    expect(msm.toMoney.bind(msm, 1050)).to.throw(Error);
    expect(msm.toMoney.bind(msm, 1050.83)).to.throw(Error);
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
    expect(msm.fromMoney.bind(msm, -12353)).to.throw(Error, /positive/);
    expect(msm.fromMoney.bind(msm, ['125.353'])).to.throw(Error);
    expect(msm.fromMoney.bind(msm, '125.353')).to.throw(Error);
    msm.destroy();
  });
});
