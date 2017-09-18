'use strict';

let request = require('supertest');
let expect = require('expect.js');
let app = require('../../server/server');

describe('Ticket', () => {

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

  it('should have a new ticket with n lines', (done) => {
    request(app)
      .get(`/api/tickets/${ticketId}`)
      .end((err, {body}) => {
        expect(body.lines).to.be.an('array');
        expect(body.lines).to.have.length(10);
        done();
      });
  });

  it('should have 3 numbers per line and a result', (done) => {
    request(app)
      .get(`/api/tickets/${ticketId}`)
      .end((err, {body}) => {
        for (let line of body.lines) {
          expect(line.result).to.be.a('number');
          expect(line.numbers).to.be.an('array');
          expect(line.numbers).to.have.length(3);
        }
        done();
      });
  });

});
