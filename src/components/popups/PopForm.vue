<template >
    <div v-show="popup" @click="changePopup" class="text-gray-600  fixed grid place-content-center top-0 left-0  h-full w-full bg-gray-600/50 ">

        <div @click.stop class=" flex flex-col rounded-lg bg-white relative space-y-2 w-[90vw] md:w-sm p-5 shadow-2xl opacity-100 ">
            <div class=" flex w-full place-content-between align-middle">
                <p class="text-xl text-left "><b>Registrar tarjeta</b></p>
                <XButton @click="changePopup"></XButton>
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
                    <SpecialText2 name="Número de tarjeta" id="id_2" type="number"></SpecialText2>
                </div>
                
            </div>
            
            <NormalButton @click.stop="savedCards()" class="mt-3" action='Registrar
            
            <svg class="h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            '></NormalButton>
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
    import XButton from '../buttons/XButton.vue';

    const changePopup = ()=>{
        popup.value = !popup.value
    }

    const savedCards = async () => {
        
        if(!id_2.value =="" && !name_2.value==""){
            getBalance(id_2.value).then(result =>{
                if(result != null){
                    save()
                }else{
                    toast.error('No se encontró esta tarjeta',{
                        position:'bottom-center',
                        toastId:"not-found-card"
                    })
                }

            })
        }else{

            toast.error('Complete todos los campos',{
                position:'bottom-center',
                toastId:"field-missing"
            })
        }
        
    }

    const save = async () => {
        const storage = await getStorage()
        const currentItems = (await storage.get('cards')) || []

        if(currentItems.some(element => element.id ===id_2.value)){
            
            toast.error('Esta tarjeta ya se encuentra registrada',{
                position:'bottom-center',
                toastId:"already-save"
            })
            return
        }

        const updatedItems = [...currentItems, {name:name_2.value, id:id_2.value}]

        await storage.set('cards', updatedItems)
        cards.value = updatedItems

        toast.success('La tarjeta se registró correctamente',{
            position:'bottom-center',
            toastId:"toast-save"
        })
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
        text2.value = result.ScanResult;
        id_2.value = result.ScanResult
        } catch (error) {
            console.log(error)
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
