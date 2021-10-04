<template>
  <section class="text-gray-700">
    <h1 class="font-bold text-lg">Account verification</h1>
    <div class="mt-5">
      <h2 v-if="status" class="font-medium">Your account has been verified successfully, <router-link to="/login">login</router-link> to continue</h2>
      <h2 v-else>Malformed or invalid link</h2>
    </div>
  </section>
</template>

<script>
import { accountVerification } from "../../network";

export default {
  layout: 'plain',
  data() {
    return {
      status: false,
    };
  },

  methods: {
    verify() {
      const { id, email, token } = this.$route.query
      if (!id || !email || !token) {
        alert('Malformed or invalid link')
        return;
      }

      try {
        accountVerification({
          email, token, id
        }).then(() => {
          this.status = true
        }, e => {
          console.error(e)
          alert(e)
        })
      } catch (e) {
        alert('all', e)
        console.error(e)
      }
    }
  },

  mounted() {
    this.verify();
  }
};
</script>
