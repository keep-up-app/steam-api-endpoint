/**
 * Loading test dependencies
 */

const request = require('supertest')
const server = require('../server');
const chai = require('chai');


/**
 * Short hands for chai functions
 */

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();


// Usable json response data for testing


describe.skip('GET steam/game/owned/', () => {

    let expectedJson = require('./expected-json/owned-game-response.json');
    let valid = '76561198272843849';
    let invalid = '7656119827284';

    it('With valid steamid', (done) => {
        request(server).get(`/steam/game/owned/${valid}`)
            .end(async(err, res) => {
                let body = await res.body;
                res.status.should.be.equal(200);
                body.games.should.be.a('array');
                body.games[0].name.should.be.equal(expectedJson.games[0].name);
                done();
            })
    });

    it('With invalid steamid', (done) => {
        request(server).get(`/steam/game/owned/${invalid}`)
            .end((err, res) => {
                res.status.should.be.equal(400);
                res.body.error.should.be.equal(`Invalid steamid provided: ${invalid}`)
                done();
            });
    });
});