import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import _ from "lodash";
export const useRolePemissionStore = defineStore("role-permissions", () => {
  const errors = ref({});
  const rolePermissions = ref<Array<string>>([]);

  function setRolePermissions(permissions: Array<string>) {
    rolePermissions.value = permissions;
    // console.log("store: set permission result", permissions);
    // console.log("store: role permissions value",rolePermissions.value)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function getRolePermissions(id: number) {
    return ApiService.get("roles/" + id)
      .then(({ data }) => {
        setRolePermissions(_.map(data.permissions, "name"));
        // console.log("store: Role permissions", _.map(data.permissions, "name"));
      })
      .catch(({ response }) => {
        setError(response.data.message);
      });
  }

  return {
    rolePermissions,
    errors,
    getRolePermissions,
    setRolePermissions,
  };
});
