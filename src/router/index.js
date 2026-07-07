import { createWebHistory, createRouter } from "vue-router";

import Login from "@/views/Login.vue";
import ContactBook from "@/views/ContactBook.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  // Trang mặc định
  {
    path: "/",
    redirect: "/login",
  },

  // Đăng nhập
  {
    path: "/login",
    name: "login",
    component: Login,
  },

  // Trang ContactBook
  {
    path: "/contactbook",
    name: "contactbook",
    component: ContactBook,
  },

  // Thêm liên hệ
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
  },

  // Sửa liên hệ
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true,
  },

  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;