<template>
    <div @click.stop class=" text-gray-600  fixed grid place-content-center top-0 left-0  h-full w-full bg-gray-600/50 ">

        <div @click.stop  class="popedit flex flex-col rounded-lg bg-white relative space-y-2 w-[90vw] md:w-sm p-5 shadow-2xl opacity-100 ">
            <div class=" flex flex-col w-full place-content-between align-middle">
                <label class="text-xl text-left text-red-500 "><b>Advertencia</b></label>
                
                <p>¿Realmente desea elimiar la tarjeta {{ card.name }}?</p>
                <p><b>codigo:</b>{{ card.id }}</p>
            </div>

            <NormalButton @click.stop="keep()" class="mt-3" action="Mantener"></NormalButton>
            <BadButton @click.stop="confirm()" action="Eliminar"></BadButton>
        </div>

    </div>
</template>

<script setup>
    import { popup3, deleteCard } from '../../composables/globalVariable';
    import NormalInput from '../inputs/NormalInput.vue';
    import NormalButton from '../buttons/NormalButton.vue';
    import BadButton from '../buttons/BadButton.vue';
    import "vue3-toastify/dist/index.css";

    const props = defineProps({
        card:Object
    })

    const keep = () =>{
        deleteCard.value = false;
        popup3.value = false;
    }

    const confirm = () =>{
        deleteCard.value = true;
        popup3.value = false;
    }

</script>

<style lang="scss" scoped>

</style>