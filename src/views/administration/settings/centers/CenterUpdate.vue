<template>
  <!--begin::Form-->
  <VForm
    @submit="OnCentersubmit"
    :validation-schema="center"
    :initial-values="intitalValues"
  >
    <div class="card-header">
      <h3 class="card-title">Create new center</h3>
      <div class="card-toolbar d-flex justify-content-end">
        <div class="return-button p-1">
          <button
            @click="$router.go(-1)"
            type="button"
            class="btn btn-icon btn-light border btn-sm"
          >
            <i class="bi bi-arrow-return-left"></i>
          </button>
        </div>
        <div class="p-1">
          <button
            v-if="isLoading"
            type="button"
            class="btn btn-success btn-sm"
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
          <button
            v-else
            type="submit"
            @click="valideteData"
            class="btn btn-success btn-sm"
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
            <span>Save </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <div class="border p-5">
        <div class="row">
          <div class="col-md-4">
            <el-skeleton :rows="2" animated />
          </div>
          <div class="col-md-4">
            <el-skeleton :rows="2" animated />
          </div>
          <div class="col-md-4">
            <el-skeleton :rows="2" animated />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-4">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-4">
            <el-skeleton :rows="1" animated />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-4">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-4">
            <el-skeleton :rows="1" animated />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-4">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-4">
            <el-skeleton :rows="1" animated />
          </div>
        </div>
      </div>
    </div>
    <div class="card-body" v-else>
      <div class="row">
        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Name</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
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
        <div class="col-md-4 mb-5">
          <label class="form-label fw-bold text-dark fs-7">Company</label>
          <div v-if="!isInputLoading">
            <Multiselect
              placeholder="choose a category"
              v-model="company_id"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options="companies"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <span v-if="otherErrors.company_id" class="text-danger"
                  >this field is required</span
                >
              </div>
            </div>
          </div>
        </div>

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">ID fiscale</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="idfiscale"
            placeholder="IDFISCALEi"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="idfiscale" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">ICE</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="ice"
            placeholder="ICE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="idfiscale" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark"
            >trade registry</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="rc"
            placeholder="TRADE REGISTERY"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="rc" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">patent</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="patent"
            placeholder="PATENT"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="patent" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Phone 1</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="phone1"
            placeholder="PHONE 1"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="phone1" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Phone 2</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="phone2"
            placeholder="PHONE 2"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="phone2" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Manager phone</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="manager_phone"
            placeholder="MANAGER PHONZ"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="manager_phone" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Manager</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="manager_phone"
            placeholder="MANAGER"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="manager" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Manager email</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="manager_email"
            placeholder="MANAGER EMAIL"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="manager_email" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Email</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="email"
            placeholder="EMAIL"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="email" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
      </div>
    </div>
  </VForm>
  <!--end::Form-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";

const store = useAuthStore();
const router = useRouter();

export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
    Multiselect,
  },
  props: ["id"],

  data() {
    return {
      isInputLoading: false,
      isLoading: false,
      center: {},
      intitalValues: {},
      company_id: null,
      companyValue: null,
      companies: [],
      centerErrorMessge: "",
      otherErrors: {
        company_id: false,
      },
    };
  },
  computed: {},

  methods: {
    OnCentersubmit(values) {
      this.isLoading = true;
      if (this.valideteData()) {
        values.company_id = this.company_id;
        this.isLoading = true;
        this.update(values);
      }
    },
    getCenter() {
      this.isLoading = true;
      return ApiService.get("centers/" + this.id)
        .then(({ data }) => {
          this.isLoading = false;
          this.intitalValues = data.data;
          this.company_id = data.data.company_id;
          console.log("center response", data);
        })
        .catch(({ error }) => {
          this.isLoading = false;
        });
    },

    update(center) {
      return ApiService.put("centers/" + this.id, center)
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "center created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getCenter();
        })
        .catch(({ error }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Permission failed to be updated",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        });
    },
    getCompanies(param) {
      return ApiService.get("centers?pluck=name,id&")
        .then(({ data }) => {
          this.companies = data.data;
          this.isInputLoading = false;
        })
        .catch(({ error }) => {
          this.isInputLoading = false;
          console.log(error);
        });
    },

    valideteData() {
      this.otherErrors.company_id = !this.company_id ? true : false;
      return Object.values(this.otherErrors).every((value) => value === false);
    },
  },

  async created() {
    try {
      await Promise.all([this.getCompanies("pluck=name,id"), this.getCenter()]);
      this.isLoading = false;
      this.center = Yup.object().shape({
        name: Yup.string().min(4).required().label("name"),
        rc: Yup.string().nullable().max(50).label("RC"),
        ice: Yup.string().nullable().max(50).label("ICE"),
        idfiscale: Yup.string().max(50).nullable().label("idfiscale"),
        patent: Yup.string().nullable().label("patent"),
        phone1: Yup.string().nullable().label("Phone1"),
        phone2: Yup.string().nullable().label("Phone2"),
        manager_phone: Yup.string().nullable().label("Phone2"),
        manager: Yup.string().nullable().label("manager"),
        manager_email: Yup.string().email().nullable().label("Email"),
        email: Yup.string().email().nullable().label("email"),
      });
    } catch (error) {
      console.error(error);
    }
  },
});
</script>
