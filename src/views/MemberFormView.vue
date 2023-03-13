<script setup>
import axios from 'axios'
import { onMounted, ref, } from 'vue';
import { useUserStore } from "../stores/user-store";
const account = ref('kakao1@gmail.com');
const password = ref('test1234@@');
const nickname = ref('');
const userStore = useUserStore();

// 현재 페이지가 마운트 될경우 이벤트 정의
onMounted(() => {
  console.log('user', userStore.user);
  nickname.value = userStore.user.nickname;
});

const save = async () => {
  const formData = new FormData();
  formData.append("account", account.value);
  formData.append("password", password.value);
  formData.append("nickname", nickname.value);
  axios.post('/member/save', formData).then((res) => {
    console.log('smember ave response', res);
  })
  .catch((err) => {
    console.log('error', err.response.data);
    alert(err.response.data.message);
  });
  
};
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent="save">
      <v-text-field
        v-model="account"
        label="계정"
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="password"
        label="비밀번호"
      ></v-text-field>

      <v-text-field
        v-model="nickname"
        label="닉네임"
      ></v-text-field>      

      <v-btn type="submit" block class="mt-2">회원가입</v-btn>
    </v-form>
  </v-sheet>
</template>
