<script setup>
import { Bootstrap4Pagination } from "laravel-vue-pagination";
</script>

<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <!-- validation -->
        <div
          v-if="siswa.status"
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>{{ siswa.status }}</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- validation -->
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tambah Peminjaman</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for>Pilih Siswa</label>
                  <select name="siswa" v-model="model.peminjaman.id_siswa" class="form-control">
                    <option value>Pilih Siswa Yang Meminjam</option>
                    <option
                      v-for="(s, index) in siswa"
                      :key="index"
                      :value="s.id_siswa"
                    >{{ s.nama_siswa }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for>Pilih Buku</label>
                  <select name="buku" v-model="model.peminjaman.id_buku" class="form-control">
                    <option value>Pilih Buku Yang Akan Dipinjam</option>
                    <option
                      v-for="(s, index) in buku"
                      :key="index"
                      :value="s.id_buku"
                    >{{ s.nama_buku }}</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" @click="AddPeminjaman">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Data peminjaman</h4>
            <button
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >Tambah Siswa</button>
            <button class="btn btn-success" @click="ExportExcel">Export Excel</button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead class="text-primary">
                  <th>ID</th>
                  <th>Nama Peminjam</th>
                  <th>Kelas</th>
                  <th>Nama Buku</th>
                  <th>Tanggal Peminjaman</th>
                  <th>Tanggal Kembali</th>
                  <th>Status Peminjaman</th>
                  <th>Denda</th>
                </thead>
                <tbody>
                  <tr v-for="(s, index) in detail_peminjaman.data" :key="index">
                    <td>{{ s.id_peminjaman }}</td>
                    <td>{{ s.nama_siswa }}</td>
                    <td>{{ s.nama_kelas }}</td>
                    <td>{{ s.nama_buku }}</td>
                    <td>{{ s.tanggal_peminjaman }}</td>
                    <!-- cek tanggal pengembalian -->
                    <td v-if="s.tanggal_kembali == null">
                      <div class="alert alert-danger" role="alert">Belum Dikembalikan</div>
                    </td>
                    <td v-else>{{ s.tanggal_kembali }}</td>
                    <!-- cek status peminjaman -->
                    <td v-if="s.status == 'belum_kembali'">
                      <button
                        class="btn btn-warning"
                        @click="kembalikan(s.id_peminjaman)"
                      >Kembalikan Buku</button>
                    </td>
                    <td v-else-if="s.status == 'denda'">
                      <button class="btn btn-danger" @click="bayar(s.id_peminjaman)">Bayar Denda</button>
                    </td>
                    <td v-else-if="s.status == 'lunas'">
                      <div
                        class="alert alert-success"
                        role="alert"
                      >Buku Sudah kembali Dan Denda Lunas</div>
                    </td>
                    <td v-else-if="s.status == 'tidak_didenda'">
                      <div
                        class="alert alert-success"
                        role="alert"
                      >Buku Sudah Dikembalikan Tepat Waktu</div>
                    </td>
                    <!-- cek denda -->
                    <td v-if="s.denda == '0' && s.status == 'tidak_didenda'">
                      <div class="alert alert-success" role="alert">Tidak Ada Denda</div>
                    </td>
                    <td v-else>
                      <div class="alert alert-danger" role="alert">Rp {{ s.denda }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-center">
                <div v-if="load" class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            <div class="pt-3 display-flex float-right pr-5">
              <Bootstrap4Pagination :data="detail_peminjaman" @pagination-change-page="getdetail" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import xlsx from "xlsx/dist/xlsx.full.min";

export default {
  name: "App",
  data() {
    return {
      load: true,
      siswa: {},
      buku: {},
      detail_peminjaman: {},
      peminjaman: [],
      message: {
        id_buku: [],
        id_siswa: []
      },

      model: {
        peminjaman: {
          id_siswa: "",
          id_buku: ""
        }
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
    ExportExcel() {
      const XLSX = xlsx;
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(this.peminjaman);
      XLSX.utils.book_append_sheet(workbook, worksheet, "peminjaman");
      XLSX.writeFile(workbook, "Data-Peminjaman.xlsx");
    },
    getdetail(page = 1) {
      axios
        .get("http://localhost:8001/api/detailpeminjaman?page=" + page)
        .then(response => {
          this.detail_peminjaman = response.data;
          this.load = false;
        });
    },
    getpeminjaman() {
      axios.get("http://localhost:8001/api/peminjaman").then(response => {
        this.peminjaman = response.data;
        this.load = false;
      });
    },
    AddPeminjaman() {
      axios
        .post("http://localhost:8001/api/addpeminjaman", this.model.peminjaman)
        .then(response => {
          this.Alert(response);
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
    getSiswa() {
      axios
        .get("http://localhost:8001/api/datasiswa")
        .then(response => {
          this.siswa = response.data;
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
    // Date() {
    //   const current = new Date();
    //   const date = `${current.getFullYear()}-${current.getMonth() +
    //     1}-${current.getDate()}`;
    //   return date;
    // },
    getBuku() {
      axios
        .get("http://localhost:8001/api/allbuku")
        .then(response => {
          this.buku = response.data;
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
    bayar(id) {
      axios
        .post(`http://localhost:8001/api/bayardenda/${id}`)
        .then(response => {
          this.Alert(response);
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
    kembalikan(id) {
      axios
        .post(`http://localhost:8001/api/kembalikanbuku/${id}`)
        .then(response => {
          this.Alert(response);
        })
        .catch(error => {
          this.AlertError(error);
        });
    }
  },
  async mounted() {
    this.getdetail();
    this.getpeminjaman();
    this.getSiswa();
    this.getBuku();
  }
};
</script>

<style></style>
