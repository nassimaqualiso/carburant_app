<template>
  <div class="card-header">
    <div class="card-title text-left">
      Branches
      <span class="text-muted mx-3">{{ $route.params.name }} </span>
    </div>

    <div class="card-toolbar d-flex justify-content-end">
      <div class="card-toolbar">
        <router-link
          class="btn btn-sm btn-primary"
          :to="{ name: 'branch.create' }"
        >
          <span class="mx-1"><i class="fa fa-plus"></i></span>
          Add new Branch
        </router-link>
      </div>
    </div>
  </div>
  <div class="card-body">
    <div v-if="isLoading">
      <div class="p-5">
        <el-skeleton :rows="7" animated />
      </div>
    </div>
    <div v-else>
      <table class="table table-row-dashed table-row-gray-300">
        <thead>
          <tr class="fw-bolder fs-7 text-gray-600">
            <th v-for="(column, index) in columns" :key="index">
              {{ column.label }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(branch, index) in branches" :key="index">
            <td v-for="(column, ind) in columns" :key="ind">
              {{ branch[column?.name] }}
            </td>
            <td class="text-end">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-light btn-sm dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Action
                </button>
                <ul class="dropdown-menu border-1">
                  <li>
                    <router-link
                      :to="{
                        name: 'branch.edit',
                        params: {
                          id: branch.id,
                        },
                      }"
                      class="dropdown-item text-primary"
                    >
                      <span class="me-2 text-primary"
                        ><i class="fa fa-edit"></i
                      ></span>
                      edit
                    </router-link>
                  </li>
                  <li>
                    <a
                      @click="deleteBranch(branch.id)"
                      type="button"
                      to="/apps/customers/customer-details"
                      class="dropdown-item text-danger"
                    >
                      <span class="me-2 text-danger">
                        <i class="fa fa-trash"></i></span
                      >Delete
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination
        v-model="current_page"
        :records="total"
        :per-page="per_page"
        @paginate="myCallback"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import type { Branch } from "@/core/interfaces/Branch";
import type { Column } from "@/core/interfaces/Column";
import NewEventModal from "@/components/modals/forms/NewEventModal.vue";
import Swal from "sweetalert2";

export default defineComponent({
  components: {},
  data() {
    return {
      current_page: 1,
      per_page: 16,
      total: 0,
      pageCount: 10,
      branches: Array<Branch>,
      isLoading: false,
      columns: Array<Column>,
    };
  },

  methods: {
    myCallback() {
      this.getDatatable();
      this.getBranches();
    },

    getBranches: function () {
      this.isLoading = true;
      return ApiService.get("branches", "?page=" + this.current_page)
        .then(({ data }) => {
          this.isLoading = false;
          this.branches = data.data.data;

          console.log("Branches data", data.data);
          this.current_page = data.data.current_page;
          this.per_page = data.data.per_page;
          this.total = data.data.total;

          // console.log("Branches", this.Branches);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getDatatable: function () {
      this.isLoading = true;
      return ApiService.get("branches/datatable")
        .then(({ data }) => {
          console.log("columns", data.data);
          this.columns = data.data;
          console.log("columns", this.columns);
          this.isLoading = false;

          // console.log("Branches", this.Branches);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    deleteBranch: function (id: number) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          return ApiService.delete("branches/" + id)
            .then(({ data }) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Branch deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              console.log(data);
              this.getDatatable();
              this.getBranches();
              this.isLoading = false;
            })
            .catch(({ response }) => {
              console.log(response);
              this.isLoading = false;
            });
        }
      });
    },

    formtDate(d) {
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      return `${da}-${mo}-${ye}`;
    },
  },

  async created() {
    await this.getDatatable();
    await this.getBranches();
  },
});
</script>
