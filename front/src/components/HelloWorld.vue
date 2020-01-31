<template>
<b-container>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p> Inicia sesión 
      <router-link to="/login"><b-button pill variant="outline-secondary">Login</b-button></router-link>
    </p>
    <p>Si no tienes cuenta, regístrate
      <router-link to="/register"><b-button pill variant="outline-secondary">Regístrate</b-button></router-link>
    </p>
  </div>
</b-container>

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
  align-content: center;
}

h1{
  font-family: 'Mr De Haviland', cursive;
  font-size: 200px;
}

</style>
