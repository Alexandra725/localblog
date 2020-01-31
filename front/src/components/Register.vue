<template>
<div>
  <NavBar></NavBar>
  <div class="container">
   <div class="row justify-content-md-center">
   <div class="col-md-6">
    <div class='registration-form'>
        <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
          <b-form-input id="input-1" placeholder="Enter name" v-model="name" ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Lastname:" label-for="input-2">
          <b-form-input id="input-2" placeholder="Enter Lastname" v-model="lastName"></b-form-input>
        </b-form-group>

         <b-form-group id="input-group-3" label="Email address:" label-for="input-3"
          description="We'll never share your email with anyone else.">
          <b-form-input id="input-3" type="email" placeholder="Enter email" v-model="email" ></b-form-input>
        </b-form-group>

      <b-form  @submit.stop.prevent>
        <label for="feedback-user">Nickname</label>
        <div class="input-group mb-2 mr-sm-2">
          <div class="input-group-prepend">
            <div class="input-group-text">@</div>
          </div>
          <b-input v-model="nickName" :state="validation" id="feedback-user"></b-input>
        </div>
        <b-form-invalid-feedback :state="validation">
          Your nickname must be 5-12 characters long.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Looks Good.
        </b-form-valid-feedback>
       </b-form>
       <b-form @submit.stop.prevent>
          <label for="text-password">Password</label>
          <b-input type="password" id="text-password" aria-describedby="password-help-block" v-model="pass"></b-input>
          <b-form-text id="password-help-block">
          Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji.
          </b-form-text>
          </b-form>
       <div class="mt-3">
          <b-button variant="btn btn-success" v-on:click="register">Regístrate</b-button>
      </div>

    </div>
  </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import NavBar from "./NavBar";

 export default {
   name: 'register',
   components: {
     'NavBar': NavBar
   },
    data() {
      return {
        name:'',
        lastName:'',
        email:'',
        nickName: '',
        pass:''
      }
    },
  methods: {

   async register() {
     await axios.post('http://localhost:3000/register', {
       name: this.name,
       lastName: this.lastName,
       email: this.email,
       nickName: this.nickName,
       pass: this.pass
     });
     this.$router.push('/posts')

   }
  },
    computed: {
      validation() {
        return this.nickName.length > 4 && this.nickName.length < 13
      }
    }
  }

  </script>

<style scoped>
  .registration-form {
    margin: 50px auto 0;
  }
</style>
