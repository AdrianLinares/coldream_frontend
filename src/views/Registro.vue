<template>
  <div class="container row mx-auto  gap-3 col-12 justify-content-center align-content-center">
    <h1 class="mb-3 ">Registro de Docentes</h1>

    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>

    <form @submit.prevent="agregarRegistro()" v-if="agregar">
      <h3 class="text-center mb-3">Agregar nuevo registro</h3>
      <input
        type="text"
        placeholder="Nombres"
        class="form-control my-2"
        v-model="registro.nombres"
      />
      <input
        type="text"
        placeholder="Apellidos"
        class="form-control my-2"
        v-model="registro.apellidos"
      />
      <input
        type="text"
        placeholder="Telefono"
        class="form-control my-2"
        v-model="registro.telefono"
      />
      <input
        type="text"
        placeholder="Correo"
        class="form-control my-2"
        v-model="registro.correo"
      />
      <input
        type="text"
        placeholder="Ciudad"
        class="form-control my-2"
        v-model="registro.ciudad"
      />
      <input
        type="text"
        placeholder="País"
        class="form-control my-2"
        v-model="registro.pais"
      />
      <div class="d-grid my-4 ">
        <button class="btn btn-primary btn-md" type="submit">
          Agregar
        </button>
        <br />
        <button
          class="btn btn-secondary btn-md"
          type="submit"
          @click="$router.push('/Menu')"
        >
          Volver
        </button>
      </div>
    </form>

    <form @submit.prevent="editarRegistro(registroEditar)" v-else>
      <h3 class="text-center">Editar Registro</h3>
      <input
        type="text"
        placeholder="Nombres"
        class="form-control my-2"
        v-model="registro.nombres"
      />
      <input
        type="text"
        placeholder="Apellidos"
        class="form-control my-2"
        v-model="registro.apellidos"
      />
      <input
        type="text"
        placeholder="Telefono"
        class="form-control my-2"
        v-model="registro.telefono"
      />
      <input
        type="text"
        placeholder="Correo"
        class="form-control my-2"
        v-model="registro.correo"
      />
      <input
        type="text"
        placeholder="Ciudad"
        class="form-control my-2"
        v-model="registro.ciudad"
      />
      <input
        type="text"
        placeholder="País"
        class="form-control my-2"
        v-model="registro.pais"
      />
      <b-button class="btn-lg btn-block btn-info mx-2 my-2" type="submit"
        >Editar</b-button
      >
      <b-button class="btn-lg btn-block btn-secondary mx-2 my-2" @click="agregar = true"
        >Cancelar</b-button
      >
    </form>

    <table class="table">
      <thead>
        <tr>
          
          <th scope="col">Nombres</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Telefono</th>
          <th scope="col">Correo</th>
          <th scope="col">Ciudad</th>
          <th scope="col">País</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reg, index) in registro" :key="index">
          
          <td>{{ reg.nombres }}</td>
          <td>{{ reg.apellidos }}</td>
          <td>{{ reg.telefono }}</td>
          <td>{{ reg.correo }}</td>
          <td>{{ reg.ciudad }}</td>
          <td>{{ reg.pais }}</td>
          <td>
            <b-button
              class="btn-info btn-sm mx-2"
              @click="activarEdicion(reg._id)"
              >Actualizar</b-button
            >
            <b-button
              class="btn-secondary btn-sm mx-2"
              @click="eliminarRegistro(reg._id)"
              >Eliminar</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      
      registro: [],
      registro: {
        nombres: "",
        apellidos: "",
        telefono: "",
        correo: "",
        ciudad: "",
        pais: "",
      },
      agregar: true,
      registroEditar: {},

      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  created() {
    this.listarRegistros();
  },
  methods: {
    alerta() {
      this.mensaje.color = "danger";
      this.mensaje.texto = "Probando alerta";
      this.showAlert();
    },
    listarRegistros() {
      const config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .get("/registro", config)
        .then((response) => {
          // console.log(response.data)
          this.registro = response.data;
        })
        .catch((e) => {
          console.log("error" + e);
        });
    },

    agregarRegistro() {
      const config = {
        headers: {
          token: this.token,
        },
      };

      //console.log(this.nota);
      this.axios
        .post("/nuevo-registro", this.registro, config)
        .then((res) => {
          this.registros.push(res.data);
          this.registro.nombres = "";
          this.registro.apellidos = "";
          this.registro.telefono = "";
          this.registro.correo = "";
          this.registro.ciudad = "";
          this.registro.pais = "";
          this.mensaje.color = "success";
          this.mensaje.texto = "Nota Agregada!";
          this.showAlert();
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response) {
            this.mensaje.texto = e.response;
          } else {
            this.mensaje.texto = "Error de sistema!";
          }
          this.mensaje.color = "danger";

          this.showAlert();
        });
    },

    eliminarRegistro(id) {
      const config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .delete(`/registro/${id}`)
        .then((res) => {
          let index = this.registros.findIndex((reg) => reg._id === res.data._id);
          this.registros.splice(index, 1);

          this.showAlert();
          this.mensaje.texto = "Registro Eliminado!";
          this.mensaje.color = "danger";
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    activarEdicion(id) {
      const config = {
        headers: {
          token: this.token,
        },
      };

      this.agregar = false;
      this.axios
        .get(`/registro/${id}`)
        .then((res) => {
          this.registroEditar = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    editarRegistro(reg) {
      const config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .put(`/registro/${reg._id}`, reg)
        .then((res) => {
          let index = this.registros.findIndex(
            (itemRegistro) => itemRegistro._id === this.registroEditar._id
          );
          this.registro[index].nombres = this.registroEditar.nombres;
          this.registros[index].apellidos = this.registroEditar.apellidos;
          this.registros[index].telefono = this.registroEditar.telefono;
          this.registros[index].correo = this.registroEditar.correo;
          this.registros[index].ciudad = this.registroEditar.ciudad;
          this.registros[index].pais = this.registroEditar.pais;
          this.registroEditar = {};

          this.showAlert();
          this.mensaje.texto = "Registro Actualizado";
          this.mensaje.color = "success";
        })
        .catch((e) => {
          console.log(e);
        });
      this.agregar = true;
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style></style>
