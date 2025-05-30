<template>
  <Transition appear>
    <div
      
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

        <div class=" flex" >
          
          <svg
            @click.prevent="copy()"
            class="h-4 mr-2 fill-white"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 115.77 122.88"
            style="enable-background:new 0 0 115.77 122.88"
            xml:space="preserve"
          >
            <g>
              <path
                class="st0"
                d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"
              />
            </g>
          </svg>
          <p @click.prevent="copy()" class="text-sm ">Cód. {{ card.id }}</p>
        </div>
        
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showInfo = ref(false);

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.card.id);

    toast.success("El codigo de la tarjeta se ha copiado", {
      position: "bottom-center",
      toastId: "copy-card",
    });
  } catch (err) {
    console.error("Error al copiar: ", err);
  }
};

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