<script setup>
import axios from 'axios'
import { onMounted, ref, } from 'vue';
const boards = ref([]);

// 현재 페이지가 마운트 될경우 이벤트 정의
onMounted(() => {
  getList();
});

const getList = async () => {
  console.log('headers', axios.defaults.headers);
  console.log('Authorization', axios.defaults.headers.common['Authorization']);
  axios.get('/board/notice', {}).then((res) => {
    console.log('getList response', res);
    boards.value = res.data;
  })
  .catch((err) => {
    console.log('error', err.response.data);
    alert(err.response.data.message);
  });
  
};
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          번호
        </th>        
        <th class="text-left">
          제목
        </th>
        <th>
          등록일자
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="board in boards"
        :key="board.boardSeq"
      >
        <td>{{ board.boardSeq }}</td>
        <td>{{ board.title }}</td>
        <td>{{ board.regDate }}</td>
      </tr>
    </tbody>
  </v-table></template>
