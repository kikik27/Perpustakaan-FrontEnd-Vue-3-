<template>
  <div id="app">
    <div class="wrapper">
      <div class="sidebar" data-color="white" data-active-color="danger">
        <div class="logo">
          <a href="https://kikik27.github.io" class="simple-text logo-mini">
            <div class="logo-image-small">
              <img src="assets/img/favicon.png" />
            </div>
          </a>
          <a href="https://kikik27.github.io" class="simple-text logo-normal"
            >PERSILET</a
          >
        </div>
        <Sidebar />
      </div>
      <div class="main-panel">
        <Navbar />
        <router-view />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "App",
  components: {
    Footer,
    Navbar,
    Sidebar,
  },
  methods:{
    cek() {
      const token = Cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
  },
  mounted(){
    this.cek()
  }
};
</script>
<style></style>
