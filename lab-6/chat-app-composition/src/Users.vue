<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>
    <div v-if="$route.params.userId">
      <div id="user">
        <router-link :to="{ name: 'users' }">Back to Users</router-link>
        <br /><br />

        <table>
          <tr>
            <td>User ID</td>
            <td>Username</td>
          </tr>
          <tr>
            <td>{{ $route.params.userId }}</td>
            <td>{{ getSingleUser($route.params.userId).username }}</td>
          </tr>
        </table>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteUserModal">
          Delete
        </button>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteUserModalLabel">Delete User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure that you want to delete this user?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="deleteUser($route.params.userId)">
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-else>
    <div id="users">
      <table>
        <tr v-for="user in users" v-bind:key="user.user_id">
          <td>{{ user.username }}</td>
          <td><router-link :to="{name: 'user', params: {userId: user.user_id}}" >View</router-link></td>
        </tr>
      </table>
    </div>
  </div>
  </div>


</template>

<script>
import axios from "axios";
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'

export default {
  name: 'Users',
  components: {},
  setup() {
    const router = useRouter()

    const error = ref("");
    const errorFlag = ref(false);
    const users = ref([]);

    const getUsers = () => {
      axios.get('http://localhost:3000/api/users')
          .then((response) => {
            users.value = response.data;
          }, (error) => {
            error.value = error;
            errorFlag.value = true;
          });
    }

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
            router.push('/users');
          }, (error) => {
            error.value = error;
            errorFlag.value = true;
          });
    }

    onMounted(getUsers)

    return {
      error: error,
      errorFlag: errorFlag,
      users: users,
      getUsers: getUsers,
      getSingleUser: getSingleUser,
      deleteUser: deleteUser,
    }
  }
}

</script>

<style scoped>

</style>