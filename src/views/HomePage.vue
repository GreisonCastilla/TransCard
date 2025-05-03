<script setup >
  
  import Card from '../components/Card.vue'
  import { onMounted, ref } from 'vue';
  import {IonContent, IonInfiniteScroll, IonInfiniteScrollContent} from '@ionic/vue'
  import { getStorage } from '../storage'
  import ScanId from '../components/ScanId.vue';

  const cards = ref([])
  let balance = ref("↑ Consulta tu saldo ↑");
  let aux_id = ref("xxxxxxxxxx")

  onMounted(async ()=>{
    const storage = await getStorage()
    const savedItems = await storage.get('cards')
    if (Array.isArray(savedItems)) {
      cards.value = savedItems
    }
  })

  const savedCards= async () => {
    const storage = await getStorage()
    const currentItems = (await storage.get('cards')) || []
    const updatedItems = [...currentItems, {name:"tarjeta", id:1234}]

    await storage.set('cards', updatedItems)
    cards.value = updatedItems

  }

</script>


<template>
  <ion-content>
    <div class="bg-white w-full flex flex-col text-left ">
      <div class="flex h-24 w-full bg-amber-600 items-end"> 
        <h1 class="text-white ml-4"> <b> Transcard</b></h1>
      </div>

      <ScanId></ScanId>

      <div class="flex flex-col mt-2 pr-4 pl-4 text-gray-600 space-y-1">
        <span class="text-xl "> <b>Saldo</b></span>
        <p><b>Tarjeta: </b>{{ aux_id }}</p>
        <div class="max-w-sm p-2 bg-gray-300 rounded-lg text-center drop-shadow-xl">{{ balance }}</div>
      </div>


      <div class="flex flex-col mt-2 grow p-4 text-gray-600  ">
        <div class="flex">
          <span class="text-xl p-1 grow"> <b>Tarjetas</b></span>

          <div @click="savedCards()" class="p-0.5 text-xl bg-green-500 rounded-full h-8 w-8 text-center ">
            +
          </div>
        </div>
        
        <div class=" flex flex-col space-y-3 mt-3">
          <div  v-for="card in cards" :key="card.id">
            <Card :card="card"></Card>
          </div>
        </div>
        
      </div>
    </div>

    <ion-infinite-scroll>
    </ion-infinite-scroll>
  </ion-content>
  
</template>


<style scoped>

</style>
