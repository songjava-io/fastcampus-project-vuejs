<script setup>
import axios from 'axios'
import { onMounted, ref, } from 'vue';
import Datepicker from 'vue3-datepicker'

const defaultInfo = ref({
  scheduleTypes: [],
  scheduleTimes: [],
});

const scheduleType = ref(null);
const title = ref(null);
const scheduleDate = ref(null);
const startTime = ref(null);
const endTime = ref(null);
// 현재 페이지가 마운트 될경우 이벤트 정의
onMounted(() => {
  getDefaultInfo();
});

const getDefaultInfo = async () => {
  axios.get('/member/schedule/default-info', {}).then((res) => {
    console.log('schedule response', res);
    defaultInfo.value = res.data;
  })
  .catch((err) => {
    console.log('error', err.response.data);
    alert(err.response.data.message);
  });
  
};

const submit = async () => {
  const formData = new FormData();
  
  // 서버에 전송할 데이터를 formData에 추가
  formData.append("scheduleType", scheduleType.value);
  formData.append("title", title.value);
  // formData.append("scheduleDate", new Date());
  formData.append("scheduleDate", scheduleDate.value);
  formData.append("startTime", startTime.value);
  formData.append("endTime", endTime.value);

  console.log('formData', formData);

  // 서버에서 전송
  axios.post('/member/schedule/save', formData).then((res) => {
    console.log('schedule save response', res);
    alert('스케줄 일정이 등록되었습니다.');
  })
  .catch((err) => {
    console.log('error', err.response.data);
    alert(err.response.data.message);
  });  
};
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="submit">
      <v-select
        label="스케줄 종류"
        v-model="scheduleType"
        :items="defaultInfo.scheduleTypes"
        item-value="name"
        item-title="label"
      ></v-select>
      <!--
      <v-row justify="center">
        <v-date-picker v-model="picker"></v-date-picker>
     </v-row>      
    -->
      <v-text-field
        v-model="title" label="제목"
      ></v-text-field> 
      <Datepicker v-model="scheduleDate"  />
      <v-select
        label="시작시간"
        v-model="startTime"
        :items="defaultInfo.scheduleTimes"
        item-value="name"
        item-title="label"
      ></v-select> 
      <v-select
        label="종료시간"
        v-model="endTime"
        :items="defaultInfo.scheduleTimes"
        item-value="name"
        item-title="label"
      ></v-select>     
      <v-btn type="submit" block class="mt-2">일정 등록하기</v-btn>
    </v-form>
  </v-sheet>  
</template>
