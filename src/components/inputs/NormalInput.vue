<template>
    <div class="flex-col w-full group">

    <label
    class="absolute group-focus-within:-translate-y-4
    group-focus-within:text-amber-600
    transition ease-linear duration-300"
    :class="{'-translate-y-4':!text==''}"
    :for="id"
    >{{ name }}</label>

    <input
    class="border-b-2 border-gray-500 focus:border-amber-500 bg-transparent
            outline-none transition-all duration-300 w-full p-1
            "
    :class="{'text-amber-600':!text==''}"
    :id="id"
    :type="type"
    v-model="text"
    >
    </div>
</template>

<script setup>
import { ref } from 'vue';
    let text = ref('')
    const props = defineProps({
        name:String,
        id: String,
        type: String,
        aux:{
            type: String,
            default: ''
        }
    });
    
    text = ref(props.aux)
    
</script>

<style lang="scss" scoped>

</style>