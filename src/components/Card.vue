<template>
   <div @click="changePopup()" 
    class=" transition-all duration-300 flex h-35 md:w-90 bg-size-full drop-shadow-xl p-4 rounded-lg  bg-amber-600 text-white "
    :class="{'bg-amber-800  scale-95':isActive}"
    @touchstart="activate()"
    @touchend="deactivate()"
    @touchcancel="deactivate()">
        
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
    
<PopEdit :card="card" v-show="popup2"></PopEdit>
    
</template>

<script setup>
    import getBalance from '../requests/transcaribeSondapay';
    import { onMounted, ref } from 'vue';
    import { popup2 } from '../composables/globalVariable';
    import PopEdit from './popups/PopEdit.vue';

    const changePopup = ()=>{
        popup2.value = !popup2.value
    }

    const props = defineProps({
        card:Object
    })

    let balance = ref("")
    getBalance(props.card.id).then(result=>{
        balance.value=result
    });

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