<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/services/api";

const email = ref<string | null>(null);

async function fetchMe() {
  try {
    const { data } = await api.get("/auth/me");
    email.value = data.email;
  } catch {
    email.value = null;
  }
}

onMounted(fetchMe);
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8">
      <v-card elevation="4" rounded="xl">
        <v-card-text>
          <v-alert type="success" variant="tonal" class="mb-4">
            Welcome to the application<span v-if="email">, {{ email }}</span
            >.
          </v-alert>
          <div class="text-body-1">
            This page is protected by your JWT access token.
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
