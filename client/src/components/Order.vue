<template>
  <div>
  {{1+1}}
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      catagories: '',
      orderItems: '',
      orderInfo: ''
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
  methods: {}
}
</script>

<style>

</style>