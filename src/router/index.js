import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes= [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: ()=> import('../views/HomePage.vue')
  },
  {
    path:'/offline',
    name:'Offline',
    component:() => import('../views/Offline.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Si la ruta es /offline, permitir siempre
  if (to.path === '/offline') {
    next();
    return;
  }
  
  // Verificar conexión
  if (!navigator.onLine) {
    console.log('Sin conexión al navegar, redirigiendo a /offline');
    next('/offline');
  } else {
    next();
  }
});


export default router
