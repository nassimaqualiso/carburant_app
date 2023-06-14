<template>
  <!--begin::Form-->
  <VForm @submit="onFormSubmit" :validation-schema="rulesForm" :initial-values="intitalValues">
    <div class="card-header">
      <h3 class="card-title">Update</h3>
      <div class="card-toolbar d-flex justify-content-end">
        <div class="return-button p-1">
          <button
            @click="$router.push('/articles/discounts')"
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
        <!--begin::Input group name-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark required">Name</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            name="name"
            type="text"
            placeholder="name"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="name" />
            </div>
          </div>
        </div>
        <!--end::Input group name-->
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
        <!--begin::Input group Discount type-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark required">Discount type</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            name="type"
            class="form-select form-select-sm form-select-solid"
            data-hide-search="true"
            data-placeholder="Discount type"
            as="select"
          >
            <option value="" disabled>Select type</option>
            <option value="percentage">percentage</option>
            <option value="flat">flat</option>
          </Field>
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="type" />
            </div>
          </div>
        </div>
        <!--end::Input group Discount type-->
        <!--begin::Input group Discount value-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark required">Discount value</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            name="value"
            class="form-control form-control-sm form-control-solid"
            data-hide-search="true"
            data-placeholder="Discount value"
            type="number"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="value" />
            </div>
          </div>
        </div>
        <!--end::Input group Discount value-->
        <!--begin::Input group Minimum Qty-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark required">Minimum Qty</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            name="minimum_qty"
            class="form-control form-control-sm form-control-solid"
            data-hide-search="true"
            data-placeholder="Minimum Qty"
            type="number"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="minimum_qty" />
            </div>
          </div>
        </div>
        <!--end::Input group Minimum Qty-->
        <!--begin::Input group Maximum Qty-->
        <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark required">Maximum Qty</label>
          <!--end::Label-->
          <!--begin::Input-->
          <Field
            name="maximum_qty"
            class="form-control form-control-sm form-control-solid"
            data-hide-search="true"
            data-placeholder="Maximum Qty"
            type="number"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="maximum_qty" />
            </div>
          </div>
        </div>
        <!--end::Input group Maximum Qty-->
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
      <div class="row py-4" style="border-top: 2px gray solid; margin-top: 1rem">
        <!--begin::Input group type article-->
          <div class="col-md-3 mb-5">
            <label class="form-label fs-7 fw-bold text-dark required">Name</label>
            <select
              tabindex="1"
              class="form-select form-select-sm form-select-solid"
              placeholder="name"
              v-model="typeArticle"
              @change="getArticles"
            >
              <option v-for="opt,index in typeArticles" :value="index">{{ opt }}</option>
            </select>
          </div>
        <!--end::Input group type article-->
        <!--begin::Input group name-->
          <div class="col-md-3 mb-5">
            <label class="form-label fs-7 fw-bold text-dark required">Name</label>
            <input
              tabindex="1"
              class="form-control form-control-sm form-control-solid"
              type="text"
              v-model="filterArticles.name"
              placeholder="name"
              @input="getArticles"
            />
          </div>
        <!--end::Input group name-->
        <!--begin::Input group name-->
          <div v-if="typeArticle == 'product'" class="col-md-3 mb-5">
            <label class="form-label fs-7 fw-bold text-dark required">Category</label>
            <select 
              @change="getArticles" 
              v-model="filterArticles.categories"
              placeholder="Category"
              class="form-select form-select-solid"
            >
              <option value="" selected>Select category</option>
              <option v-for="catName, catId in categories" :value="catId">{{ catName }}</option>
            </select>
            
          </div>
        <!--end::Input group name-->
      </div>
      <div class="row">
        <div class="col-md-5">
          <label>Combo Articles</label>
          <div class="table-responsive scroll" style="min-height: 5rem;max-height: 30rem; overflow-y:scroll;border: 1px solid #4646465e; border-radius: 7px;">
              <table id="myTable1" class="table table-hover">
                  <thead class="bg-secondary" style="position:sticky; top:0;">
                      <tr>
                          <th class="px-2">Article</th>
                          <th>Reference</th>
                          <th class="text-center">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="unselectedArticle in unselectedArticles">
                          <td class="px-2">{{ unselectedArticle?.name }}</td>
                          <td>{{ unselectedArticle?.reference }}</td>
                          <td class="text-center">
                              <button
                                type="button"
                                @click="addArticle($event,unselectedArticle)"
                                class="btn btn-sm btn-primary py-0 px-3"
                              >
                              =>
                              </button>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="col-md-1 text-center">
          <label></label>
          <div class="mt-3 icon dripicons-swap"></div>
      </div>
      <div class="col-md-5">
          <label>Combo Articles</label>
          <div class="table-responsive scroll" style="min-height: 5rem;max-height: 30rem; overflow-y:scroll;border: 1px solid #4646465e; border-radius: 7px;">
              <table id="myTable2" class="table table-hover">
                  <thead class="bg-secondary" style="position:sticky; top:0;">
                      <tr>
                          <th class="px-2">Action</th>
                          <th>Article</th>
                          <th>Reference</th>
                          <!-- <th>Origine Unit Price</th>
                          <th>Updated Unit Price</th> -->
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="selectedArticle in  selectedArticles">
                          <td class="px-2">
                              <button
                                type="button"
                                class="btn btn-sm btn-danger px-2 py-1 text-center"
                                @click="deleteArticle(selectedArticle)"
                              >
                                <i class="fa-solid fa-trash p-0"></i>
                              </button>
                          </td>
                          <td>{{ selectedArticle?.name }}</td>
                          <td>{{ selectedArticle?.reference }}</td>
                          <!-- <td class="text-right">{{ selectedArticle?.origine_price }}</td>
                          <td>
                              <input 
                                min="0" 
                                style="direction: rtl;" 
                                type="number" 
                                v-model="selectedArticle.new_price"
                                class="form-control-sm">
                          </td> -->
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
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
  props: ['id'],
  data() {
    return {
      intitalValues: {},
      typeArticle : "product",
      typeArticles : {
        product: "Product",
        pack: "Packs",
        forfait: "Forfait",
      },
      categories:{},
      filterArticles:{
        name : '',
        categories: ""
      },

      customersList: {},
      loadCustomers:false,
      all_customers:false,
      customers_ids: [],

      centersList: {},
      loadCenters:false,
      all_centers:false,
      centers_ids: [],

      unselectedArticles:[],
      selectedArticles:[],

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
      return ApiService.get("discounts/get_list_customers")
        .then(({ data }) => {
          this.customersList = data.data;
          this.loadCustomers = false;
        })
        .catch(({ error }) => {
          console.log(error);
          this.loadCustomers = false;
        });
    },
    getCenters(){
      this.loadCustomers = true;
      return ApiService.get("discounts/get_list_centers")
        .then(({ data }) => {
          this.centersList = data.data;
          this.loadCenters = false;
        })
        .catch(({ error }) => {
          console.log(error);
          this.loadCenters = false;
        });
    },
    async onFormSubmit(values) {
      this.isLoading = true;
      values.customers = this.customers_ids;
      values.centers = this.centers_ids;
      console.log(this.selectedArticles);
      values.products = this.selectedArticles.filter((article) => article.type_article == 'product')
                                              .map((art) => { return {object_id: art?.id }});

      values.packs = this.selectedArticles.filter((article) => article.type_article == 'pack')
                                              .map((art) => { return {object_id: art?.id }});

      values.forfaits = this.selectedArticles.filter((article) => article.type_article == 'forfait')
                                              .map((art) => { return {object_id: art?.id }});
      this.update(values);
    },
    update(values) {
      return ApiService.put("discounts/"+ this.id, values)
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.message,
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
    getIntitalValues(){
      return ApiService.get("discounts/"+ this.id)
        .then(({ data }) => {
          const result = data.data;
          if(!result.all_customer) this.customers_ids = result.discount_customers.map(({ customer_id }) => customer_id );
          if(!result.all_center) this.centers_ids = result.discount_centers.map(({ center_id }) => center_id );
          let products = result.hasOwnProperty('products') ? result?.products.map( product => { 
            return {
              object_id: product?.id,
              name: product?.name,
              reference: product?.code,
              type_article: 'product'
            }
          }) : [];
          let packs = result.hasOwnProperty('packs') ? result?.packs.map( pack => { 
            return {
              id: pack?.id,
              name: pack?.name,
              reference: pack?.reference,
              type_article: 'pack'
            }
          }) : [];
          let forfaits = result.hasOwnProperty('forfaits') ? result.forfaits.map( forfait => { 
            return {
              id: forfait?.id,
              name: forfait?.name,
              reference: forfait?.reference,
              type_article: 'forfait'
            }
          }) : [];
          this.selectedArticles = [
            ...products,
            ...packs,
            ...forfaits,
          ];
          this.intitalValues = result;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    addArticle(event, article:never){
      event.target.disabled = true;
      const index = this.selectedArticles.findIndex(art => {
        return art.id === article.id && art.type_article === article.type_article
      });
      if (index <= -1) this.selectedArticles.push(article);
      else Swal.fire({
            position: "top-end",
            icon: "error",
            title: "This article already exists",
            showConfirmButton: false,
            timer: 1500,
          });
      event.target.disabled = false;
    },
    deleteArticle(article){
      this.selectedArticles = this.selectedArticles.filter(art=> art !== article)
    },
    getCategories(){
      ApiService.get("discounts/get_product_categories")
        .then(({ data }) => {
          this.categories = data.data;
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
    getArticles(){
      console.log(this.filterArticles.categories);
      let queryString = "type_articles=" + this.typeArticle;
      queryString += "&name="+this.filterArticles.name;
      if(this.typeArticle == 'product') queryString += "&categories="+this.filterArticles.categories;
      ApiService.get("discounts/get_articles?"+queryString+"&")
        .then(({ data }) => {
          this.unselectedArticles = data.data.map( (dt) => {
              dt.type_article = this.typeArticle;
              return dt;
          });
        })
        .catch(({ error }) => {
          console.log(error);
        });
    }
  },
  async created() {
    try {
      await Promise.all([
        this.getCustomers(),
        this.getCenters(),
        this.getCategories(),
        this.getIntitalValues(),
      ])
      this.isLoading = false
      this.rulesForm = Yup.object().shape({
        name: Yup.string().required().label("name"),
        start_date: Yup.date().required().label("Start date"),
        end_date: Yup.date().required().label("End date"),
        type: Yup.string().required().label("Discount type"),
        value: Yup.number().required().label("Discount value"),
        minimum_qty: Yup.number().required().label("Minimum Qty"),
        maximum_qty: Yup.number().required().label("Maximum Qty"),
      })
    } catch (error) {
      console.error(error)
    }
  },
});
</script>
