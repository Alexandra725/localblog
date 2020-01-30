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
                    <b-form-textarea class="comment" placeholder="Enter comment" v-model="textComment">
                    </b-form-textarea>
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
                textComment: ''
            }
        },
        methods: {
            publicComment() {
                let id = this.$route.params.id;
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                axios.post(`http://localhost:3000/post/${id}/comments`, {
                        text: this.textComment
                    }, config)
                    .then()
                    .catch()
            }

        },
        created() {
            let id = this.$route.params.id;
            axios.get(`http://localhost:3000/post/${id}`)
                .then(response => {

                    this.postId = response.data.post._id;
                    this.post = response.data.post;
                    this.comments=response.data.comments;
                    this.userName = response.data.post.name

                    /* eslint-disable no-console */
                    console.log("post", response.data.comments)
                    /* eslint-enable no-console */
                })
                .catch()
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
            height: 100px;
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