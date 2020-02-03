const request = require('supertest');
const app = require('../app.js');
const validator = require('../functions/validator')

describe('Testing API with an ADMIN user', () => {
    let token;
    beforeEach(async (done) => {
        await new Promise(r => setTimeout(r, 2000))
        agent = await request(app);
        agent
            .post('/login')
            .send({
                email: 'admin@admin.com',
                pass: '1234',
            })
            .end((err, res) => {
                token = res.body.token

                done();
            });
    });

    test('token has been generated', () => {
        expect(token).toBeTruthy();
        expect(token).not.toBeUndefined();
        expect(typeof token).toBe('string');
    });

    test('Create post', async (done) => {

        const newPost = {
            title: 'Post test',
            description: 'Post test',
            text: 'post test'
        };

        await agent.post('/post')
            .send(newPost)
            .set('Authorization', 'bearer ' + token)
            .expect(200)
        done();
    });


});