<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-5">
        <div class="wrap">
          <div
            class="img"
            style="background-image: url(assets/img/login.png)"
          ></div>
          <div class="login-wrap p-4 p-md-5">
            <div class="d-flex">
              <div class="w-100">
                <h3 class="mb-4">Sign Up</h3>
              </div>
              <div class="w-100">
                <p class="social-media d-flex justify-content-end">
                  <a
                    href="#"
                    class="social-icon d-flex align-items-center justify-content-center"
                    ><span class="fa fa-facebook"></span
                  ></a>
                  <a
                    href="#"
                    class="social-icon d-flex align-items-center justify-content-center"
                    ><span class="fa fa-twitter"></span
                  ></a>
                </p>
              </div>
            </div>
            <form action="" class="signin-form" method="post">
              <div class="form-group mt-3">
                <input type="text" name="name" class="form-control" required />
                <label class="form-control-placeholder" for="name">Name</label>
              </div>
              <div class="form-group mt-3">
                <input
                  type="text"
                  name="username"
                  class="form-control"
                  required
                />
                <label class="form-control-placeholder" for="username"
                  >Username</label
                >
              </div>
              <div class="form-group mt-3">
                <input type="text" name="tlpn" class="form-control" required />
                <label class="form-control-placeholder" for="username"
                  >No Tlpn</label
                >
              </div>
              <div class="form-group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="form-control"
                  required
                />
                <label class="form-control-placeholder" for="password"
                  >Password</label
                >
                <span
                  toggle="#password"
                  class="fa fa-fw fa-eye field-icon toggle-password"
                ></span>
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  name="submit"
                  class="form-control btn btn-primary rounded submit px-3"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p class="text-center">
              Have Account ?<a @click="login"> Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
