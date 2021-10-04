<template>
  <header class="fixed top-0 w-full z-30 bg-white transition-all shadow-md">
  <nav class="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
    <div class="col-start-1 col-end-2 flex items-center">
      <router-link to="/">Sport Trybe</router-link>
    </div>
    <ul class="hidden lg:flex col-start-4 col-end-8 text-black-500  items-center">
      <router-link class="px-4 py-2 mx-2 animation-hover inline-block relative text-black-500 hover:text-orange-500" :to="{ name: 'Profile' }">Profile</router-link> |
      <router-link class="px-4 py-2 mx-2 animation-hover inline-block relative text-black-500 hover:text-orange-500" :to="{ name: 'About' }">Buddies</router-link> |
      <router-link class="px-4 py-2 mx-2 animation-hover inline-block relative text-black-500 hover:text-orange-500" :to="{ name: 'About' }">Discover</router-link> |
      <router-link class="px-4 py-2 mx-2 animation-hover inline-block relative text-black-500 hover:text-orange-500" :to="{ name: 'Account' }">Settings & Privacy</router-link>
    </ul>
    <div class="col-start-10 col-end-12 font-medium flex justify-end items-center">
      <template v-if="!$store.state.auth.loggedIn">
        <router-link :to="{ name: 'Login' }" class="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">Sign In</router-link>
        <router-link :to="{ name: 'Register' }" class="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange ">
          Sign up
        </router-link>
      </template>
      <span role="button" @click.prevent="logout" v-else class="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">Log out</span>
    </div>
  </nav>
  </header>

<!--  Mobile Navigation-->
  <nav class="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
    <div class="bg-white sm:px-3">
      <ul class="flex w-full justify-between items-center text-black-500">
        <router-link class="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all  border-transparent" :to="{ name: 'Profile' }">Profile</router-link> |
        <router-link class="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all  border-transparent" :to="{ name: 'About' }">Buddies</router-link> |
        <router-link class="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all  border-transparent" :to="{ name: 'About' }">Discover</router-link> |
        <router-link class="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all  border-transparent" :to="{ name: 'Account' }">Settings</router-link>
      </ul>
    </div>
  </nav>
<!--  End Mobile Navigation-->
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
