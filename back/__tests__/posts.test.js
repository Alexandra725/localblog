const request = require('supertest');
const app = require('../app.js');

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

       const { body } = await agent.post('/post')
            .send(newPost)
            .set('Authorization', 'bearer ' + token)
            expect(body.userId).toBeTruthy()
            expect(body.name).toBe('Admin')

        done();
    });

    test('Comment without offensive words',  async(done) => {
        const post = await  agent.get('/posts');
        const postId = post.body[0]._id;

        var newComment = {
            text: 'test comment'
        };

        agent.post('/post/' + postId + '/comments')
            .send(newComment)
            .set('Authorization', 'bearer ' + token)
            .expect({status: 200})

        done();
    });

    test('Comment with offensive words',  async(done) => {
        const post = await  agent.get('/posts');
        const postId = post.body[1]._id;
        console.log(postId);

        var newComment = {
            text: 'test comment whith word negro'
        };

        agent.post('/post/' + postId + '/comments')
            .send(newComment)
            .set('Authorization', 'bearer ' + token)
            .expect({status:406})

        done();
    });

});