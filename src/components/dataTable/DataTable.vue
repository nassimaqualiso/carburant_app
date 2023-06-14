<template>
  <div class="card-header">
    <div class="card-title text-left">
      {{ cardTitle }}
      <span class="text-muted mx-3">{{ $route.params.name }} </span>
    </div>

    <div class="card-toolbar d-flex justify-content-end">
      <div class="card-toolbar">
        <slot name="create_button">
          <router-link
            class="btn btn-sm btn-primary"
            :to="{ name: moduleName + '.create' }"
          >
            <span class="mx-1"><i class="fa fa-plus"></i></span>
            Create
          </router-link>
        </slot>
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
      <div
        v-if="selectedData.length > 0"
        class="d-flex justify-content-between"
      >
        <div class="text-muted fs-5">{{ selectedData.length }} selected</div>
        <div v-if="moduleName == 'products'">
          <button @click="createPack()" class="btn btn-success btn-sm">
            Create new pack
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-row-dashed table-row-gray-300">
          <thead>
            <tr class="fw-bolder fs-7 text-gray-600">
              <th v-if="showCheckbox">
                <input
                  @change="onCheckAll($event)"
                  class="form-check-input"
                  type="checkbox"
                />
              </th>
              <th
                class="text-nowrap"
                v-for="(column, index) in columns"
                :key="index"
              >
                <div class="d-flex align-items-center">
                  <label class="">{{ column.label }}</label>
                  <div>
                    <FilterTable
                      :column="column"
                      @applyFilters="onFilterChanged($event)"
                    />
                  </div>
                </div>
              </th>
              <th
                class="sticky-actions text-center text-dark"
                style="min-width: 100px"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody :class="{ 'overlay overlay-block': isLoadingFilter }">
            <div
              v-if="isLoadingFilter"
              class="overlay-layer bg-dark bg-opacity-5"
              style="display: block"
            >
              <div
                class="spinner-border text-primary"
                style="
                  width: 3rem;
                  height: 3rem;
                  position: sticky;
                  left: 50%;
                  right: 50%;
                  top: 50%;
                "
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <tr v-if="formattedItems.length == 0">
              <td
                colspan="20"
                class="text-center text-muted py-4"
                align="center"
              >
                <div
                  class="alert alert-primary d-flex align-items-center"
                  role="alert"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path
                      d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    />
                  </svg>
                  <div>No results found.</div>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(dataCol, index) in formattedItems" :key="index">
              <td v-if="showCheckbox">
                <input
                  :checked="isItemSelected(dataCol)"
                  class="form-check-input"
                  @change="onCheckItem($event, dataCol)"
                  type="checkbox"
                />
              </td>
              <td
                class="text-nowrap"
                v-for="(column, ind) in columns"
                :key="ind"
              >
                {{ dataCol[column?.name] }}
              </td>
              <td class="text-end sticky-actions">
                <div class="d-flex justify-content-around">
                  <div v-if="actions?.edit">
                    <router-link
                      :to="{
                        name: moduleName + '.update',
                        params: {
                          id: dataCol.id,
                        },
                      }"
                      class="text-primary"
                    >
                      <span class="me-2 text-primary"
                        ><i class="fa fa-edit text-primary"></i
                      ></span>
                    </router-link>
                  </div>
                  <div v-if="actions?.delete">
                    <a
                      @click="deleteCompany(dataCol.id)"
                      type="button"
                      class="text-danger"
                    >
                      <span class="me-2 text-danger">
                        <i class="fa fa-trash text-danger"></i
                      ></span>
                    </a>
                  </div>
                  <div v-if="actions?.editSmallModal && !actions?.edit">
                    <a
                      type="button"
                      class="text-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalEdit"
                    >
                      <span class="me-2 text-primary"
                        ><i class="fa fa-edit text-primary"></i
                      ></span>
                    </a>
                  </div>

                  <slot v-if="actions?.editWithModal" v-bind:id="dataCol.id">
                  </slot>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3">
        <pagination
          v-model="current_page"
          :records="total"
          :per-page="per_page"
          @paginate="myCallback"
        />
      </div>

      <!-- end modal create -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2";
import FilterTable from "@/components/dataTable/FilterTable.vue";
import moment from "moment";
import _ from "lodash";

export default defineComponent({
  name: "data-table",
  props: {
    cardTitle: String,
    moduleName: String,
    actions: Object,
    showCheckbox: {
      default: true,
      type: Boolean,
    }
  },
  computed: {
    formattedItems() {
      return this.datalist.map((item) => {
        const formattedItem = { ...item };
        this.columns.forEach((column) => {
          if (
            column.filter_type === "daterange" &&
            formattedItem[column.name]
          ) {
            formattedItem[column.name] = moment(
              formattedItem[column.name]
            ).format(column.format || "DD/MM/YYYY");
          }
          if (
            column.filter_type === "timerange" &&
            formattedItem[column.name]
          ) {
            formattedItem[column.name] = moment(
              formattedItem[column.name]
            ).format(column.format || "hh:mm");
          }
          if (
            column.filter_type === "datetimerange" &&
            formattedItem[column.name]
          ) {
            formattedItem[column.name] = moment(
              formattedItem[column.name]
            ).format(column.format || "DD/MM/YYYY hh:mm");
          }
        });
        return formattedItem;
      });
    },
  },
  components: {
    FilterTable,
  },
  data() {
    return {
      current_page: 1,
      per_page: 16,
      total: 0,
      pageCount: 10,
      datalist: Array,
      selectedData: [],
      isLoading: true,
      isLoadingFilter: false,
      columns: Array,
      filterValues: Object,
    };
  },

  methods: {
    myCallback() {
      this.isLoadingFilter = true;
      this.getDataListing();
    },
    async onFilterChanged(data) {
      this.isLoadingFilter = true;
      const obj = { ...this.filterValues, ...data };
      this.filterValues = Object.fromEntries(
        Object.entries(obj).filter(
          ([_, value]) => value !== "" && value !== null
        )
      );
      await null; // Wait for the filter to complete

      console.log(new URLSearchParams(this.filterValues).toString());
      this.getDataListing();
    },

    getDataListing: function (model = this.moduleName) {
      return ApiService.get(
        model,
        "?page=" +
          this.current_page +
          "&" +
          new URLSearchParams(this.filterValues).toString()
      )
        .then(({ data }) => {
          this.datalist = data.data.data;
          this.current_page = data.data.current_page;
          this.per_page = data.data.per_page;
          this.total = data.data.total;
          this.isLoading = false;
          this.isLoadingFilter = false;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getDatatable: function () {
      this.isLoading = true;
      return ApiService.get(this.moduleName + "/datatable")
        .then(({ data }) => {
          this.columns = data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    deleteCompany: function (id: number) {
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
          return ApiService.delete(this.moduleName + "/" + id)
            .then(({ data }) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The record deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              this.getDataListing();
              this.isLoading = false;
            })
            .catch(({ response }) => {
              this.isLoading = false;
            });
        }
      });
    },

    onCheckItem(event, item) {
      if (event.target.checked) {
        item.quantity = 1;
        this.selectedData.push(item);
        console.log("selected item", this.selectedData);
        return;
      }
      this.removeIem(item);
      console.log("selected item", this.selectedData);
    },

    isItemSelected: function (item) {
      const foundItem = _.find(
        this.selectedData,
        (dataItem) => item.id === dataItem.id
      );
      return foundItem?.id === item.id;
    },

    removeIem(item) {
      this.selectedData = _.filter(this.selectedData, function (o) {
        return o.id !== item.id;
      });
    },

    createPack() {
      this.$router.push({
        name: "packs.create",
        query: { selectedData: JSON.stringify(this.selectedData) },
      });
    },
  },

  async created() {
    await this.getDatatable();
    await this.getDataListing();
  },
});
</script>

<style>
.sticky-actions {
  text-shadow: -5px 0 17px #e9e9e9 !important;
  position: sticky !important;
  right: -0.1px !important;
  background-color: #f5f8fa !important;
}

[data-bs-theme="dark"] .sticky-actions {
  /* position: sticky !important;
  right: -0.1px !important; */
  text-shadow: -5px 0 17px #30303a85 !important;
  background-color: #1c1c20 !important;
}
</style>
