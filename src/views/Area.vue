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
        v-model="area.area"
      />
      <input
        type="text"
        placeholder="Ingrese un Docente"
        class="form-control my-2"
        v-model="area.docente"
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
        v-model="areaEditar.area"
      />
      <input
        type="text"
        placeholder="Ingrese una descripcion"
        class="form-control my-2"
        v-model="areaEditar.docente"
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
          <th scope="col">Área Académica</th>
          <th scope="col">Docente</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in areas" :key="index">
          <td>{{ item.area }}</td>
          <td>{{ item.docente }}</td>
          <td>
            <b-button
              class="btn-info btn-sm mx-2"
              @click="activarEdicion(item._id)"
              >Actualizar</b-button
            >
            <b-button
              class="btn-secondary btn-sm mx-2"
              @click="eliminarArea(item._id)"
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
      areas: [],
      area: { area: "", docente: "" },
      agregar: true,
      areaEditar: {},

      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  computed: {
    ...mapState(['token'])
  },
  created() {
    this.listarAreas();
  },
  methods: {
    alerta(){
      this.mensaje.color = 'danger';
      this.mensaje.texto = 'Probando alerta';
      this.showAlert();
    },
    listarAreas() {
      const config = {
        headers: {
          token: this.token
        }
      }

      this.axios
        .get("/area", config)
        .then((response) => {
          // console.log(response.data)
          this.areas = response.data;
        })
        .catch((e) => {
          console.log("error" + e);
        });
    },

    agregarArea() {
      const config = {
        headers: {
          token: this.token
        }
      }
      
      //console.log(this.nota);
      this.axios
        .post("/nueva-area", this.area, config)
        .then((res) => {
          this.areas.push(res.data);
          this.area.area = "";
          this.area.docente = "";
          this.mensaje.color = "success";
          this.mensaje.texto = "Area Agregada!";
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

    eliminarArea(id) {
      const config = {
        headers: {
          token: this.token
        }
      }

      this.axios
        .delete(`area/${id}`)
        .then((res) => {
          let index = this.areas.findIndex((item) => item._id === res.data._id);
          this.areas.splice(index, 1);

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
    this.axios.get(`area/${id}`)
      .then(res => {
        this.areaEditar = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
  },

  editarArea(item){
    const config = {
        headers: {
          token: this.token
        }
      }
      
    this.axios.put(`area/${item._id}`, item)
      .then(res => {
        let index = this.notas.findIndex( itemArea => itemArea._id === this.areaEditar._id);
        this.areas[index].area = this.areaEditar.nombre;
        this.areas[index].descripcion = this.areaEditar.descripcion;
        this.areaEditar = {}

        this.showAlert();
        this.mensaje.texto = 'Área Actualizada'
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


