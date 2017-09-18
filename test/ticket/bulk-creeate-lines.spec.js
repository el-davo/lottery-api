'use strict';

let request = require('supertest');
let expect = require('expect.js');
let app = require('../../server/server');

describe('Bulk Create Lines', () => {

  let ticketId;

  beforeEach(done => {
    request(app)
      .post('/api/tickets')
      .send({totalLines: 10})
      .end((err, {body: {id}}) => {
        ticketId = id;
        done();
      });
  });

  it('should add n lines to the ticket', done => {
    request(app)
      .post('/api/bulkCreateLines')
      .send({ticketId, totalLInes: 2})
      .end((err, {body: {lines}}) => {
        expect(lines).to.be.an('array');
        expect(lines).to.have.length(2);

        request(app)
          .get(`/api/tickets/${ticketId}`)
          .end((err, {body}) => {
            expect(body.lines).to.have.length(12);
            done();
          });
      });
  });

  it('should not be able to add lines to a checked ticket', done => {
    request(app)
      .patch('/api/tickets')
      .send({id: ticketId, totalLInes: 10, checked: true})
      .end((err, {body}) => {
        done();
      });
  });

});
