<template>
    <div class="flex flex-col p-4 text-gray-600">
        <span class="text-xl "> <b>Consultar Saldo</b></span>
        <div class="flex mt-4 space-x-0.5">

          <div @click="scanBarcode()"
                class="p-0.5  rounded-lg w-10 transition-all duration-300"
                :class="{'bg-gray-300  scale-80':isActive}"
                @touchstart="activate()"
                @touchend="deactivate()"
                @touchcancel="deactivate()">
            <svg  class="h-9 mr-2 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M8 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V16M21 8V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H16M21 16V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H16M3 12H3.01M7.5 12H7.51M16.5 12H16.51M12 12H12.01M21 12H21.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          

          <InputText id="id" name="Número de tarjeta" type="number"></InputText>
        </div>

        <NormalButton @click="consult()" class="mt-4" action='
        Consultar

        <svg class="h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        '> </NormalButton>

      </div>
</template>

<script setup>
    import { CapacitorBarcodeScanner, CapacitorBarcodeScannerAndroidScanningLibrary, CapacitorBarcodeScannerCameraDirection, CapacitorBarcodeScannerScanOrientation, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
    import InputText from './inputs/SpecialText.vue'
    import NormalButton from './buttons/NormalButton.vue'
    import { text, auxId, balance } from '../composables/globalVariable';
    import { ref } from 'vue';
    import getBalance from '../requests/transcaribeSondapay';
    import { toast } from 'vue3-toastify';
    import "vue3-toastify/dist/index.css";

    function consult(){
        if(!id.value == ""){
            balance.value = "Cargando..."
            getBalance(id.value).then(result=>{
                if(result != null){
                    auxId.value = id.value;
                    text.value = id.value
                    id.value = id.value
                    balance.value="$"+result;
                    toast.success('Saldo consultado',{
                        position:'bottom-center',
                        toastId:"consulted-balance"

                    })
                }else{
                    balance.value = "↑ Consulta una tarjeta valida ↑";
                    toast.error('No se encontro esta tarjeta',{
                        position:'bottom-center',
                        toastId:"not-found"
                    })
                }
                    
            });
        }else{
            toast.error('Ingrese el número de la tarjeta',{
                position:'bottom-center',
                toastId:"not-id"
            })
        }
        
    }

    const scanBarcode = async () => {
        try {
        const result = await CapacitorBarcodeScanner.scanBarcode({
            hint: CapacitorBarcodeScannerTypeHint.ALL,
            scanInstructions: "Escanea una tarjeta",
            scanButton: false,
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

    let isActive = ref(false);

    function activate() {
        isActive.value = true;
    }

    function deactivate() {
        isActive.value = false;
    }
</script>
