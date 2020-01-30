import axios from 'axios';

const url = 'http://localhost:3000/posts'
const onePostURL = 'http://localhost:3000/post/'

class PostService {
    //Get post
    static getPosts() {
        return new Promise(async ( resolve, reject)=> {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post
                    }))
                );
            }catch(err){
                reject(err);
            }
        });
    }

    //create post
    static createPost(title, text) {
       return axios.post(onePostURL, {
            title, 
            text
        })
    }
    //edit post

    //delete post
    static deletePost(id) {
        return axios(`${onePostURL}${id}`)
    }
}


export default PostService;