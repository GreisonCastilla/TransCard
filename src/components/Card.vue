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

        <div class="flex place-items-center">
          <svg
            @click="show()"
            class="h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="text-lg "><b>{{ card.name }}</b></p>
        </div>

        <div class=" flex place-items-center">

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
          <p
            @click.prevent="copy()"
            class="text-sm "
          >Cód. {{ card.id }}</p>
        </div>

      </div>

      <div class="flex flex-col grow place-content-between place-items-end h-full">
        <svg
          @click.prevent="showPopConfirm = true"
          class="h-5 mt-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p>{{ balance }}</p>
      </div>

    </div>
  </Transition>
  <popConfirm :card="card" v-show="showPopConfirm"
  @confirm="delCard"
  @cancel="showPopConfirm = false"></popConfirm>
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
import popConfirm from './popups/popConfirm.vue'
import { ref } from "vue";
import PopEdit from "./popups/PopEdit.vue";
import { toast } from "vue3-toastify";
import { cards } from "../composables/globalVariable";
import "vue3-toastify/dist/index.css";
import { getStorage } from "../storage";

const showInfo = ref(false);
const showPopConfirm = ref(false)

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.card.id);

    toast.success("El código de la tarjeta se ha copiado", {
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

async function delCard() {

    const storage = await getStorage();
    cards.value = cards.value.filter((u) => u.id !== props.card.id);

    storage.set("cards", JSON.parse(JSON.stringify(cards.value)));
    toast.success("la tarjeta se elimino correctamente", {
      position: "bottom-center",
      toastId: "card-deleted",
  });
  
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