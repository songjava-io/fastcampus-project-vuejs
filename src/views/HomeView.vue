<script setup>
import axios from 'axios'
import { onBeforeUnmount, onMounted, ref, } from 'vue';
import mitt from 'mitt'
import {JsonViewer} from "vue3-json-viewer"
import "vue3-json-viewer/dist/index.css";
const userData = ref(null);
const emitter = mitt()

// 현재 페이지가 마운트 될경우 이벤트 정의
onMounted(() => {
  // 현재 뷰에 이벤트를 받기 위한 정의
  emitter.on('oauth2-kakao-callback', (event) => {
    console.log('oauth2-kakao-callback', event);
    userData.value = JSON.parse(event.data);
  });
});

const login = async () => {
  const response = await axios.get('http://dev-spring.com:8080/oauth2/authorization/kakao');
  console.log('login response', response);
};

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
    <button @click="openKakaoLoginPopup">카카오 로그인</button>
    <JsonViewer :value="userData" copyable boxed sort theme="jv-light"/>
  </main>
</template>
