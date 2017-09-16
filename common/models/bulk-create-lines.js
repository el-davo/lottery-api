'use strict';

let {times} = require('lodash');

module.exports = BulkCreateLines => {
  BulkCreateLines.bulkCreateLines = (req, amount, ticketId, next) => {
    let Line = BulkCreateLines.app.models.Line;
    let Ticket = BulkCreateLines.app.models.Ticket;

    Ticket.findById(ticketId, (err, ticket) => {
      if (err || !ticket || ticket.checked) {
        return next('Unable to add new lines');
      }

      Line.create(times(amount, () => ({ticketId})), (err, lines) => {
        next(err, lines);
      });
    });
  };

  BulkCreateLines.remoteMethod('bulkCreateLines', {
    accepts: [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'amount', type: 'number', required: true},
      {arg: 'ticketId', type: 'string', required: true}
    ],
    isStatic: true,
    returns: {arg: 'lines', type: 'array'},
    http: {path: '/', verb: 'post'}
  });
};
