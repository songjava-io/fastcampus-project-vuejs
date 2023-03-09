<script setup>
import axios from 'axios'
import { onMounted, ref, } from 'vue';
const scheduleList = ref([]);

// 현재 페이지가 마운트 될경우 이벤트 정의
onMounted(() => {
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
        <strong class="me-4">{{ schedule.startTime }} ~ {{ schedule.endTime }}</strong>
        <div>
          <strong>{{ schedule.scheduleType }}</strong>
          <div class="text-caption">
            {{ schedule.title }}
          </div>
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>  
</template>
