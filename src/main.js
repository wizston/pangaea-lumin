import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css'
import { createProvider } from './vue-apollo'
import currencySymbol from "currency-symbol";


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.filter("toCurrency", function(value, currency = "USD") {
  let symbol = currencySymbol.symbol(currency);
  let number = getCommaSeparatedTwoDecimalsNumber(value);
  if (!symbol) {
      return currency + " " + number;
  }
  return symbol + number;
});

function getCommaSeparatedTwoDecimalsNumber(number) {
    const fixedNumber = Number.parseFloat(number).toFixed(2);
    return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

new Vue({
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
