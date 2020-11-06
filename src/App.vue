<template>
  <div id="app">
    <nav class="site-header sticky-top py-1">
      <div class="container">
        <div class="row">

    <div class="col-6">
        <a class="py-2 logo-text" href="#">
          LUMIN
        </a>
        <a class="py-2 d-none d-md-inline-block mr-4" href="#">Shop</a>
        <a class="py-2 d-none d-md-inline-block" href="#">Learn</a>

    </div>
    <div class="col-md-3 ml-auto">
        <a class="py-2 d-none d-md-inline-block mr-4" href="#">Account</a>
        <a class="py-2 d-none d-md-inline-block" href="#" @click.prevent="toggle">
          <img src="https://img.icons8.com/android/24/ffffff/shopping-cart.png" alt="Lumin"/>
          <span class="badge position-absolute" style="top: 0px;">{{cartItems.length}}</span>
        </a>
    </div>
    </div>
      </div>
    </nav>
    
    <Home/>

<div class="footer border-top">
<footer class="container py-2">
      <div class="row">
        <div class="col-12 col-md text-center">
          <span class="py-2 logo-text">
          LUMIN
        </span>
          <small class="d-block mb-3 text-muted">© 2020</small>
        </div>
      </div>
    </footer>
</div>
<Sidebar/>
  </div>
</template>

<script>
import { store, mutations } from "@/store.js";
import Home from './components/Home.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Home,
    Sidebar
  },
    computed: {
        cartItems() {
            return store.cart;
        },
    },
    methods: {
    toggle() {
      mutations.toggleNav();
    }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
