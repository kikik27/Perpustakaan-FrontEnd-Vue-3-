
<script setup>
import { Bootstrap4Pagination } from "laravel-vue-pagination";
</script>
<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <!-- validation -->
        <div v-if="buku.status" class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{{buku.status}}</strong>
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
                <h5 class="modal-title" id="exampleModalLabel">Tambah Buku</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="getBuku"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="add">
                  <div class="form-group">
                    <label for>Nama Buku</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="model.buku.nama_buku"
                      placeholder="Masukkan Nama buku"
                    />
                  </div>
                  <div class="form-group">
                    <label for>Nama Pengarang Buku</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="model.buku.nama_pengarang"
                      placeholder="Masukkan Nama Pengarang"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  @click="getBuku"
                >Close</button>
                <button type="button" class="btn btn-success" @click="add">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Edit -->
        <div
          class="modal fade"
          id="editModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Buku</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="getBuku"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="add">
                  <div class="form-group">
                    <label for>Nama Buku</label>
                    <input type="hidden" v-model="form.id_buku" />
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.nama_buku"
                      placeholder="Masukkan Nama buku"
                    />
                  </div>
                  <div class="form-group">
                    <label for>Nama Pengarang Buku</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.nama_pengarang"
                      placeholder="Masukkan Nama Pengarang"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  @click="getBuku"
                >Close</button>
                <button type="button" class="btn btn-success" @click="edit">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Data Buku</h4>
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
                  <th scope="col">ID</th>
                  <th scope="col">Nama buku</th>
                  <th scope="col">Nama Pengarang</th>
                  <th>Aksi</th>
                </thead>
                <tbody>
                  <tr v-for="(s, index) in buku.data" :key="index">
                    <td>{{ s.id_buku }}</td>
                    <td>{{ s.nama_buku }}</td>
                    <td>{{ s.nama_pengarang}}</td>
                    <td>
                      <button
                        class="btn btn-warning"
                        data-toggle="modal"
                        data-target="#editModal"
                        @click="ambildata(s)"
                      >
                        <font-awesome-icon icon="fa-solid fa-pen" />
                      </button> |
                      <button class="btn btn-danger" @click="deletebuku(s.id_buku)">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                      </button>
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
            <div class="pt-3 float-right pr-5">
              <Bootstrap4Pagination :data="buku" @pagination-change-page="getBuku" />
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
  name: "bukuPages",
  data() {
    return {
      load: true,
      buku: {},
      message: {},
      model: {
        buku: {
          nama_buku: "",
          nama_pengarang: ""
        }
      },
      form: {
        id_buku: "",
        nama_buku: "",
        nama_pengarang: ""
      }
    };
  },
  methods: {
    ambildata(s) {
      this.form = s;
    },
    Alert(response) {
      this.message = response.data;
      this.$swal({
        icon: this.message.status,
        title: this.message.message
      });
      this.getBuku();
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
      const worksheet = XLSX.utils.json_to_sheet(this.buku);
      XLSX.utils.book_append_sheet(workbook, worksheet, "buku");
      XLSX.writeFile(workbook, "buku.xlsx");
    },
    getBuku(page = 1) {
      axios
        .get("http://localhost:8001/api/buku?page=" + page)
        .then(response => {
          this.buku = response.data;
          this.load = false;
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
    hapus(id) {
      axios
        .delete(`http://localhost:8001/api/deletebuku/${id}`)
        .then(response => {
          this.Alert(response);
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
    add() {
      axios
        .post("http://localhost:8001/api/addbuku", this.model.buku)
        .then(response => {
          this.Alert(response);
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
    deletebuku(id) {
      axios
        .delete(`http://localhost:8001/api/deletebuku/${id}`)
        .then(response => {
          this.Alert(response);
        })
        .catch(error => {
          this.AlertError(error);
        });
    },
    edit() {
      axios
        .put(
          `http://localhost:8001/api/ubahbuku/${this.form.id_buku}`,
          this.form
        )
        .then(response => {
          this.Alert(response);
        })
        .catch(error => {
          this.AlertError(error);
        });
    }
  },
  mounted() {
    this.getBuku();
  }
};
</script>

<style>
</style>
