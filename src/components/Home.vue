<template>
  <div>
    <div
      class="position-relative overflow-hidden p-3 p-md-5 text-center bg-light"
    >
      <div class="col-md-5 p-lg-5 mx-auto my-5">
        <h1 class="display-4 font-weight-normal">All Products</h1>
        <p class="lead font-weight-normal">
          And an even wittier subheading to boot. Jumpstart your marketing
          efforts with this example based on Apple's marketing pages.
        </p>
        <a class="btn btn-outline-secondary" href="#">Coming soon</a>
      </div>
      <div class="product-device box-shadow d-none d-md-block"></div>
      <div
        class="product-device product-device-2 box-shadow d-none d-md-block"
      ></div>
    </div>

    <div class="container my-5">
        <div class="row">
            <div class="col col-md-4 mb-4" v-for="index in 10" :key="index">
                <div class="card shadow-sm" style="width: 18rem;">
                    <img src="#" class="card-img-top" alt="#" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
