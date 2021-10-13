<template>
  <div class="container row mx-auto  gap-3 col-4 justify-content-center align-content-center ">
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
        v-model="nota.nombres"
      />
      <input
        type="text"
        placeholder="Apellidos"
        class="form-control my-2"
        v-model="nota.apellidos"
      />
      <input
        type="text"
        placeholder="Telefono"
        class="form-control my-2"
        v-model="nota.telefono"
      />
      <input
        type="text"
        placeholder="Correo"
        class="form-control my-2"
        v-model="nota.correo"
      />
      <input
        type="text"
        placeholder="Ciudad"
        class="form-control my-2"
        v-model="nota.ciudad"
      />
      <input
        type="text"
        placeholder="País"
        class="form-control my-2"
        v-model="nota.pais"
      />
      <div class="d-grid my-4 ">
        <button class="btn btn-success btn-md" type="submit">
          Agregar
        </button>
        <br />
        <button
          class="btn btn-warning btn-md"
          type="submit"
          @click="$router.push('/Menu')"
        >
          Volver
        </button>
      </div>
    </form>

    <form @submit.prevent="editarRegistro(notaEditar)" v-else>
      <h3 class="text-center">Editar Nota</h3>
      <input
        type="text"
        placeholder="Ingrese un Nombre"
        class="form-control my-2"
        v-model="notaEditar.nombre"
      />
      <input
        type="text"
        placeholder="Ingrese una descripcion"
        class="form-control my-2"
        v-model="notaEditar.descripcion"
      />
      <b-button class="btn-lg btn-block btn-warning mx-2 my-2" type="submit"
        >Editar</b-button
      >
      <b-button class="btn-lg btn-block mx-2 my-2" @click="agregar = true"
        >Cancelar</b-button
      >
    </form>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
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
        <tr v-for="(item, index) in notas" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.nombres }}</td>
          <td>{{ item.apellidos }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.correo }}</td>
          <td>{{ item.ciudad }}</td>
          <td>{{ item.pais }}</td>
          <td>
            <b-button
              class="btn-warning btn-sm mx-2"
              @click="activarEdicion(item._id)"
              >Actualizar</b-button
            >
            <b-button
              class="btn-danger btn-sm mx-2"
              @click="eliminarRegistro(item._id)"
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
      notas: [],
      nota: { nombre: "", descripcion: "" },
      agregar: true,
      notaEditar: {},

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
        .get("/nota", config)
        .then((response) => {
          // console.log(response.data)
          this.notas = response.data;
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
          this.registros.nombre = "";
          this.registro.descripcion = "";
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
        .delete(`nota/${id}`)
        .then((res) => {
          let index = this.notas.findIndex((item) => item._id === res.data._id);
          this.registros.splice(index, 1);

          this.showAlert();
          this.mensaje.texto = "Notas Eliminada!";
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
        .get(`nota/${id}`)
        .then((res) => {
          this.registroEditar = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    editarNota(item) {
      const config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .put(`nota/${item._id}`, item)
        .then((res) => {
          let index = this.notas.findIndex(
            (itemNota) => itemNota._id === this.registroEditar._id
          );
          this.registro[index].nombre = this.notaEditar.nombre;
          this.registros[index].descripcion = this.notaEditar.descripcion;
          this.registroEditar = {};

          this.showAlert();
          this.mensaje.texto = "Rgistro Actualizado";
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
