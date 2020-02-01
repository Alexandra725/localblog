<template>
    <div>
        <NavBar></Navbar>
        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="10">
                    <a class="title">{{post.title}}</a>
                    <p>Autor: {{userName}}</p>
                    <p class="text" disabled="">{{post.text}}</p>
                </b-col>
                <b-col cols="2" class="comment-publi">
                    <p> Comentarios</p>
                    <div v-for="comment in comments" v-bind:text="comment" v-bind:key="comment._id">
                        <p class="name">{{comment.userName}}</p>
                        <p class="date">{{comment.date}} </p>
                        <p class="comment">{{comment.text}}</p>
                    </div>
                    <p>Publicar comentario</p>
                    <b-form-textarea class="textComment" placeholder="Enter comment" v-model="textComment">
                    </b-form-textarea>
                    <b-alert v-if="error" variant="danger" show dismissible>
                      {{msgError}}:  Hay palabras que no estan permitidas. Revisa tu comentario
                    </b-alert>
                    <b-button pill variant="outline-secondary" v-on:click="publicComment" class="button">Comentar
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import NavBar from './NavBar';
    import axios from 'axios';

    export default {
        name: 'onePost',
        components: {
            'NavBar': NavBar
        },
        data() {
            return {
                post: '',
                comments: '',
                postId: '',
                userName: '',
                textComment: '',
                msgError:'',
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
                axios.post(`http://localhost:3000/post/${id}/comments`,data ,config)
                    .then(
                        this.getOnePost()
                    )
                    .catch(err => {
                                                /* eslint-disable no-console */
                        console.log("err", err)
                        /* eslint-enable no-console */
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
    @media (min-width: 1200px) {

        .bv-example-row {
            margin-top: 70px;
            width: 100%;
        }

        .text {
            margin-top: 20px;
            height: 600px;
        }

        .col-comment {
            width: auto;
        }

        .comment {
            width: 200px;
            height: auto;
            background-color: rgb(181, 182, 182, 0.1);
            text-align: center;
        }

        .name {
            font-size: 20px;
        }

        .date {
            font-size: 10px;
            margin-top: -20px;
        }

        .comment-publi {
            align-content: center;
            margin: 0 auto;
            width: 100%;
            margin-right: -50px;
        }

        .title {
            font-size: 55px;
            font-family: 'Mr De Haviland', cursive;
        }

        .button {
            margin-top: 6px;
        }

    }
</style>