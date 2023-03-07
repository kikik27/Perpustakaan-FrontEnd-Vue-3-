<template>
  <div class="content">
          <!-- validation -->
          <div v-if="jumlah.siswa.status" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>{{ jumlah.siswa.status }}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- validation -->
    <div class="row my-5">

      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-4">
                <div class="icon-big text-center icon-warning">
                  <i class="nc-icon nc-single-02 text-warning"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">Jumlah Siswa</p>
                  <div v-if="load" class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <p v-else class="card-title">{{ jumlah.siswa}}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <hr />
            <div class="stats">
              <i class="nc-icon nc-tile-56"></i>
              Data Semua Siswa
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-4">
                <div class="icon-big text-center icon-warning">
                  <i class="nc-icon nc-icon nc-badge text-warning"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">Jumlah Kelas</p>
                  <div v-if="load" class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <p v-else class="card-title">{{ jumlah.kelas}}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <hr />
            <div class="stats">
              <i class="nc-icon nc-tile-56"></i>
              Data Semua Kelas
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-4">
                <div class="icon-big text-center icon-warning">
                  <i class="nc-icon nc-book-bookmark text-warning"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">Jumlah Buku</p>
                  <div v-if="load" class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <p v-else class="card-title">{{ jumlah.buku}}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <hr />
            <div class="stats">
              <i class="nc-icon nc-tile-56"></i>
              Data Semua Buku
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-4">
                <div class="icon-big text-center icon-warning">
                  <i class="nc-icon nc-basket text-warning"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">Jumlah Peminjaman</p>
                  <div v-if="load" class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <p v-else class="card-title">{{ jumlah.peminjaman}}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <hr />
            <div class="stats">
              <i class="nc-icon nc-tile-56"></i>
              Data Semua Peminjaman
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-4">
                <div class="icon-big text-center icon-warning">
                  <i class="nc-icon nc-book-bookmark text-danger"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">Buku Belum kembali</p>
                  <div v-if="load" class="spinner-border text-danger" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <p v-else class="card-title text-danger">{{ jumlah.buku_blm_kembali }}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <hr />
            <div class="stats">
              <i class="nc-icon nc-tile-56"></i>
              Data Semua Peminjaman Buku
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-4">
                <div class="icon-big text-center icon-warning">
                  <i class="nc-icon nc-money-coins text-success"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">Pendapatan Dari Denda</p>
                  <div v-if="load" class="spinner-border text-success" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <p v-else class="card-title text-success">Rp {{ jumlah.denda }}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <hr />
            <div class="stats">
              <i class="nc-icon nc-tile-56"></i>
              Data Semua Peminjaman
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Users Behavior</h5>
            <p class="card-category">24 Hours performance</p>
          </div>
          <div class="card-body">
            <canvas width="400" height="170"></canvas>
          </div>
          <div class="card-footer">
            <hr />
            <div class="stats">
              <i class="fa fa-history"></i> Updated 3 minutes ago
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      load: true,
      jumlah: {
        siswa: "",
        kelas: "",
        denda: "",
        buku: "",
        buku_blm_kembali: "",
        peminjaman: ""
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
      this.getdetail();
      this.load = false;
    },
    AlertError(error) {
      this.message = error;
      this.$swal({
        icon: "error",
        title: error
      });
    },
    jumlahSiswa() {
      axios.get("http://localhost:8000/api/jumlahsiswa").then(response => {
        this.jumlah.siswa = response.data;
        this.load = false;
      });
    },
    jumlahDenda() {
      axios.get("http://localhost:8000/api/jumlahdenda").then(response => {
        this.jumlah.denda = response.data;
        this.load = false;
      });
    },
    jumlahKelas() {
      axios.get("http://localhost:8000/api/jumlahkelas").then(response => {
        this.jumlah.kelas = response.data;
        this.load = false;
      });
    },
    jumlahBuku() {
      axios.get("http://localhost:8000/api/jumlahbuku").then(response => {
        this.jumlah.buku = response.data;
        this.load = false;
      });
    },
    jumlahBuku_blm_kembali() {
      axios
        .get("http://localhost:8000/api/jumlahbukubelumkembali")
        .then(response => {
          this.jumlah.buku_blm_kembali = response.data;
          this.load = false;
        });
    },
    jumlahPeminjaman() {
      axios.get("http://localhost:8000/api/jumlahpeminjaman").then(response => {
        this.jumlah.peminjaman = response.data;
        this.load = false;
      });
    }
  },

  mounted() {
    this.jumlahSiswa();
    this.jumlahDenda();
    this.jumlahKelas();
    this.jumlahBuku();
    this.jumlahBuku_blm_kembali();
    this.jumlahPeminjaman();
  }
};
</script>
<style></style>
