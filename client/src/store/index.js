import {createStore} from 'vuex'
import router from "../router";
import {loadAllSports, logOut, meData, profileData, signIn, signUp} from "../network";

export default createStore({
    state: {
        auth: {loggedIn: false, user: {}},
        status: {},
        allSports: [],
        profile: {
            sports: []
        }
    },
    mutations: {
        loadUser(state, user) {
            state.auth.loggedIn = true;
            state.auth.user = user;
        },
        logout(state) {
            state.auth.loggedIn = false;
            state.auth.user = null;
        },
        loadSports(state, data) {
            state.allSports = data
        },
        loadProfile(state, data) {
            state.profile = data
        }
    },
    actions: {
        login({commit}, data) {
            signIn(data)
                .then(() => {
                        meData().then(
                            data => {
                                commit('loadUser', data)
                                router.push('/profile')
                            },
                            e => console.error(e)
                        )
                    },
                    e => console.error(e)
                )
        },
        // eslint-disable-next-line no-unused-vars
        register({commit}, user) {
            signUp(user)
                .then(
                    r => {
                        // router.push('/')
                        console.log(r)
                    },
                    e => console.error(e)
                )
        },
        logout({commit}) {
            logOut().then(() => {
                commit('logout');
                router.push('/login')
            });
        },
        userInfo({commit}) {
            meData().then(
                res => {
                    commit('loadUser', res)
                },
                e => console.error(e)
            )
        },
        profile({ commit }) {
            profileData().then(
                res => {
                    commit('loadProfile', res)
                },
                e => console.error(e)
            )
        },
        loadSports({commit}) {
            loadAllSports()
                .then(
                    data => commit('loadSports', data),
                    e => console.error(e)
                )
        },
        updateAccount() {

        },
        changePassword() {

        },
    },
    modules: {}
})
