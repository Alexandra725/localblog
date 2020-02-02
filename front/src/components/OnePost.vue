<template>
    <div>
        <NavBar></Navbar>
        <b-container class="mt-5">
            <b-row>
                <b-col cols="8">
                    <h3 class="mb-3">{{post.title}}</h3>
                    <p class="text" disabled="">{{post.text}}</p>
                    <div>
                        <span class="badge">Publicado el {{post.date}}</span>
                        <div class="float-right"><span class="badge">{{post.name}}</span></div>         
                    </div>
                </b-col>
                <b-col cols="4" class="comment-publi">
                    <p> Comentarios</p>
                    <div class="card card-white comment mb-2" v-for="comment in comments" v-bind:text="comment" v-bind:key="comment._id">
                        <div class="comment-heading">
                            <div class="float-left image">
                                <img src="https://upload.wikimedia.org/wikipedia/en/4/4d/Minions.png" class="img-circle avatar" alt="user profile image">
                            </div>
                            <div class="float-left meta">
                                <div class="title h5">
                                    <a href="#"><b>{{comment.userName}}</b></a>
                                    hizo un comentrio.
                                </div>
                                <h6 class="text-muted time">{{comment.date}}</h6>
                            </div>
                        </div> 
                        <div class="comment-description">
                            <p class="comment">{{comment.text}}</p>
                        </div>
                    </div>

                    <h6 class="mt-4">Publicar comentario</h6>
                    <b-form-textarea class="form-control textComment" placeholder="Enter comment" v-model="textComment"></b-form-textarea>
                    <b-alert v-if="error" variant="danger" show dismissible>
                        {{msgError}}: Hay palabras que no estan permitidas. Revisa tu comentario
                    </b-alert>
                    <b-button variant="outline-light" v-on:click="publicComment" class="button comment-btn mt-2">Comentar</b-button>
                </b-col>
            </b-row>
        </b-container>
        <Footer></Footer>
    </div>
</template>

<script>
    import NavBar from './NavBar';
    import Footer from './footer'
    import axios from 'axios';

    export default {
        name: 'onePost',
        components: {
            'NavBar': NavBar,
            'Footer': Footer
        },
        data() {
            return {
                post: '',
                comments: '',
                postId: '',
                userName: '',
                textComment: '',
                msgError: '',
                error: false
            }
        },
        methods: {
            alertError() {
                this.error = true
            },
            publicComment() {
                let id = this.$route.params.id;
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const data = {
                    text: this.textComment
                }
                axios.post(`http://localhost:3000/post/${id}/comments`, data, config)
                    .then(
                        this.getOnePost()
                    )
                    .catch(err => {
                        this.msgError = err;
                        this.alertError();
                    });
            },

            getOnePost() {
                let id = this.$route.params.id;
                axios.get(`http://localhost:3000/post/${id}`)
                    .then(response => {
                        this.postId = response.data.post._id;
                        this.post = response.data.post;
                        this.comments = response.data.comments;
                        this.userName = response.data.post.name
                    })
                    .catch()

            }

        },
        created() {
            this.getOnePost();
        }
    }
</script>

<style scoped>
.card-white .card-heading {
  color: #333;
  background-color: #fff;
  border-color: #ddd;
   border: 1px solid #dddddd;
}
.card-white  .card-footer {
  background-color: #fff;
  border-color: #ddd;
}
.card-white .h5 {
    font-size:14px;
    
}
.card-white .time {
    font-size:12px;
}
.comment .comment-heading {
  padding: 10px 7.5px;
}
.comment .comment-heading .avatar {
  width: 48px;
  height: 48px;
  display: block;
  margin-right: 10px;
}
.comment .comment-heading .meta .title {
  margin-bottom: 0;
}
.comment .comment-heading .meta .title a {
  color: black;
}
.comment .comment-heading .meta .title a:hover {
  color: #aaaaaa;
}
.comment .comment-heading .meta .time {
  margin-top: 8px;
  color: #999;
}
.comment .comment-image .image {
  width: 100%;
  height: auto;
}
.comment .comment-description {
  padding: 10px;
}
.comment .comment-description p {
  font-size: 14px;
  margin: 0;
}

.comment-btn {
    font-size: 14px;
    color: #000;
}

</style>