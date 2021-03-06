import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

  import store from "../store/index"

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/notas',
      name: 'notas',
      component: () => import('../views/Notas.vue'),
      meta: {requiereAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/Menu.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/Registro.vue')
    },
    {
      path: '/area',
      name: 'area',
      component: () => import('../views/Area.vue')
    },
    {
      path: '/hora',
      name: 'hora',
      component: () => import('../views/Hora.vue')
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: () => import('../views/Agenda.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {

  const rutaProtegida = to.matched.some(record => record.meta.requireAuth)

  if(rutaProtegida && store.state.token === ''){

    next({name: 'menu'});

  }else{
    next();
  }


});

export default router;
