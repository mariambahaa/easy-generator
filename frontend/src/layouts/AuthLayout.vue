<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
import AppFooter from "@/components/common/AppFooter.vue";

const { toggle, icon, label } = useAppTheme();
</script>

<template>
  <v-app>
    <v-app-bar :height="80" density="comfortable" elevation="1">
      <v-spacer />
      <v-btn :icon="icon" variant="text" :aria-label="label" @click="toggle" />
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        <v-row align="center" justify="center" class="w-100">
          <v-col cols="12" sm="10" md="7" lg="5">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>
