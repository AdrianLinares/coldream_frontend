<template>
  <div class="container">
      <img alt="logoat" src="../assets/logoat.png">
      <h1>Menú Principal</h1>

      <div class="d-grid gap-2 col-6 mx-auto">
  <button class="btn btn-primary" type="button" @click="$router.push('/register')" >Registro de Docentes</button>
  <button class="btn btn-primary" type="button">Asignación de Áreas Académicas</button>
  <button class="btn btn-primary" type="button">Solicitud de Hora Cátedra</button>
  <button class="btn btn-primary" type="button" @click="$router.push('/notas')">Notas</button>
  <button class="btn btn-primary" type="button" @click="$router.push('/')">Cerrar Sesión</button>
</div>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>