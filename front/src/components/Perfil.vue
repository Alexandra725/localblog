<template>
    <div>
        <NavBar></Navbar>
        <h1>Bienvenido, {{user.name}}</h1>
            <b-row >
                <b-col class="profile">
                    <b-card bg-variant="secondary" text-variant="white" header="DATOS" class="text-center">
                        <b-card-text bg-variant="primary" text-variant="white" header="Primary" class="text-center">
                            <b-input-group prepend="Username" class="mt-3">
                                <a class="username">{{user.nickName}}</a>
                            </b-input-group>
                            <b-input-group prepend="Name" class="mt-3">
                                <a class="name">{{user.name}}</a>
                            </b-input-group>

                            <b-input-group prepend="Lastname" class="mt-3">
                                <a class="lastname">{{user.lastName}}</a>
                            </b-input-group>
                        </b-card-text>
                    </b-card>

                </b-col>

                <b-col class="posts">
                    <router-link to="/post">
                        <b-button variant="light" class="publication">Escribe tu publicación</b-button>
                    </router-link>

                    <router-link to="/badwords">
                        <b-button variant="dark" v-if="user.role ==='ADMIN'">Palabras reservadas</b-button>
                    </router-link>

                    <h2>Tus publicaciones</h2>
                    <b-card class="card" bg-variant="white" text-variant="dark" v-for="(post) in posts"
                        v-bind:key="post._id">
                        <p>{{post.title}}</p>
                        <router-link :to="`/post/${post._id}`">
                            <b-button variant="light">Ver más</b-button>
                        </router-link>
                        <b-button variant="light" v-on:click="deleteData(post._id)">Eliminar</b-button>
                        <router-link class="router" :to="`/edit/${post._id}`">
                            <b-button variant="dark">Editar</b-button>
                        </router-link>
                    </b-card>
                </b-col>
            </b-row>
    </div>

</template>

<script>
    import axios from 'axios'
    import NavBar from './NavBar'

    export default {
        name: 'Perfil',
        components: {
            'NavBar': NavBar
        },

        data() {
            return {
                user: '',
                error: '',
                name: '',
                nickName: '',
                lastName: '',
                email: '',
                posts: [],
                postId: '',

            }
        },

        methods: {
            deleteData: function (id) {
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                axios.delete(`http://localhost:3000/post/${id}`, config)
                    .then(() => {
                        for (let i = 0; i < this.posts.length; i++) {
                            if (this.posts[i]._id === id);
                            this.posts.splice(i, 1);
                        }
                    }).catch()
            },

            getUser() {
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                axios.get('http://localhost:3000/perfil', config)
                    .then(response => {
                        this.postId = response.data.posts._id
                        this.user = response.data.user;
                        this.posts = response.data.posts;
                        /* eslint-disable no-console */
                        console.log('error  ', this.user.role);
                        /* eslint-enable no-console */
                    }).catch(err => {
                        this.error = err
                    });
            }
        },

        created() {
            this.getUser();
        }
    }
</script>

<style scoped>
    a {
        font-size: 15px;
        padding: 5px;
    }

    @media (min-width: 1200px) {

        .card {
            width: 700px;
        }

        h2 {
            padding: 20px;
            text-align: initial;
        }

        .posts {
            margin-top: 50px;
            text-align: initial;
        }

        b-text {
            margin-left: 5px;
            margin-top: 2px;
            font-size: 23px;
        }

        h1 {
            margin-top: 30px;
        }

        a {
            font-size: 20px;
            padding: 5px;
        }
        .profile{
            margin-top: 50px;
            margin-left: 40px;
        }

    }
</style>