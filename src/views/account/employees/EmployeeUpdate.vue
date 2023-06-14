<template>
  <!--begin::Form-->
  <VForm
    @submit="OnEmployeesubmit"
    :validation-schema="employee"
    :initial-values="intitalValues"
  >
    <div class="card-header">
      <h3 class="card-title">Create new employee</h3>
      <div class="card-toolbar d-flex justify-content-end">
        <div class="return-button p-1">
          <button
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
            <span class="indicator-label"> Save</span>
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
        <div class="col-md-3 mb-5">
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
        <div class="col-md-3 mb-5">
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
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Birth date</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="date"
            name="birth_date"
            placeholder="BIRTH DATE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="birth_date" />
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
            <option value="" disabled>Select employee Sex</option>
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
          <label class="form-label fs-7 fw-bold text-dark">CNSS</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="CNSS"
            placeholder="CNSS"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="CNSS" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Birth place</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="birth_place"
            placeholder="BIRTH PLACE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="birth_place" />
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
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="address"
            placeholder="ADDRESS"
          >
          </Field>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->

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
          <label class="form-label fw-bold text-dark fs-7"></label>
          <div class="form-check form-switch form-check-custom">
            <Field
              @change="onChangeFranchise($event)"
              class="form-check-input"
              name="is_franchise"
              type="checkbox"
              id="is_franchise"
              :value="true"
              :unchecked-value="false"
            >
            </Field>
            <label class="form-check-label" for="flexSwitchChecked"
              >Franchise</label
            >
          </div>

          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="is_franchise" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3 mb-5" v-if="showFranchise">
          <label class="form-label fw-bold text-dark fs-7">Franchise</label>
          <Multiselect
            @change="onSelectFranchise($event)"
            placeholder="choose a franchise"
            v-model="companyValue"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="companies"
          />
          <!-- <Field
            class="form-select form-select-sm form-select-solid"
            name="company_id"
            as="select"
            searchable="true"
          >
            <option value="" disabled>Select franchise</option>
            <option
              v-for="company in companies"
              :key="company.id"
              :value="company.id"
            >
              {{ company.name }}
            </option>
          </Field> -->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="company_id" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <div class="col-md-3 mb-5" v-if="showCenters">
          <label class="form-label fw-bold text-dark fs-7">Center</label>
          <div v-if="!isInputLoading">
            <Multiselect
              placeholder="choose a center"
              v-model="centerValue"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options="centers"
            />
          </div>

          <div v-else>
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <!-- 
        <div class="col-md-3 mb-5" v-if="showCenters">
          <label class="form-label fw-bold text-dark fs-7">franchise</label>
          <div v-if="!isInputLoading">
            <Multiselect
              placeholder="choose a franchise"
              v-model="companyValue"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options="companies"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="company_id" />
              </div>
            </div>
          </div>

          <div v-else>
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div> -->
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
import _ from "lodash";
const router = useRouter();

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
      centerValue: [1, 2],
      companyValue: null,
      showCenters: true,
      showFranchise: false,
      isInputLoading: false,
      isLoading: false,
      companies: [],
      centers: [],

      isCompanYListLoading: false,
      intitalValues: {
        is_franchise: false,
      },
      employee: Yup.object().shape({
        first_name: Yup.string().required().label("Firstname"),
        last_name: Yup.string().required().label("Lastname"),
        CIN: Yup.string().required().label("CIN"),
        CNSS: Yup.string().label("CNSS"),
        email: Yup.string().min(4).required().email().label("Email"),
        phone: Yup.string().required().label("Phone"),
        sex: Yup.string().required().label("SEX	"),
        birth_date: Yup.date().label("Birth date"),
        birth_place: Yup.string().label("Birth place"),
        is_franchise: Yup.bool(),
        address: Yup.string(),
      }),
    };
  },
  computed: {},

  methods: {
    OnEmployeesubmit(values) {
      values.company_id = this.companyValue;
      values.centers = this.centerValue;

      console.log("values", values);
      this.update(values);
    },
    update(employee) {
      return ApiService.put("employees/" + this.id, employee)
        .then(({ data }) => {
          this.isLoading = false;

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "employee updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("store companies response", data);
          this.$router.push({ name: "employees.listing" });
        })
        .catch(({ error }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "employee failed to be updated",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        });
    },
    getEmployee(param = "") {
      this.isLoading = true;
      this.isInputLoading = true;
      ApiService.get("employees" + param)
        .then(({ data }) => {
          this.isInputLoading = false;
          this.isLoading = false;

          // this.companyValue = data.data[0].company_id;
          // this.centerValue = obj;

          // this.centers = data.data[0].centers;
          // const arr = data.data[0].centers;
          this.companyValue = data.data[0].company_id;
          this.centers = data.data[0].centers;

          this.intitalValues = data.data[0];
          this.intitalValues.is_franchise = true;
          this.showFranchise = true;
          this.showCenters = true;

          const arr = data.data[0].centers;
          let result = arr.map((a) => a.id);
          this.centerValue = result;
          if (this.companyValue === 1) {
            this.intitalValues.is_franchise = false;
            this.showFranchise = false;
            this.showCenters = true;
          }

          // this.companyValue = data.data[0].company_id;
          // this.centerValue = obj;
          this.getFranchises("?is_franchise=true");
          this.getCenters(
            "?company_id=" + this.companyValue + "&pluck=name,id"
          );
        })
        .catch(({ error }) => {
          console.log(error);
        });
      this.isLoading = false;
    },
    getFranchises(param = "") {
      return ApiService.get("companies", param + "&pluck=name,id")
        .then(({ data }) => {
          this.isInputLoading = false;
          this.isCompanYListLoading = false;
          this.companies = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
          this.isInputLoading = false;
        });
    },
    getCenters(param = "") {
      return ApiService.get("centers", param + "&pluck=name,id")
        .then(({ data }) => {
          this.isCompanYListLoading = false;
          this.centers = data.data;
          this.isInputLoading = false;

          console.log("Centers", this.centers);
          // this.centers = JSON.parse(JSON.stringify(this.centers));
          // console.log(this.centers);
          // console.log("Centers", this.centers);
        })
        .catch(({ error }) => {
          this.isInputLoading = false;
          console.log(error);
        });
    },

    onChange(event) {
      if (event.target.checked) {
        this.showFranchise = true;
        this.getCenters("?is_franchise=true");
        return;
      }
      this.getCenters("?is_franchise=false");
      this.showFranchise = false;
    },

    onChangeFranchise(event) {
      this.isInputLoading = true;
      this.centerValue = [];
      if (event.target.checked) {
        this.showFranchise = true;
        this.showCenters = false;

        this.getCenters("?is_franchise=true");
        return;
      }
      this.getCenters("?is_franchise=false");
      this.showFranchise = false;
      this.showCenters = true;
    },
    onSelectFranchise(value) {
      console.log("Select Franchise", value);

      this.isInputLoading = true;
      if (value !== null) {
        this.getCenters("?company_id=" + value + "&pluck=name,id");
        this.showCenters = true;
      }
    },
  },
  async created() {
    await this.getEmployee("?with[]=centers&id=" + this.id);
  },
});
</script>
