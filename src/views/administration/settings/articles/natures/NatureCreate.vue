<template>
  <!--begin::Form-->
  <VForm v-on:on-submit="OnNatureSubmit()" :validation-schema="nature">
     <!--begin::Input group-->
     <div class="col-md-3 mb-5">
          <!--begin::Label-->
          <label class="form-label fs-7 fw-bold text-dark">Firstname</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-sm form-control-solid"
            type="text"
            name="first_name"
            placeholder="FIRSTNAME"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="first_name" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
  </VForm>
  <!--end::Form-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import SubNatureField from "./SubNatureFiled.vue";
import Swal from "sweetalert2";
import * as Yup from "yup";

const store = useAuthStore();
const router = useRouter();

export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
    SubNatureField,
  },

  data() {
    return {
      subNatures: [],
      nature: {
        name: Yup.string().min(4).required().label("name"),
      },
    };
  },
  computed: {},

  methods: {
    OnNatureSubmit() {},
  },

  created() {},
});
</script>
