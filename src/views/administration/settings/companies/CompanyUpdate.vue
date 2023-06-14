<template>
  <!--begin::Form-->
  <VForm
    @submit="OnCompanySubmit"
    :initial-values="intitalValues"
    :validation-schema="company"
  >
    <div class="card-header">
      <h3 class="card-title">Update company</h3>
      <div class="card-toolbar d-flex justify-content-end">
        <div class="return-button p-1">
          <button
            type="button"
            @click="$router.go(-1)"
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
            <span class="indicator-label"> update</span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <button v-else type="submit" class="btn btn-success btn-sm">
            <span class="mx-1"
              ><i class="fa-sharp fa-solid fa-floppy-disk"></i
            ></span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
            <span>update </span>
          </button>
        </div>
      </div>
      <!-- <h3 class="card-title">Create Company</h3>

      <div class="card-toolbar">
        <button type="button" class="btn btn-success btn-sm">
          <span class="mx-1"
            ><i class="fa-sharp fa-solid fa-floppy-disk"></i
          ></span>
          <span>save </span>
        </button>
      </div> -->
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

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">capital</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="capital"
            placeholder="CAPITAL"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="capital" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">date</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="date"
            name="date"
            placeholder="DATE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="date" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">idfiscale</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="idfiscale"
            placeholder="IDFISCALE"
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
          <label class="form-label fs-6 fw-bold text-dark">cnss</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="cnss"
            placeholder="CNSS"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="cnss" />
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
            name="trade_registry"
            placeholder="TRADE REGISTERY"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="trade_registry" />
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
          <label class="form-label fs-6 fw-bold text-dark">dg</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="dg"
            placeholder="DG"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="dg" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark"
            >assistance contact</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="assistance_contact"
            placeholder="ASSISTANCE CONTACT"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="assistance_contact" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark"
            >service contact</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="service_contact"
            placeholder="SERVICE CONTACT"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="service_contact" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">nature</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="nature"
            placeholder="NATURE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="nature" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
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
const store = useAuthStore();
const router = useRouter();

export default defineComponent({
  props: ["id"],
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  data() {
    return {
      isLoading: false,
      intitalValues: {},
      company: {},
    };
  },
  computed: {},

  methods: {
    OnCompanySubmit(values) {
      this.isLoading = true;
      this.update(values);
    },
    update(company) {
      return ApiService.put("companies/" + this.id, company)
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Company updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("store companies response", data);
          this.$router.push({ name: "companies.listing" });
        })
        .catch(({ error }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Company failed to be updated",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        });
    },

    getCompany() {
      ApiService.get("companies/" + this.id)
        .then(({ data }) => {
          this.isLoading = false;
          this.intitalValues = data.data;

          console.log("store companies response", data);
        })
        .catch(({ error }) => {
          console.log(error);
        });
      this.isLoading = false;
    },
  },

  async created() {
    this.isLoading = true;
    await this.getCompany();

    this.company = Yup.object().shape({
      name: Yup.string().min(4).required().label("name"),
      capital: Yup.string().required().label("capital"),
      date: Yup.date().required().label("date"),
      idfiscale: Yup.string().nullable().max(50).label("idfiscale"),
      cnss: Yup.string().nullable().label("cnss"),
      trade_registry: Yup.string().nullable().label("trade registry"),
      patent: Yup.string().nullable().label("patent"),
      dg: Yup.string().nullable().label("dg"),
      assistance_contact: Yup.string().nullable().label(" assistance contact"),
      service_contact: Yup.string().nullable().label("service contact"),
      nature: Yup.string().nullable().label("nature"),
    });
  },
});
</script>
