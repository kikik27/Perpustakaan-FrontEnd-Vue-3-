<script setup>
import { Bootstrap4Pagination } from "laravel-vue-pagination";
</script>
<template>
  
  <div class="content">
    <div class="row">
      <div class="col-md-12">
                  <!-- validation -->
                  <div v-if="kelas.status" class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>{{kelas.status}}</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
                    <!-- validation -->
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
                <h5 class="modal-title" id="exampleModalLabel">Form Tambah Kelas</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addkelas">
              <td>
                <div class="form-gorup">
                      <label for="siswa">Masukkan Nanam Kelas</label>
                      <input
                      id="siswa"
                        type="text"
                        class="form-control"
                        v-model="model.kelas.nama_kelas"
                        placeholder="Nama Kelas"
                      />
                    </div>
              </td>
            </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" @click="addkelas">Tambah Kelas</button>
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
                <h5 class="modal-title" id="exampleModalLabel">Edit Kelas </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="getkelas">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="add">
                  <div class="form-group">
                  <label for>Nama Kelas</label>
                  <input type="hidden" v-model="form.id_kelas">
                  <input type="text" class="form-control" v-model="form.nama_kelas" placeholder="Masukkan Nama buku">
                </div>
                </form>
                </div>  
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="getkelas">Close</button>
                <button type="button" class="btn btn-success" @click="edit">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Data Kelas</h4>
            <button
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >Tambah Kelas</button>
            <button class="btn btn-success" @click="ExportExcel">
              Export Excel
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead class="text-primary">
                  <th scope="col">ID</th>
                  <th scope="col">Nama Kelas</th>
                  <th>Aksi</th>
                </thead>
                <tbody>
                  <tr v-for="(s, index) in kelas.data" :key="index">
                    <td>{{ s.id_kelas}}</td>
                    <td>{{ s.nama_kelas }}</td>
                    <td>
                      <button class="btn btn-warning" data-toggle="modal"
              data-target="#editModal" @click="ambildata(s)">
                        <font-awesome-icon
                          icon="fa-solid fa-pen"
                          
                        />
                      </button>
                      |
                      <button
                        class="btn btn-danger"
                        @click="deletekelas(s.id_kelas)"
                      >
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
              <Bootstrap4Pagination :data="kelas" @pagination-change-page="getkelas" />
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
      load : true,
      kelas: {
        status: "",
      },
      message:{},
      model: {
        kelas: {
          nama_kelas: "",
        },
      },
      form:{
        id_kelas: "",
        nama_kelas: "",
      }
    };
  },
  methods: {
    ambildata(s){
      this.form = s;
    },
    ExportExcel() {
      const XLSX = xlsx;
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(this.kelas);
      XLSX.utils.book_append_sheet(workbook, worksheet, "kelas");
      XLSX.writeFile(workbook, "kelas.xlsx");
    },
    Alert(response) {
      this.message = response.data;
      this.$swal({
        icon: (response.data.status),
        title: (response.data.message),
        });
        this.getkelas()
        this.load = false;
    },
    AlertError(error) {
      this.message = error;
      this.$swal({
        icon: 'error',
        title: (error),
        });
    },
    addkelas() {
      axios
        .post("http://localhost:8001/api/addkelas", this.model.kelas)
        .then((response) => {this.Alert(response) 
        })
        .catch((error) => {
            this.AlertError(error)
          });
    },
    deletekelas(id) {
      axios
        .delete(`http://localhost:8001/api/deletekelas/${id}`)
        .then((response) => {
          this.Alert(response)
        })
        .catch((error) => {
            this.AlertError(error)
          });
    },
    getkelas(page = 1) {
      axios
        .get("http://localhost:8001/api/kelas?page=" + page)
        .then(response => {
          this.kelas = response.data;
          this.load = false;
        })
        .catch((error) => {
            this.AlertError(error)
          });
    },
    edit(){
      axios
        .put(`http://localhost:8001/api/ubahkelas/${this.form.id_kelas}`, this.form)
        .then(response => {
          this.Alert(response)
        })
        .catch((error) => {
            this.AlertError(error)
          });
    }
  },
  mounted() {
    this.getkelas();
  },
};
</script>

<style></style>
