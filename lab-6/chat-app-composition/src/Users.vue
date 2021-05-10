<template>
  <div>
    <div v-if="errorFlag">
      <el-alert
          title="Whoops! Something went wrong."
          type="error">
        <span>Error: {{error}}</span>
      </el-alert>
    </div>
    <div v-if="$route.params.userId">
      <div id="user">
        <el-card class="box-card">
          <template #header>
            <div class="user-card-header">
              <span>{{ getSingleUser($route.params.userId).username }}</span>
            </div>
          </template>
          <div class="card-body" style="padding-left:0px">
            User ID : {{$route.params.userId}}
          </div>
          <div class="user-card-bottom">
            <router-link :to="{ name: 'users' }">Back to Users</router-link>
            <el-popconfirm
              confirmButtonText='OK'
              confirm-button-type="danger"
              cancelButtonText='No, Thanks'
              icon="el-icon-info"
              iconColor="red"
              title="Are you sure to delete this user?"
              @confirm="deleteUser($route.params.userId)"
              >
              <template #reference>
                <el-button type="danger" plain>Delete</el-button>
              </template>
            </el-popconfirm>
          </div>
        </el-card>
      </div>
    </div>

    <div v-else>
    <div id="users">
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="user_id" label="User ID">
        </el-table-column>
        <el-table-column prop="username" label="Username">
        </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
              <router-link :to="{name: 'user', params: {userId: users[scope.$index].user_id}}">View User</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router' //imports router function we need

export default {
  name: 'Users',
  setup() {
    const router = useRouter() //initialises our router object
    const error = ref("");
    const errorFlag = ref(false);
    const users = ref([]);
    const getUsers = () => {
      axios.get('http://localhost:3000/api/users')
          .then((response) => {
            users.value = response.data;
          }, (err) => {
            error.value = err.message;
            errorFlag.value = true;
          });
    }
    onMounted(getUsers)
    const getSingleUser = (id) => {
      for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].user_id == id) {
          return users.value[i];
        }
      }
    }
    const deleteUser = (user_id) => {
      axios.delete('http://localhost:3000/api/users/' + user_id)
          .then(() => {
            for(let i = 0; i < users.value.length; i++) {
              if(user_id == users.value[i].user_id) {
                users.value.splice(i, 1);
              }
            }
            router.push('/users'); //pushes the webpage back to /users
          }, (err) => {
            error.value = err.message;
            errorFlag.value = true;
          });
    }
    return {
      error: error,
      errorFlag: errorFlag,
      users: users,
      getSingleUser: getSingleUser,
      deleteUser: deleteUser,
    }
  }
}

</script>

<style scoped>
  .user-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: inherit!important;
  }
  .user-card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .box-card {
    width: 480px;
  }
</style>