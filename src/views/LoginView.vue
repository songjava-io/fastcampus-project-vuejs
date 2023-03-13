<script setup>
import axios from 'axios'
import { onMounted, ref, } from 'vue';
import { useUserStore } from "../stores/user-store";
import { useRouter } from "vue-router";
const username = ref('kakao1@gmail.com');
const password = ref('test1234@@');
const userStore = useUserStore();
const router = useRouter();
// 현재 페이지가 마운트 될경우 이벤트 정의
onMounted(() => {
});

const login = async () => {
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);
  axios.post('/login', formData).then((res) => {
    console.log('login response', res);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;
    userStore.setToken(res.data);
    alert("로그인 성공.");
    router.push("/timeline/list");    
  })
  .catch((err) => {
    console.log('error', err.response.data);
    alert(err.response.data.message);
  });
  
};
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent="login">
      <v-text-field
        v-model="username"
        label="First name"
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="password"
        label="Last name"
      ></v-text-field>

      <v-btn type="submit" block class="mt-2">로그인</v-btn>
    </v-form>
  </v-sheet>
</template>
