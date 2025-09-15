import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@/assets/styles/main.scss";
import { useAuthStore } from "./store/auth";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// Rehydrate auth BEFORE installing router (so guards see correct state)
useAuthStore().hydrateFromStorage();

app.use(router);
app.use(vuetify);
app.mount("#app");
