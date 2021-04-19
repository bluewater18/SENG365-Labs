const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            message: 'Hello World!',
            shopping_list: [
                { name: 'bread', price: 2.75 },
                { name: 'milk' , price: 2.50 },
                { name: 'pasta', price: 1.99 }
            ]

        }
    },
    methods: {
        calculateTotal() {
            let t = 0
            this.shopping_list.forEach(i => t+=i.price)
            return t
        }
    }
});

app.mount('#app');
