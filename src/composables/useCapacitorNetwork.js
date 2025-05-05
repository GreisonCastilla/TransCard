import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Network } from '@capacitor/network';
import { useRouter } from 'vue-router';

export function useCapacitorNetwork() {
  const isOnline = ref(false); // Asumimos que está offline inicialmente por seguridad
  const initialized = ref(false);
  const router = useRouter();
  
  const handleNetworkStatusChange = (status) => {
    console.log('Estado de red:', status.connected ? 'Conectado' : 'Desconectado');
    isOnline.value = status.connected;
  };
  
  // Vigilar cambios en el estado de conexión
  watch(isOnline, (newStatus, oldStatus) => {
    // Solo actuar si ya se inicializó y hay un cambio real
    if (initialized.value && newStatus !== oldStatus) {
      if (!newStatus && router.currentRoute.value.path !== '/offline') {
        router.go('/offline');
      }
    }
  });
  
  const initNetwork = async () => {
    try {
      // Verificar estado inicial
      const status = await Network.getStatus();
      isOnline.value = status.connected;
      initialized.value = true;
      
      if (!status.connected && router.currentRoute.value.path !== '/offline') {
        console.log('Sin conexión al inicializar Capacitor Network, redirigiendo a /offline');
        router.replace('/offline');
      }
    } catch (error) {
      console.error('Error al inicializar Network:', error);
      // Fallback a navigator.onLine si Capacitor falla
      isOnline.value = navigator.onLine;
      initialized.value = true;
      
      if (!navigator.onLine && router.currentRoute.value.path !== '/offline') {
        router.replace('/offline');
      }
    }
  };
  
  onMounted(async () => {
    // Inicializar estado de red
    await initNetwork();
    
    // Suscribirse a cambios de estado
    Network.addListener('networkStatusChange', handleNetworkStatusChange);
  });
  
  onUnmounted(() => {
    // Limpiar listener
    Network.removeAllListeners();
  });
  
  return {
    isOnline,
    initialized
  };
}