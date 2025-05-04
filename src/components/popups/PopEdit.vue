<template>
    <div  @click="changePopup" class=" text-gray-600  fixed grid place-content-center top-0 left-0  h-full w-full bg-gray-600/50 ">

        <div @click.stop class="popedit flex flex-col rounded-lg bg-white relative space-y-2 w-[90vw] md:w-sm p-5 shadow-2xl opacity-100 ">
            <div class=" flex w-full place-content-between align-middle">
                <label class="text-xl text-left "><b>Editar tarjeta</b></label>
                <div @click="changePopup()" class="text-xl h-7 w-7 text-center text-white bg-red-500 rounded-full transition-all duration-300"
                    :class="{'bg-red-800  scale-80':isActive}"
                    @touchstart="activate()"
                    @touchend="deactivate()"
                    @touchcancel="deactivate()"
                >
                    &times;
                </div>
            </div>

            <div class="flex flex-col space-y-3 mt-6 mb-3">
                <NormalInput :aux="card.name" name="Nombre" id="name_3"></NormalInput>
                <p>cod. {{ card.id }}</p>
            </div>

            <NormalButton @click.stop="edit()" class="mt-3" action="Guardar cambios"></NormalButton>
            <BadButton @click="delCard()" action="Eliminar"></BadButton>
        </div>
        <popConfirm :card="card" v-show="popup3"></popConfirm>
    </div>
</template>

<script setup>
    import popConfirm from './popConfirm.vue';
    import NormalInput from '../inputs/NormalInput.vue';
    import NormalButton from '../buttons/NormalButton.vue';
    import BadButton from '../buttons/BadButton.vue';
    import { ref } from 'vue';
    import { cards, deleteCard, popup2, popup3 } from '../../composables/globalVariable';
    import { getStorage } from '../../storage'
    import { toast } from 'vue3-toastify';
    import "vue3-toastify/dist/index.css";

    const changePopup = ()=>{
        popup2.value = !popup2.value
    }

    const edit =()=>{
        let item = cards.value.find(obj => obj.id === props.card.id);
        if (item) {

            if(name_3.value === props.card.name){
                
                toast.error('No ha hecho ningún cambio',{
                    position:'bottom-center'
                })

            }else{
                item.name = name_3.value;
                console.log(cards.value)
                savedCards()
            }
            
        }
    }

    async function delCard() {
        popup3.value = true;

        await popup3Change()

        if(deleteCard.value){
            const storage = await getStorage()
            cards.value = cards.value.filter(u => u.id !== props.card.id);

            storage.set('cards', JSON.parse(JSON.stringify(cards.value)));
            toast.success('la tarjeta se elimino correctamente',{
                position:'bottom-center'
            })
            popup2.value = false;
        }
        
    }

    function popup3Change() {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
            if (popup3.value !== true) {
                clearInterval(intervalId);
                resolve();
            }
            }, 100); // Verifica la variable cada 100 milisegundos
        });
    }

    const savedCards = async () => {
        
        if(!name_3.value==""){
            save()
        }else{
            toast.error('Complete todos los campos',{
                position:'bottom-center'
            })
        }
        
    }

    const save = async () => {
        const storage = await getStorage()

        await storage.set('cards', JSON.parse(JSON.stringify(cards.value)))

        toast.success('El nombre de la tarjeta se actualizo correctamente',{
            position:'bottom-center'
        })
    }

    const props = defineProps({
        card:Object
    })

    let isActive = ref(false);

    function activate() {
        isActive.value = true;
    }

    function deactivate() {
        isActive.value = false;
    }

</script>

<style lang="scss" scoped>

</style>