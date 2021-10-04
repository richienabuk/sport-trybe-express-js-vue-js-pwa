<template>
  <Navbar />
  <div class="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto">
    <router-view/>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
export default {
  components: { Navbar, Footer },
  created() {
    const user = JSON.parse(localStorage.getItem('userToken'));
    if (user) {
      this.$store.dispatch("userInfo")
    }
  }
}
</script>
