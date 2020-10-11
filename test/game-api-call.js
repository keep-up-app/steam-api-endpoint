/**
 * Loading test dependencies
 */

const request = require('supertest')
const server = require('../server');


describe('Get owned games with: 76561198272843849', () => {
    it('gets games', callback => {

        let expectedJson = require('../test/expected-json/owned-game-response.json');
        let steamid = '76561198272843849';

        request(server).get(`/steam/game/owned/${steamid}`)
            .expect(200)
            .expect(expectedJson, callback);
    });
});


describe('Gets owned games with invalid steamid: 7656119827284384', () => {
    it('gets games with wrong id', callback => {

        request(server).get(`/steam/game/owned/${steamid}`)
            .expect(500)
            .expect({ error: 'Invalid steamid provided: 7656119827284384' }, callback)
    });
})