<template>
    <div @click="close()"  v-if="visible" class=" text-gray-600 z-20  fixed grid place-content-center top-0 left-0  h-full w-full bg-gray-600/50 ">

        <div  @click.stop class="popedit flex flex-col rounded-lg bg-white relative space-y-2 w-[90vw] md:w-sm p-5 shadow-2xl opacity-100 ">
            <div class=" flex w-full place-content-between align-middle">
                <p class="text-xl text-left "><b>Editar tarjeta</b></p>
                
                <XButton @click="close()"></XButton>
            </div>

            <div class="flex flex-col space-y-3 mt-6 mb-3">
                <NormalInput  :aux="card.name" name="Nombre" id="name_3"></NormalInput>
                <p>cód. {{ card.id }}</p>
            </div>

            <NormalButton @click="edit()" class="mt-3" action='Guardar cambios
                <svg class="h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            '></NormalButton>
            <BadButton @click="delCard()" action='Eliminar
            <svg class="h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            '></BadButton>
        </div>
       
        <popConfirm :card="card" v-show="popup3"></popConfirm>
       
    </div>
</template>

<script setup>
    import popConfirm from './popConfirm.vue';
    import NormalInput from '../inputs/NormalInput.vue';
    import NormalButton from '../buttons/NormalButton.vue';
    import BadButton from '../buttons/BadButton.vue';
    import { ref, defineEmits } from 'vue';
    import { cards, deleteCard, popup3 } from '../../composables/globalVariable';
    import { getStorage } from '../../storage'
    import { toast } from 'vue3-toastify';
    import "vue3-toastify/dist/index.css";
    import XButton from '../buttons/XButton.vue';


    const emit = defineEmits(['close']);

    function close() {
    emit('close');
    }
   
    const edit =()=>{
        let item = cards.value.find(obj => obj.id === props.card.id);
        if (item) {

            if(name_3.value === props.card.name){
                
                toast.error('No ha hecho ningún cambio',{
                    position:'bottom-center',
                    toastId:"not-change"
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
                position:'bottom-center',
                toastId:"card-deleted"
            })
            close();
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
                position:'bottom-center',
                toastId:"field-not-found"
            })
        }
        
    }

    const save = async () => {
        const storage = await getStorage()

        await storage.set('cards', JSON.parse(JSON.stringify(cards.value)))

        toast.success('El nombre de la tarjeta se actualizo correctamente',{
            position:'bottom-center',
            toastId:"update-card"
        })
    }

    const props = defineProps({
        card:Object,
        visible:Boolean
    })

   

</script>

<style lang="scss" scoped>

</style>