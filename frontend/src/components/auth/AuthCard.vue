<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    icon?: string;
  }>(),
  {
    title: "",
    subtitle: "",
    icon: "",
  }
);
</script>

<template>
  <v-card elevation="10" rounded="xl" class="pa-5">
    <v-card-title
      class="text-h5 d-flex align-center justify-space-between"
      v-if="title || icon"
    >
      <span>{{ title }}</span>
      <v-icon v-if="icon" size="28">{{ icon }}</v-icon>
    </v-card-title>
    <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
