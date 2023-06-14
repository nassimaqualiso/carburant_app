<template>
  <!--begin::Form-->
  <VForm
    @submit="onCustomerSubmit"
    :validation-schema="customer"
    :initial-values="intitalValues"
  >
    <div class="card-header">
      <h3 class="card-title">update Customer</h3>
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
            <span>Save </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <div class="border p-5">
        <div class="row">
          <div class="col-md-3">
            <el-skeleton :rows="2" animated />
          </div>
          <div class="col-md-3">
            <el-skeleton :rows="2" animated />
          </div>
          <div class="col-md-3">
            <el-skeleton :rows="2" animated />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
        </div>
      </div>
    </div>
    <div class="card-body" v-else>
      <div class="row">
        <!--begin::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Type</label>
          <Field
            @change="onchangeType($event)"
            name="type"
            class="form-select form-select-sm form-select-solid"
            data-hide-search="true"
            data-placeholder="TYPE"
            as="select"
            value="particular"
          >
            <option value="particular">
              {{ "particular" }}
            </option>
            <option value="company">
              {{ "company" }}
            </option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="type" />
            </div>
          </div>

          <!--end::Row-->
        </div>
        <!--end::Input group-->
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3 mb-5" v-if="isParticular">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Firstname</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="first_name"
            placeholder="FIRSTNAME"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="first_name" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3 mb-5" v-if="isParticular">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Lastname</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="last_name"
            placeholder="LASTNAME"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="last_name" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Sex</label>
          <Field
            name="sex"
            class="form-select form-select-sm form-select-solid"
            data-hide-search="true"
            data-placeholder="SEX"
            as="select"
          >
            <option value="" disabled>Select Sex</option>
            <option value="M">
              {{ "M" }}
            </option>
            <option value="F">
              {{ "F" }}
            </option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="sex" />
            </div>
          </div>

          <!--end::Row-->
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3 mb-5" v-if="isCompany">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark"
            >corporate name</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="corporate_name"
            placeholder="CORPORATE NAME"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="corporate_name" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">idfiscale</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
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
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark"
            >Trade registery</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="trade_registry"
            placeholder="TRADE REGISTERY"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="trade_registery" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">patent</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
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
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">ICE</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="ICE"
            placeholder="ICE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="ICE" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Manager email</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="email"
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
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Manager phone</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="email"
            name="manager_phone"
            placeholder="MANAGER PHONE"
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
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">CIN</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="CIN"
            placeholder="CIN"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="CIN" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">email</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
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

        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Phone</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="phone"
            placeholder="PHONE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="phone" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <!--begin::Label-->

        <div class="col-md-3 mb-5">
          <label class="form-label fs-7 fw-bold text-dark">Address</label>
          <!--end::Label-->

          <Field
            type="textarea"
            tabindex="1"
            rows="3"
            placeholder="ADDRESS"
            class="form-control form-control-sm form-control-solid"
            name="address"
          >
          </Field>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
      </div>
    </div>
  </VForm>
  <!--end::Form-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  props: ["id"],

  components: {
    Field,
    VForm,
    ErrorMessage,
    Multiselect,
  },

  data() {
    return {
      intitalValues: {},
      isLoading: false,
      isParticular: true,
      isCompany: false,
      customer: Yup.object().shape({
        type: Yup.string().nullable().label("Type"),
        idfiscale: Yup.string().nullable().required().label("Lastname"),
        trade_registry: Yup.string()
          .nullable()
          .required()
          .label("trade registry"),
        patent: Yup.string().nullable().required().label("patent"),
        ICE: Yup.string().nullable().required().label("ICE"),
        CIN: Yup.string().nullable().required().label("CIN"),
        email: Yup.string().nullable().min(4).required().email().label("Email"),
        phone: Yup.string().nullable().required().label("Phone"),
        manager_phone: Yup.string()
          .nullable()
          .required()
          .label("Manager phone"),
        manager_email: Yup.string()
          .nullable()
          .required()
          .label("Manager email"),

        // centers: Yup.number().required("center is required field"),
        // company_id: Yup.number().when("is_franchise", {
        //   is: true,
        //   then: Yup.number().required("company field is required field"),
        // }),
        address: Yup.string(),
        first_name: Yup.string()
          .nullable()
          .when("type", {
            is: "particular",
            then: Yup.string().nullable().required().label("Firstname"),
          }),
        last_name: Yup.string()
          .nullable()
          .when("type", {
            is: "particular",
            then: Yup.string().required().label("Lastname"),
          }),
        corporate_name: Yup.string()
          .nullable()
          .when("type", {
            is: "company",
            then: Yup.string().required().nullable().label("Corporate name"),
          }),
        sex: Yup.string().nullable().required().label("Sex"),
      }),
    };
  },

  methods: {
    getCustomer(id) {
      this.isLoading = true;
      return ApiService.get("customers/" + id)
        .then(({ data }) => {
          this.isLoading = false;
          this.intitalValues = data.data;
        })
        .catch(({ error }) => {
          this.isLoading = false;
        });
    },
    onchangeType(event) {
      if (event.target.value === "particular") {
        this.isParticular = true;
        this.isCompany = false;
      } else {
        this.isParticular = false;
        this.isCompany = true;
      }
    },
    onCustomerSubmit(values) {
      console.log("values", values);
      this.isLoading = true;
      this.update(values);
    },
    update(customer) {
      return ApiService.put("customers/" + this.id, customer)
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Customer updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(({ error }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "customer failed to be updated",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        });
    },
  },

  async created() {
    await this.getCustomer(this.id);
  },
});
</script>
