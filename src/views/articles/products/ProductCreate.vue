<template>
  <VForm @submit="onProductSubmit" :validation-schema="product">
    <div class="card-header">
      <h3 class="card-title">Create new Product</h3>
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
        <div class="col-md-3">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">type</label>
          <Field
            @change="onChangeType($event)"
            name="type"
            class="form-select form-select-sm form-select-solid"
            data-hide-search="true"
            data-placeholder="TYPE"
            as="select"
          >
            <option value="" disabled>Select type</option>
            <option value="standard">
              {{ "standard" }}
            </option>
            <option value="service">
              {{ "service" }}
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
        <!--begin::Input group-->
        <div class="col-md-3 mb-5">
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
        <div class="col-md-3 mb-5" v-if="isStandard">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">code</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="code"
            placeholder="CODE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="code" />
            </div>
          </div>
        </div>

        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">cost</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="number"
            name="cost"
            placeholder="COST"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="cost" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">price</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="number"
            name="price"
            placeholder="PRICE"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="price" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-3 mb-5" v-if="isStandard">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Quantity</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="number"
            name="qty"
            placeholder="QUANTITY"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="qty" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-md-3 mb-5" v-if="isStandard">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark"
            >Alert quantity</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="number"
            name="alert_quantity"
            placeholder="ALERT QUANTITY"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="alert_quantity" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-3 mb-5" v-if="isStandard">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark"
            >Product details</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="textarea"
            name="product_details"
            placeholder="PRODUCT DETAILS"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="product_details" />
            </div>
          </div>
        </div>

        <!--end::Input group-->
        <!--begin::Input group-->

        <div class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">Categories</label>
          <span
            v-if="isParameterLoading"
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
          <div>
            <Multiselect
              placeholder="choose a category"
              v-model="categoryValue"
              :close-on-select="true"
              :searchable="true"
              :create-option="false"
              :options="categories"
              @change="onCategoryChange($event)"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <span v-if="otherErrors.categoryValue" class="text-danger"
                  >this field is required</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- start categoryParameters -->
        <div v-for="categoryParameter in categoryParameters" class="col-md-3 mb-5">
          <label class="form-label fw-bold text-dark fs-7">{{  categoryParameter?.name  }}</label>
          <Field
            v-if="categoryParameter?.type == 'input'"
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            value=""
            :name="`parameters.paramid_${categoryParameter?.id}`"
            placeholder="CODE"
          />
          <Field
            v-if="categoryParameter?.type == 'select'"
            :name="`parameters.paramid_${categoryParameter?.id}`"
            class="form-select form-select-sm form-select-solid"
            data-hide-search="true"
            data-placeholder="TYPE"
            as="select"
          >
            <option value="" selected>Select ...</option>
            <option v-for="opt in categoryParameter?.options" :value="opt?.id">
              {{ opt?.name }}
            </option>
          </Field>
        </div>
        <!-- end categoryParameters -->
      </div>
    </div>
  </VForm>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import _ from 'lodash';

export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
    Multiselect,
  },

  data() {
    return {
      selectedFile: null,
      media: [],

      categoryValue: null,
      categories: [],
      categoryParameters: [],

      isLoading: false,
      isStandard: true,
      isInputLoading: false,
      showParameters: false,
      isParameterLoading: false,

      product: {},
      otherErrors: {
        categoryValue: false,
      },
    };
  },

  methods: {
    onChangeType(event) {
      if (event.target.value === "standard") {
        this.isStandard = true;
      } else {
        this.isStandard = false;
      }
    },
    isObjectEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
    onProductSubmit(values) {
      const parametersIds  = this.categoryParameters.map(param => `paramid_${param?.id}`);
      if(parametersIds.length){
        values.parameters = _.flow([
          Object.entries,
          arr => arr.filter(([key, value]) => parametersIds.includes(key)),
          Object.fromEntries
        ])(values.parameters);
      }
      this.isLoading = true;
      if (this.valideteData()) {
        values.product_category_id = this.categoryValue;
        this.isLoading = true;
        this.store(values);
      }else{
        this.isLoading = false;
      }
    },
    store(dataToSave) {
      console.log(dataToSave);
      this.isLoading = true;
      return ApiService.post("products", dataToSave)
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(({ error }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Product failed to be created",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        });
    },

    getCategories(param = "") {
      return ApiService.get("product-categories", param + "&pluck=name,id")
        .then(({ data }) => {
          this.categories = data.data;
          this.isInputLoading = false;
          console.log("categories", data.data);
        })
        .catch(({ error }) => {
          this.isInputLoading = false;
          console.log(error);
        });
    },
    getCategoryParameters(param = "") {
      return ApiService.get(
        "product-categories?with[]=parameters.options&id=" + param
      )
        .then(({ data }) => {
          this.isParameterLoading = false;
          console.log("category parameters", data.data[0].parameters);
          this.categoryParameters = data.data[0].parameters;
        })
        .catch(({ error }) => {
          this.isInputLoading = false;
          this.isParameterLoading = false;
          console.log(error);
        });
    },

    changeMedia(media) {
      this.media = media;
    },

    asynconchangeType(event) {
      if (event.target.value === "standard") {
        this.isStandard = true;
      } else {
        this.isStandard = false;
      }
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async onCategoryChange(id) {
      this.isParameterLoading = true;
      this.categoryParameters = [];
      this.categoryValue = null;
      if (id) this.getCategoryParameters(id);
    },

    isArrayEmpty(eee) {
      if (eee.length > 0) {
        return false;
      }
      return true;
    },

    valideteData() {
      this.otherErrors.categoryValue = !this.categoryValue ? true : false;
      return Object.values(this.otherErrors).every((value) => value === false);
    },
  },

  async created() {
    try {
      await this.getCategories("?company_id=1");

      this.isLoading = false;
      this.product = Yup.object().shape({
        type: Yup.string().required().label("type"),

        name: Yup.string().required().label("name"),
        code: Yup.string().when("type", {
          is: "standard",
          then: Yup.string().required().label("code"),
        }),
        cost: Yup.number().required().label("cost"),
        price: Yup.number().required().label("price"),
        qty: Yup.number().label("qty"),
        alert_quantity: Yup.number().label("Alert Quantity"),
        product_details: Yup.string().label("product_details"),
      });
    } catch (error) {
      console.error(error);
    }
  },
});
</script>
