<template>
    <div> 
    <NavBar></Navbar>
        <h1>Bienvenido, {{user.name}}</h1>
        <h2>Tus datos</h2>
        <b-row >
            <b-col sm="4">
                <b-input-group prepend="Username" class="mt-3">
                <a class="username">{{user.nickName}}</a>
                </b-input-group>
            </b-col>
            <b-col sm="4">
                <b-input-group prepend="Name" class="mt-3">
                <a class="name">{{user.name}}</a>
                </b-input-group>
            </b-col>
            <b-col sm="4">  
                <b-input-group prepend="Lastname" class="mt-3">
                <a class="lastname">{{user.lastName}}</a>
                </b-input-group>
                </b-col>
        </b-row>
        <div id="posts">
            <router-link to="/post" ><b-button variant="light" class="publication">Escribe tu publicación</b-button></router-link>
        <h2>Tus publicaciones</h2>
        <b-card bg-variant="white" text-variant="dark" v-for="(post) in posts"
        v-bind:key="post._id">
            <p>{{post.title}}</p>
            <router-link :to="`/post/${post._id}`"><b-button variant="light">Ver más</b-button></router-link>
            <b-button variant="light" v-on:click="deleteData(post._id)">Eliminar</b-button>
            <router-link class="router" :to="`/post/${post._id}`"><b-button variant="dark">Editar</b-button></router-link>
        </b-card>   
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import NavBar from './NavBar'

export default {
    name:'Perfil',
    components: {
        'NavBar': NavBar
    },

    data() {
        return {
            user:'',
            error: '',
            name: '',
            nickName: '',
            lastName:'',
            email:'',
            posts:[], 
            postId:''
        }
    },

    methods: {
    deleteData: function(id) {
        let token = localStorage.getItem('token');
        const config = {
             headers: { Authorization: `Bearer ${token}` }
            };
     axios.delete(`http://localhost:3000/post/${id}`, config)
      .then(()=> {
          for(let i = 0; i< this.posts.length; i++){
              if(this.posts[i]._id === id);
              this.posts.splice(i, 1);
          }
      }
        ).catch()
    }
},
    
    created () {
        let token = localStorage.getItem('token');
        const config = {
             headers: { Authorization: `Bearer ${token}` }
            };
        axios.get('http://localhost:3000/perfil', config )
        .then(response => {
            this.postId = response.data.posts._id

            this.user = response.data.user;
            this.posts = response.data.posts;
        }).catch(err => {
            this.error = err
        });
    }
}
</script>

<style scoped>
    a{
        font-size: 15px; 
        padding: 5px;
    }

@media (min-width: 1200px) { 

    h2{
        padding: 20px;
        text-align: initial;
    }

   #posts{
        margin-top: 50px;
        width: auto;
        text-align: initial
    }
    
    b-text{
        margin-left: 5px;
        margin-top: 2px;
        font-size: 23px;
    }
    h1{
        margin-top: 30px;
    }
    a{
        font-size: 20px; 
        padding: 5px;
    }

}

</style>