<template>
  <ion-app>

    <ion-infinite-scroll @ionInfinite="ionInfinite">
      <ion-infinite-scroll-content>
        <ion-router-outlet />
      </ion-infinite-scroll-content>
      
    </ion-infinite-scroll>

  </ion-app>
</template>

<script setup >
import { IonApp, IonRouterOutlet, IonInfiniteScroll,
  IonInfiniteScrollContent } from '@ionic/vue';

  const ionInfinite = (event) => {
        generateItems();
        setTimeout(() => event.target.complete(), 500);
      };
</script>
