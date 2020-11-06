<template>
    <div class="container-fluid h-100 cart" v-if="isPanelOpen">
        <div class="row justify-content-end h-100">
            <div class="backdrop col animate__animated animate__fadeIn animate__delay-1s" @click="closeSidebarPanel"></div>
            <transition name="slide">
                <div class="col-md-3 col-sm-12 hidden-md-down animate__animated animate__slideInRight" id="yellow">
                    <button class="btn btn-light rounded-circle border float-left shadow-sm mt-2" @click="closeSidebarPanel">&lt;</button>
                    <h6 class="text-center mt-4">YOUR CART ({{ cartItems.length }})</h6>
                    <div class="form-group">
                        <select class="form-control w-auto form-control-sm" v-model="cartCurrency" @change="getProducts">
                            <option v-for="(item, index) in currency" :key="index">{{ item }}</option>
                        </select>
                    </div>
                    <div class="cart-container p-0">
                        <div class="card mb-3 shadow-sm" style="max-width: 540px" v-for="(product, index) in cartItems" :key="product.id">
                            <div class="row no-gutters">
                                <div class="col">
                                    <div class="card-body text-left">
                                        <h6 class="card-title">{{ product.title }}</h6>
                                        <div class="card-text">
                                            <div class="btn-group border" role="group">
                                                <button type="button" class="btn btn-default btn-sm" @click="decreaseQuantity(index)">-</button>
                                                <input v-model="product.quantity" class="btn btn-default btn-sm" style="width: 50px;" />
                                                <button type="button" class="btn btn-default btn-sm" @click="increaseQuantity(index)">+</button>
                                            </div>
                                            <span style="float: right;" v-html="$options.filters.toCurrency(parseFloat(product.price) * parseFloat(product.quantity), cartCurrency)"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 align-self-center">
                                    <img :src="product.image_url" class="" :alt="product.title" style="margin: auto;max-height: 100px;max-width: 80%;padding: 15px;" />
                                </div>
                                <button type="button" class="close" @click="removeItemFromCart(index)" aria-label="Close" style="font-size: medium;position: absolute;right: 10px;top: 5px;">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="cart-footer">
                        <hr />
                        <div class="row subtotal p-2">
                            <div class="col text-left">Subtotal</div>
                            <div class="col text-right" v-html="$options.filters.toCurrency(totalItem, cartCurrency)"></div>
                        </div>
                        <button class="btn btn-block btn-outline-dark bg-white text-dark p-2">MAKE THIS A SUBSCRIPTION (SAVE 20%)</button>
                        <button class="btn btn-block btn-outline-dark bg-dark p-2 text-light">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import { store, mutations, actions } from "@/store.js";

export default {
    name: "App",
    data: {
        data: [],
    },
    apollo: {
        currency: gql`
            query {
                currency
            }
        `,
    },
    components: {},
    methods: {
        closeSidebarPanel: mutations.toggleNav,
        removeItemFromCart: mutations.removeItemFromCart,
        increaseQuantity: mutations.increaseQuantity,
        decreaseQuantity: mutations.decreaseQuantity,
        getProducts: actions.fetchProducts,
    },
    computed: {
        isPanelOpen() {
            return store.isNavOpen;
        },
        cartItems: {
            get() {
                return store.cart;
            },
        },
        cartCurrency: {
            get() {
                return store.cartCurrency;
            },
            set(newValue) {
                store.cartCurrency = newValue;
            },
        },
        totalItem: function() {
            let sum = 0;
            store.cart.forEach(function(item) {
                sum += parseFloat(item.price) * parseFloat(item.quantity);
            });

            return sum;
        },
    },
};
</script>

<style>
html,
body {
    height: 100%;
}

#yellow {
    height: 100%;
    background: yellow;
    padding-top: 50px;
}

.cart {
    position: fixed;
    top: 0;
}
.backdrop {
    background: #50505059;
}
</style>
