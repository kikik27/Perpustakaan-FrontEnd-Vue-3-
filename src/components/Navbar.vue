<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle">
          <button type="button" class="navbar-toggler">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="javascript:;">Perpustakaan Siswa Moklet</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navigation">
        <ul class="navbar-nav">
          <li class="nav-item btn-rotate dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="http://example.com"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="nc-icon nc-single-02"></i>
              <p>
                <span class="d-lg-none d-md-block"></span>
              </p>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <p class="dropdown-item px-5">
                <i class="nc-icon nc-single-02">{{ this.user.name }}</i>
              </p>
              <button class="dropdown-item"  data-toggle="modal" data-target="#profil">Profil</button>
              <a class="dropdown-item" @click="keluar">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div
      class="modal fade"
      id="profil"
      tabindex="2"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Profil Saya</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="#username"> Username</label>
              <p id="username" type="text" class="form-control">{{ user.name }}</p>
            </div>
            <div class="form-group">
              <label for="#">Email</label>
              <p id="username" type="text" class="form-control">{{ user.email }}</p>
            </div>
            <div class="form-group">
              <label for="#">Member ID</label>
              <p id="username" type="text" class="form-control">MEM00{{ user.id }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
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
      user: {
        name: "",
        id: "",
        token: "",
        email: "",
      }
    };
  },
  mounted() {
    this.user.name = Cookies.get("user");
    this.user.id = Cookies.get("id");
    this.user.token = Cookies.get("token");
    this.user.email = Cookies.get("email");

  },
  methods: {
    keluar() {
      this.$swal({
        icon: "success",
        title: "Logout Berhasil, Silahkan Refresh Halaman",
      });
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("id");
      delete axios.defaults.headers.common["Authorization"];
      localStorage.setItem("Auth", false);
      this.$router.replace('/login');
    },
  }
};
</script>

<style></style>
