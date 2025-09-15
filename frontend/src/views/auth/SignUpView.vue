<script setup lang="ts">
import { ref } from "vue";
import AuthCard from "@/components/auth/AuthCard.vue";
import EmailField from "@/components/auth/EmailField.vue";
import NameField from "@/components/auth/NameField.vue";
import PasswordField from "@/components/auth/PasswordField.vue";
import { useValidationRules } from "@/composables/useValidationRules";
import { usePasswordStrength } from "@/composables/usePasswordStrength";
import api from "@/services/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const { rules } = useValidationRules();
const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const name = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const error = ref("");

const { score, color, label, percent } = usePasswordStrength(password);

async function submit() {
  if (loading.value) return;
  error.value = "";
  loading.value = true;
  try {
    const { data } = await api.post("/auth/signup", {
      email: email.value,
      name: name.value,
      password: password.value,
    });
    auth.setAuth(data.accessToken, data.user);
    router.push("/");
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Signup failed";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthCard
    title="Create Your Account"
    subtitle="It's quick and easy!"
    icon="mdi-account-plus"
  >
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mb-4"
      density="comfortable"
    >
      {{ error }}
    </v-alert>

    <v-form @submit.prevent="submit">
      <EmailField
        v-model="email"
        :rules="[rules.required, rules.email]"
        class="mb-3"
      />
      <NameField
        v-model="name"
        :rules="[rules.required, rules.minName]"
        class="mb-3"
      />
      <PasswordField
        v-model="password"
        :rules="[rules.required, rules.password]"
        label="Password"
        v-model:show="showPassword"
        class="mb-1"
      />

      <div class="mb-4">
        <div class="text-caption mb-1">Password strength: {{ label }}</div>
        <v-progress-linear
          :model-value="percent"
          :color="color"
          rounded
          height="8"
        />
        <div class="text-caption mt-2">
          Must be at least 8 characters and include a letter, a number, and a
          special character.
        </div>
      </div>

      <v-btn type="submit" color="primary" size="large" block :loading="loading"
        >Create Account</v-btn
      >
    </v-form>

    <v-divider class="my-6" />

    <div class="text-body-2 d-flex align-center justify-center ga-1">
      <span>Already have an account?</span>
      <RouterLink to="/signin">
        <v-btn variant="tonal" color="primary" size="small">Sign in</v-btn>
      </RouterLink>
    </div>
  </AuthCard>
</template>
