<template>
  <div class="container  row mx-auto  col-5  justify-content-center align-content-center ">

      <div class="d-grid gap-1 m-4 col-5 mx-auto justify-content-center align-content-center ">
          <img alt="logoat" src="../assets/logoat.png">

      </div>
    <h1 class="mb-3">Solicitud de Horas Cátedra</h1>
   
    <form @submit.prevent="agregarNota()" v-if="agregar">
      <h3 class="text-center mb-3">Seleccionar Átea y Docente</h3>
      <!-- <input
        type="text"
        placeholder="Ingrese un Nombre"
        class="form-control my-2"
        v-model="nota.nombre"
      /> -->
      <select class="form-select my-2" aria-label="Default select example">
  <option selected>Área Académica</option>
  <option value="1">Ciencias naturales y educación ambiental</option>
  <option value="2">Ciencias sociales, historia, geografía, constitución política y democracia</option>
  <option value="3">Educación artística y cultural</option>
  <option value="4">Educación ética y en valores humanos</option>
  <option value="5">Educación física, recreación y deportes</option>
  <option value="6">Humanidades, lengua castellana e idiomas extranjeros</option>
  <option value="7">Matemáticas</option>
  <option value="8">Tecnología e informática</option>
</select>
      <!-- <input
        type="text"
        placeholder="Ingrese una descripcion"
        class="form-control my-2"
        v-model="nota.descripcion"
      /> -->
      <select class="form-select my-2" aria-label="Default select example">
  <option selected>Docente</option>
  <option value="1">Ximena</option>
  <option value="2">Carlos</option>
  <option value="3">Marcela</option>
  <option value="4">Sergio</option>
</select>
      <div class="d-grid my-4">
        
        <button
          class="btn btn-primary btn-md"
          type="submit" @click="$router.push('/Agenda')"
          >
          Consultar Agenda
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

    <form @submit.prevent="editarNota(notaEditar)" v-else>
      <h3 class="text-center">Editar Nota</h3>
      <!-- <input
        type="text"
        placeholder="Ingrese un Nombre"
        class="form-control my-2"
        v-model="nota.nombre"
      /> -->
      <select class="form-select my-2" aria-label="Default select example">
  <option selected>Área Académica</option>
  <option value="1">Ciencias naturales y educación ambiental</option>
  <option value="2">Ciencias sociales, historia, geografía, constitución política y democracia</option>
  <option value="3">Educación artística y cultural</option>
  <option value="4">Educación ética y en valores humanos</option>
  <option value="5">Educación física, recreación y deportes</option>
  <option value="6">Humanidades, lengua castellana e idiomas extranjeros</option>
  <option value="7">Matemáticas</option>
  <option value="8">Tecnología e informática</option>
</select>
      <!-- <input
        type="text"
        placeholder="Ingrese una descripcion"
        class="form-control my-2"
        v-model="nota.descripcion"
      /> -->
      <select class="form-select my-2" aria-label="Default select example">
  <option selected>Docente</option>
  <option value="1">Ximena</option>
  <option value="2">Carlos</option>
  <option value="3">Marcela</option>
  <option value="4">Sergio</option>
</select>
    </form>
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


