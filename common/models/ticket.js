'use strict';

let {times} = require('lodash');

module.exports = Ticket => {

  /**
   * Generate n lines for the ticket
   */
  Ticket.observe('after save', (ctx, next) => {
    if (!ctx.isNewInstance) {
      return next();
    }
    let {totalLines, id, lines: {create}} = ctx.instance;
    let lines = times(totalLines, () => ({ticketId: id}));

    create(lines, next);
  });
};
