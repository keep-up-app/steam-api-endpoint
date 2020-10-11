/**
 * Loading test dependencies
 */

const request = require('supertest')
const server = require('../server');
const chai = require('chai');
const assert = chai.assert;

// Usable json response data for testing
const expectedJson = require('../test/expected-json/owned-game-response.json');


describe('Retrieves games from /steam/games/owned', () => {


    it('gets games with valid id', callback => {

        let steamid = '76561198272843849';

        request(server).get(`/steam/game/owned/${steamid}`)
            .expect(res => {
                assert.equal(expectedJson.total, res.body.total);
            })
            .expect(200, callback);

    });

    it('gets games with invalid id', callback => {

        let invalidSteamId = '7656119827284';

        request(server).get(`/steam/game/owned/${invalidSteamId}`)
            .expect(500)
            .expect({ error: `Invalid steamid provided: ${invalidSteamId}` }, callback)
    });
});