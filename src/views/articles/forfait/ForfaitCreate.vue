<template>
  <!--begin::Form-->
  <VForm @submit="onFormSubmit" :validation-schema="rulesForm">
    <div class="card-header">
      <h3 class="card-title">Create new forfait</h3>
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
        <!--begin::Input group chassis no-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark required">price</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="number"
            name="price"
            min="0"
            placeholder="Chassis No"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="price" />
            </div>
          </div>
        </div>
        <!--end::Input group chassis no-->
        <!--begin::Input group nature-->
        <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7 required">
              Nature 
            </label>
            <span
              v-if="loadSubNature"
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          <Multiselect
            placeholder="choose an nature"
            v-model="nature_id"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="natureList"
            @change="onSelectNature($event)"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.nature_id" class="text-danger">required</span>
            </div>
          </div>
        </div>
        <!--end::Input group nature-->
        <!--begin::Input group sub_nature-->
        <!-- <div v-if="loadSubNature" class="col-md-3 mb-5">
            
        </div> -->
        <div id="subNatureList" v-if="!isObjectEmpty(subNatureList)" class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7 required">sub nature</label>
          <Multiselect
            placeholder="choose an sub_nature"
            v-model="sub_nature_id"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="subNatureList"
            :disabled="loadSubNature"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <span v-if="otherErrors.sub_nature_id" class="text-danger">required</span>
            </div>
          </div>
        </div>
        <!--end::Input group sub_nature-->
      </div>
      <fieldset class="row mt-3 py-3 border">
        <legend><span type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Datacar <i class="fa-solid fa-car"></i></span></legend>
        <div class="card">
          <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center justify-content-center">
              <img style="width: 100%; display:block" :src="getAssetPath('media/svg/auto-car/car.svg')" alt="img" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <div class="table">
                  <table>
                    <tr>
                      <th>Brand</th>
                      <td>: {{ datacar?.vehicle_brand?.name }}</td>
                    </tr>
                    <tr>
                      <th>Model</th>
                      <td>: {{ datacar?.vehicle_model?.name }}</td>
                    </tr>
                    <tr>
                      <th>Energy</th>
                      <td>: {{ datacar?.vehicle_energy?.name }}</td>
                    </tr>
                    <tr>
                      <th>Period</th>
                      <td>: {{ datacar?.vehicle_period?.name }}</td>
                    </tr>
                    <tr>
                      <th>Length</th>
                      <td>: {{ datacar?.vehicle_length?.name }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <!-- begin:: modal datacar -->
      <div v-on:hide="closeModal" class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Data car</h5>
              <button @click="onCloseModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!--begin::Input group Brand-->
              <div class="col mb-5">
                <label class="form-label fw-bold text-dark fs-7 required">Brand</label>
                <span
                  v-if="loadingModels"
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
                <Multiselect
                  @change="onSelectBrand($event)"
                  placeholder="choose a Brand"
                  v-model="brandValue"
                  :close-on-select="true"
                  :searchable="true"
                  :create-option="true"
                  :options="brands"
                />
              </div>
              <!--end::Input group Brand-->
              <!--begin::Input group Model-->
              <div v-if="!loadingModels && brandValue" class="col mb-5">
                <label class="form-label fw-bold text-dark fs-7 required">Model</label>
                <span
                  v-if="loadingEnergies"
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
                <Multiselect
                  @change="onSelectModel($event)"
                  placeholder="choose a model"
                  v-model="modelValue"
                  :close-on-select="true"
                  :searchable="true"
                  :create-option="true"
                  :options="models"
                />
              </div>
              <!--end::Input group Model-->
              <!--begin::Input group Energy-->
              <div v-if="!loadingEnergies && brandValue && modelValue" class="col mb-5">
                <label class="form-label fw-bold text-dark fs-7 required">Energy</label>
                <span
                  v-if="loadingPeriods"
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
                <Multiselect
                  v-if="!isObjectEmpty(energies)"
                  @change="onSelectEnergy($event)"
                  :disabled="!modelValue"
                  placeholder="choose an energy"
                  v-model="energyValue"
                  :close-on-select="true"
                  :searchable="true"
                  :create-option="true"
                  :options="energies"
                />
              </div>
              <!--end::Input group Energy-->
              <!--begin::Input group Period-->
              <div v-if="!loadingPeriods && brandValue && modelValue && energyValue" class="col mb-5">
                <label class="form-label fw-bold text-dark fs-7 required">Period</label>
                <span
                  v-if="loadingLengths"
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
                <Multiselect
                  v-if="!isObjectEmpty(periods)"
                  @change="onSelectPeriod($event)"
                  :disabled="!energyValue"
                  placeholder="choose a period"
                  v-model="periodValue"
                  :close-on-select="true"
                  :searchable="true"
                  :create-option="true"
                  :options="periods"
                />
              </div>
              <!--end::Input group Period-->
              <!--begin::Input group Length-->
              <div v-if="!loadingLengths && brandValue && modelValue && energyValue && periodValue" class="col mb-5">
                <label class="form-label fw-bold text-dark fs-7 required">Length</label>
                <Multiselect
                  v-if="!isObjectEmpty(lengths)"
                  placeholder="choose a length"
                  :disabled="!periodValue"
                  v-model="lengthValue"
                  :close-on-select="true"
                  :searchable="true"
                  :create-option="true"
                  :options="lengths"
                />
              </div>
              <!--end::Input group Length-->
            </div>
            <div class="modal-footer">
              <button  @click="onCloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button :disabled="loadingDataCar" @click="saveDataCar" type="button" class="btn btn-primary">
                <span v-if="loadingDataCar">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
                <span v-else >Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- end:: modal datacar -->
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
      natureList: {},
      subNatureList: {},
      loadSubNature:false,

      datacar:Object,
      brands: [],
      models: [],
      modelsData: [],
      periods: [],
      energies: [],
      lengths: [],

      nature_id: null,
      sub_nature_id: null,

      brandValue: null,
      modelValue: null,
      energyValue: null,
      periodValue: null,
      lengthValue: null,

      isLoading: true,
      loadingDataCar : false,
      loadingModels : false,
      loadingEnergies : false,
      loadingPeriods : false,
      loadingLengths : false,

      rulesForm: {},
      otherErrors:{
        nature_id: false,
        sub_nature_id: false,
        datacar: false,
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
    getNatures(){
      return ApiService.get("forfaits/get_list_nature")
        .then(({ data }) => {
          this.natureList = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    onSelectNature(nature_id){
      this.subNatureList = [];
      this.sub_nature_id = null;
      if(nature_id) this.getSubNatures(nature_id);
    },
    getSubNatures(nature_id : number){
      this.loadSubNature = true;
      return ApiService.get("forfaits/get_sub_nature?nature_id="+ nature_id)
        .then(({ data }) => {
          this.subNatureList = data.data;
          this.loadSubNature = false;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    onCloseModal(){
      this.brandValue = null;
    },
    saveDataCar(){
      if(
        !this.brandValue || !this.modelValue ||
        !this.energyValue || !this.periodValue ||
        !this.lengthValue
      ){
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Please fill out all required inputs",
            showConfirmButton: false,
            timer: 1500,
          });
      }
      else{
        this.getDataCar();
      }
    },
    getDataCar(){
      this.loadingDataCar = true;
      return ApiService.get("forfaits/get_datacar?brand_id="+this.brandValue
                            + "&model_id="+this.modelValue
                            + "&energy_id="+this.energyValue
                            + "&period_id="+this.periodValue
                            + "&length_id="+this.lengthValue+"&"
                            )
        .then(({ data }) => {
          this.datacar = data.data;
          this.closeModal('staticBackdrop');
          this.brandValue = null;
          this.loadingDataCar = false;
        })
        .catch((error) => {
          console.log(error);
          this.loadingDataCar = false;
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    getBrands(){
      return ApiService.get("forfaits/get_datacar_brands")
        .then(({ data }) => {
          this.brands = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    onSelectBrand(brand_id) {
      this.modelValue = null;
      this.models = [];
      if(brand_id) this.getModels(brand_id);
    },
    getModels(brand_id){
      this.loadingModels = true;
      return ApiService.get("forfaits/get_datacar_models?brand_id="+brand_id+"&")
        .then(({ data }) => {
          this.models = data.data;
          this.loadingModels = false;
        })
        .catch(({ error }) => {
          console.log(error);
          this.loadingModels = false;
        });
    },
    onSelectModel(model_id) {
      this.energyValue = null;
      this.energies = [];
      if(model_id) this.getEnergy(model_id);
    },
    getEnergy(model_id){
      this.loadingEnergies = true;
      return ApiService.get("forfaits/get_datacar_energies?model_id="+model_id+"&")
        .then(({ data }) => {
          this.energies = data.data;
          this.loadingEnergies = false;
        })
        .catch(({ error }) => {
          console.log(error);
          this.loadingEnergies = false;
        });
    },
    onSelectEnergy(energy_id) {
      this.periodValue = null;
      this.periods = [];
      if(energy_id) this.getPeriod(energy_id);
    },
    getPeriod(energy_id) {
      this.loadingPeriods = true;
      return ApiService.get("forfaits/get_datacar_periods?energy_id="+energy_id+"&model_id="+this.modelValue+"&")
        .then(({ data }) => {
          this.periods = data.data;
          this.loadingPeriods = false;
        })
        .catch(({ error }) => {
          console.log(error);
          this.loadingPeriods = false;
        });
    },
    onSelectPeriod(period_id) {
      this.lengthValue = null;
      this.lengths = [];
      if(period_id) this.getLength(period_id);
    },
    getLength(period_id){
      this.loadingLengths = true;
      return ApiService.get("forfaits/get_datacar_lengths?period_id="+period_id+"&energy_id="+this.energyValue+"&model_id="+this.modelValue+"&")
        .then(({ data }) => {
          this.lengths = data.data;
          this.loadingLengths = false;
        })
        .catch(({ error }) => {
          console.log(error);
          this.loadingLengths = false;
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
      if( this.valideteData() ){
        values.nature_id = this.nature_id;
        values.sub_nature_id = this.sub_nature_id;
        if(this.isObjectEmpty(this.datacar)){
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Please select a datacar",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        else {
          values.data_car_id = this.datacar.id;
          await this.store(values);
        }
      }
      this.isLoading = false;
    },
    store(forfait) {
      return ApiService.post("forfaits", forfait)
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push('/articles/forfaits');
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
        this.getNatures(),
        this.getBrands(),
        // this.getModels(),
        // this.getEnergy(),
        // this.getPeriod(),
        // this.getLength(),
      ])
      this.isLoading = false
      this.rulesForm = Yup.object().shape({
        name: Yup.string().required().label("Registration car"),
        price: Yup.number().required().label("Chassis no"),
      })
    } catch (error) {
      console.error(error)
    }
  },
});
</script>
