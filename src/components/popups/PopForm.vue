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
                <NormalInput name="Número de tarjeta" id="id_2"></NormalInput>
            </div>
            
            <NormalButton @click.stop="savedCards()" class="mt-3" action="Registrar"></NormalButton>
        </div>
    </div>
</template>

<script async setup>
    import { popup } from '../../composables/globalVariable';
    import NormalInput from '../inputs/NormalInput.vue';
    import NormalButton from '../buttons/NormalButton.vue';
    import { cards } from '../../composables/globalVariable';
    import { getStorage } from '../../storage'
    import getBalance from '../../requests/transcaribeSondapay';
    import { toast } from 'vue3-toastify';
    import "vue3-toastify/dist/index.css";
    import { ref } from 'vue';
    

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
</script>
