<template>
  <!--begin::Form-->
  <VForm @submit="onFormSubmit" :validation-schema="vehicle" :initial-values="intitalValues">
    <div class="card-header">
      <h3 class="card-title">Update vehicle</h3>
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
            <span class="indicator-label"> Update</span>
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
        <!--begin::Input group customer-->
        <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">Customer</label>
          <Multiselect
            placeholder="choose an customer"
            v-model="customer_id"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="customerList"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.customer_id" class="text-danger">required</span>
            </div>
          </div>
        </div>
        <!--end::Input group Energy-->
        <!--begin::Input group registration car-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Registration car</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="registration_car"
            placeholder="Registration car"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="registration_car" />
            </div>
          </div>
        </div>
        <!--end::Input group registration car-->
        <!--begin::Input group chassis no-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Chassis No</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="chassis_no"
            placeholder="Chassis No"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="chassis_no" />
            </div>
          </div>
        </div>
        <!--end::Input group chassis no-->
        <!--begin::Input group Date MCE-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Date MCE</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="date"
            name="date_mce"
            placeholder="Date MCE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="date_mce" />
            </div>
          </div>
        </div>
        <!--end::Input group Date MCE-->
         <!--begin::Input group Brand-->
         <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">Brand</label>
          <Multiselect
            @change="onSelectBrand($event)"
            placeholder="choose a Brand"
            v-model="brandValue"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="brands"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.brand" class="text-danger">required</span>
            </div>
          </div>
        </div>
        <!--end::Input group Brand-->
        <!--begin::Input group Model-->
        <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">Model</label>
          <el-skeleton v-if="loadingModels" :rows="1" animated />
          <Multiselect
            v-else
            :disabled="!brandValue"
            placeholder="choose a model"
            v-model="modelValue"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="models"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.model" class="text-danger">required</span>
            </div>
          </div>
        </div>
        <!--end::Input group Model-->
        <!--begin::Input group Energy-->
        <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">Energy</label>
          <Multiselect
            placeholder="choose an energy"
            v-model="energyValue"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="energies"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.energy" class="text-danger">required</span>
            </div>
          </div>
        </div>
        <!--end::Input group Energy-->
        <!--begin::Input group Period-->
        <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">Period</label>
          <Multiselect
            placeholder="choose a period"
            v-model="periodValue"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="periods"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.period" class="text-danger">Period is a required field</span>
            </div>
          </div>
        </div>
        <!--end::Input group Period-->
        <!--begin::Input group Length-->
        <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">Length</label>
          <Multiselect
            placeholder="choose a length"
            v-model="lengthValue"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="lengths"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.length" class="text-danger">required</span>
            </div>
          </div>
        </div>
        <!--end::Input group Length-->
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

export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
    Multiselect,
  },
  props:['id'],
  data() {
    return {
      customerList: [],
      brands: [],
      models: [],
      modelsData: [],
      periods: [],
      energies: [],
      lengths: [],
      customer_id: null,
      brandValue: null,
      modelValue: null,
      energyValue: null,
      periodValue: null,
      lengthValue: null,
      isLoading: true,
      loadingModels : false,
      intitalValues: {},
      vehicle: Object,
      otherErrors:{
        customer_id: false,
        brand: false,
        model: false,
        energy: false,
        period: false,
        length: false,
      },
    };
  },
  computed: {},

  methods: {
    async onSelectBrand(brand_id) {
      this.loadingModels = true;
      this.modelValue = null;
      this.models = [];
      const objFilter = { vehicle_brand_id: parseInt(brand_id) };
      const filteredData = _.filter(this.modelsData, objFilter );
      this.models = await hlpFn_pluck(filteredData, 'id', 'name');
      this.loadingModels = false;
      console.log('this.models', this.models);
    },
    getCustomers(){
      return ApiService.get("vehicle/get_customer_list")
        .then(({ data }) => {
          this.customerList = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    getBrands(){
      return ApiService.get("vehicle_brands/get_list")
        .then(({ data }) => {
          this.brands = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    getModels(){
      return ApiService.get("vehicle_models/get_list")
        .then(({ data }) => {
          this.modelValue = null;
          this.modelsData = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    getEnergy(){
      return ApiService.get("vehicle_energies/get_list")
        .then(({ data }) => {
          this.energies = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    getPeriod(){
      return ApiService.get("vehicle_periods/get_list")
        .then(({ data }) => {
          this.periods = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    getLength(){
      return ApiService.get("vehicle_lengths/get_list")
        .then(({ data }) => {
          this.lengths = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    valideteData(){
      this.otherErrors.customer_id = !this.customer_id ? true : false;
      this.otherErrors.brand = !this.brandValue ? true : false;
      this.otherErrors.model = !this.modelValue ? true : false;
      this.otherErrors.energy = !this.energyValue ? true : false;
      this.otherErrors.period = !this.periodValue ? true : false;
      this.otherErrors.length = !this.lengthValue ? true : false;

      return Object.values(this.otherErrors).every(value => value === false);
    },
    onFormSubmit(values) {
      this.isLoading = true;
      if( this.valideteData() ){
        values.customer_id = this.customer_id;
        values.vehicle_brand_id = this.brandValue;
        values.vehicle_model_id = this.modelValue;
        values.vehicle_energy_id = this.energyValue;
        values.vehicle_period_id = this.periodValue;
        values.vehicle_length_id = this.lengthValue;
        this.update(values);
      }
      this.isLoading = false;
    },
    update(vehicle) {
      return ApiService.put("vehicle/" + this.id, vehicle)
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "vehicle updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
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
    getVehicleId(){
      return ApiService.get("vehicle/"+ this.id)
        .then(({ data }) => {
          const vehicle = data.data;
          this.intitalValues = vehicle;
          this.customer_id = vehicle.customer_id;
          this.brandValue = vehicle.vehicle_brand_id;
          this.onSelectBrand(this.brandValue);
          this.modelValue = vehicle.vehicle_model_id;
          this.energyValue = vehicle.vehicle_energy_id;
          this.periodValue = vehicle.vehicle_period_id;
          this.lengthValue = vehicle.vehicle_length_id;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
  },
  async created() {
    try {
      await Promise.all([
        this.getCustomers(),
        this.getBrands(),
        this.getModels(),
        this.getEnergy(),
        this.getPeriod(),
        this.getLength(),
        this.getVehicleId(),
      ])
      this.isLoading = false
      this.vehicle = Yup.object().shape({
        registration_car: Yup.string().required().label("Registration car"),
        chassis_no: Yup.string().required().label("Chassis no"),
        date_mce: Yup.date().required().label("Date MCE"),
      })
    } catch (error) {
      console.error(error)
    }
  },
});
</script>
