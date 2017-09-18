'use strict';

let expect = require('expect.js');
let resultCalculator = require('../../common/utils/result-calculator');

describe('Result Calculator', () => {

  it('should return 10 if the sum of the values is 2', () => {
    expect(resultCalculator([0, 1, 1])).to.be(10);
    expect(resultCalculator([1, 0, 1])).to.be(10);
    expect(resultCalculator([0, 2, 0])).to.be(10);
    expect(resultCalculator([0, 0, 2])).to.be(10);
    expect(resultCalculator([2, 0, 0])).to.be(10);
  });

  it('should return 5 if all numbers are the same', () => {
    expect(resultCalculator([0, 0, 0])).to.be(5);
    expect(resultCalculator([1, 1, 1])).to.be(5);
    expect(resultCalculator([2, 2, 2])).to.be(5);
  });

  it('should return 1 if 2nd and 3rd numbers are not the same as the 1st number', () => {
    expect(resultCalculator([0, 2, 1])).to.be(1);
    expect(resultCalculator([2, 1, 1])).to.be(1);
  });

  it('should return 0 if no other rules apply', () => {
    expect(resultCalculator([1, 2, 1])).to.be(0);
  });
});
