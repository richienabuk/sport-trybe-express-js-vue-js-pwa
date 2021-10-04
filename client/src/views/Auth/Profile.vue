<template>
  <div>
        <div class="md:flex no-wrap">
          <div class="w-full md:w-3/12 md:mx-2">
            <div class="bg-white p-3 border-t-4 border-green-400">
              <div class="image overflow-hidden">
                <img class="h-auto w-full mx-auto"
                     :src="avatar"
                     alt="">
              </div>
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ me.name }}</h1>
              <ul
                  class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li class="flex items-center py-3">
                  <span>Status</span>
                  <span class="ml-auto"><span
                      class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                </li>
                <li class="flex items-center py-3">
                  <span>Member since</span>
                  <span class="ml-auto">{{ date_short(me.createdAt) }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="w-full md:w-9/12 mx-2 h-64">
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                <span class="tracking-wide">About</span>
              </div>
              <div class="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">First Name</div>
                    <div class="px-4 py-2">{{ name.firstName }}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Last Name</div>
                    <div class="px-4 py-2">{{ name.lastName }}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Contact No.</div>
                    <div class="px-4 py-2">{{ me.phone }}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email.</div>
                    <div class="px-4 py-2">
                      <span class="text-blue-800">{{ me.email }}</span>
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Favorite sports</div>
                    <div class="px-4 py-2">
                      <span v-for="item in profile.sports" :key="item.id">{{ item.name }}{{ " "}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

  </div>
</template>

<script>
export default {
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    me() {
      return this.$store.state.auth.user;
    },
    name() {
      const names = this.me?.name?.split(' ')
      if (names) return { firstName: names[0], lastName: names[1] }
      return { firstName: '', lastName: '' }
    },
    avatar() {
      return `https://avatars.dicebear.com/v2/initials/${this.me?.name?.replace('/[^a-z0-9 _.-]+/i', '')}.svg`;
    },
  },
  methods: {
    date_short(dateStr, locale = 'en-us') {
      if (!dateStr) return dateStr;
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString(locale,
          { year: "numeric", month: "short", day: "numeric" });
    }
  },
  mounted() {
    this.$store.dispatch("profile")
  }
}
</script>
