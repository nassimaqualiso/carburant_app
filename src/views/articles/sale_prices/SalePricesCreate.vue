<template>
  <!--begin::Form-->
  <VForm @submit="onFormSubmit" :validation-schema="rulesForm">
    <div class="card-header">
      <h3 class="card-title">Create new sale price</h3>
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
          <button v-else type="submit" @click="valideteData" class="btn btn-success btn-sm">
            <span class="mx-1"
              ><i class="fa-sharp fa-solid fa-floppy-disk"></i
            ></span>
            <span>Save </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <div class="border p-5">
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
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
          <div class="col-md-3">
            <el-skeleton :rows="1" animated />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-body">
      <div class="row">
        <!--begin::Input group registration car-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark required">Name</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="name"
            placeholder="name"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="name" />
            </div>
          </div>
        </div>
        <!--end::Input group registration car-->
        <!--begin::Input group start date-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark required">Start date</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="date"
            name="start_date"
            placeholder="start date"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="start_date" />
            </div>
          </div>
        </div>
        <!--end::Input group start date-->
        <!--begin::Input group end date-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark required">End date</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="date"
            name="end_date"
            placeholder="end date"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="end_date" />
            </div>
          </div>
        </div>
        <!--end::Input group end date-->
        <!--begin::Input group customers-->
        <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">
            Customers 
            </label>
            <span
              v-if="loadCustomers"
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
            <span
              v-if="!customers_ids.length"
              class="ms-1 badge bg-info"
            >All</span>
           <Multiselect
            :disabled="loadCustomers"
            mode="tags"
            placeholder="choose Customers"
            v-model="customers_ids"
            :close-on-select="false"
            :searchable="true"
            :options="customersList"
          />
          <!-- <select 
            multiple
            name="customers_ids" 
            class="form-select form-select-sm form-select-solid"
            >
            <optgroup v-for="customer in customersList" :label="customer?.label">
              <option v-for="opt in customer?.options" :value="opt?.value">{{ opt?.label }}</option>
            </optgroup>
          </select> -->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.customers_ids" class="text-danger">required</span>
            </div>
          </div>
        </div>
        <!--end::Input group customers-->
        <!--begin::Input group centers-->
        <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">
            Centers 
            </label>
            <span
              v-if="loadCenters"
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
            <span
              v-if="!centers_ids.length"
              class="ms-1 badge bg-info"
            >All</span>
          <Multiselect
            :disabled="loadCenters"
            mode="tags"
            placeholder="choose Centers"
            v-model="centers_ids"
            :close-on-select="false"
            :searchable="true"
            :options="centersList"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.centers_ids" class="text-danger">required</span>
            </div>
          </div>
        </div>
        <!--end::Input group centers-->
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
import _ from "lodash";
import { hlpFn_pluck } from '@/core/helpers/helperFn';
import $ from "jquery";
$.noConflict();
import { Modal } from 'bootstrap';
import { getAssetPath } from "@/core/helpers/assets";

export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    return {
      getAssetPath,
    };
  },

  data() {
    return {
      customersList: {},
      loadCustomers:false,
      all_customers:false,
      customers_ids: [],

      centersList: {},
      loadCenters:false,
      all_centers:false,
      centers_ids: [],

      isLoading: true,

      rulesForm: {},
      otherErrors:{
        customers_ids: false,
        centers_ids: false,
      },

    };
  },
  computed: {
  },

  methods: {
    isObjectEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
    closeModal: function(idModal) {
      const modal = document.getElementById(idModal);
      const modalInstance = Modal.getInstance(modal);
      modalInstance.hide();
    },
    getCustomers(){
      this.loadCustomers = true;
      return ApiService.get("sale_prices/get_list_customers")
        .then(({ data }) => {
          this.customersList = data.data;
          console.log('this.customersList', this.customersList);
          this.loadCustomers = false;
        })
        .catch(({ error }) => {
          console.log(error);
          this.loadCustomers = false;
        });
    },
    getCenters(){
      this.loadCustomers = true;
      return ApiService.get("sale_prices/get_list_centers")
        .then(({ data }) => {
          this.centersList = data.data;
          this.loadCenters = false;
        })
        .catch(({ error }) => {
          console.log(error);
          this.loadCenters = false;
        });
    },
    valideteData(){
      this.otherErrors.nature_id = !this.nature_id ? true : false;
      if(this.isObjectEmpty(this.subNatureList))
        this.otherErrors.sub_nature_id = false;
      else
        this.otherErrors.sub_nature_id = !this.sub_nature_id ? true : false;

      return Object.values(this.otherErrors).every(value => value === false);
    },
    async onFormSubmit(values) {
      this.isLoading = true;
      // if( this.valideteData() ){
      //   values.nature_id = this.nature_id;
      //   values.sub_nature_id = this.sub_nature_id;
      //   if(this.isObjectEmpty(this.datacar)){
      //     Swal.fire({
      //       position: "top-end",
      //       icon: "error",
      //       title: "Please select a datacar",
      //       showConfirmButton: false,
      //       timer: 1500,
      //     });
      //   }
      //   else {
      //     values.data_car_id = this.datacar.id;
      //     await this.store(values);
      //   }
      // }
      values.customers = this.customers_ids;
      values.centers = this.centers_ids;
      this.store(values);
    },
    store(values) {
      return ApiService.post("sale_prices", values)
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push('/articles/sale_prices/'+data?.data?.id+'/edit');
        })
        .catch((error) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.response.data.data,
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(error.response.data)
          this.isLoading = false;
        });
    },
  },
  async created() {
    try {
      await Promise.all([
        this.getCustomers(),
        this.getCenters(),
      ])
      this.isLoading = false
      this.rulesForm = Yup.object().shape({
        name: Yup.string().required().label("name"),
        start_date: Yup.date().required().label("Start date"),
      })
    } catch (error) {
      console.error(error)
    }
  },
});
</script>
