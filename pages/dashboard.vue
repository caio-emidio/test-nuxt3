<template>
  <h1 class="text-3xl font-bold">
    Hi {{ data?.user?.firstName }}! I'm protected.
  </h1>
  <h2>
    data : {{ data?.user }}
  </h2>
  <h2>
    test: {{ auth.getAccessToken }}
  </h2>

  <button class="px-4 py-2 bg-gray-50" @click="signOut({ callbackUrl: '/login' })">Sign Out</button>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/mainInfo';
const auth = useAuthStore();

definePageMeta({ middleware: "auth" });
const { data, signOut } = useAuth();

onMounted(() => {
  // Ação personalizada a ser executada após a montagem da aplicação
  auth.setAccessToken();
  console.log('Aplicação montada!');
});




</script>
