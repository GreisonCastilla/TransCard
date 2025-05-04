<template>
    <div class="sm:px-0 max-w-sm drop-shadow-xl ">
        <div class=" max-w-sm px-6 transition-all duration-200 p-2 rounded-lg bg-red-500 hover:bg-amber-200  group ease-linear"
        :class="{'bg-red-800  scale-95':isActive}"
        @touchstart="activate()"
        @touchend="deactivate()"
        @touchcancel="deactivate()">
            <p class="text-sm text-white group-hover:text-gray-500 text-center">{{ action }}</p>
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

