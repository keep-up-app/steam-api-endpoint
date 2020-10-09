const request = require('supertest')
const server = require('../server');

describe('Steam API response', function() {
    it('checking server response', function(callback) {
        request(server).get('/')
            .expect(200)
            .expect({ message: "STEAM API Endpoint" }, callback);
    });
    console.log(process.env.BASE_URL == 'https://steam-api-endpoint.herokuapp.com');
    console.log(process.env.STEAM_API_KEY == '3C928C31955258B04B76FCE7FDF70798');
});