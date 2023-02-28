<template>
  <div class="content">
    <div class="row">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-5">
            <div class="wrap">
              <div class="img" style="background-image: url(assets/img/login.png)"></div>
              <div class="login-wrap p-4 p-md-5">
                <div class="d-flex">
                  <div class="w-100">
                    <h3 class="mb-4">Log In</h3>
                  </div>
                  <div class="w-100">
                    <p class="social-media d-flex justify-content-end">
                      <a
                        href="#"
                        class="social-icon d-flex align-items-center justify-content-center"
                      >
                        <span class="fa fa-facebook"></span>
                      </a>
                      <a
                        href="#"
                        class="social-icon d-flex align-items-center justify-content-center"
                      >
                        <span class="fa fa-twitter"></span>
                      </a>
                    </p>
                  </div>
                </div>
                <form action class="signin-form" method="post">
                  <div class="form-group mt-3">
                    <input type="text" name="username" class="form-control" required />
                    <label class="form-control-placeholder" for="username">Username</label>
                  </div>
                  <div class="form-group">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      class="form-control"
                      required
                    />
                    <label class="form-control-placeholder" for="password">Password</label>
                    <span toggle="#password" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                  </div>
                  <div class="form-group">
                    <button
                      type="submit"
                      name="login"
                      class="form-control btn btn-primary rounded submit px-3"
                    >Log In</button>
                  </div>
                  <div class="form-group d-md-flex">
                    <div class="w-50 text-left">
                      <label class="checkbox-wrap checkbox-primary mb-0">
                        Remember Me
                        <input type="checkbox" checked />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="w-50 text-md-right">
                      <a href="#">Forgot Password</a>
                    </div>
                  </div>
                </form>
                <p class="text-center">
                  Not a member ?
                  <a @click="register">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      status: "login",
    };
  },
  methods: {
    register() {
      this.status = "register";
    },
    login(){
      this.status = "login";
    }
  },
};
</script>

<style></style>
