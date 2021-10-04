<template>
  <section class="text-gray-700 ">
      <form @submit.prevent="onSubmit" class="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg md:w-1/2 md:mt-0">
        <div class="relative">
          <label for="name" class="text-base leading-7 text-gray-500">Name</label>
          <input type="text" id="name" name="name" v-model="formData.name" placeholder="name" class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
        </div>
        <div class="relative mt-4">
          <label for="phone" class="text-base leading-7 text-gray-500">Phone</label>
          <input type="tel" id="phone" v-model="formData.phone" name="phone" placeholder="phone" class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
        </div>
        <div class="relative mt-4">
          <label for="email" class="text-base leading-7 text-gray-500">Email</label>
          <input type="text" id="email" name="email" v-model="formData.email" placeholder="email" class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
        </div>
        <div class="relative mt-4">
          <label for="password" class="text-base leading-7 text-gray-500">Password</label>
          <input type="password" id="password" name="password" v-model="formData.password" placeholder="password" class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
        </div>
        <div class="relative mt-4">
          <h2>Favorite Sports</h2>
          <div class="flex flex-wrap my-3">
            <label class="flex items-center mr-2" v-for="item in allSports" :key="item.id">
              <input type="checkbox" :value="item.id" v-model="formData.sports" class="form-checkbox ">
              <span class="ml-2 text-gray-500">{{ item.name }} </span>
            </label>
          </div>
        </div>

        <div class="inline-flex flex-wrap items-center justify-between ">
          <button class="w-full px-4 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800"> Register </button>
        </div>
        <p class="mx-auto mt-3 text-xs text-gray-500"> By submitting this form, you have agreed to our t&c.</p>
      </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        email: '',
        password: '',
        sports: []
      },
    }
  },

  methods: {
    async onSubmit() {
      const { name, phone, email, password, sports } = this.formData
      if (name === '' || phone === '' || email === null || password === null || !sports.length > 0) {
        alert('All fields are required. Please fill out every field.')
        return
      }

      this.$store.dispatch("register", this.formData)
    },
  },

  computed: {
    allSports() {
      return this.$store.state.allSports;
    }
  },

  mounted() {
    this.$store.dispatch("loadSports")
  }
}
</script>
