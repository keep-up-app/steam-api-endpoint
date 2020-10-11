/**
 * Loading test dependencies
 */

const request = require('supertest')
const server = require('../server');


/**
 * Simple call to test basic response -> should always be a 200 response
 */

describe('Steam API response', function() {
    it('checking server response', function(callback) {
        request(server).get('/')
            .expect(200)
            .expect({ message: "STEAM API Endpoint" }, callback);
    });
});


describe('Get owned games with: 76561198272843849', function() {
    it('checking server response', function(callback) {

        let expectedJson = require('../test/expected-json/owned-game-response.json');
        console.log(expectedJson);

        request(server).get('/steam/game/owned/76561198272843849')
            .expect(200)
            .expect(expectedJson, callback);
    });
});