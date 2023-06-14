<template>
  <DataTable
    ref="dataTable"
    cardTitle="Natures"
    :moduleName="moduleName"
    :actions="{ edit: true, delete: true }"
  >
    <template v-slot:create_button>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#natueCreate"
      >
        <span class="mx-1"><i class="fa fa-plus"></i></span>
        Create
      </button>
    </template>
  </DataTable>

  <!-- start modal create -->
  <div class="modal fade" tabindex="-1" id="natueCreate">
    <div class="modal-dialog">
      <div class="modal-content">
        <VForm @submit="OnNatureSubmit" :validation-schema="nature">
          <div class="modal-header">
            <h5 class="modal-title">Create Nature</h5>

            <!--begin::Close-->
            <div
              id="close-btn"
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
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <div class="p-1">
              <button
                v-if="isLoading"
                type="button"
                class="btn btn-primary btn-sm"
                data-kt-indicator="on"
              >
                <span class="indicator-label"> Save</span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
              <button v-else type="submit" class="btn btn-primary btn-sm">
                <span class="mx-1"
                  ><i class="fa-sharp fa-solid fa-floppy-disk"></i
                ></span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
                <span>Save changes</span>
              </button>
            </div>
          </div>
        </VForm>
        <!--end::Form-->
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
      moduleName: "natures",
      isLoading: false,
      nature: Yup.object().shape({
        name: Yup.string().required().label("Name"),
      }),
    };
  },
  methods: {
    getDataListing() {
      this.$emit("getDataListing", "natures");
    },

    OnNatureSubmit(values) {
      this.isLoading = true;
      console.log("form values", values);
      this.store(values);
    },
    store(nature) {
      return ApiService.post("natures", nature)
        .then(({ data }) => {
          console.log("nature store respose");
          this.isLoading = false;
          if (data.success) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "nature created successfully",
              showConfirmButton: false,
              timer: 1500,
            });

            this.$refs.dataTable.getDataListing();
            document.getElementById("close-btn").click();
            let id = data.data.id;
            this.$router.push({ name: "natures.update", params: { id } });
            return;
          }
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "nature failed to be created",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(({ error }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "nature failed to be created",
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
