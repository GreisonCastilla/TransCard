<template>
    <div class="sm:px-0  drop-shadow-xl ">
        <div v-html="action" class=" flex text-white place-content-center  px-6 transition-all duration-200 p-2 rounded-lg bg-amber-600 group ease-linear"
        :class="{'bg-amber-800  scale-95':isActive}"
        @touchstart="activate()"
        @touchend="deactivate()">
        </div>
    </div>
 
</template>

<script setup>
    defineProps({
        action:String,
    })

    import { ref } from 'vue';

    let isActive = ref(false);

    function activate() {
        isActive.value = true;
    }

    function deactivate() {
        isActive.value = false;
    }
</script>

