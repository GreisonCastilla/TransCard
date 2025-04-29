<template>

    <div class=" flex h-25 bg-size-full drop-shadow-xl p-4 rounded-lg  bg-amber-600 text-white ">
       
        <div class="flex flex-col grow place-content-between">

            <div class="flex space-x-3">
                
                <p class="text-xl ">{{ card.name }}</p>
            </div>

            <p>Cod. {{ card.id }}</p>
        </div>

        <div class="place-content-end " >
            <p>${{ balance }}</p>            
        </div>
    </div>
    
</template>

<script setup>
    defineProps({
        card:Object
    })
    
    import { ref } from 'vue';

    let balance = ref(1234000000);
    
</script>

<style lang="scss" scoped>

</style>