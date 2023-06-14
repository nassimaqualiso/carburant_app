<template>
  <div class="card">
    <VForm
      @submit="onPackSubmit"
      :validation-schema="pack"
      :initial-values="intitalValues"
    >
      <div class="card-header">
        <h3 class="card-title">Update pack</h3>
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
              <span class="indicator-label"> Update</span>
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
          <!--begin::Form-->

          <div class="row">
            <div class="col-md-8 d-flex justify-content-start">
              <!--begin::Input group-->
              <div class="col-md-3 mb-5 me-2">
                <!--begin::Label-->
                <label class="form-label fs-7 fw-bold text-dark"
                  >Pack name</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  tabindex="1"
                  class="form-control form-control-sm form-control-solid"
                  type="text"
                  name="name"
                  placeholder="Pack name"
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
              <div class="col-md-3 mb-5 ms-2">
                <!--begin::Label-->
                <label class="form-label fs-7 fw-bold text-dark"
                  >Pack price</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  tabindex="1"
                  class="form-control form-control-sm form-control-solid"
                  type="number"
                  name="price"
                  placeholder="Pack name"
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
              <div class="col-md-3 mb-5 ms-2">
                <!--begin::Label-->
                <label class="form-label fs-7 fw-bold text-dark">active </label>
                <!--end::Label-->
                <div class="form-check form-switch form-check-custom">
                  <Field
                    class="form-check-input"
                    name="is_active"
                    type="checkbox"
                    id="is_active"
                    :value="true"
                    :unchecked-value="false"
                  >
                  </Field>
                </div>
              </div>
              <!--end::Input group-->
            </div>
          </div>

          <!--end::Form-->
        </div>
        <div class="separator my-5"></div>
        <div class="row">
          <div class="col-12">
            <tr class="d-flex justify-content-start">
              <td>
                <Multiselect
                  @select="onSelectByName($event)"
                  placeholder="Search by pack Name"
                  v-model="selectedProductByName"
                  :close-on-select="false"
                  :searchable="true"
                  :create-option="true"
                  :options="pluckedProductByName"
                />
              </td>
              <td>
                <Multiselect
                  @change="onSelectByPrice($event)"
                  placeholder="Search by pack price"
                  v-model="selectedProductByPrice"
                  :close-on-select="false"
                  :searchable="true"
                  :create-option="true"
                  :options="pluckedProductByPrice"
                />
              </td>
            </tr>
            <div class="separator my-5"></div>
            <div class="table-responsive">
              <table
                class="table table-hover table-row-dashed table-row-gray-300"
              >
                <thead>
                  <th>Name</th>
                  <th>type</th>
                  <th>Price</th>
                  <th>Quantity</th>

                  <th>Creation date</th>
                  <th>actions</th>
                </thead>
                <tbody>
                  <tr class="" v-for="item in data" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.price }}</td>

                    <td v-if="item.type === 'standard'">
                      <input
                        class="form-control form-control-solid form-control-sm"
                        style="width: 70px"
                        type="number"
                        v-model="item.quantity"
                      />
                    </td>
                    <td v-else></td>
                    <td>{{ item.created_at }}</td>
                    <td>
                      <button
                        @click="removeItem(item)"
                        type="button"
                        class="btn btn-icon btn-light border btn-sm"
                      >
                        <i class="fa fa-trash text-danger"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <br />
          </div>
        </div>
      </div>
    </VForm>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import { object } from "yup/lib/locale";
import { useState } from "preact/hooks";
import Multiselect from "@vueform/multiselect";
import { natureCategoryStore } from "@/stores/nature-category";
import { hlpFn_pluck } from "@/core/helpers/helperFn";
import _ from "lodash";
import type { Product } from "@/core/interfaces/Product";

const router = useRouter();
const store = natureCategoryStore();

export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
    Multiselect,
    natureSelectedCategories: [],
  },
  props: ["id"],
  data() {
    return {
      isLoding: false,
      selectedProductByPrice: "",
      selectedProductByName: "",

      isLoading: false,
      data: Array<Product>,
      products: Array<Product>,
      pack: {},
      intitalValues: {},
    };
  },
  computed: {
    pluckedProductByName() {
      return hlpFn_pluck(this.products, "id", "name");
    },
    pluckedProductByPrice() {
      return hlpFn_pluck(this.products, "id", "price");
    },
  },

  methods: {
    onPackSubmit(values) {
      this.isLoading = true;
      let pack = values;
      pack.items = this.data;

      console.log("pack to database", pack);
      this.update(pack);
    },

    update(pack) {
      return ApiService.put("packs/" + this.id, pack)
        .then(({ data }) => {
          this.isLoading = false;

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "pack updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("pack response", data);
          this.getPack();
        })
        .catch(({ error }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "pack failed to be updated",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        });
    },
    removeItem(item) {
      this.data = _.filter(this.data, function (o: Product) {
        return o.id !== item.id;
      });
    },

    getProducts() {
      this.isLoading = true;
      return ApiService.get("products/")
        .then(({ data }) => {
          this.isLoading = false;
          this.products = data.data;
        })
        .catch(({ error }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "nature failed to be updated",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        });
    },
    getPack(param = "") {
      this.isLoding = true;
      return ApiService.get("packs" + param)
        .then(({ data }) => {
          this.isLoading = false;
          this.intitalValues = data.data[0];
          this.intitalValues.is_active =
            data.data[0].is_active == 1 ? true : false;
          let items = [];

          for (let i = 0; i < data.data[0].pack_items.length; i++) {
            data.data[0].pack_items[i].product.quantity =
              data.data[0].pack_items[i].quantity;
            items.push(data.data[0].pack_items[i].product);
          }
          this.data = items;
        })
        .catch(({ error }) => {
          this.isLoading = false;
        });
    },

    onSelectByName(event) {
      console.log("data before select ", this.data);
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id == event) {
          return;
        }
      }

      let result: any = _.find(this.products, function (obj: Product) {
        return obj.id == event;
      });

      result.quantity = 1;
      this.data.push(result);
    },
    onSelectByPrice(event) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id == event) {
          return;
        }
      }
      let result: any = _.find(this.products, function (obj: Product) {
        return obj.id == event;
      });
      result.quantity = 1;
      console.log("result", result);
      this.data.push(result);
    },
  },

  async created() {
    try {
      await this.getProducts();
      await this.getPack("?with[]=packItems.product&id=" + this.id);
      this.pack = Yup.object().shape({
        name: Yup.string().min(4).required().label("name"),
        price: Yup.number().required().label("price"),
        is_active: Yup.bool(),
      });
    } catch (e) {}
  },
});
</script>
