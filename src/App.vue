<template>
  <ion-app>
    <router-view>
    </router-view>
    
  </ion-app>
</template>

<script setup >
  import { IonApp, IonRouterOutlet, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
  import { useCapacitorNetwork } from './composables/useCapacitorNetwork';
  import { ref, onBeforeMount, onMounted } from 'vue';
  import { useBackButton, useIonRouter } from '@ionic/vue';
  import { App as CapacitorApp } from '@capacitor/app'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()

  function handleBackButton() {
    if (route.name === 'Home') {
      CapacitorApp.exitApp()
    } else {
      router.back()
    }
}

  onMounted(() => {
    CapacitorApp.addListener('backButton', handleBackButton)
  })

  useCapacitorNetwork();

  const ionInfinite = (event) => {
    generateItems();
    setTimeout(() => event.target.complete(), 500);
  };

  const isInitiallyOnline = ref(navigator.onLine);

  onBeforeMount(() => {
    CapacitorApp.removeAllListeners()
    if (!isInitiallyOnline.value && router.currentRoute.value.path !== '/offline') {
      console.log('Sin conexión en onBeforeMount, redirigiendo a /offline');
      router.replace('/offline');
    }
  });

</script>
