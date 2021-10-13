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
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

#app {
  box-sizing: border-box;
  -webkit-box-flex: initial;
  font-family: 'Patrick Hand', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9ce44f;
  display: -webkit-box ;
  background-color:aliceblue ;
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
