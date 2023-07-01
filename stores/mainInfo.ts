import { defineStore } from 'pinia';
export const useAuthStore = defineStore({
  // Nome do store
  id: 'auth',

  // Estado inicial
  state: () => ({
    accessToken: "",
  }),

  actions: {
    async setAccessToken(): Promise<void> {
      const { getSession } = useAuth();
      const session = await getSession();
      this.accessToken = session?.user?.accessToken;
    }
  },

  getters: {
    getAccessToken(): string {
      return this.accessToken;
    }
  }
});
