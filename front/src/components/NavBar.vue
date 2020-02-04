<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-midnight">
  <div class="container">
    <a class="navbar-brand">
      <img src="../assets/img/bloggy-logo.svg" class="logo" alt="logo" title="Bloggy">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="/">Posts<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item" >
          <a class="nav-link" href="/perfil" v-if="token">Perfil</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <a class="btn btn-success mr-sm-2" href="/post" role="button" v-if="token">Publicar</a>
        <b-button variant="btn btn-outline-secondary my-2 my-sm-0" type="submit" v-on:click="logout" v-if="token">Logout</b-button>
        <router-link class="login" to="/login"><b-button variant="btn btn-outline-secondary my-2 my-sm-0" type="submit" v-if="!token">Login</b-button></router-link>
      </form>
    </div>
  </div> <!-- end of .container -->
</nav> <!-- end of .navbar -->
</template>

<script>
export default {
  name:'NavBar',
  data () {
    return {
      token: true
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      this.$router.go ('/')
    },
    verifyToken() {
      if(localStorage.getItem('token') === undefined || localStorage.getItem('token')=== null)
      this.token = false;
    }
  },
  created(){
    this.verifyToken();
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Homemade+Apple|Mr+Dafoe|Mr+De+Haviland|Raleway&display=swap');

.bg-midnight {
  background-color: #2c3e50;
}

.main-header .navbar-nav {
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-brand {
  font-family: 'Mr De Haviland';
  font-size: 48px;
  font-weight: cursive;
  color: #fff !important;
}

.navbar-nav .nav-item a {
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
}

.navbar .btn {
  font-size: 14px;
}

.logo {
  display: block;
  width: 30px;
  height: auto;
  margin: 0;
}

</style>