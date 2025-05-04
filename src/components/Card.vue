<template>

    <div class=" flex h-30 md:w-90 bg-size-full drop-shadow-xl p-4 rounded-lg  bg-amber-600 text-white ">
       
        <div class="flex flex-col grow place-content-between">

            <div class="flex space-x-3">
                
                <p class="text-lg "><b>{{ card.name }}</b></p>
            </div>

            <p class="text-sm ">Cod. {{ card.id }}</p>
        </div>

        <div class="place-content-end " >
            <p>${{ balance }}</p>            
        </div>
    </div>
    
</template>

<script setup>

    import getBalance from '../requests/transcaribeSondapay';
    import { onMounted, ref } from 'vue';
    const props = defineProps({
        card:Object
    })

    let balance = ref("")
    getBalance(props.card.id).then(result=>{
        balance.value=result
    });
    
   
    
</script>

<style lang="scss" scoped>

</style>