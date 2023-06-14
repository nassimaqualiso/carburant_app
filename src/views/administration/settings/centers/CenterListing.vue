<template>
  <DataTable
    ref="dataTable"
    cardTitle="Centers"
    moduleName="centers"
    :actions="{ edit: true, delete: true }"
  >
  </DataTable>
</template>

<script lang="ts">
import ApiService from "@/core/services/ApiService";
import { defineComponent, onMounted } from "vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import $ from "jquery";

export default defineComponent({
  components: {
    DataTable,
    Field,
    VForm,
    ErrorMessage,
  },
  data() {
    return {
      moduleName: "centers",
      isLoading: false,
      nature: Yup.object().shape({
        name: Yup.string().required().label("Name"),
      }),
    };
  },
  methods: {},
  async created() {},
});
</script>
