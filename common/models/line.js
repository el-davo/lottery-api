'use strict';

let {times, sample, map} = require('lodash');
let {NUMBERS_PER_LINE, ALLOWED_NUMS} = require('../config/config');
let resultCalculator = require('../utils/result-calculator');

module.exports = Line => {

  /**
   * Generate numbers for this line
   */
  Line.observe('after save', (ctx, next) => {
    if (!ctx.isNewInstance) {
      return next();
    }
    let {id, numbers: {create}} = ctx.instance;
    let numbers = times(NUMBERS_PER_LINE, () => {
      return {ticketId: id, number: sample(ALLOWED_NUMS)};
    });

    create(numbers, (err, nums) => {
      if (err) {
        return next(err);
      }
      let result = resultCalculator(map(nums, num => num.number));

      ctx.instance.updateAttributes({result}, next);
    });
  });
};
