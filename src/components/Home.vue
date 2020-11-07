<template>
    <div>
        <div class="position-relative overflow-hidden text-center bg-light">
            <div class="col-md-5 p-lg-5 mx-auto my-5" style="z-index: 1">
                <h1 class="display-4 font-weight-normal">All Products</h1>
                <p class="lead font-weight-normal">
                    And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.
                </p>
                <a class="btn btn-outline-secondary" href="#">Coming soon</a>
            </div>
            <div class="product-device box-shadow d-none d-md-block"></div>
            <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
        </div>

        <div class="container my-5">
            <div class="row" v-if="loading">
                <div class="col-sm-12 col-md-4 mb-4" v-for="load in 10" :key="load">
                    <div class="ph-item">
                        <div class="ph-col-12">
                            <div class="ph-picture" style="height: 200px;"></div>
                            <div class="ph-row">
                                <div class="ph-col-12"></div>
                                <div class="ph-col-12"></div>

                                <div class="ph-col-2 empty"></div>
                                <div class="ph-col-8"></div>
                                <div class="ph-col-2 empty"></div>

                                <div class="ph-col-12 empty"></div>

                                <div class="ph-col-2 big empty"></div>
                                <div class="ph-col-8 big"></div>
                                <div class="ph-col-2 big empty"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-else>
                <div class="col-sm-12 col-md-4 mb-4" v-for="product in products" :key="product.id">
                    <div class="card shadow">
                        <div class="row align-items-center" style="min-height: 200px;">
                            <div class="col">
                                <img :src="product.image_url" class="" :alt="product.title" style="margin: auto;max-height: 200px;max-width: 80%;padding: 15px;" />
                            </div>
                        </div>
                        <div class="card-body">
                            <h6 class="card-title" style="min-height: 40px;">
                                {{ product.title }}
                            </h6>
                            <p class="card-text" v-html="'From ' + $options.filters.toCurrency(parseFloat(product.price), cartCurrency)">x</p>
                            <button type="button" class="btn btn-outline-dark" @click.prevent="addItem(product)">Add to Card</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store, mutations, actions } from "@/store.js";

export default {
    async mounted() {
        await this.getProducts();
    },
    computed: {
        products() {
            return store.products;
        },
        loading() {
            return store.loading;
        },
        isBurgerActive() {
            return store.isNavOpen;
        },
        cartCurrency: {
            get() {
                return store.cartCurrency;
            },
            set(newValue) {
                store.cartCurrency = newValue;
            },
        },
    },
    methods: {
        getProducts: actions.fetchProducts,
        toggle() {
            mutations.toggleNav();
        },
        addItem(item) {
            ``;
            item.quantity = 1;
            mutations.addItemToCart(item);
            mutations.toggleNav();
        },
    },
};
</script>
