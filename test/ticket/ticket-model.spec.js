'use strict';

let request = require('supertest');
let expect = require('expect.js');
let app = require('../../server/server');

describe('Ticket Model', () => {

  it('should allow creation of new ticket with n lines', (done) => {
    request(app)
      .post('/api/tickets')
      .expect(200)
      .end((err, {body}) => {
        done();
      });
  });
});
