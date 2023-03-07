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
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
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
                <h5 class="modal-title" id="exampleModalLabel">
                  Form Tambah Siswa
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="getSiswa"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="add">
                  <div class="form-gorup">
                    <label for="siswa">Masukkan Nama Siswa</label>
                    <input
                      id="siswa"
                      type="text"
                      class="form-control"
                      v-model="model.siswa.nama_siswa"
                      placeholder="Nama Siswa"
                    />
                    

                  </div>

                  <div class="form-group py-3">
                    <label for="tl">Masukkan Tanggal Lahir Siswa</label>
                    <input
                      type="date"
                      id="tl"
                      name
                      v-model="model.siswa.tanggal_lahir"
                      class="form-control"
                    />
                    
                  </div>

                  <div class="form-group">
                    <label for="kelas">Masukkan Nama Kelas</label>
                    <select
                      name
                      id="kelas"
                      class="form-control"
                      v-model="model.siswa.id_kelas"
                    >
                      <option value>Pilih Kelas</option>
                      <option
                        v-for="(s, index) in kelas"
                        :key="index"
                        :value="s.id_kelas"
                      >
                        {{ s.nama_kelas }}
                      </option>
                    </select>
                    
                  </div>

                  <div class="form-gorup">
                    <label for="siswa">Masukkan Gender Siswa</label>
                    <select v-model="model.siswa.gender" class="form-control">
                      <option value="">Pilih Gender</option>
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                                        
                  </div>

                  <div class="form-gorup">
                    <label for="siswa">Masukkan Alamat Siswa</label>
                    <input
                      id="siswa"
                      type="text"
                      class="form-control"
                      v-model="model.siswa.alamat"
                      placeholder="Alamat Siswa"
                    />
                    
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  @click="getSiswa"
                >
                  Close
                </button>
                <button type="button" class="btn btn-success" @click="add">
                  Tambah Siswa
                </button>
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
                <h5 class="modal-title" id="exampleModalLabel">
                  Form Edit Siswa
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="getSiswa"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="add">
                  <div class="form-gorup">
                    <label for="siswa">Masukkan Nama Siswa</label>
                    <input
                      id="siswa"
                      type="text"
                      class="form-control"
                      v-model="form.nama_siswa"
                      placeholder="Nama Siswa"
                    />
                    

                  </div>

                  <div class="form-group py-3">
                    <label for="tl">Masukkan Tanggal Lahir Siswa</label>
                    <input
                      type="date"
                      id="tl"
                      name
                      v-model="form.tanggal_lahir"
                      class="form-control"
                    />
                    
                  </div>

                  <div class="form-group">
                    <label for="kelas">Masukkan Nama Kelas</label>
                    <select
                      name
                      id="kelas"
                      class="form-control"
                      v-model="form.id_kelas"
                    >
                      <option value>Pilih Kelas</option>
                      <option
                        v-for="(s, index) in kelas"
                        :key="index"
                        :value="s.id_kelas"
                      >
                        {{ s.nama_kelas }}
                      </option>
                    </select>
                    
                  </div>

                  <div class="form-gorup">
                    <label for="siswa">Masukkan Gender Siswa</label>
                    <select v-model="form.gender" class="form-control">
                      <option value="">Pilih Gender</option>
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                                        
                  </div>

                  <div class="form-gorup">
                    <label for="siswa">Masukkan Alamat Siswa</label>
                    <input
                      id="siswa"
                      type="text"
                      class="form-control"
                      v-model="form.alamat"
                      placeholder="Alamat Siswa"
                    />
                    
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  @click="getSiswa"
                >
                  Close
                </button>
                <button type="button" class="btn btn-success" @click="edit">
                  Edit Siswa
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Data Siswa</h4>
            <button
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Tambah Siswa
            </button>
            <button class="btn btn-success pl-3" @click="ExportExcel">
              Export Excel
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead class="text-primary">
                  <th scope="col">ID</th>
                  <th scope="col">Nama Siswa</th>
                  <th>Tanggal Lahir</th>
                  <th>Kelas</th>
                  <th>Alamat Siswa</th>
                  <th>Gender</th>
                  <th>Aksi</th>
                </thead>
                <tbody>
                  <tr v-for="(s, index) in siswa.data" :key="index">
                    <td>{{ s.id_siswa }}</td>
                    <td>{{ s.nama_siswa }}</td>
                    <td>{{ s.tanggal_lahir }}</td>
                    <td>{{ s.nama_kelas }}</td>
                    <td>{{ s.alamat }}</td>
                    <td>{{ s.gender }}</td>
                    <td>
                      <button class="btn btn-warning" data-toggle="modal"
              data-target="#editModal" @click="ambildata(s)">
                        <font-awesome-icon icon="fa-solid fa-pen" />
                      </button>
                      |
                      <button class="btn btn-danger" @click="hapus(s.id_siswa)">
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
              <Bootstrap4Pagination
                :data="siswa"
                @pagination-change-page="getSiswa"
              />
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
      siswa: {},
      kelas: {},
      message: {
          alamat: [],
          gender: [],
          id_kelas: [],
          nama_siswa: [],
      },
      allsiswa: [],
      model: {
        siswa: {
          id_kelas: "",
          nama_siswa: "",
          tanggal_lahir: "",
          gender: "",
          alamat: "",
        },
      },
      form:{
        id_siswa: "",
        id_kelas: "",
          nama_siswa: "",
          tanggal_lahir: "",
          gender: "",
          alamat: "",
      }
    };
  },
  methods: {
    ambildata(s){
    this.form = s;
    },
    Alert(response) {
      this.message = response.data;
      this.$swal({
        icon: this.message.status,
        title: this.message.message,
      });
      this.getSiswa()
      this.load = false;
    },
    AlertError(error) {
      this.message = error;
      this.$swal({
        icon: "error",
        title: error,
      });
    },
    ExportExcel() {
      const XLSX = xlsx;
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(this.allsiswa);
      XLSX.utils.book_append_sheet(workbook, worksheet, "allsiswa");
      XLSX.writeFile(workbook, "Data-Siswa.xlsx");
    },
    getSiswa(page = 1) {
      axios
        .get("http://localhost:8000/api/siswa?page=" + page)
        .then((response) => {
        this.siswa = response.data;
        this.load = false;
        })
        .catch((error) => {
          this.AlertError(error);
        });
    },
    dataSiswa() {
      axios
        .get("http://localhost:8000/api/datasiswa")
        .then((response) => {
          this.allsiswa = response.data;
          this.load = false;
        })
        .catch((error) => {
          this.AlertError(error);
        });
    },
    getkelas() {
      axios
        .get("http://localhost:8000/api/getkelas")
        .then((response) => {
          this.kelas = response.data;
        })
        .catch((error) => {
          this.AlertError(error);
        });
    },
    add() {
      axios
        .post("http://localhost:8000/api/addsiswa", this.model.siswa)
        .then((response) => {
          this.Alert(response);
        })
        .catch((error) => {
          this.AlertError(error);
        });
    },
    hapus(id) {
      axios
        .delete(`http://localhost:8000/api/deletesiswa/${id}`)
        .then((response) => {
          this.Alert(response);
        })
        .catch((error) => {
          this.AlertError(error);
        });
    },
    edit(){
      axios
        .put(`http://localhost:8000/api/ubahsiswa/${this.form.id_siswa}`, this.form)
        .then(response => {
          this.Alert(response)
        })
        .catch((error) => {
            this.AlertError(error)
          });
    },
  },
  mounted() {
    this.getSiswa();
    this.dataSiswa();
    this.getkelas();
  },
};
</script>

<style></style>
