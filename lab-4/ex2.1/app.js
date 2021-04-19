const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            message: 'Hello World!'
        }
    }
});

app.mount('#app');
