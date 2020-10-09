const request = require('supertest')
const server = require('../server');

describe('Steam API response', function() {
    it('checking server response', function(callback) {
        request(server).get('/')
            .expect(200)
            .expect({ message: "STEAM API Endpoint" }, callback);
    });
    console.log(process.env.BASE_URL);
    console.log(process.env.STEAM_API_KEY);
});