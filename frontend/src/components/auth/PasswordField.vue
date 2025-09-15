<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    show?: boolean; // for toggling visibility from parent if needed
    label?: string;
    rules?: ((v: string) => true | string)[];
  }>(),
  {
    label: "Password",
    show: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [val: string];
  "update:show": [val: boolean];
}>();

const val = computed({
  get: () => props.modelValue,
  set: (v: string) => emit("update:modelValue", v),
});

const isShow = computed({
  get: () => props.show ?? false,
  set: (v: boolean) => emit("update:show", v),
});
</script>

<template>
  <v-text-field
    v-model="val"
    :rules="rules"
    :type="isShow ? 'text' : 'password'"
    :label="label"
    prepend-inner-icon="mdi-lock-outline"
    :append-inner-icon="isShow ? 'mdi-eye-off' : 'mdi-eye'"
    @click:append-inner="isShow = !isShow"
    variant="outlined"
    density="comfortable"
    autocomplete="current-password"
  />
</template>
