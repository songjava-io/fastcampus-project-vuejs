<script setup>
import axios from 'axios'
import { onMounted, ref, } from 'vue';
const excelFile = ref(null);

// 현재 페이지가 마운트 될경우 이벤트 정의
onMounted(() => {
});

const handleFileUpload = (event) => {
  excelFile.value = event.target.files[0];
};

const save = async () => {
  const formData = new FormData();
  if (excelFile != null) {
    formData.append('excelFile', excelFile.value);
  }
  axios.post('/event/upload', formData).then((res) => {
    console.log('event save response', res);
  })
  .catch((err) => {
    console.log('error', err.response);
    alert(err.response.data.message);
  });
  
};
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent="save">
      <v-file-input label="엑셀 선택" @change="handleFileUpload($event)"></v-file-input>
      <v-btn type="submit" block class="mt-2">업로드</v-btn>
    </v-form>

    <a href="http://dev-spring.com:8080/event/download">엑셀 다운로드</a>
  </v-sheet>
</template>
