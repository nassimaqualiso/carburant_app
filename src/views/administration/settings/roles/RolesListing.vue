<template>
  <div v-if="isLoading">
    <div class="border p-5">
      <el-skeleton :rows="1" animated />
    </div>
    <br />
    <div class="p-5">
      <el-skeleton :rows="7" animated />
    </div>
  </div>
  <div v-else>
    <div class="card-header">
      <h3 class="card-title">Roles</h3>
    </div>
    <div class="card-body">
      <table class="table table-row-dashed table-row-gray-300">
        <thead>
          <tr v class="fw-bolder fs-5 text-gray-800">
            <th>Name</th>
            <th>operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.name }}</td>
            <td>
              <router-link
                class="btn btn-icon btn-primary btn-sm"
                :to="{
                  name: 'updateRole',
                  params: {
                    id: role.id,
                  },
                }"
              >
                <i class="fa fa-cog fs-4"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import type { Role } from "@/core/interfaces/Role";

export default defineComponent({
  data() {
    return {
      roles: Array<Role>,
      isLoading: false,
    };
  },

  methods: {
    getRoles: function () {
      return ApiService.get("roles")
        .then(({ data }) => {
          this.isLoading = false;
          this.roles = data;
          console.log("roles", this.roles);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
  },

  async created() {
    this.isLoading = true;
    await this.getRoles();
  },
});
</script>
