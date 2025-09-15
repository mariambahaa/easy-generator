import { defineStore } from "pinia";

interface User {
  email: string;
  name?: string;
}
interface PersistedAuth {
  accessToken: string;
  user?: User | null;
}

const STORAGE_KEY = "auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "" as string,
    user: null as User | null,
    _hydrated: false as boolean,
  }),
  getters: {
    isAuthenticated: (s) => !!s.accessToken,
  },
  actions: {
    hydrateFromStorage() {
      if (this._hydrated) return;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as PersistedAuth;
          this.accessToken = parsed.accessToken || "";
          this.user = parsed.user ?? null;
        }
      } catch {
        // ignore broken storage
      } finally {
        this._hydrated = true;
      }
    },
    setAuth(token: string, user?: User) {
      this.accessToken = token;
      if (user) this.user = user;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          accessToken: this.accessToken,
          user: this.user,
        } as PersistedAuth)
      );
    },
    clear() {
      this.accessToken = "";
      this.user = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});
