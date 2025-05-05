<template>
  <ion-app>
    <router-view>
      
    </router-view>
    

  </ion-app>
</template>

<script setup >
  import { IonApp, IonRouterOutlet, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
  import { useCapacitorNetwork } from './composables/useCapacitorNetwork';
  import { ref, onBeforeMount } from 'vue';
  useCapacitorNetwork();

  const ionInfinite = (event) => {
    generateItems();
    setTimeout(() => event.target.complete(), 500);
  };

  const isInitiallyOnline = ref(navigator.onLine);

  onBeforeMount(() => {
    if (!isInitiallyOnline.value && router.currentRoute.value.path !== '/offline') {
      console.log('Sin conexión en onBeforeMount, redirigiendo a /offline');
      router.replace('/offline');
    }
  });

</script>
