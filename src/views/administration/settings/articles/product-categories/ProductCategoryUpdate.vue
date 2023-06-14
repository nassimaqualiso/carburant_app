<template>
  <div v-if="isLoadingCategory">
    <div class="border p-5">
      <el-skeleton :rows="1" animated />
    </div>
    <br />
    <div class="p-5">
      <el-skeleton :rows="10" animated />
    </div>
  </div>
  <div v-else>
    <VForm
      @submit="OnProductCategorySubmit"
      :validation-schema="category"
      :initial-values="initialValues"
    >
      <div class="card-header">
        <h3 class="card-title">Update Category {{ id }}</h3>
        <div class="card-toolbar d-flex justify-content-end">
          <div class="return-button p-1">
            <button
              @click="$router.go(-1)"
              class="btn btn-icon btn-light border btn-sm me-2"
            >
              <i class="bi bi-arrow-return-left"></i>
            </button>
            <button
              @click="refreshCategory()"
              class="btn btn-default border btn-sm"
            >
              <i class="fa fa-refresh text-muted fs-5"></i>
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
              <span>update </span>
            </button>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <!--begin::Input group-->
        <div class="col-md-8 d-flex">
          <div>
            <label class="d-block form-label fw-bold text-dark fs-7 me-5"
              >Category name</label
            >
          </div>
          <div>
            <Field
              class="form-control form-control-sm"
              type="text"
              name="name"
              placeholder="Category"
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
    <div class="d-flex justify-content-between">
      <div>
        <button @click="addParameter()" class="btn btn-primary btn-sm">
          <i class="fa fa-plus"></i> Add Parameters
        </button>
      </div>
    </div>
    <br />

    <VForm
      @submit="OnParameterSubmit"
      :validation-schema="parameter"
      v-if="showParameterInput"
    >
      <div class="row">
        <div class="col-md-8">
          <div class="d-flex justify-content-between">
            <div class="flex-fill pe-2">
              <Field
                tabindex="1"
                class="form-control form-control-sm"
                type="text"
                name="name"
                placeholder="Parameter"
              />
              <span class="text-danger"> <ErrorMessage name="name" /></span>
            </div>
            <div class="flex-fill pe-2">
              <!-- <Field class="form-select" name="type" as="select">
              <option value="">Select value</option>
              <option value="input">Input</option>
              <option value="select">Select</option>
            </Field> -->
              <Field
                tabindex="1"
                class="form-select form-select-sm"
                as="select"
                name="type"
                placeholder="Type"
              >
                <option value="">Select value</option>
                <option value="input">Input</option>
                <option value="select">Select</option>
              </Field>
              <span class="text-danger"> <ErrorMessage name="type" /></span>
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

    <div class="row" v-if="parameters.length > 0">
      <div class="col-md-12 mt-3">
        <div
          class="d-flex my-1"
          v-for="(parameter, index) in parameters"
          :key="index"
        >
          <div>
            <input
              :key="index"
              class="form-control form-control-sm"
              type="text"
              v-model.trim="parameter.name"
              v-value="parameter.name"
              @blur="handleBlur($event, parameter)"
            />
          </div>
          <div>
            <Select
              disabled
              :key="index"
              class="form-control form-control-sm ms-2"
              :model="parameter.type"
              :value="parameter.type"
            >
              <option value="select">select</option>
              <option value="input">input</option>
            </Select>
          </div>

          <div class="d-flex justify-content-start">
            <div>
              <span
                class="btn btn-default btn-sm"
                @click="removeIem(parameter)"
                type="button"
              >
                <i class="fa fa-trash text-danger"></i>
              </span>
            </div>
            <div class="d-flex">
              <span></span>
              <button
                v-if="parameter.type === 'select'"
                data-bs-toggle="modal"
                data-bs-target="#show-options-modal"
                @click="addOption(parameter), (showParameterInput = false)"
                type="button"
                class="btn btn-default text-primary btn-sm"
              >
                <i class="fa fa-eye text-primary"></i>
                {{
                  parameter.options?.length > 0 ? "show option" : "add option"
                }}
              </button>
            </div>

            <div class="modal fade" tabindex="-1" id="show-options-modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3>Options</h3>
                    <!--bshowOptionsFormegin::Close-->
                    <div
                      class="btn btn-icon btn-sm btn-active-light-primary ms-2"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span class="svg-icon svg-icon-2x"></span>
                    </div>
                    <!--end::Close-->
                  </div>

                  <div class="modal-body">
                    <button
                      @click="showOptionsForm = true"
                      class="btn btn-primary btn-sm"
                    >
                      Add option +
                    </button>
                    <div v-if="showOptionsForm">
                      <VForm
                        @submit="onOptionSubmit"
                        :validation-schema="option"
                        :initial-values="initialValuesOptions"
                      >
                        <div class="row">
                          <div class="col-md-12">
                            <div class="d-flex justify-content-between">
                              <div class="flex-fill pe-2">
                                <Field
                                  ref="optionInput"
                                  tabindex="1"
                                  class="form-control form-control-sm"
                                  type="text"
                                  name="name"
                                  placeholder="Option"
                                />
                                <span class="text-danger">
                                  <ErrorMessage name="name"
                                /></span>
                              </div>

                              <div>
                                <button
                                  type="submit"
                                  class="btn btn-success btn-sm"
                                >
                                  save
                                  <i class="fa fa-check"></i>
                                </button>
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </VForm>
                    </div>
                    <div
                      class="d-flex my-1"
                      v-for="(option, index) in current_parameter.options"
                      :key="index"
                    >
                      <div>
                        <input
                          :key="index"
                          class="form-control form-control-sm"
                          type="text"
                          v-model.trim="option.name"
                          v-value="option.name"
                        />
                      </div>

                      <div>
                        <span
                          class="btn btn-default btn-sm"
                          @click="removeOption(option)"
                          type="button"
                        >
                          <i class="fa fa-trash text-danger"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
import _ from "lodash";
const store = useAuthStore();
const router = useRouter();
import type { Parameter } from "@/core/interfaces/Parameter";
export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  props: ["id"],

  data() {
    return {
      current_parameter: {},
      parameters: [] as Array<Parameter>,
      initialValues: {},
      isLoading: false,
      isLoadingCategory: false,
      showParameterInput: false,
      category: {
        name: Yup.string().min(4).required().label("name"),
      },
      parameter: {
        name: Yup.string().min(2).required().label("name"),
        type: Yup.string().required().label("type"),
      },
      option: {
        name: Yup.string().min(2).required().label("name"),
      },
      initialValuesOptions: {},
      showOptionsForm: false,
    };
  },
  computed: {},

  methods: {
    handleBlur(e, item) {
      if (e.target.value.length == 0) {
        this.removeIem(item);
        return;
      }
    },

    onOptionSubmit(values) {
      this.showOptionsForm = false;
      console.log("option", values);

      for (let i = 0; i < this.parameters.length; i++) {
        if (this.parameters[i] === this.current_parameter) {
          this.parameters[i].options = _.filter(
            this.parameters[i].options,
            function (o) {
              return o.name !== values.name;
            }
          );

          this.parameters[i].options.push(values);

          values = "";
          this.initialValues = { name: "" };
        }
      }
    },

    addParameter() {
      this.showParameterInput = true;
    },
    OnProductCategorySubmit(values) {
      console.log("Category values ", values);
      const category: any = {
        name: values.name,
        parameters: this.parameters,
      };
      this.updateCategory("product-categories/" + this.id, category);
    },
    OnParameterSubmit(values) {
      console.log("subnature values ", values);

      this.addItem(values);

      // this.parameters.push(values);
      // values = {};
      // console.log("nature values ", this.parameters);
    },
    addItem(values) {
      console.log("add iytem values", values);

      this.parameters = _.filter(this.parameters, function (o) {
        return o.name !== values.name;
      });

      this.parameters.push(values);
      this.showParameterInput = false;
    },
    removeIem(value) {
      this.parameters = _.filter(this.parameters, function (o) {
        return o.name !== value.name;
      });
    },
    removeOption(option) {
      for (let i = 0; i < this.parameters.length; i++) {
        this.parameters[i].options = _.filter(
          this.parameters[i].options,
          function (o) {
            return o !== option;
          }
        );
      }

      console.log("parameters after remove option", this.parameters);
    },
    addOption(value) {
      this.current_parameter = value;
    },

    getCategory(param = "") {
      this.isLoadingCategory = true;
      return ApiService.get(param)
        .then(({ data }) => {
          this.isLoadingCategory = false;
          console.log("Categories data", data.data[0]);
          this.initialValues = data.data[0];
          this.parameters = data.data[0].parameters;
        })
        .catch(({ error }) => {
          this.isLoadingCategory = false;
          // console.log("natures error", error);
        });
    },
    updateCategory(param = "", category) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showDenyButton: true,
        denyButtonText: `Don't save`,
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        denyButtonColor: "#d33",
        confirmButtonText: "Yes,update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          return ApiService.put(param, category)
            .then(({ data }) => {
              this.isLoading = false;
              console.log("update Categories data", data);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Category updated successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch(({ error }) => {
              this.isLoading = false;
              // console.log("natures error", error);
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Category failed to get updated",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not updated", "", "info");
          this.refreshCategory();
        }
      });
    },
    refreshCategory() {
      this.getCategory(
        "product-categories?with[]=parameters.options&&id=" + this.id
      );
    },
  },

  created() {
    this.getCategory(
      "product-categories?with[]=parameters.options&&id=" + this.id
    );
  },
});
</script>
