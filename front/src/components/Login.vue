<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
     <div class="row justify-content-md-center">
     <div class="col-md-6">
      <div class='login-form'>
          <form>
    <b-alert v-if="error" variant="danger" show  dismissible>
      Tus datos son incorrectos
    </b-alert>
          <div class="form-group">
            <label for="InputEmail1">Email address</label>
            <b-input v-model="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></b-input>
          </div>
          <b-form @submit.prevent.stop>
          <div class="form-group">
            <label for="InputPassword1">Password</label>
            <b-input v-model="pass" class="form-control" id="InputPassword1" type="password" placeholder="Password"></b-input>
          </div>
          </b-form>
          <div class="form-check">
            <b-form-checkbox class="form-check-input" id="rememberMe">Remember me</b-form-checkbox>
          </div>
          <div class="mt-3">
            <b-button id="login" variant="btn btn-primary" v-on:click="login">Login</b-button>
          </div>
        </form>
          <hr class="my-3">
          <p>Si no tienes cuenta, <a href="/register" class="btn-link">regístrate!</a></p>
      </div>
      </div>
      </div>
      </div>
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
        error: false
      }
    },
    methods: {
      alertError() {
        this.error = true
      },

      login() {
        axios.post('http://localhost:3000/login', {
            email: this.email,
            pass: this.pass
          })
          .then(res => {
            const token = res.data.token
            localStorage.setItem("token", token)
            axios.defaults.headers.common['Authorization'] = token;
            this.$router.push('/');
          }).catch(err => {
            this.error = err;
            this.alertError();
          });
      }

    }

  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
  .login-form {
    margin: 50px auto 0;
  }
</style>

