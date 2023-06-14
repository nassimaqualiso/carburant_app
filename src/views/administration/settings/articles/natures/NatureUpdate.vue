<template>
  <VForm
    @submit="OnNatureSubmit"
    :validation-schema="nature"
    :initial-values="initialValues"
  >
    <div class="card-header">
      <h3 class="card-title">Update Nature {{ id }}</h3>
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
          <button type="submit" class="btn btn-success btn-sm">
            <span class="mx-1"
              ><i class="fa-sharp fa-solid fa-floppy-disk"></i
            ></span>

            <span>Update Nature {{ id }} </span>
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <!--begin::Input group-->
      <div class="col-md-12 d-flex">
        <div>
          <label class="d-block form-label fw-bold text-dark fs-7 me-5"
            >Nature name</label
          >
        </div>
        <div>
          <Field
            class="form-control form-control-sm"
            type="text"
            name="name"
            placeholder="Nature"
          />
        </div>
        <div class="col-sm">
          <Multiselect
            mode="tags"
            placeholder="choose a category"
            v-model="natureCategories"
            :close-on-select="false"
            :searchable="true"
            :create-option="false"
            :options="pluckedCategories"
          />
        </div>
      </div>
      <div class="fv-plugins-message-container">
        <div class="fv-help-block">
          <ErrorMessage name="name" />
        </div>
      </div>
      <!--end::Input group-->
    </div>
  </VForm>
  <div class="separator border-secondary my-5"></div>
  <button @click="addSubnature()" class="btn btn-primary btn-sm mb-2">
    <i class="fa fa-plus"></i> Add Subnature
  </button>
  <br />

  <VForm
    @submit="onSubnatureSubmit"
    :validation-schema="subnature"
    v-if="showSubnatureInput"
  >
    <div class="row">
      <div class="col-md-6">
        <div class="d-flex justify-content-between">
          <div class="flex-fill pe-2">
            <Field
              tabindex="1"
              class="form-control form-control-sm"
              type="text"
              name="name"
              placeholder="SubNature"
            />
            <span class="text-danger"> <ErrorMessage name="name" /></span>
          </div>
          <div>
            <button class="btn btn-success btn-sm">
              <i class="fa fa-check"></i>
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </VForm>

  <div class="row" v-if="sub_natures.length > 0">
    <div class="col-md-12 mt-3">
      <div>
        <div
          class="list-group-item d-flex my-1"
          v-for="(sub_nature, index) in sub_natures"
          :key="index"
        >
          <div>
            <button
              @click="removeIem(sub_nature)"
              type="button"
              class="btn btn-default btn-sm"
            >
              <i class="fa fa-trash text-danger"></i>
            </button>
          </div>
          <div>
            <input
              :key="index"
              class="form-control form-control-sm"
              style="width: 97%"
              v-value="sub_nature.name"
              type="text"
              v-model="sub_nature.name"
              @blur="handleBlur($event, sub_nature)"
            />
          </div>
          <div class="d-flex justify-content-between col">
            <div class="flex-fill">
              <Multiselect
                mode="tags"
                placeholder="choose a category"
                v-model="sub_nature.selectedCategories"
                :close-on-select="false"
                :searchable="true"
                :create-option="false"
                :options="pluckedCategories"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
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
import _ from "lodash";
import { hlpFn_pluck } from "@/core/helpers/helperFn";

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
      natureCategories: [],
      sub_natures: [] as Array<any>,
      initialValues: {},
      isLoading: false,
      showSubnatureInput: false,
      nature: {
        name: Yup.string().min(3).required().label("name"),
      },
      subnature: {
        name: Yup.string().min(1).required().label("subnature"),
      },
      subNatureToEdit: {},
      currentSelectedCategories: [],
      categories: [],
    };
  },
  computed: {
    pluckedCategories() {
      return hlpFn_pluck(this.categories, "id", "name");
    },

    formatSubNatures() {
      return this.sub_natures.map((obj) => {
        obj.selectedCategories = this.getSelectedCategoriesIds(obj.categories);
        return obj;
      });
    },
  },

  methods: {
    isCategorySeleceted(category, sub_nature) {
      for (let i = 0; i < sub_nature.categories.length; i++) {
        if (category.id === sub_nature.categories[i].id) {
          return true;
        }
        return false;
      }
    },
    assignCategories(subNature) {
      console.log("subNature", subNature);
      this.subNatureToEdit = subNature;
    },

    onChange(event, permission) {
      if (!event.target.checked) {
      }
    },
    handleBlur(e, item) {
      if (e.target.value.length == 0) {
        this.removeIem(item);
      }
    },
    addSubnature() {
      this.showSubnatureInput = true;
    },
    OnNatureSubmit(values) {
      console.log("nature values ", values);
      const nature = { name: values.name, subnatures: this.sub_natures };
      this.update(nature);
    },
    onSubnatureSubmit(values) {
      this.addItem(values);
    },
    addItem(values) {
      this.sub_natures = _.filter(this.sub_natures, function (o) {
        return o.name !== values.name;
      });
      this.sub_natures.push(values);
      this.showSubnatureInput = false;
      console.log("sub natures", this.sub_natures);
    },
    removeIem(item) {
      this.sub_natures = _.filter(this.sub_natures, function (o) {
        return o.name !== item.name;
      });
    },
    getNature(param = "") {
      return ApiService.get("natures" + param)
        .then(({ data }) => {
          console.log("natures data", data.data[0]);
          this.initialValues = data.data[0];
          // this.sub_natures = data.data[0].sub_natures;
          // this.sub_natures.selectedCategories = 
          this.sub_natures = data.data[0].sub_natures.map((obj) => {
            obj.selectedCategories = this.getSelectedCategoriesIds(obj.categories);
            return obj;
          });
          this.natureCategories = data.data[0].categories.map((obj) =>
            _.get(obj, "id")
          );

          console.log("sub natures", this.sub_natures);
        })
        .catch(({ error }) => {
          console.log("natures error", error);
        });
    },

    getCategories(param = "") {
      return ApiService.get("product-categories" + param)
        .then(({ data }) => {
          console.log("product categories data", data.data);

          this.categories = data.data;
        })
        .catch(({ error }) => {
          console.log("product categories error", error);
        });
    },

    getSubNatureCategories(subnatureId) {
      return ApiService.get(
        "subnatures?with[]=categories&&id=" + subnatureId
      ).then(({ data }) => {
        console.log("subntare" + " " + subnatureId + " data", data);
      });
    },
    getSelectedCategoriesIds(categories) {
      // const selectedCategories = categories.map((obj) => _.get(obj, "id"));
      return _.map(categories, (obj) => _.get(obj, "id"));
    },

    update(nature) {
      return ApiService.put("natures/" + this.id, nature)
        .then(({ data }) => {
          this.isLoading = false;

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "nature updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("nature response", data);
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
  },

  created() {
    this.getNature(
      "?with[]=subNatures.categories&with[]=categories&id=" + this.id
    );
    this.getCategories();
  },
});
</script>
