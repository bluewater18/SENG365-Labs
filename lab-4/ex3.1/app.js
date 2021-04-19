const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            message: 'Hello World!',
            visible: true
        }
    }
});

app.mount('#app');
