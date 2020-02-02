<template>
    <div>
        <NavBar></Navbar>
        <div class="container">
          <b-row>
            <b-col class="col col-md-12">
              <div class="user-welcome">
                <h4 class="display-6">Bienvenido, {{user.name}}</h4>
                <hr class="my-3">
              </div>
            </b-col>
          </b-row> <!-- end of .row -->

          <b-row>
            <b-col class="col-md-8 posts">
              <!-- <router-link to="/post">
                <b-button variant="light" class="publication">Escribe tu publicación</b-button>
              </router-link> -->
              <router-link to="/badwords">
                <b-button variant="dark" v-if="user.role ==='ADMIN'">Palabras reservadas</b-button>
              </router-link>

            <h5>Tus publicaciones</h5>
                <b-card class="card posts-list" bg-variant="white" text-variant="dark" v-for="(post) in posts" v-bind:key="post._id">
                    <router-link :to="`/post/${post._id}`" class="router">
                        <h4>{{post.title}}</h4>

                    </router-link>
                    <p>{{post.description}}</p>
                    <router-link class="router" :to="`/edit/${post._id}`">
                        <b-button variant="dark">Editar</b-button>
                    </router-link>
                    <b-button variant="light" v-on:click="deleteData(post._id)">Eliminar</b-button>
                </b-card>
            </b-col>
                <b-col class=" col-md-4 profile">
                    <div class="profile-sidebar text-center" header="DATOS">
                        <!-- SIDEBAR USERPIC -->
                        <div class="profile-userpic">
                            <img src="https://upload.wikimedia.org/wikipedia/en/4/4d/Minions.png" class="img-responsive" alt="">
                        </div>
                        <!-- END SIDEBAR USERPIC -->
                        <!-- SIDEBAR USER TITLE -->
                        <div class="profile-usertitle">
                            <div class="profile-usertitle-name">
                                {{user.name}} {{user.lastName}}
                            </div>
                            <div class="profile-usertitle-job">
                                @{{user.nickName}}
                            </div>
                        </div>
                        <!-- END SIDEBAR USER TITLE -->
                        <!-- SIDEBAR BUTTONS -->
                        <div class="profile-userbuttons">
                            <button type="button" class="btn btn-success btn-sm">Follow</button>
                            <button type="button" class="btn btn-danger btn-sm">Message</button>
                        </div>
                        <!-- END SIDEBAR BUTTONS -->
                        </div>
                </b-col>
            </b-row>
            </div> <!-- end of .container -->
            <Footer></Footer>
    </div>
</template>

<script>
    import axios from 'axios';
    import NavBar from './NavBar';
    import Footer from './footer';


    export default {
        name: 'Perfil',
        components: {
            'NavBar': NavBar,
            'Footer': Footer
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
                            this.getUser();
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

.posts-list .btn {
    font-size: 13px;
}

.posts-list .router {
    font-weight: bold;
    color: #000;
    text-decoration: none;
}

/* Profile sidebar */
.profile-sidebar {
  padding: 20px 0 10px 0;
  background: #fff;
}

.profile-userpic img {
  float: none;
  margin: 0 auto;
  width: 50%;
  height: 50%;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}

.profile-usertitle {
  text-align: center;
  margin-top: 20px;
}

.profile-usertitle-name {
  color: #5a7391;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
}

.profile-usertitle-job {
  text-transform: uppercase;
  color: #5b9bd1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.profile-userbuttons {
  text-align: center;
  margin-top: 10px;
}

.profile-userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}

.profile-userbuttons .btn:last-child {
  margin-right: 0px;
}
    
.profile-usermenu {
  margin-top: 30px;
}

.profile-usermenu ul li {
  border-bottom: 1px solid #f0f4f7;
}

.profile-usermenu ul li:last-child {
  border-bottom: none;
}

.profile-usermenu ul li a {
  color: #93a3b5;
  font-size: 14px;
  font-weight: 400;
}

.profile-usermenu ul li a i {
  margin-right: 8px;
  font-size: 14px;
}

.profile-usermenu ul li a:hover {
  background-color: #fafcfd;
  color: #5b9bd1;
}

.profile-usermenu ul li.active {
  border-bottom: none;
}

.profile-usermenu ul li.active a {
  color: #5b9bd1;
  background-color: #f6f9fb;
  border-left: 2px solid #5b9bd1;
  margin-left: -2px;
}

/* Profile Content */
.profile-content {
  padding: 20px;
  background: #fff;
  min-height: 460px;
}
</style>
