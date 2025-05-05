<template >
    <div v-show="popup" @click="changePopup" class="text-gray-600  fixed grid place-content-center top-0 left-0  h-full w-full bg-gray-600/50 ">

        <div @click.stop class=" flex flex-col rounded-lg bg-white relative space-y-2 w-[90vw] md:w-sm p-5 shadow-2xl opacity-100 ">
            <div class=" flex w-full place-content-between align-middle">
                <label class="text-xl text-left "><b>Registrar tarjeta</b></label>
                <div @click="changePopup()" class="text-xl w-7 h-7 text-white bg-red-500 rounded-full transition-all duration-300"
                    :class="{'bg-red-800  scale-80':isActive}"
                    @touchstart="activate()"
                    @touchend="deactivate()"
                    @touchcancel="deactivate()"
                >
                    &times;
                </div>
            </div>
            
            <div class="flex flex-col space-y-10 mt-3 mb-3">
                <NormalInput name="Nombre" id="name_2"></NormalInput>
                <div class="flex">
                    <div @click.stop="scanBarcode()"
                        class="p-0.5  rounded-lg w-10 transition-all duration-300"
                        :class="{'bg-gray-300  scale-80':isActive}"
                        @touchstart="activate()"
                        @touchend="deactivate()"
                        @touchcancel="deactivate()">
                        <svg  class="h-9 mr-2 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M8 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V16M21 8V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H16M21 16V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H16M3 12H3.01M7.5 12H7.51M16.5 12H16.51M12 12H12.01M21 12H21.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <SpecialText2 name="Número de tarjeta" id="id_2"></SpecialText2>
                </div>
                
            </div>
            
            <NormalButton @click.stop="savedCards()" class="mt-3" action="Registrar"></NormalButton>
        </div>
    </div>
</template>

<script async setup>
    import { popup } from '../../composables/globalVariable';
    import NormalInput from '../inputs/NormalInput.vue';
    import NormalButton from '../buttons/NormalButton.vue';
    import { cards, text2 } from '../../composables/globalVariable';
    import { getStorage } from '../../storage'
    import getBalance from '../../requests/transcaribeSondapay';
    import { toast } from 'vue3-toastify';
    import "vue3-toastify/dist/index.css";
    import { ref } from 'vue';
    import SpecialText2 from "../inputs/SpecialText2.vue"
    import { CapacitorBarcodeScanner, CapacitorBarcodeScannerAndroidScanningLibrary, CapacitorBarcodeScannerCameraDirection, CapacitorBarcodeScannerScanOrientation, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

    const changePopup = ()=>{
        popup.value = !popup.value
    }

    const savedCards = async () => {
        
        if(!id_2.value =="" && !name_2.value==""){
            getBalance(id_2.value).then(result =>{
                if(result != null){
                    save()
                }else{
                    toast.error('No se encontro esta tarjeta',{
                        position:'bottom-center'
                    })
                }

            })
        }else{
            toast.error('Complete todos los campos',{
                position:'bottom-center'
            })
        }
        
    }

    const save = async () => {
        const storage = await getStorage()
        const currentItems = (await storage.get('cards')) || []

        if(currentItems.some(element => element.id ===id_2.value)){
            toast.error('Esta tarjeta ya se encuentra registrada',{
                position:'bottom-center'
            })
            return
        }

        const updatedItems = [...currentItems, {name:name_2.value, id:id_2.value}]

        await storage.set('cards', updatedItems)
        cards.value = updatedItems

        toast.success('La tarjeta se registro correctamente',{
                    position:'bottom-center'
                })
    }

    let isActive = ref(false);

    function activate() {
        isActive.value = true;
    }

    function deactivate() {
        isActive.value = false;
    }

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
        text2.value = result.ScanResult;
        id_2.value = result.ScanResult
        } catch (error) {
        if (error instanceof Error) {
            
        } else {
            
        }
        }
    };
</script>
