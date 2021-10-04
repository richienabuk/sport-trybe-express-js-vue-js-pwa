import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Auth/Register.vue'
import Login from '../views/Auth/Login.vue'
import Profile from '../views/Auth/Profile.vue'
import Account from '../views/Auth/Account.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: checkAuth
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: checkAuth
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function checkAuth(to, from, next) {
  const loggedIn = localStorage.getItem('userToken');
  if (loggedIn) next();
  else next("/login");
}

export default router
