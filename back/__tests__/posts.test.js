const request = require('supertest')
const app = require('../app')

describe('Testing API with an ADMIN user', ()=> {

    let token 

    beforeEach((done) => {
    request(app)
            .post('http://localhost:3000/login')
            .send({email:'admin@admin.com', pass:'1234'})
            .end(function (err, response) {
                console.log(response)
+
                done();
            });
    });
    test('token has been generated', () => {
        expect(token).toBeTruthy();
        expect(token).not.toBeUndefined();
        expect(typeof token).toBe('string');
    });
})