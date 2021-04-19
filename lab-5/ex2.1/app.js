const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            users: [],
            users1: [{"user_id":1,"username":"updated"},{"user_id":2,"username":"John"},{"user_id":3,"username":"postman"},{"user_id":4,"username":"postman"},{"user_id":5,"username":"postman"},{"user_id":6,"username":"postman"},{"user_id":7,"username":"postman"},{"user_id":16,"username":"postman"},{"user_id":17,"username":"postman"},{"user_id":18,"username":"postman"},{"user_id":19,"username":"postman"},{"user_id":20,"username":"postman"},{"user_id":21,"username":"postman"},{"user_id":22,"username":"postman"}]
        }

    },
    mounted() {
        this.getUsers()
    },
    methods: {
        getUsers() {
            this.axios.get('http://127.0.0.1:3000/api/users')
                .then(function (response) {
                    console.log(response.data)
                    this.users = response.data;
                    console.log('users::')
                    console.log(this.users)
                }, function (error) {
                    console.log(error);
                });
        }
    }
});

app.config.globalProperties.axios = axios;
app.mount('#app');
