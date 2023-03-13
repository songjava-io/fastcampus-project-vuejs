import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/board/notice",
      name: "boardNotice",
      component: () => import("../views/BoardListView.vue"),
    },  
    {
      path: "/member/form",
      name: "memberForm",
      component: () => import("../views/MemberFormView.vue"),
    },  
    {
      path: "/event",
      name: "event",
      component: () => import("../views/EventView.vue"),    
    },
    {
      path: "/timeline/list",
      name: "timelineLine",
      component: () => import("../views/TimelineView.vue"),
    },  
    {
      path: "/timeline/form",
      name: "timeline",
      component: () => import("../views/TimelineFormView.vue"),
    },        
  ],
});

export default router;
