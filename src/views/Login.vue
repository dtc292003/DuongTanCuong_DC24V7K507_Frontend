<template>
  <div class="container mt-5" style="max-width: 400px">
    <div class="card shadow">
      <div class="card-header text-center">
        <h4>Đăng nhập</h4>
      </div>

      <div class="card-body">
        <form @submit.prevent="login">

          <div class="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              class="form-control"
              v-model="username"
              required
            />
          </div>

          <div class="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              required
            />
          </div>

          <button class="btn btn-primary btn-block">
            Đăng nhập
          </button>

          <p
            class="text-danger mt-3"
            v-if="message"
          >
            {{ message }}
          </p>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },

  methods: {
    async login() {
      try {
        await AuthService.login({
          username: this.username,
          password: this.password,
        });

        this.$router.push({
          name: "contactbook",
        });

      } catch (error) {
        this.message = "Sai tài khoản hoặc mật khẩu";
      }
    },
  },
};
</script>