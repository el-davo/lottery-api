'use strict';

let {times} = require('lodash');

module.exports = Link => {

  /**
   * Generate n lines for the ticket
   */
  Link.observe('after save', (ctx, next) => {
    if (!ctx.instance) {
      return next();
    }
    console.log(times(ctx.instance.totalLines, {ticketId: ctx.instance}));

    next();
    /*ctx.instances.lines.create({}, () => {
      next();
    });

    console.log(ctx.instance.totalLines);*/
  });
};
