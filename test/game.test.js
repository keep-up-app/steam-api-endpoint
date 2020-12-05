/**
 * Loading test dependencies
 */

const parser = require('body-parser');
const request = require('supertest');
const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');


/**
 * Apply deps.
 */

chai.use(chaiHttp);
server.use(parser.json());


/**
 * Short hands for chai functions
 */

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();


describe('GET steam/game/owned/', () => {

    let expectedJson = require('./expected-json/owned-game-response.json');
    let valid = '76561198272843849';
    let invalid = '7656119827284';

    it('With valid steamid', (done) => {
        request(server).get(`/steam/game/owned/${valid}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.response.game_count).to.equal(29);
                done();
            })
    });

    it.skip('With invalid steamid', (done) => {
        request(server).get(`/steam/game/owned/${invalid}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.error).to.equal(`Invalid steamid provided: ${invalid}`)
                done();
            });
    });
});