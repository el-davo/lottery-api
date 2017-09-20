'use strict';

let {times} = require('lodash');
let {MIN_ALLOWED_LINES, MAX_ALLOWED_LINES} = require('../config/config');

module.exports = BulkCreateLines => {
  BulkCreateLines.bulkCreateLines = (req, totalLines, ticketId, next) => {
    let Line = BulkCreateLines.app.models.Line;
    let Ticket = BulkCreateLines.app.models.Ticket;

    if (totalLines < MIN_ALLOWED_LINES || totalLines > MAX_ALLOWED_LINES) {
      return next(`Lines must be between ${MIN_ALLOWED_LINES} and ${MAX_ALLOWED_LINES}`);
    }

    Ticket.findById(ticketId, (err, ticket) => {
      if (err || !ticket || ticket.checked) {
        return next('Unable to add new lines');
      }

      Line.create(times(totalLines, () => ({ticketId})), (err, lines) => {
        next(err, lines);
      });
    });
  };

  BulkCreateLines.remoteMethod('bulkCreateLines', {
    accepts: [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'totalLines', type: 'number', required: true},
      {arg: 'ticketId', type: 'string', required: true}
    ],
    isStatic: true,
    returns: {arg: 'lines', type: 'array'},
    http: {path: '/', verb: 'post'}
  });
};
