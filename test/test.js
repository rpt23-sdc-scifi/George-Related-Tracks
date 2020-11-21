const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../database/relatedData.js');
const app = require('../server/index.js');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the Test', () => {
  it('should asuage my concerns that tests cannot pass', (done) => {
    expect(true).to.equal(true);
    done()
  })
})

describe('Save Track Info', () => {
  it('should save a new track', (done) => {
    const recordZero = {
      song_id: 0,
      plays: 55391,
      likes: 10037,
      reposts: 207,
      related: [1, 2, 3, 4]
    };


    chai.request(app)
      .post('/relatedTracks')
      .query(recordZero)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      })
  })

  it('should not save a new track with a used id', (done) => {
    const erroneousRecord = {
      song_id: 0,
      plays: 0,
      likes: 0,
      reposts: 0,
      related: [0]
    };


    chai.request(app)
      .post('/relatedTracks')
      .query(erroneousRecord)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      })
  })
})

describe('Read Track Info', () => {
  it('should read a saved track', (done) => {
    chai.request(app)
      .get('/relatedTracks/1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done()
      })
  })
})

describe('Update Track Info', () => {
  it('should update a saved track', (done) => {
    const updatedRecord = {
      song_id: 0,
      plays: 54321,
      likes: 12345,
      reposts: 666,
      related: [1, 2, 3, 4, 5]
    };


    chai.request(app)
      .put('/relatedTracks/0')
      .query(updatedRecord)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        db.findTrack(0, (err, track) => {
          expect(track.plays).to.equal(54321);
          done();
        })
      })
  })
})

describe('Delete Track Info', () => {
  it('should delete a saved track', (done) => {
    chai.request(app)
      .delete('/relatedTracks/0')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        db.findTrack(0, (err, track) => {
          expect(track).to.be.null;
          done();
        })
      })
  })
})