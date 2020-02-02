<template>
  <div>
    <NavBar></Navbar>
    <b-container class="mt-4">
      <b-row>
        <b-col sm="9">
          <h4 class="display-6">Nueva publicación</h4>
          <hr class="my-3">
          <form>
            <label for="title">Título</label>
            <b-form-input class="form-control title mb-3" v-model="title">{{post.title}}</b-form-input>
            <label for="description">Descripción</label>
            <b-form-input class="form-control description mb-3" v-model="description">{{post.description}}</b-form-input>
            <label for="description">Artículo</label>
            <b-form-textarea class="text mb-3" v-model="text" rows="14">{{post.text}}</b-form-textarea>
          </form>
          <b-button class="publish btn-block" variant="outline-success" v-on:click="publicPost">Publicar</b-button>
        </b-col>
      </b-row>
    </b-container>
    <Footer></Footer>
  </div>
</template>


<script>
  import axios from 'axios';
  import NavBar from './NavBar';
  import Footer from './footer'

  export default {
    components: {
      'NavBar': NavBar,
      'Footer': Footer
    },
    data() {
      return {
        post: '',
        title: '',
        description:'',
        text: '',
        error: ''
      }
    },
    methods: {
      publicPost() {
        let token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios.post('http://localhost:3000/post', {
              title: this.title,
              description: this.description,
              text: this.text
            },
            config)
          .then(response => {
            this.$router.push('/post/' + response.data._id)
          }).catch(err => {
            /* eslint-disable no-console */
            console.log('error  ', err);
            /* eslint-enable no-console */
          })
      }
    },
  }
</script>
