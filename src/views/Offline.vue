<template>
    <div class="h-full w-full place-content-center bg-amber-600 p-5">
        <div class="flex flex-col items-center fill-white text-white space-y-8">
            <svg class="h-20 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3119 10C16.6802 10.4263 17.9624 11.1191 19.08 12.05M22.5799 8.49997C19.6575 5.92394 15.8956 4.50262 11.9999 4.50262C11.3949 4.50262 10.7931 4.5369 10.1972 4.60447M8.52979 15.61C9.54499 14.8888 10.7595 14.5013 12.0048 14.5013C13.2501 14.5013 14.4646 14.8888 15.4798 15.61M12 19.5H12.01M1.19336 8.70076C2.52697 7.47869 4.06839 6.47975 5.75851 5.76306M4.73193 12.243C6.12934 11.012 7.84172 10.1302 9.73265 9.73393M15.6983 15.7751C14.6792 14.9763 13.3952 14.5 11.9999 14.5C10.5835 14.5 9.28172 14.9908 8.25537 15.8116M3 3L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <div class=" flex flex-col items-center ">
                <p class="text-xl ">No hay conexión a internet</p>
                <p class="text-wrap  text-justify text-sm " >La aplicación estara disponible cuando la conexión se reestablezca</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin size-8 mr-3" id="loading">
                <path d="M27.02 22.82a.182.182 1080 1 0 .364 0 .182.182 1080 1 0-.364 0zm-4.018 4.146a.362.362 1080 1 0 .724 0 .362.362 1080 1 0-.724 0zM17.586 29.1a.544.544 1080 1 0 1.088 0 .544.544 1080 1 0-1.088 0zm-5.83-.286a.724.724 1080 1 0 1.448 0 .724.724 1080 1 0-1.448 0zM6.584 26.16a.906.906 1080 1 0 1.812 0 .906.906 1080 1 0-1.812 0zm-3.582-4.512a1.088 1.088 1080 1 0 2.176 0 1.088 1.088 1080 1 0-2.176 0zm-1.344-5.54a1.268 1.268 1080 1 0 2.536 0 1.268 1.268 1080 1 0-2.536 0zm1.106-5.504a1.45 1.45 1080 1 0 2.9 0 1.45 1.45 1080 1 0-2.9 0zm3.318-4.438a1.632 1.632 1080 1 0 3.264 0 1.632 1.632 1080 1 0-3.264 0zm4.872-2.542a1.812 1.812 1080 1 0 3.624 0 1.812 1.812 1080 1 0-3.624 0zm5.472-.158a1.994 1.994 1080 1 0 3.988 0 1.994 1.994 1080 1 0-3.988 0zm5.01 2.254a2.174 2.174 1080 1 0 4.348 0 2.174 2.174 1080 1 0-4.348 0zm3.56 4.234a2.356 2.356 1080 1 0 4.712 0 2.356 2.356 1080 1 0-4.712 0zm1.416 5.484a2.538 2.538 1080 1 0 5.076 0 2.538 2.538 1080 1 0-5.076 0z"></path>
            </svg>
        </div>
        
        

    </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

const router = useRouter();
const message = ref('');
const isCheckingConnection = ref(false);
const returnRoute = ref('/');
const checkIntervalSeconds = 10; // Intervalo de verificación en segundos
let checkInterval = null;

import {  useIonRouter } from '@ionic/vue';
const ionRouter = useIonRouter();

onMounted(() => {
  // Intentar obtener la ruta anterior del localStorage
  try {
    const savedRoute = localStorage.getItem('lastOnlineRoute');
    if (savedRoute) {
      returnRoute.value = savedRoute;
    }
  } catch (e) {
    console.error('Error al acceder a localStorage:', e);
  }
  
  // Iniciar verificación automática
  startAutoCheck();
  
  // Verificar inmediatamente al montar
  checkConnection();
});

onUnmounted(() => {
  // Limpiar el intervalo cuando el componente se desmonta
  stopAutoCheck();
});

const startAutoCheck = () => {
  // Detener cualquier intervalo existente primero
  stopAutoCheck();
  
  // Crear un nuevo intervalo
  checkInterval = setInterval(() => {
    checkConnection();
  }, checkIntervalSeconds * 1000);
};

const stopAutoCheck = () => {
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
  }
};

const checkConnection = async (isManualCheck = false) => {
  // Evitar verificaciones simultáneas
  if (isCheckingConnection.value) return;
  
  isCheckingConnection.value = true;
  message.value = '';
  
  try {
    // Si es una verificación manual, añadir un pequeño retraso para mostrar el spinner
    if (isManualCheck) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Verificar conexión
    if (navigator.onLine) {
      console.log('Conexión restaurada, navegando a:', returnRoute.value);
      
      // Detener las verificaciones automáticas antes de navegar
      stopAutoCheck();
      
      // Navegar a la ruta guardada o a la principal
      router.replace('/home')
    } else {
      // Solo mostrar mensaje de error en verificaciones manuales
      if (isManualCheck) {
        message.value = 'Todavía sin conexión. Seguimos verificando automáticamente.';
        setTimeout(() => {
          message.value = '';
        }, 3000);
      }
    }
  } catch (error) {
    console.error('Error al verificar conexión:', error);
    message.value = 'Error al verificar la conexión.';
  } finally {
    isCheckingConnection.value = false;
  }
};

</script>

<style lang="scss" scoped>

</style>