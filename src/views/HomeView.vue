<script setup>
import axios from 'axios'
import { onMounted, ref, } from 'vue';
import mitt from 'mitt'
import {JsonViewer} from "vue3-json-viewer"
import "vue3-json-viewer/dist/index.css";
import { useUserStore } from '../stores/user-store';
import { useRouter } from 'vue-router';
const userData = ref(null);
const emitter = mitt()
const userStore = useUserStore();
const router = useRouter();

// 현재 페이지가 마운트 될경우 이벤트 정의
onMounted(() => {
  // 현재 뷰에 이벤트를 받기 위한 정의
  emitter.on('oauth2-kakao-callback', (event) => {
    alert(event);
    console.log('oauth2-kakao-callback', event);
    userData.value = JSON.parse(event.data);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.value.token}`;
    // 회원가입이 필요한경우
    if (userData.value.signup) {
      userStore.setAuthUser(userData.value);
      router.replace("/member/form");
    } else {
      alert("로그인 성공.");
      userStore.setToken(userData.value.token);
      router.replace("/board/notice");
      
    }
    
  });
});

const openKakaoLoginPopup = () => {
  const opener = window.open('http://dev-spring.com:8080/oauth2/authorization/kakao', 'kakaoLogin', 'width=700, height=500, scrollbars=no');
  try {
    opener.focus();
    // 팝업에서 보낸 메세지를 받기 위한 콜백 정의
    window.onmessage = (data) => {
      console.log('window onmessage', data);
      emitter.emit('oauth2-kakao-callback', data); 
    };
  } catch (e) {
    console.error(e);
    alert('브라우저 팝업을 차단해제 하신 후 다시 시도하십시요.');
  }
}
</script>

<template>
  <main>
    <h2>VueJS 개발환경</h2>
    <button @click="openKakaoLoginPopup">카카오 로그인</button>
    <JsonViewer :value="userData" copyable boxed sort theme="jv-light"/>
  </main>
</template>
