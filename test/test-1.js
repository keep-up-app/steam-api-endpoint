const request = require('supertest')
const server = require('../server');

describe('Steam API response', function() {
    it('checking server response', function(callback) {
        request(server).get('/')
            .expect(200)
            .expect({ message: "STEAM API Endpoint" }, callback);
    });


    var url1 = `${process.env.BASE_URL}/steam/user/auth`;
    var url2 = "https://steam-api-endpoint.herokuapp.com/steam/user/auth";

    console.log(url1 === url2);
    console.log(url1);
    console.log(url2);
});