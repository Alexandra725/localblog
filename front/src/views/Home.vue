<template>
  <div class="home">
    <HelloWorld msg="Bloggy "/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
