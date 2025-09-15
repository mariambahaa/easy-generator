<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useAppTheme } from "@/composables/useTheme";
import AppFooter from "@/components/common/AppFooter.vue";

const router = useRouter();
const auth = useAuthStore();
const { toggle, icon, label } = useAppTheme();

function logout() {
  auth.clear();
  router.push("/signin");
}
</script>

<template>
  <v-app>
    <v-app-bar :height="80" density="comfortable" elevation="1">
      <v-spacer />
      <v-btn :icon="icon" variant="text" :aria-label="label" @click="toggle" />
      <v-divider vertical class="mx-3 my-6" />
      <v-btn variant="text" prepend-icon="mdi-logout" @click="logout"
        >Logout</v-btn
      >
    </v-app-bar>

    <v-main>
      <v-container class="py-8">
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>
