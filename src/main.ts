import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import "@ionic/vue/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./tailwind.css";

import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';
customElements.define("jeep-sqlite", JeepSqlite);


window.addEventListener("DOMContentLoaded", async () => {
  try {
    const plataform = Capacitor.getPlatform();
    const sqlite = new SQLiteConnection(CapacitorSQLite);

    if(plataform == 'web'){
      const jeepSqliteEl = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqliteEl);
      await customElements.whenDefined('jeep-sqlite');
      
      await sqlite.initWebStore();

    }

    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection("db_transcard", false)).result;
    let db = null;

    if(ret.result && isConn){
      db = await sqlite.retrieveConnection("db_transcard", false);
    }else{
      db = await sqlite.createConnection("db_card", false,"no-encryption", 1, false);
    }
    
    /*await db.open();
    
    const query =`CREATE TABLE IF NOT EXISTS card (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
    )`

    const res = await db.execute(query);

    if(res.changes && res.changes.changes && res.changes.changes <0){
      throw new Error('Error: execute failed');
    }

    await sqlite.closeConnection('db_card', false)
    */
    const app = createApp(App).use(IonicVue).use(router);

    router.isReady().then(() => {
      app.mount("#app");
    });
    
  } catch (e) {
    console.log((e as any).message);
  }
});


