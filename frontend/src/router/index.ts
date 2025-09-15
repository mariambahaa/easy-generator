import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "../store/auth";

const routes: RouteRecordRaw[] = [
  // Protected home at "/"
  {
    path: "/",
    component: () => import("../pages/app/AppHomePage.vue"),
    meta: { requiresAuth: true, layout: "AppLayout" },
  },

  // Guest-only auth pages
  {
    path: "/signin",
    component: () => import("../pages/auth/SignInPage.vue"),
    meta: { guestOnly: true, layout: "AuthLayout" },
  },
  {
    path: "/signup",
    component: () => import("../pages/auth/SignUpPage.vue"),
    meta: { guestOnly: true, layout: "AuthLayout" },
  },

  // Back-compat: /app -> /
  { path: "/app", redirect: "/" },

  // Fallback
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  // make sure state is hydrated (in case main order changes)
  auth.hydrateFromStorage();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: "/signin" };
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { path: "/" };
  }
  return true;
});

export default router;
