<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AuthLayout from './layouts/AuthLayout.vue';
import AppLayout from './layouts/AppLayout.vue';

const route = useRoute();

// Choose layout via route.meta.layout
const layoutComponent = computed(() => {
  const name = (route.meta?.layout as string) || 'AuthLayout';
  return name === 'AppLayout' ? AppLayout : AuthLayout;
});
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>
