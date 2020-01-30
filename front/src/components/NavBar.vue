<template>
<header>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">LocalBlog</a>
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="link" href="/posts">Posts</a>
      </li>
      <li class="nav-item active">
        <a class="link" href="/perfil">Perfil</a>
      </li>
      <li class="nav-item active">
        <a class="link" href="/post">Publica</a>
      </li>
      <li>
        <b-button variant="outline-info" class="mb-2" v-on:click="logout">
      <b-icon icon="power"></b-icon> Logout
    </b-button>
      </li>
    </ul>
</nav>
</header>
</template>

<script>
export default {
  name:'NavBar',
  data () {
    return {

    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>


<style>

@import url('https://fonts.googleapis.com/css?family=Homemade+Apple|Mr+Dafoe|Mr+De+Haviland|Raleway&display=swap');

.navbar-brand {
  font-family: 'Mr De Haviland';
  font-size: 20px;
  font-weight: cursive;
  margin: 0 auto;
}
.navbar-nav .link{
  font-size: 15px;
  text-decoration: none;
  color: aliceblue;

}
 @media (min-width: 1200px) { 

  .navbar {
    color: #2c3e50;
    height: 7%;
    padding-top: 3px;
    width: 100%;
    opacity: 50%;
  }

  .navbar-brand {
    font-family: 'Mr De Haviland';
    font-size: 50px;
    font-weight: cursive;
    color: #ffffff;
    margin: 0 auto;
    text-align: center;
  }
  .navbar-nav .link {
    padding: 5px;
    font-size: 20px;
  }


 }
</style>