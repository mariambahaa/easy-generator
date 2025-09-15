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
    label="Email"
    type="email"
    prepend-inner-icon="mdi-email-outline"
    autocomplete="email"
    variant="outlined"
    density="comfortable"
    clearable
  />
</template>
