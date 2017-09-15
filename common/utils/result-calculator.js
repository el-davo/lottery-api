'use strict';

let {reduce, uniq} = require('lodash');
let {NUMBERS_PER_LINE} = require('../config/config');

module.exports = (nums) => {
  if (checkAddUpToTwo(nums)) {
    return 10;
  } else if (checkAllValuesSame(nums)) {
    return 5;
  } else if (checkSecondThirdValuesDifferentFromFirst(nums)) {
    return 1;
  } else {
    return 0;
  }
};

function checkAddUpToTwo(nums) {
  return reduce(nums, (total, next) => total + next) === 2;
}

function checkAllValuesSame(nums) {
  return uniq(nums).length === 1;
}

function checkSecondThirdValuesDifferentFromFirst(nums) {
  return nums[0] !== nums[1] && nums[0] !== nums[2];
}
