<template>
  <div>
    <NavBar></Navbar>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="9">
          <h1>Escribe tu publicación!</h1>
          <form>
            <b-form-input class="title" v-model="title">{{post.title}}</b-form-input>
            <b-form-textarea class="text" v-model="text">{{post.text}}</b-form-textarea>
          </form>
          <b-button pill variant="outline-secondary" v-on:click="publicPost">Publicar</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
  import axios from 'axios';
  import NavBar from './NavBar';

  export default {
    components: {
      'NavBar': NavBar
    },
    data() {
      return {
        post: '',
        title: '',
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
              text: this.text
            },
            config)
          .then(response => {
            /* eslint-disable no-console */
            console.log('response  ', response);
            /* eslint-enable no-console */
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

<style scoped>
  h1 {
    font-size: 20px;
    padding: 20px;
  }

  .title {
    height: 50px;
  }

  .text {
    margin-top: 20px;
    height: 400px;
  }

  button {

    margin-top: 30px;
    padding: 10px;
  }

  #comments {
    margin-top: 30px;
    height: 300px;
    width: 300px;
  }

  @media (min-width: 1200px) {


    h1 {
      font-size: 30px;
      padding: 45px;
    }

    .title {
      height: 70px;

    }

    .text {
      margin-top: 20px;
      height: 600px;
      vertical-align: top;
      display: inline-block;
    }

    button {
      margin-top: 20px;
      padding: 10px;
    }

    #comments {
      align-content: center;
    }

  }
</style>