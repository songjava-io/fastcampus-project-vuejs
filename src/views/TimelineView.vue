<script setup>
import axios from 'axios'
import { onMounted, ref, } from 'vue';
import { useUserStore } from '../stores/user-store';
const scheduleList = ref([]);

// 현재 페이지가 마운트 될경우 이벤트 정의
onMounted(() => {
  const userStore = useUserStore();
  console.log(userStore.token);
  getList();
});

const getList = async () => {
  axios.get('/member/schedule', {}).then((res) => {
    console.log('schedule response', res);
    scheduleList.value = res.data;
  })
  .catch((err) => {
    console.log('error', err.response.data);
    alert(err.response.data.message);
  });
  
};
</script>

<template>
  <v-timeline side="end" align="start">
    <v-timeline-item v-for="schedule in scheduleList" v-bind:key="schedule.scheduleSeq"
      dot-color="pink"
      size="small"
    >
      <div class="d-flex">
        <strong class="me-4">{{ schedule.startTime.label }} ~ {{ schedule.endTime.label }}</strong>
        <div>
          <strong>{{ schedule.scheduleType.label }}</strong>
          <div class="text-caption">
            [{{ schedule.scheduleDate }}] {{ schedule.title }}
          </div>
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>  
  <a href="http://dev-spring.com:8080/member/schedule/download">전체 회원 일정 다운로드</a>
</template>