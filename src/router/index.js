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
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
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
    }
  ]
});

router.beforeEach((to, from, next) => {

  const rutaProtegida = to.matched.some(record => record.meta.requireAuth)

  if(rutaProtegida && store.state.token === ''){

    next({name: 'login'});

  }else{
    next();
  }


});

export default router;
