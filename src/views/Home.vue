<template>
  <div class="container mx-auto mt-0">
    
    <div class="d-grid gap-0 col-5  mx-auto justify-content-center align-content-center ">
      <img alt="logoap" src="../assets/logoap.png">
      <h2 class="text-center ">Gestor Administrativo Para Plataformas Web "ColDream"</h2>
      <br>
      <button 
        class="btn btn-lg btn-md btn-primary  mb-5 " 
        type="button"
         
        @click="$router.push('/login')"

      >Inicio</button>
      

    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    
  }
}


</script>



