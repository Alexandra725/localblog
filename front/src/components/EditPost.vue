<template>
    <div>
        <NavBar></Navbar>
        <b-alert v-if="error" variant="danger" show dismissible>
            {{msgError}}
        </b-alert>
        <b-container class="mt-5">
            <b-row>
                <b-col class="col col-md-12">
                    <div class="user-welcome">
                        <h4 class="display-6">Nuevo post</h4>
                        <hr class="my-3">
                    </div>
                </b-col>
            </b-row> <!-- end of .row -->
            <b-row>
                <b-col cols="12">
                    <b-input class="title" v-model="title"></b-input>
                    <b-input class="description" v-model="description"></b-input>
                    <b-form-textarea class="form-control text" v-model="text" rows="14"></b-form-textarea>
                    <b-button class="btn btn-success" v-on:click="editPost(idPost)">Publicar</b-button>
                </b-col>
            </b-row>
        </b-container>
        <Footer></Footer>
    </div>
</template>

<script>
    import NavBar from './NavBar';
    import Footer from './footer';
    import axios from 'axios';

    export default {
        name: 'onePost',
        components: {
            'NavBar': NavBar,
            'Footer': Footer
        },
        data() {
            return {
                text: '',
                description: '',
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
                    description: this.description,
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
                        this.description = response.data.post.description;
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
    
</style>