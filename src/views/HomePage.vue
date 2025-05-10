<script setup >
import Card from "../components/Card.vue";
import { ref, onMounted, watchEffect } from "vue";
import {
  IonBackButton,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { getStorage } from "../storage";
import ScanId from "../components/ScanId.vue";
import { auxId, balance, popup, cards } from "../composables/globalVariable";
import PopForm from "../components/popups/PopForm.vue";

onMounted(async () => {
  const storage = await getStorage();
  const savedItems = await storage.get("cards");
  if (Array.isArray(savedItems)) {
    cards.value = savedItems;
  }
});

let isActive = ref(false);

function activate() {
  isActive.value = true;
}

function deactivate() {
  isActive.value = false;
}

const changePopup = () => {
  popup.value = !popup.value;
};

const handleRefresh = (event) => {
  setTimeout(() => {
    location.reload();
    event.target.complete();
  }, 2000);
};

const visibleItems = ref([]);
watchEffect(async () => {
  visibleItems.value = [];
  for (const item of cards.value) {
    visibleItems.value.push(item);
    await new Promise((resolve) => setTimeout(resolve, 200)); // delay controlado
  }
});
</script>


<template>
  <ion-content>
    <ion-refresher
      class="fill-white "
      slot="fixed"
      @ionRefresh="handleRefresh($event)"
    >
      <ion-refresher-content refreshing-spinner="circles">
      </ion-refresher-content>
    </ion-refresher>

    <div class="bg-white w-full flex flex-col text-left ">
      <div class="flex h-24 w-full bg-amber-600 items-end">
        <h1 class="text-white ml-4"> <b> Transcard</b></h1>
      </div>

      <ScanId></ScanId>

      <div class="flex flex-col mt-2 pr-4 pl-4 text-gray-600 space-y-1">
        <span class="text-xl "> <b>Saldo</b></span>
        <p><b>Tarjeta: </b>{{ auxId }}</p>
        <div class=" p-2 bg-gray-300 rounded-lg text-center drop-shadow-xl">{{ balance }}</div>
      </div>

      <div class="flex flex-col mt-2 grow p-4 text-gray-600  ">
        <div class="flex">
          <span class="text-xl p-1 grow"> <b>Tarjetas</b></span>

          <div
            @click="changePopup()"
            class=" text-white p-0.5 text-xl bg-green-500 rounded-full h-8 w-8 text-center transition-all duration-500 "
            :class="{'bg-green-800  scale-80':isActive}"
            @touchstart="activate()"
            @touchend="deactivate()"
            @touchcancel="deactivate()"
          >
            +
          </div>
        </div>

        <div v-if="cards.length==0">
          <div class=" mt-3 flex w-full h-30 p-4 bg-gray-300 rounded-lg place-items-center place-content-center">

            <p class=" drop-shadow-xl text-gray-600 ">No hay tarjetas registradas</p>
          </div>

        </div>

        <div
          v-else
          class=" flex flex-col md:flex-row md:space-x-3 md:flex-wrap space-y-3 mt-3"
        >

          <div
            v-for="card in visibleItems"
            :key="card.id"
          >
            <Card :card="card"></Card>

          </div>

        </div>

      </div>

    </div>
    <PopForm v-show="popup"></PopForm>
    <ion-infinite-scroll>
    </ion-infinite-scroll>
  </ion-content>

</template>


<style >
</style>
