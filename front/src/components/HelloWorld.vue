<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p> Inicia sesión 
      <b-button pill variant="outline-secondary"><router-link to="/login">Login</router-link></b-button>
    </p>
    <p>Si no tienes cuenta, regístrate
      <b-button pill variant="outline-secondary"><router-link to="/register">Regístrate</router-link></b-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Homemade+Apple|Mr+Dafoe|Mr+De+Haviland|Raleway&display=swap');

.hello{
  margin-top: 10%;
}

h1{
  font-family: 'Mr De Haviland', cursive;
  font-size: 200px;
}

</style>
