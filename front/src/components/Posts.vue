<template>
  <div>
    <NavBar class="nav"></NavBar>

    <div class="container mt-5">
      <div class="col-md-12">
        <div class="post-article" v-for="post in posts" v-bind:key="post._id">
          <router-link class="router" :to="`/post/${post._id}`">
            <h3 class="post-title">{{post.title}}</h3>
          </router-link>
          <p>{{post.description}}</p>
          <div>
            <span class="badge">Publicado el {{post.date}}</span>
            <div class="float-right"><span class="badge">{{post.name}}</span></div>         
          </div>
          <hr>
        </div> <!-- end of .post-article -->
      </div> <!-- end of .col-md-12 -->
    </div> <!-- end of .container -->
  <Footer></Footer>
  </div>
</template>

<script>
  import axios from 'axios';
  import NavBar from './NavBar';
  import Footer from './footer'

  export default {
    name: 'Posts',
    components: {
      'NavBar': NavBar,
      'Footer': Footer
    },
    data() {
      return {
        posts: [],
        error: '',
        title: '',
        postId: '',
        user: ''
      }
    },
    methods: {
      getPosts() {
        axios.get('http://localhost:3000/posts')
          .then(response => {
            this.posts = response.data
            this.$store.dispatch('setPost', this.posts)
          }).catch(error => {
            this.error = error
          })
      },

      loadUser() {
        axios.get('http://localhost:3000/')
          .then()
          .catch(err => {
            /* eslint-disable no-console */
            console.log("err", err)
            /* eslint-enable no-console */
          })
      }

    },
    created() {
      this.getPosts();
      this.loadUser();
    }
  }
</script>

<style>
  .post-article .router {
    font-weight: bold;
    color: #000;
    text-decoration: none;
  }
</style>