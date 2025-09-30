<template>
  <div class="flex flex-col p-4 text-gray-600">
    <span class="text-xl "> <b>Consultar Saldo</b></span>
    <div class="flex-col mt-4 space-y-4">
      <InputText id="id" name="Número de tarjeta" type="number"></InputText>

      <NormalButton @click="consult()" action='
            Consultar

            <svg class="h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            '> </NormalButton>

      <ScanButton @click="ScanConsult()"></ScanButton>
    </div>

    <CameraScanner v-model="text" v-model:open-modal="barcodeModalState" v-model:camera-details="cameraDetails"
      v-model:raw-result="rawResult" />

  </div>

</template>

<script setup>
import CameraScanner from './CameraScanner.vue';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerAndroidScanningLibrary,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerScanOrientation,
  CapacitorBarcodeScannerTypeHint,
} from "@capacitor/barcode-scanner";
import InputText from "./inputs/SpecialText.vue";
import NormalButton from "./buttons/NormalButton.vue";
import ScanButton from "./buttons/ScanButton.vue";
import { text, auxId, balance } from "../composables/globalVariable";
import { ref } from "vue";
import getBalance from "../requests/transcaribeSondapay";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { watch } from 'vue';

const isWeb = Capacitor.getPlatform() === 'web'

let barcodeModalState = ref(false)
let cameraDetails = ref({})
let rawResult = ref({})

const barcodeScannedAudio = new Audio('./assets/barcode-scanned.mp3')

watch(text, async (newText, oldText) => {
  if (newText.length >= 10) {
    id.value = text.value;
    auxId.value = text.value;
    console.log('entro')
    consult()
  }

})

function consult() {
  if (!id.value == "") {
    balance.value = "Consultando...";
    getBalance(id.value).then((result) => {
      if (result != null) {
        auxId.value = id.value;
        text.value = id.value;
        id.value = id.value;
        balance.value = "$" + result;

        toast.success("Saldo consultado", {
          position: "bottom-center",
          toastId: "consulted-balance",
        });
      } else {
        balance.value = "↑ Consulta una tarjeta valida ↑";
        toast.error("No se encontro esta tarjeta", {
          position: "bottom-center",
          toastId: "not-found",
        });
      }
    });
  } else {
    toast.error("Ingrese el número de la tarjeta", {
      position: "bottom-center",
      toastId: "not-id",
    });
  }
}

/*const ScanConsult = async () => {
  console.log(isWeb)
  if (isWeb){
    barcodeModalState = true;
  }else{
    
    await scanBarcode();  
  }
  
  consult();
};*/



const ScanConsult = () => {
  barcodeModalState.value = true
}

const scanBarcode = async () => {
  let result = null;

  try {
    result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL,
      scanInstructions: "Escanea una tarjeta",
      scanButton: false,
      scanText: "Scan",
      cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
      scanOrientation: CapacitorBarcodeScannerScanOrientation.ADAPTIVE,
      android: {
        scanningLibrary: CapacitorBarcodeScannerAndroidScanningLibrary.ZXING,
      },
    });

    text.value = result.ScanResult;
  } catch (error) {
    if (error instanceof Error) {
      id.value = "Error: " + error.message;
    } else {
      id.value = "Error: Unknown error";
    }
  }
};

</script>
