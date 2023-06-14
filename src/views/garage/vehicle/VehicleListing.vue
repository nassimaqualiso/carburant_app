<template>
  <DataTable
    cardTitle="Vehicles"
    moduleName="vehicle" 
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
