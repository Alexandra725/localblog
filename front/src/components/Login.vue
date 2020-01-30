<template>
  <div>
    <NavBar></NavBar>
    <h1>LocalBlog</h1>
    <b-form class='login'>
      <label for="text-password">Email</label>
      <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Email" v-model="email"></b-input>
      <div>
        <b-form @submit.prevent.stop>
          <label for="text-password">Password</label>
          <b-input type="password" id="text-password" aria-describedby="password-help-block" placeholder="Password"
            v-model="pass"></b-input>
        </b-form>
      </div>
      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>
      <b-button pill variant="outline-secondary" v-on:click="login">Login</b-button>
    </b-form>
    <p>Si no tienes cuenta, regístrate
      <b-button pill variant="outline-secondary">
        <router-link class="router" to="/register">Regístrate</router-link>
      </b-button>
    </p>
  </div>

</template>

<script>
  import NavBar from './NavBar';
  import axios from 'axios';

  export default {
    name: 'login',
    components: {
      'NavBar': NavBar
    },
    data() {
      return {
        email: '',
        pass: '',
        error: ''
      }
    },
    methods: {

      login() {
        axios.post('http://localhost:3000/login', {
            email: this.email,
            pass: this.pass
          })
          .then(res => {
            const token = res.data.token
            localStorage.setItem("token", token)
            axios.defaults.headers.common['Authorization'] = token;
            this.$router.push('/posts')
          }).catch(err => {
            this.error = err;
            alert('Datos incorrectos!')
          })
      }

    }

  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');

  #app {
    font-family: 'Raleway', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .login {
    display: inline-block;
    width: 40%;
  }

  h1 {
    margin-top: 7%;
    font-family: 'Mr De Haviland', cursive;
    font-size: 100px;
  }

  p {
    padding: 50px;
  }


  @media (min-width: 1200px) {

    .login {
      display: inline-block;
      width: 40%;
    }

    h1 {
      margin-top: 7%;
      font-family: 'Mr De Haviland', cursive;
      font-size: 200px;
    }

    p {
      padding: 50px;
    }

    .router {
      text-decoration: none;
      color: beige;
    }
  }
</style>