<script setup >

  import InputText from '../components/InputText.vue'
  import NormalButton from '../components/NormalButton.vue'
  import Card from '../components/Card.vue'
  import { ref } from 'vue';
  import {IonContent, IonInfiniteScroll, IonInfiniteScrollContent} from '@ionic/vue'
  import { text } from '../composables/useId';
  import { CapacitorBarcodeScanner, CapacitorBarcodeScannerAndroidScanningLibrary, CapacitorBarcodeScannerCameraDirection, CapacitorBarcodeScannerScanOrientation, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

  let balance = ref("↑ Consulta tu saldo ↑");
  let aux_id = ref("xxxxxxxxxx")
  let cards =[
    {
      name:"Nombre",
      id:120938
    }
  ]

  const scanBarcode = async () => {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
        scanInstructions: "Please scan a barcode",
        scanButton: true,
        scanText: "Scan",
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
        scanOrientation: CapacitorBarcodeScannerScanOrientation.ADAPTIVE,
        android: {
          scanningLibrary: CapacitorBarcodeScannerAndroidScanningLibrary.ZXING
        }
      });
      text.value = result.ScanResult;
      id.value= result.ScanResult;
      aux_id.value = id.value;
    } catch (error) {
      if (error instanceof Error) {
        id.value= "Error: " + error.message;
      } else {
        id.value= "Error: Unknown error";
      }
    }
  };


  function consult(){
    
    
    balance.value = 3400;
    text.value=12341
    id.value = 12341
    aux_id.value = id.value;
  }

</script>


<template>
  <ion-content>
    <div class="bg-white w-full flex flex-col text-left ">
      <div class="flex h-20 w-full bg-amber-600 items-end"> 
        <h1 class="text-white ml-4"> <b> Transcard {{ text.value }}</b></h1>
      </div>

      <div class="flex flex-col p-4 text-gray-600">
        <span class="text-xl "> <b>Consultar Saldo</b></span>
        <div class="flex mt-4">

          <div @click="scanBarcode()">
            <svg  class="h-9 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M8 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V16M21 8V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H16M21 16V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H16M3 12H3.01M7.5 12H7.51M16.5 12H16.51M12 12H12.01M21 12H21.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          

          <InputText id="id" name="Número de tarjeta" type="number"></InputText>
        </div>

        <NormalButton @click="consult()" class="mt-4" action="Consultar"></NormalButton>
      </div>

      <div class="flex flex-col mt-2 pr-4 pl-4 text-gray-600 space-y-1">
        <span class="text-xl "> <b>Saldo</b></span>
        <p><b>Tarjeta: </b>{{ aux_id }}</p>
        <div class="max-w-sm p-2 bg-gray-300 rounded-lg text-center drop-shadow-xl">{{ balance }}</div>
      </div>


      <div class="flex flex-col mt-2 grow p-4 text-gray-600  ">
        <div class="flex">
          <span class="text-xl p-1 grow"> <b>Tarjetas</b></span>

          <div class="p-0.5 text-xl bg-green-500 rounded-full h-8 w-8 text-center ">
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
