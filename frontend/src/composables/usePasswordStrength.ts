import { computed, Ref } from 'vue';

export function usePasswordStrength(password: Ref<string>) {
  const score = computed(() => {
    const v = password.value || '';
    let s = 0;
    if (v.length >= 8) s += 1;
    if (/[A-Z]/.test(v)) s += 1;
    if (/[a-z]/.test(v)) s += 1;
    if (/\d/.test(v)) s += 1;
    if (/[^A-Za-z0-9]/.test(v)) s += 1;
    return Math.min(5, s);
  });

  const color = computed(() => ['error', 'error', 'warning', 'info', 'success'][Math.max(0, score.value - 1)] || 'error');
  const label = computed(() => ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][Math.max(0, score.value - 1)] || 'Very weak');
  const percent = computed(() => (score.value / 5) * 100);

  return { score, color, label, percent };
}
