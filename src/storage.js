import { Storage } from "@ionic/storage";

let storage = new Storage();
storage.create();

export default storage;

export const getStorage = async () => {
    if (!storage) {
      storage = new Storage()
      await storage.create()
    }
    return storage
  }