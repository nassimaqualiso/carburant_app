<template>
  <!--begin::Form-->
  <VForm v-on:on-submit="OnBranchSubmit()" :validation-schema="branch">
    <div class="card-header">
      <h3 class="card-title">Create new center</h3>
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

            <span>Save </span>
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Name</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
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
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">phone</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
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
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Company</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="company"
            placeholder="COMPANY"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="company" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">email</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="email"
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
        <div class="col-md-4 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">manager</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-solid"
            type="text"
            name="manager"
            placeholder="MANAGER"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="manager" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
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

const store = useAuthStore();
const router = useRouter();

export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
  },

  data() {
    return {
      center: {
        name: Yup.string().min(4).required().label("name"),
        phone: Yup.string().required().label("phone"),
        company: Yup.string().required().label("company"),
        email: Yup.string().email().required().label("email"),
        manager: Yup.string().required().label("manager"),
        address: Yup.string().required().label("address"),
      },
    };
  },
  computed: {},

  methods: {
    OnBranchSubmit() {},
  },

  created() {},
});
</script>
