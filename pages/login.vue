<template>
  <div
    class="flex justify-center items-center w-screen md:h-[80vh] bg-slate-50"
  >
    <div
      class="flex flex-col justify-center items-center bg-slate-50 px-4 py-8 gap-4 rounded-lg w-[24rem]"
    >
      <logo />
      <div class="flex flex-col justify-center items-center">
        <div class="text-2xl font-bold">Bem Vindo de Volta!</div>
        <div class="text-xl font-light">Acesse sua conta</div>
      </div>
      <n-input
        type="text"
        size="large"
        placeholder="Email"
        v-model:value="form.username"
      />
      <n-input
        type="password"
        show-password-on="mousedown"
        placeholder="Password"
        size="large"
        :minlength="6"
        v-model:value="form.password"
      />
      <div class="flex justify-between w-full">
        <div class="text-[#106d3b] cursor-pointer">Esqueci Minha Senha</div>
      </div>

      <n-button
        class="w-full"
        type="primary"
        size="large"
        @click="login()"
      >
        Entrar
      </n-button>
    </div>
  </div>
</template>

<style scoped>
.teste {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>

<script lang="ts">
import { NButton, NInput } from "naive-ui";

export default defineComponent({
  components: { NButton, NInput },
  setup() {
    definePageMeta({
      auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
      },
    });

    const { signIn } = useAuth();

    const form = ref({ username: "", password: "" });

    return {
      signIn,
      form,
      login() {
        signIn("credentials", {
          username: form.value.username,
          password: form.value.password,
          callbackUrl: "/dashboard",
        });
      },
    };
  },
});
</script>

<!-- <div>
    <n-button>Naive UI SSR</n-button>
    <p>Sign-In Options:</p>
    <n-button
      type="primary"
      class="bg-[#58D28D]"
      @click="signIn('github', { callbackUrl: '/dashboard' })"
    >
      Github
    </n-button>

    <div>
      <n-input
        type="text"
        size="large"
        placeholder="Login"
        v-model:value="form.username"
      />
      {{ form }}
      <n-input
        type="text"
        size="large"
        placeholder="Password"
        v-model:value="form.password"
      />
      <NButton
        type="primary"
        class="bg-[#58D28D]"
        @click="
          signIn('credentials', {
            username: form.username,
            password: form.password,
            callbackUrl: '/dashboard',
          })
        "
      >
        Username and Password
      </NButton>
    </div>
  </div> -->
