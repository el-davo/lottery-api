'use strict';

let request = require('supertest');
let expect = require('expect.js');
let app = require('../../server/server');

describe('Line Model', () => {

  let ticket;

  beforeEach((done) => {
    request(app)
      .post('/api/tickets')
      .end((err, {body: {id}}) => {
        ticket = id;
        done();
      });
  });

  it('should allow creation of a new line model', (done) => {
    request(app)
      .post(`/api/tickets/${ticket}/lines`)
      .expect(200)
      .end((err, {body: {id, ticketId}}) => {
        expect(id).to.be.a('string');
        expect(ticketId).to.be(ticket);
        done();
      });
  });
});
