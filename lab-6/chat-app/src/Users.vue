<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>
    <div v-if="$route.params.userId">
      <div id="user">
        <router-link to="{ name: 'users' }">Back to Users</router-link>
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

      </div>
    </div>

    <div id="users">
      <table>
        <tr v-for="user in users" v-bind:key="user.user_id">
          <td>{{ user.username }}</td>
<!--          <td><router-link to="{ name: 'user', params: { userId: user.user_id }}">View</router-link></td>-->
          <td><router-link to="{name: 'user', params: {userId: user.user_id}}" >View</router-link></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import axios from "axios";
export default {
  name: 'Users',
  data() {
    return{
      error: "",
      errorFlag: false,
      users: []
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios.get('http://localhost:3000/api/users')
          .then((response) => {
            this.users = response.data;
          }, (error) => {
            this.error = error;
            this.errorFlag = true;
          });
    },
    getSingleUser(id){
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].user_id == id) {
          return this.users[i];
        }
      }
    }


  }
}

</script>

<style scoped>

</style>