<template>
    <div
      @click.stop
      class=" text-gray-600  fixed grid place-content-center top-0 left-0  h-full w-full bg-gray-600/50 "
    >

      <div
        @click.stop
        class="popedit flex flex-col rounded-lg bg-white relative space-y-2 w-[90vw] md:w-sm p-5 shadow-2xl opacity-100 "
      >
        <div class=" flex flex-col w-full place-content-between align-middle">
          <p class="text-xl text-left text-red-500 "><b>Advertencia</b></p>

          <p>¿Realmente desea eliminar la tarjeta {{ card.name }}?</p>
          <p><b>código:</b>{{ card.id }}</p>
        </div>

        <NormalButton
          @click="$emit('cancel')"
          class="mt-3"
          action="Mantener"
        ></NormalButton>
        <BadButton
          @click.stop="$emit('confirm')"
          action="Eliminar"
        ></BadButton>
      </div>

    </div>

</template>

<script setup>
import NormalButton from "../buttons/NormalButton.vue";
import BadButton from "../buttons/BadButton.vue";
import "vue3-toastify/dist/index.css";

defineEmits(['confirm', 'cancel']);

const props = defineProps({
  card: Object,
});

</script>

<style>

</style>