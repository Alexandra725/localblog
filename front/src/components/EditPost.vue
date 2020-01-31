<template>
    <div>
        <NavBar></Navbar>
        <b-alert v-if="error" variant="danger" show dismissible>
            {{msgError}}
        </b-alert>
        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="10">
                    <b-input class="title" v-model="title"></b-input>
                    <b-form-textarea class="text" v-model="text"></b-form-textarea>
                    <b-button v-on:click="editPost(idPost)">Confirmar</b-button>
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
                text: '',
                title: '',
                idPost: '',
                error: false,
                msgError: ''
            }
        },
        methods: {
            alertError() {
                this.error = true
            },
            editPost: function (id) {
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const data = {
                    title: this.title,
                    text: this.text
                }
                axios.put(`http://localhost:3000/post/${id}`, data, config)
                    .then(
                        this.getPost()
                    )
                    .catch(err => {
                        this.msgError = err;
                        this.alertError();
                    })

            },
            getPost() {
                let id = this.$route.params.id;
                axios.get(`http://localhost:3000/post/${id}`)
                    .then(response => {
                        this.title = response.data.post.title;
                        this.text = response.data.post.text;
                        this.idPost = response.data.post._id;
                    })
                    .catch()
            }

        },
        created() {
            this.getPost()
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


        .name {
            font-size: 20px;
        }

        .date {
            font-size: 10px;
            margin-top: -20px;
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