<template>
  <div class="flex-col w-full group">

    <label
      class="absolute group-focus-within:-translate-y-4
      group-focus-within:text-amber-600
      transition ease-linear duration-300"
      :class="{'-translate-y-4':text!==''}"
      :for="id"
      :ref="id"
    >{{ name }}</label>

    <input
      class="border-b-2 border-gray-500 focus:border-amber-500 bg-transparent
            outline-none transition-all duration-300 w-full p-1
             "
        :class="{'text-amber-600':text!==''}"
      :id="id"
      v-model="text"
      :type="type"
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  name:String,
  id: String,
  type: String,
});

let text = ref("");
</script>
