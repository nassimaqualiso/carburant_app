<template>
  <DataTable
    ref="periodDataTable"
    cardTitle="Periods"
    moduleName="vehicle_periods"
    :actions="{ edit: false, editWithModal: true, delete: true }"
  >
    <template v-slot:create_button>
      <button
        @click="(intitalValues = {}), (modalFormMode = 'create')"
        type="button"
        class="btn btn-primary btn-sm"
        data-bs-toggle="modal"
        :data-bs-target="'#modal-' + moduleName"
      >
        <span class="mx-1"><i class="fa fa-plus"></i></span>
        Create
      </button>
    </template>

    <template v-slot:default="slotProps">
      <a
        @click="editDataElement(slotProps.id)"
        data-bs-toggle="modal"
        :data-bs-target="'#modal-' + moduleName"
        type="button"
        class="text-primary"
      >
        <span class="text-danger">
          <i class="fa fa-edit text-primary"></i
        ></span>
      </a>
    </template>
  </DataTable>

  <!-- start modal create -->
  <div class="modal fade" tabindex="-1" :id="'modal-' + moduleName">
    <div class="modal-dialog">
      <div class="modal-content">
        <div v-if="!isModalLoading">
          <VForm
            :initial-values="intitalValues"
            @submit="onFormsubmit"
            :validation-schema="form"
          >
            <div class="modal-header">
              <h5 class="modal-title">{{ modalFormMode }} Brand</h5>

              <!--begin::Close-->
              <div
                ref="Close"
                class="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span class="svg-icon svg-icon-2x"></span>
              </div>
              <!--end::Close-->
            </div>

            <div class="modal-body">
              <!--begin::Form-->
              <!--begin::Input group-->
              <div class="col-md-12 mb-5">
                <!--begin::Label-->
                <label class="form-label fs-7 fw-bold text-dark">Name</label>
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  tabindex="1"
                  class="form-control form-control-sm form-control-solid"
                  type="text"
                  name="name"
                  placeholder="NAME"
                />
                <!--end::Input-->
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="col-md-12 mb-5">
                <!--begin::Label-->
                <label class="form-label fs-7 fw-bold text-dark"
                  >Start date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  tabindex="1"
                  class="form-control form-control-sm form-control-solid"
                  type="date"
                  name="start_date"
                  placeholder="START DATE"
                />
                <!--end::Input-->
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="start_date" />
                  </div>
                </div>
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="col-md-12 mb-5">
                <!--begin::Label-->
                <label class="form-label fs-7 fw-bold text-dark"
                  >End date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  tabindex="1"
                  class="form-control form-control-sm form-control-solid"
                  type="date"
                  name="end_date"
                  placeholder="END DATE"
                />
                <!--end::Input-->
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="end_date" />
                  </div>
                </div>
              </div>
              <!--end::Input group-->
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <div class="p-1">
                <button
                  v-if="isLoading"
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-kt-indicator="on"
                >
                  <span class="indicator-label">
                    {{ modalFormMode == "create" ? "save" : "update" }}</span
                  >
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  v-else
                  type="submit"
                  :class="
                    modalFormMode === 'edit'
                      ? 'btn btn-success btn-sm'
                      : 'btn btn-primary btn-sm'
                  "
                >
                  <span class="mx-1"
                    ><i class="fa-sharp fa-solid fa-floppy-disk"></i
                  ></span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                  <span>{{
                    modalFormMode == "create" ? "save" : "update"
                  }}</span>
                </button>
              </div>
            </div>
          </VForm>
          <!--end::Form-->
        </div>
        <div v-else>
          <div class="card">
            <div class="header">
              <div v-if="isLoading">
                <div class="border p-5">
                  <div class="row">
                    <div class="col-md-3">
                      <el-skeleton :rows="2" animated />
                    </div>
                  </div>
                  <div class="body">
                    <div class="col-md-12">
                      <el-skeleton :rows="1" animated />
                    </div>
                    <div class="col-md-3">
                      <el-skeleton :rows="2" animated />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal create -->
</template>

<script lang="ts">
import ApiService from "@/core/services/ApiService";
import { defineComponent, onMounted } from "vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import $ from "jquery";

export default defineComponent({
  components: {
    DataTable,
    Field,
    VForm,
    ErrorMessage,
  },
  data() {
    return {
      isModalLoading: false,
      moduleName: "vehicle_periods",
      modalFormMode: "create",
      isLoading: false,
      form: Yup.object().shape({
        name: Yup.string().required().label("Name"),
        start_date: Yup.date().required().label("Start date"),
        end_date: Yup.date().required().label("End date"),
      }),
      intitalValues: {},
      currentId: null,
    };
  },
  methods: {
    getDataListing() {
      this.$emit("getDataListing", "vehicle_periods");
    },

    async editDataElement(value) {
      this.isModalLoading = true;
      console.log(value);
      this.modalFormMode = "edit";
      this.currentId = value;
      await this.getDataElement(value);
    },

    getDataElement(value) {
      return ApiService.get(this.moduleName + "/" + value)
        .then(({ data }) => {
          this.isModalLoading = false;

          this.intitalValues = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
          this.isModalLoading = false;
        });
    },

    onFormsubmit(values) {
      this.isLoading = true;
      this.isModalLoading = true;
      if (this.modalFormMode == "create") {
        this.store(values);
        return;
      }
      this.update(values, this.currentId);
    },
    store(element) {
      return ApiService.post(this.moduleName, element)
        .then(({ data }) => {
          if (data.success) {
            this.intitalValues = {};
            this.isLoading = false;
            this.isModalLoading = false;
            this.$refs.periodDataTable.getDataListing();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "record created successfully",
              showConfirmButton: false,
              timer: 1500,
            });

            return;
          }
          return;
        })
        .catch(({ error }) => {
          this.isLoading = false;
          this.isModalLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "record failed to be created",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    update(element, id) {
      return ApiService.put(this.moduleName + "/" + id, element)
        .then(({ data }) => {
          this.intitalValues = {};
          console.log("record store respose");
          this.isLoading = false;
          this.isModalLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "record updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$refs.periodDataTable.getDataListing();
          this.getDataElement(id);
        })
        .catch(({ error }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "record failed to be updated",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        });
    },
  },
  async created() {},
});
</script>
