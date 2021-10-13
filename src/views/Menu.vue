<template>
  <div class="container mx-auto justify-content-center align-content-center">


    <div class="d-grid gap-3 col-4 mx-auto mb-5 mx-auto justify-content-center align-content-center">
    <img alt="logoat" src="../assets/logoat.png">
    <h1 class="mb-4">Menú Principal</h1>
    <button class="btn btn-dark" type="button" @click="$router.push('/registro')" >Registro de Docentes</button>
    <button class="btn btn-dark" type="button" @click="$router.push('/area')">Asignación de Áreas Académicas</button>
    <button class="btn btn-dark" type="button" @click="$router.push('/hora')">Solicitud de Hora Cátedra</button>
    <button class="btn btn-dark" type="button" @click="$router.push('/notas')">Notas</button>
    <button class="btn btn-danger" type="button" @click="$router.push('/')">Cerrar Sesión</button>
  </div>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>