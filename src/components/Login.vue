<template>
  <div class="content">
    <div class="row">
      <h2>Login</h2>
      <input type="email" v-model="login.email" class="form-control" placeholder="email" />
      <input type="password" v-model="login.password" class="form-control" placeholder="password" />
      <button class="btn btn-primary" @click="log">Login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "App",
  data() {
    return {
      message: {},
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    Alert(response) {
      this.message = response.data;
      this.$swal({
        icon: this.message.status,
        title: this.message.message
      });
    },
    AlertError(error) {
      this.message = error;
      this.$swal({
        icon: "error",
        title: error
      });
    },
    log() {
      axios
        .post("http://localhost:8000/api/login", this.login)
        .then(response => {
          this.Alert(response);
          const token = response.data.token;
          if (response.data.status == "success") {
            Cookies.set("token", token, { expires: 1 });
            localStorage.setItem("Auth", true);
            this.me();
          }
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
    me() {
      const token = Cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("http://localhost:8000/api/me")
        .then(response => {
          const user = response.data.message.name;
          const id = response.data.message.id;
          const email = response.data.message.email
          Cookies.set("user", user, { expires: 1 });
          Cookies.set("id", id, { expires: 1 });
          Cookies.set("email", email, { expires: 1 });
          this.$router.replace('/login');
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
  },
};
</script>

<style>
</style>