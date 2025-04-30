
import { ref } from 'vue'

import { Filesystem, Directory } from '@capacitor/filesystem';

export function useCard(){

     async function leerOcrearArchivo() {
        try {
            const resultado = await Filesystem.readFile({
              path: archivo,
              directory: Directory.Documents,
              encoding: 'utf8',
            });
        
            const datos = JSON.parse(resultado.data);
            console.log('✅ Archivo leído:', datos);
            return datos;
        
          } catch (error) {
            if (error.message.includes('File does not exist')) {
              const listaVacia = [];
        
              await Filesystem.writeFile({
                path: archivo,
                data: JSON.stringify(listaVacia, null, 2),
                directory: Directory.Documents,
                encoding: 'utf8',
              });
        
              console.log('🆕 Archivo creado con lista vacía');
              return listaVacia;
        
            } else {
              console.error('❌ Error al leer archivo:', error);
              throw error;
            }
          }
    }

    const cards = ref(leerOcrearArchivo());

    const addCard = async (Card) => {
        try {
          const datos = await leerOcrearArchivo(); // lee o crea el archivo
          datos.push(Card); // agrega el nuevo objeto
    
          await Filesystem.writeFile({
            path: archivo,
            data: JSON.stringify(datos, null, 2),
            directory: Directory.Documents,
            encoding: 'utf8',
          });
    
          console.log('✅ Elemento agregado:', nuevoElemento);
        } catch (error) {
          console.error('❌ Error al agregar elemento:', error);
        }
      };


    return {
        cards,
        addCard
    }
}