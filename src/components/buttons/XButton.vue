<template>
    <div class="text-xl h-6 w-6 text-center text-red-400 rounded-full transition-all duration-300"
        :class="{'bg-red-800  scale-80':isActive}"
        @touchstart="activate()"
        @touchend="deactivate()"
        @touchcancel="deactivate()"
    >
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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