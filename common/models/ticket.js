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

    create(lines, (err, lines) => {
      next(err, lines);
    });
  });

  /**
   * Disable remote api methods
   */
  Ticket.disableRemoteMethodByName('deleteById');
  Ticket.disableRemoteMethodByName('upsertWithWhere');
  Ticket.disableRemoteMethodByName('replaceOrCreate');
  Ticket.disableRemoteMethodByName('replace');
  Ticket.disableRemoteMethodByName('replaceById');
  Ticket.disableRemoteMethodByName('updateAll');
  Ticket.disableRemoteMethodByName('prototype.updateAttributes');

  Ticket.disableRemoteMethodByName('findOne');
  Ticket.disableRemoteMethodByName('exists');

  Ticket.disableRemoteMethodByName('createChangeStream');
  Ticket.disableRemoteMethodByName('count');

  // Line Relations
  Ticket.disableRemoteMethodByName('prototype.__count__lines');
  Ticket.disableRemoteMethodByName('prototype.__get__lines');
  Ticket.disableRemoteMethodByName('prototype.__upsert__lines');
  Ticket.disableRemoteMethodByName('prototype.__delete__lines');
  Ticket.disableRemoteMethodByName('prototype.__destroyById__lines');
  Ticket.disableRemoteMethodByName('prototype.__updateById__lines');
  Ticket.disableRemoteMethodByName('prototype.__findOne__lines');
  Ticket.disableRemoteMethodByName('prototype.__findById__lines');

  // Number Relations
  Ticket.disableRemoteMethodByName('prototype.__count__numbers');
  Ticket.disableRemoteMethodByName('prototype.__get__numbers');
  Ticket.disableRemoteMethodByName('prototype.__destroyById__numbers');
  Ticket.disableRemoteMethodByName('prototype.__delete__numbers');
  Ticket.disableRemoteMethodByName('prototype.__updateById__numbers');
  Ticket.disableRemoteMethodByName('prototype.__create__numbers');
  Ticket.disableRemoteMethodByName('prototype.__updateById__numbers');
  Ticket.disableRemoteMethodByName('prototype.__findOne__numbers');
  Ticket.disableRemoteMethodByName('prototype.__find__numbers');
  Ticket.disableRemoteMethodByName('prototype.__findById__numbers');

  Ticket.disableRemoteMethodByName('prototype.__destroyById__numbers_rel');
};
