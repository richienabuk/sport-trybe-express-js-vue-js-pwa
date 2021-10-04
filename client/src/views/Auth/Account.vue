<template>
  <section class="text-gray-700">
    <form @submit.prevent="updateDetails" class="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg md:w-1/2 md:mt-0">
      <h2 class="mb-3 text-lg font-bold">Update bio data</h2>
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
        <h2>Favorite Sports</h2>
        <div class="flex flex-wrap my-3">
          <label class="flex items-center mr-2" v-for="item in allSports" :key="item.id">
            <input type="checkbox" :value="item.id" v-model="formData.sports" class="form-checkbox ">
            <span class="ml-2 text-gray-500">{{ item.name }} </span>
          </label>
        </div>
      </div>

      <div class="inline-flex flex-wrap items-center justify-between ">
        <button class="px-4 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800"> Update </button>
      </div>
    </form>
  </section>

  <section>
    <form @submit.prevent="changePassword" class="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg md:w-1/2 md:mt-0">
      <h2 class="mb-3 text-lg font-bold">Change password</h2>
      <div class="relative">
        <label for="current-password" class="text-base leading-7 text-gray-500">Current password</label>
        <input type="password" id="current-password" name="password" v-model="privateData.oldPassword" placeholder="password" class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
      </div>
      <div class="relative my-4">
        <label for="new-password" class="text-base leading-7 text-gray-500">New Password</label>
        <input type="password" id="new-password" name="password" v-model="privateData.password" placeholder="password" class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
      </div>
      <div class="inline-flex flex-wrap justify-between">
        <button class="px-4 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800"> Submit </button>
      </div>
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
        sports: []
      },
      privateData: {
        oldPassword: '',
        password: '',
      },
    }
  },

  methods: {
    async updateDetails() {
      const { name, phone, email, sports } = this.formData
      if (name === '' || phone === '' || email === null || !sports.length > 0) {
        alert('All fields are required. Please fill out every field.')
        return
      }

      this.$store.dispatch("updateAccount", this.formData)
    },
    async changePassword() {
      const { password, oldPassword } = this.privateData
      if (password === '' || oldPassword === '') {
        alert('All fields are required. Please fill out every field.')
        return
      }
      this.$store.dispatch('changePassword', this.privateData)
    },
    loadData() {
      const { name, email, phone } = this.$store.state.auth.user
      const sports = []
      this.$store.state.profile.sports.forEach(sport => sports.push(sport.id))
      this.formData = {
        name, email, phone, sports
      }
    }
  },

  computed: {
    allSports() {
      return this.$store.state.allSports;
    },
  },

  mounted() {
    this.$store.dispatch('loadSports')
    this.$store.dispatch('profile')
    this.loadData()
  }
}
</script>
