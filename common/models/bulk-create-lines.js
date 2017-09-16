'use strict';

let {times} = require('lodash');

module.exports = BulkCreateLines => {
  BulkCreateLines.bulkCreateLines = (req, amount, ticketId, next) => {
    let Line = BulkCreateLines.app.models.Line;

    Line.create(times(amount, () => ({ticketId})), (err, lines) => {
      next(err, lines);
    });
  };

  BulkCreateLines.remoteMethod('bulkCreateLines', {
    accepts: [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'amount', type: 'number', required: true},
      {arg: 'ticketId', type: 'string', required: true}
    ],
    isStatic: true,
    returns: {type: 'array'},
    http: {path: '/', verb: 'post'}
  });
};
