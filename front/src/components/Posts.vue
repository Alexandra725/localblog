<template>
  <div>
    <NavBar></NavBar>
    <b-card id="title" bg-variant="light" text-variant="dark"  v-for="post in posts"
      v-bind:title="post"
      v-bind:_id="post"
      v-bind:key="post._id"
      >
      <p class = error v-if="error"> {{ error }}</p>
      <b-card-text id="text">
       {{post.title}}
      </b-card-text>
      <router-link class="router" :to="`/post/${post._id}`"><b-button variant="dark">post</b-button></router-link>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar';

export default {
  name:'Posts',
  components: {
    'NavBar': NavBar
  },
  data() {
    return {
      posts: [],
      error: '',
      title:'',
      postId:''
    }
  },
  methods:{

  },
    created () {
      axios.get('http://localhost:3000/posts')
      .then(response => {
          this.posts = response.data
          this.$store.dispatch('setPosts', this.posts)
     }).catch(error =>{
       this.error = error
     })
    },
  }

</script>

<style scoped>


  @media (min-width: 1200px) {

    button {
      text-align: left;
    }
    #text{
        width: auto;
        font-size: 23px;
    }
    #title{
      margin-top: 5px;
      margin-bottom: 5px;
    }
    #col-comment{
        width: auto;
    }
    .router {
      text-decoration: none;
      color: beige;
    }
}

</style>