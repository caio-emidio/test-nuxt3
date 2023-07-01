<template>
  <n-config-provider :theme="theme">
    <n-card> Your current system theme is {{ osTheme }}. </n-card>
  </n-config-provider>
  <div @click="signOut()" > Sign Out </div>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue'
import { useOsTheme, darkTheme } from 'naive-ui'

export default defineComponent({
  setup () {
    definePageMeta({
      auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
      },
    });

    const osThemeRef = useOsTheme()
    const { signOut } = useAuth();

    return {
      theme: computed(() => (osThemeRef.value === 'dark' ? darkTheme : null)),
      osTheme: osThemeRef,
      signOut
    }
  }
})
</script>