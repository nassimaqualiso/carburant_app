<template>
  <DataTable
    cardTitle="Sale prices"
    moduleName="sale_prices" 
    :actions="{ edit:true, delete:true }"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import DataTable from "@/components/dataTable/DataTable.vue";

export default defineComponent({
  components: {
    DataTable
  },
  data(){
    return {
    }
  },
  methods: {

  },
  async created() {

  },
});
</script>
