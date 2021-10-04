<template>
  <section class="text-gray-700">
      <form @submit.prevent="onSubmit" class="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg md:w-1/2 md:mt-0">
        <div class="relative mt-4">
          <label for="login" class="text-base leading-7 text-gray-500">Login</label>
          <input type="text" v-model="formData.login" id="login" name="login" placeholder="Login" class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
        </div>
        <div class="relative mt-4">
          <label for="password" class="text-base leading-7 text-gray-500">Password</label>
          <input type="password" v-model="formData.password" id="password" name="password" placeholder="password" class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
        </div>
        <div class="inline-flex flex-wrap items-center mt-4">
          <button class="px-4 py-2 my-2 font-medium text-blue-600 transition duration-500 ease-in-out transform bg-blue-100 border-gray-100 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-200 hover:text-blue-900"> Login </button>
        </div>
      </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        login: '',
        password: ''
      }
    }
  },

  methods: {
    async onSubmit() {
      const { login, password } = this.formData
      if (login === '' || password === null) {
        alert('All fields are required. Please fill out every field.')
        return
      }

      this.$store.dispatch("login", this.formData)
    }
  }
}
</script>
