<template>
  <div class="container">
    <img alt="logoat" src="../assets/logoat.png">
    <h1>Inicio de sesión</h1>
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

      <div class="d-grid my-4">
        <button
          class="btn btn-primary btn-lg"
          type="submit" 
          >
          Acceder
        </button>
        <br>
        <button
          class="btn btn-info btn-lg"
          type="submit" 
          >
          Registrarse
        </button>
        <br>
        <button
          class="btn btn-secondary btn-lg"
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
