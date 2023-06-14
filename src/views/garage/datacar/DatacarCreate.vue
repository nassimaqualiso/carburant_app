<template>
  <!--begin::Form-->
  <VForm @submit="onDatacarSubmit">
    <div class="card-header">
      <h3 class="card-title">Create new datacar</h3>
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
              <span v-if="errors['brand']" class="text-danger">required</span>
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
              <span v-if="errors['model']" class="text-danger">required</span>
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
              <span v-if="errors['energy']" class="text-danger">required</span>
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
              <span v-if="errors['period']" class="text-danger">required</span>
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
              <span v-if="errors['length']" class="text-danger">required</span>
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

  data() {
    return {
      brands: [],
      models: [],
      modelsData: [],
      periods: [],
      energies: [],
      lengths: [],
      brandValue: null,
      modelValue: null,
      energyValue: null,
      periodValue: null,
      lengthValue: null,
      isLoading: true,
      loadingModels : false,
      errors:{
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
      this.errors.brand = !this.brandValue ? true : false;
      this.errors.model = !this.modelValue ? true : false;
      this.errors.energy = !this.energyValue ? true : false;
      this.errors.period = !this.periodValue ? true : false;
      this.errors.length = !this.lengthValue ? true : false;

      return Object.values(this.errors).every(value => value === false);
    },
    onDatacarSubmit(values) {
      this.isLoading = true;
      if( this.valideteData() ){
        values.vehicle_brand_id = this.brandValue;
        values.vehicle_model_id = this.modelValue;
        values.vehicle_energy_id = this.energyValue;
        values.vehicle_period_id = this.periodValue;
        values.vehicle_length_id = this.lengthValue;
        this.store(values);
      }
      this.isLoading = false;
    },
    store(datacar) {
      return ApiService.post("datacar", datacar)
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "datacar created successfully",
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
  },
  async created() {
    try {
      await Promise.all([
        this.getBrands(),
        this.getModels(),
        this.getEnergy(),
        this.getPeriod(),
        this.getLength(),
      ])
      this.isLoading = false
    } catch (error) {
      console.error(error)
    }
  },
});
</script>
