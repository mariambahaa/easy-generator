<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
  rules?: ((v: string) => true | string)[];
}>();
const emit = defineEmits<{ "update:modelValue": [val: string] }>();
const val = computed({
  get: () => props.modelValue,
  set: (v: string) => emit("update:modelValue", v),
});
</script>

<template>
  <v-text-field
    v-model="val"
    :rules="rules"
    label="Name"
    prepend-inner-icon="mdi-account-outline"
    autocomplete="name"
    variant="outlined"
    density="comfortable"
  />
</template>
