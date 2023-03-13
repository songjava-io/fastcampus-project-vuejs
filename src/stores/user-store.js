import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref(null);
    const user = ref(null);
    async function logout() {
      token.value = null;
    }

    /**
     * 로그인 인증 정보 저장
     * @param {string} data
     */
    async function setAuthUser(data) {
      token.value = data.token;
      user.value = data.user;
    }

    /**
     * token 저장
     * @param {string} token
     */
    async function setToken(jwtToken) {
      token.value = jwtToken;
    }

    return { token, user, logout, setAuthUser, setToken };
  },
  {
    persistedState: {
      // excludePaths: ["menus"],
    },
  }
);