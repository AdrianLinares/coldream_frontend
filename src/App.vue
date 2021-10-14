<template>
  <div id="app">
    <div id="nav">     
      <router-link to="/login"  v-if="!estaActivo"></router-link> 
      <a @click="cerrarSesion()"  v-if="estaActivo"></a> 
      
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods:{
    ...mapActions(['cerrarSesion', 'leerToken'])
  },
  computed:{
    ...mapGetters(['estaActivo'])
  },
  created(){
    this.leerToken();
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun&display=swap');

#app {
  box-sizing: border-box;
  -webkit-box-flex: initial;
  font-family: 'Sarabun', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #030303;
  display: -webkit-box ;
  background-color:rgb(249, 249, 250) ;
  /* width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%; */
  
  
  
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #6e93d8;
}

</style>
