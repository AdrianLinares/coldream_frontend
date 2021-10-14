<template>
  <div class="container  mx-auto mt-0 justify-content-center align-content-center" >

  
    <div class="d-grid gap-1 m-4 col-5 mx-auto justify-content-center align-content-center ">
      <img alt="logoat" src="../assets/logoat.png">
      <h1 class="m-4">Inicio de sesión</h1>
      <form @submit.prevent="login">
        <input
          type="email"
          placeholder="Email"
          class="form-control my-2"
          v-model="usuario.email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          class="form-control my-2"
          v-model="usuario.pass"
        />

        <div class="d-grid my-2 ">
          <button
            class="btn btn-primary btn-md"
            type="submit" 
            >
            Acceder
          </button>
          <br>
          <button
            class="btn btn-primary btn-md"
            type="submit" 
            >
            Registrarse
          </button>
          <br>
          <button
            class="btn btn-secondary btn-md"
            type="submit" @click="$router.push('/')"
            >
            Volver
          </button>
        </div>
      </form>
      <div v-if="mensaje != ''">
        <p>{{ mensaje }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";


export default {
  data() {
    return {
      usuario: { email: "totaladmin@example.com", pass: "66246" },
      mensaje: "",
    };
  },
  methods: {
    ...mapActions(["guardarUsuario"]),
    login() {
      // console.log(this.usuario);
      this.axios
        .post("/login", this.usuario)
        .then((res) => {
          console.log(res.data);
          const token = res.data.token;
          this.guardarUsuario(token);
        })
        .catch((e) => {
          console.log(e.response);
          this.mensaje = e.response.data.mensaje;
        });
    },
  },
};
</script>

