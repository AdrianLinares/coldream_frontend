<template>
  <div class="container  row mx-auto  col-8  justify-content-center align-content-center ">
    <h1 class="mb-3">Registro de Áreas Académicas y Docentes
</h1>

    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>

    <form @submit.prevent="agregarArea()" v-if="agregar">
      <h3 class="text-center mb-3">Agregar nueva Area y/o Docente</h3>
      <input
        type="text"
        placeholder="Ingrese una Área"
        class="form-control my-2"
        v-model="nota.nombre"
      />
      <input
        type="text"
        placeholder="Ingrese un Docente"
        class="form-control my-2"
        v-model="nota.docente"
      />
      <div class="d-grid my-4">
        
        <button
          class="btn btn-primary btn-md"
          type="submit" 
          >
          Agregar
        </Button>
        <br>
        <button
          class="btn btn-secondary btn-md"
          type="submit" @click="$router.push('/Menu')" 
          >
          Volver
        </button>
      </div>
      
    </form>

    <form @submit.prevent="editarArea(areaEditar)" v-else>
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
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in notas" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.nombre }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.date }}</td>
          <td>
            <b-button
              class="btn-info btn-sm mx-2"
              @click="activarEdicion(item._id)"
              >Actualizar</b-button
            >
            <b-button
              class="btn-secondary btn-sm mx-2"
              @click="eliminarNota(item._id)"
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

      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  computed: {
    ...mapState(['token'])
  },
  created() {
    this.listarNotas();
  },
  methods: {
    alerta(){
      this.mensaje.color = 'danger';
      this.mensaje.texto = 'Probando alerta';
      this.showAlert();
    },
    listarNotas() {
      const config = {
        headers: {
          token: this.token
        }
      }

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

    agregarNota() {
      const config = {
        headers: {
          token: this.token
        }
      }
      
      //console.log(this.nota);
      this.axios
        .post("/nueva-nota", this.nota, config)
        .then((res) => {
          this.notas.push(res.data);
          this.nota.nombre = "";
          this.nota.descripcion = "";
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

    eliminarNota(id) {
      const config = {
        headers: {
          token: this.token
        }
      }

      this.axios
        .delete(`nota/${id}`)
        .then((res) => {
          let index = this.notas.findIndex((item) => item._id === res.data._id);
          this.notas.splice(index, 1);

          this.showAlert();
          this.mensaje.texto = "Notas Eliminada!";
          this.mensaje.color = "danger";
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    activarEdicion(id){
      const config = {
        headers: {
          token: this.token
        }
      }

    this.agregar = false;
    this.axios.get(`nota/${id}`)
      .then(res => {
        this.notaEditar = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
  },

  editarNota(item){
    const config = {
        headers: {
          token: this.token
        }
      }
      
    this.axios.put(`nota/${item._id}`, item)
      .then(res => {
        let index = this.notas.findIndex( itemNota => itemNota._id === this.notaEditar._id);
        this.notas[index].nombre = this.notaEditar.nombre;
        this.notas[index].descripcion = this.notaEditar.descripcion;
        this.notaEditar = {}

        this.showAlert();
        this.mensaje.texto = 'Nota Actualizada'
        this.mensaje.color = 'success'
      })
      .catch(e => {
        console.log(e);
      })
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


