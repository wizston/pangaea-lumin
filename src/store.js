import Vue from "vue";
import gql from "graphql-tag";

export const store = Vue.observable({
    loading: true,
    isNavOpen: false,
    products:  [],
    cart: [],
    cartCurrency: "NGN",
});

export const actions = {
    async fetchProducts() {
        store.loading = true;
        var { data } = await this.$apollo.query({
            query: gql`
                query PingMessage($currency: Currency!) {
                    products {
                        id
                        title
                        image_url
                        price(currency: $currency)
                        product_options {
                            title
                            prefix
                            suffix
                            options {
                                id
                                value
                            }
                        }
                    }
                }
            `,
            variables: {
                currency: store.cartCurrency,
            },
        });

        store.products = data.products;
        store.cart.forEach(function(item) {
            store.products.find((product) => {
                if (product.id === item.id) {
                    item.price = product.price;
                }
            });
        });
        store.loading = false;
    },
};

export const mutations = {
    setIsNavOpen(yesno) {
        store.isNavOpen = yesno;
    },
    setCartCurrency(currency) {
        store.cartCurrency = currency;
    },
    toggleNav() {
        store.isNavOpen = !store.isNavOpen;
    },
    addItemToCart(item, quantity = 1) {
        let found = store.cart.find((product) => product.id === item.id);

        if (found) {
            found.quantity++;
        } else {
            // Clone the object.
            item.quantity = quantity;
            const insert = JSON.parse(JSON.stringify(item));
            store.cart.push(insert);
        }
    },
    removeItemFromCart(index) {
        this.$delete(store.cart, index);
    },
    increaseQuantity(index) {
        let qty = parseInt(store.cart[index].quantity);
        store.cart[index].quantity = qty + 1;
    },
    decreaseQuantity(index) {
        if (store.cart[index].quantity > 1) {
            let qty = parseInt(store.cart[index].quantity);
            store.cart[index].quantity = qty - 1;
        } else {
            this.$delete(store.cart, index);
        }
    },
};
