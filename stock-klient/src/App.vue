<template>
  <Header />
  <RouterView />
  <Footer />

</template>


<style scoped>
</style>


<script>

import { RouterLink, RouterView } from 'vue-router'
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";


export default {
  components: {
    Header,
    RouterView,
    Footer,

  }
}

</script>
