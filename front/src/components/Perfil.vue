<template>
    <div>
        <NavBar></Navbar>
        <div class="container">
          <div class="row">
            <div class="col col-md-12">
              <div class="user-welcome">
                <h4 class="display-6">Bienvenido, {{user.name}}</h4>
                <hr class="my-4">
              </div>
            </div>
          </div>
          <b-row>
            <b-col class="col-md-8 posts">
              <router-link to="/post">
                <b-button variant="light" class="publication">Escribe tu publicación</b-button>
              </router-link>
              <router-link to="/badwords">
                <b-button variant="dark" v-if="user.role ==='ADMIN'">Palabras reservadas</b-button>
              </router-link>

                <h5>Tus publicaciones</h5>
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
                <b-col class=" col-md-4 profile">
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
            </b-row>
            </div>
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
.user-welcome {
  margin: 20px 0 0;
  text-align:left;
}
</style>
