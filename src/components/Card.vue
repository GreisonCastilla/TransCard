<template>
  <Transition appear>
    <div
      @click.stop="show()"
      class=" transition-all duration-300 flex h-35 md:w-90 bg-size-full drop-shadow-xl p-4 rounded-lg  bg-amber-600 text-white "
      :class="{'bg-amber-800  scale-95':isActive}"
      @touchstart="activate()"
      @touchend="deactivate()"
      @touchcancel="deactivate()"
    >

      <div class="flex flex-col grow place-content-between">

        <div class="flex space-x-3">

          <p class="text-lg "><b>{{ card.name }}</b></p>
        </div>

        <p class="text-sm ">Cód. {{ card.id }}</p>
      </div>

      <div class="place-content-end ">
        <p>{{ balance }}</p>
      </div>

    </div>
  </Transition>
  <PopEdit
    :card="card"
    :itemid="card.id"
    :key="card.id"
    @close="showInfo = false"
    :visible="showInfo"
  ></PopEdit>

</template>

<script setup>
import getBalance from "../requests/transcaribeSondapay";
import { onMounted, ref } from "vue";
import PopEdit from "./popups/PopEdit.vue";

const showInfo = ref(false);

function show() {
  showInfo.value = true;
}

const props = defineProps({
  card: Object,
});

let balance = ref("Consultando...");
getBalance(props.card.id).then((result) => {
  balance.value = "$" + result;
});

let isActive = ref(false);

function activate() {
  isActive.value = true;
}

function deactivate() {
  isActive.value = false;
}
</script>

<style >
.v-enter-active,
.v-leave-active {
  transition: all 1s ease-in-out;
  transform: translateX(100%);
  opacity: 0;
}

.v-enter-from,
.v-leave-to {
  transition: all 1s ease-in-out;
  transform: translateX(120%);
  opacity: 0;
}
</style>