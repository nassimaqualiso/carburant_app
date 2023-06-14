<template>
  <div>
    <div class="card-header">
      <div class="card-title text-left">
        Update Role
        <span class="text-muted mx-3">{{ $route.params.name }} </span>
      </div>

      <div class="card-toolbar d-flex justify-content-end">
        <div v-if="!isLoading" class="return-button p-1">
          <button
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
            <span class="indicator-label"> Save</span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <button
            v-else
            @click="updatePermissions()"
            type="button"
            class="btn btn-success btn-sm"
          >
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

    <div class="card-body">
      <div v-if="isLoading">
        <div class="border p-5">
          <el-skeleton :rows="1" animated />
        </div>
        <br />
        <div class="p-5">
          <el-skeleton :rows="10" animated />
        </div>
      </div>
      <div v-else>
        <div v-for="title in permissionsTitles" :key="title">
          <PermissionItem
            :permissions="filterPermissionsByTitle(title)"
            :title="title"
            :role_permissions="role_permissions"
          ></PermissionItem>
          <div class="separator separator-dashed border-secondary my-5"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRolePemissionStore } from "@/stores/role-permission";
import PermissionItem from "@/views/administration/settings/roles/PermissionItem.vue";
import _ from "lodash";
import Swal from "sweetalert2";

const store = useRolePemissionStore();

export interface Permission {
  id: number;
  name: string;
  group_name: string;
}

export default defineComponent({
  props: ["id"],
  components: {
    PermissionItem,
  },
  data() {
    return {
      permissions: Array<String>,
      isLoading: false,
      isButtonLoading: false,
      permissionsTitles: [],
      role_permissions: [],
    };
  },
  computed: {},

  methods: {
    updatePermissions() {
      
      console.log("permissions before update", store.rolePermissions);

      this.isButtonLoading = true;
      ApiService.post("roles/" + this.id + "/update-permissions", {
        permissions: store.rolePermissions,
      })
        .then(({ data }) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Permissions updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(data);
          this.getPermissions();
          this.setRolePermissions();
        })
        .catch(({ response }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Permission failed to be updated",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(response);
        });
    },
    getPermissions() {
      this.isLoading = true;
      return ApiService.get("permissions")
        .then(({ data }) => {
          this.permissions = data.data;
          this.permissionsTitles = this.getAllPermissionsTitles();
          this.permissions = this.listPermissionsByName(this.permissions);
          this.isLoading = false;
        })
        .catch(({ response }) => {
          console.log(response);
          this.isLoading = false;
        });
    },
    async setRolePermissions() {
      await store.getRolePermissions(this.id);
    },

    getAllPermissionsTitles() {
      return this.onlyUnique(
        _.flatMap(this.permissions, function (permission: Permission) {
          return permission.group_name;
        })
      );
    },

    onlyUnique(array) {
      return array.filter(
        (value, index, array) => array.indexOf(value) === index
      );
    },

    listPermissionsByName(permissions) {
      return _.flatMap(permissions, (permission: Permission) => {
        return permission.name;
      });
    },
    filterPermissionsByTitle(title) {
      return _.filter(this.permissions, function (n: any) {
        if (n.includes(title)) {
          return n;
        }
      });
    },
  },

  async created() {
    await this.getPermissions();
    this.setRolePermissions();

    // await this.getRolByName();
  },
});
</script>
