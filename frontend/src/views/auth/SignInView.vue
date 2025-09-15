<script setup lang="ts">
import { ref } from "vue";
import AuthCard from "@/components/auth/AuthCard.vue";
import EmailField from "@/components/auth/EmailField.vue";
import PasswordField from "@/components/auth/PasswordField.vue";
import { useValidationRules } from "@/composables/useValidationRules";
import api from "@/services/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const { rules } = useValidationRules();
const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const error = ref("");

async function submit() {
  if (loading.value) return;
  error.value = "";
  loading.value = true;
  try {
    const { data } = await api.post("/auth/signin", {
      email: email.value,
      password: password.value,
    });
    auth.setAuth(data.accessToken, data.user);
    router.push("/");
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Sign in failed";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthCard
    title="Welcome Back!"
    subtitle="Sign in to continue"
    icon="mdi-login"
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
      <PasswordField
        v-model="password"
        :rules="[rules.required]"
        label="Password"
        v-model:show="showPassword"
        class="mb-4"
      />
      <v-btn type="submit" color="primary" size="large" block :loading="loading"
        >Sign In</v-btn
      >
    </v-form>

    <v-divider class="my-6" />

    <div class="text-body-2 d-flex align-center justify-center ga-1">
      <span>New here?</span>
      <RouterLink to="/signup">
        <v-btn variant="tonal" color="primary" size="small"
          >Create an account</v-btn
        >
      </RouterLink>
    </div>
  </AuthCard>
</template>
