// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

/* eslint-disable no-new */

var salesOrder = Vue.component('salesOrder', {
	template: '#salesOrder',
	data() {
		return {
			productData: [],
			orderItems: '',
			orderInfo: '',
			orderSummary: {}
		}
	},

	mounted() {

	},
	updated() {

	},
	watch: {
		orderItems(newVal, oldVal) {

		},
		orderInfo(newVal, oldVal) {

		}
	},
	computed: {
		totalPrice() {},
		totalItems() {}
	},
	methods: {},
	created: function() {
		this.$http.get("/data/data.json")
			.then(function(resp) {
				if (typeof resp.data == 'string') {
					resp.data = JSON.parse(resp.data);
				}
				this.productData = resp.data;
			});
	}

});



var navigation = Vue.component('navigation', {
	template: '#navigation',
	methods: {}
});


var categories = Vue.component('categories', {
	template: '#categories',
	methods: {}
});


new Vue({
	el: '#app'

});