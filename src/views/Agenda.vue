<template>
  <div class="container  row mx-auto  col-8  justify-content-center align-content-center ">
    <h1 class="mb-3">Agenda Docente</h1>

    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>

    <form @submit.prevent="agregarAgenda()" v-if="agregar">
      <h3 class="text-center mb-3">Agregar nueva entrada</h3>
      <input
        type="text"
        placeholder="Fundación"
        class="form-control my-2"
        v-model="agenda.nombre"
      />
      <input
        type="text"
        placeholder="Ingrese Fecha (DD/MM/AAAA)"
        class="form-control my-2"
        v-model="agenda.fecha"
      />
      <input
        type="text"
        placeholder="Ingrese Horario (07:00-17:00)"
        class="form-control my-2"
        v-model="agenda.hora"
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

    <form @submit.prevent="editarAgenda(agendaEditar)" v-else>
      <h3 class="text-center">Editar Nota</h3>
      <input
        type="text"
        placeholder="Fundación"
        class="form-control my-2"
        v-model="agenda.nombre"
      />
      <input
        type="text"
        placeholder="Ingrese Fecha (DD/MM/AAAA)"
        class="form-control my-2"
        v-model="agenda.fecha"
      />
      <input
        type="text"
        placeholder="Ingrese Horario (07:00-17:00)"
        class="form-control my-2"
        v-model="agenda.hora"
      />
      <b-button class="btn-lg btn-block btn-info mx-2 my-2" type="submit"
        >Editar</b-button
      >
      <b-button class="btn-lg btn-block mx-2 my-2" @click="agregar = true"
        >Cancelar</b-button
      >
    </form>

    <table class="table">
      <thead>
        <tr>          
          <th scope="col">Fundación</th>
          <th scope="col">Fecha</th>
          <th scope="col">Horario</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in agendas" :key="index">          
          <td>{{ item.nombre }}</td>
          <td>{{ item.fecha }}</td>
          <td>{{ item.hora }}</td>
          <td>
            <b-button
              class="btn-info btn-sm mx-2 my-1"
              @click="activarEdicion(item._id)"
              >Actualizar</b-button
            >
            <b-button
              class="btn-secondary btn-sm mx-2 my-1"
              @click="eliminarAgenda(item._id)"
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
      agendas: [],
      agenda: { nombre: "", fecha: "", hora: "" },
      agregar: true,
      agendaEditar: {},

      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  computed: {
    ...mapState(['token'])
  },
  created() {
    this.listarAgendas();
  },
  methods: {
    alerta(){
      this.mensaje.color = 'danger';
      this.mensaje.texto = 'Probando alerta';
      this.showAlert();
    },
    listarAgendas() {
      const config = {
        headers: {
          token: this.token
        }
      }

      this.axios
        .get("/agenda", config)
        .then((response) => {
          // console.log(response.data)
          this.agendas = response.data;
        })
        .catch((e) => {
          console.log("error" + e);
        });
    },

    agregarAgenda() {
      const config = {
        headers: {
          token: this.token
        }
      }
      
      //console.log(this.nota);
      this.axios
        .post("/nueva-agenda", this.agenda, config)
        .then((res) => {
          this.agendas.push(res.data);
          this.agendas.nombre = "";
          this.agenda.fecha = "";
          this.agenda.hora = "";
          this.mensaje.color = "success";
          this.mensaje.texto = "Agenda Agregada!";
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

    eliminarAgenda(id) {
      const config = {
        headers: {
          token: this.token
        }
      }

      this.axios
        .delete(`agenda/${id}`)
        .then((res) => {
          let index = this.agendas.findIndex((item) => item._id === res.data._id);
          this.agendas.splice(index, 1);

          this.showAlert();
          this.mensaje.texto = "Agenda Eliminada!";
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
    this.axios.get(`agenda/${id}`)
      .then(res => {
        this.agendaEditar = res.data;
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
        let index = this.agendas.findIndex( itemAgenda => itemAgenda._id === this.agendaEditar._id);
        this.agendas[index].nombre = this.agendaEditar.nombre;
        this.agendas[index].fecha = this.agendaEditar.fecha;
        this.agendas[index].hora = this.agendaEditar.hora;
        this.agendasEditar = {}

        this.showAlert();
        this.mensaje.texto = 'Agenda Actualizada'
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


