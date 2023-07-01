import { callWithNuxt, useNuxtApp } from "#app";
export default defineNuxtRouteMiddleware((to, from) => {
  // It's important to do this as early as possible
  const nuxtApp = useNuxtApp();
  const { data, status, signIn, signOut } = useAuth();

  const isAuthenticated = status.value === "authenticated";

  if (isAuthenticated) {
    return;
  }
  if (to.name !== "login") {
    return navigateTo("/login");
  }
});
