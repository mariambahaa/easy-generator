import { computed } from "vue";
import { useTheme } from "vuetify";

const STORAGE_KEY = "theme";
type ThemeName = "appLight" | "appDark";

export function useAppTheme() {
  const theme = useTheme();

  const current = computed<ThemeName>(
    () => theme.global.name.value as ThemeName
  );
  const isDark = computed(() => theme.global.current.value.dark);

  function set(name: ThemeName) {
    theme.global.name.value = name;
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      /* ignore */
    }
  }

  function toggle() {
    set(isDark.value ? "appLight" : "appDark");
  }

  const icon = computed(() =>
    isDark.value ? "mdi-white-balance-sunny" : "mdi-weather-night"
  );
  const label = computed(() => (isDark.value ? "Light mode" : "Dark mode"));

  return { current, isDark, toggle, set, icon, label };
}
