/**
 * Loading test dependencies
 */

const request = require('supertest')
const server = require('../server');


describe('Retrieves games from /steam/games/owned', () => {

    let expectedJson = require('../test/expected-json/owned-game-response.json');

    it('gets games with valid id', callback => {

        let steamid = '76561198272843849';
        let total = expectedJson.total;

        request(server).get(`/steam/game/owned/${steamid}`)
            .expect(200)
            .expect(res => { res.body.data.total == total }, callback);
    });

    it('gets games with invalid id', callback => {

        let invalidSteamId = '7656119827284';

        request(server).get(`/steam/game/owned/${invalidSteamId}`)
            .expect(500)
            .expect({ error: `Invalid steamid provided: ${invalidSteamId}` }, callback)
    });
});