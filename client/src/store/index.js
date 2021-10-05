import {createStore} from 'vuex'
import router from "../router";
import {
    loadAllSports,
    logOut,
    meData,
    profileData,
    signIn,
    signUp,
    updatePassword,
    updateProfile
} from "../network";

export default createStore({
    state: {
        auth: { loggedIn: false, user: {} },
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
                    e => {
                        if (typeof e === 'string') alert(e)
                        if (typeof e === 'object') {
                            for (const value of Object.values(e)) {
                                alert(value)
                            }
                        }
                    }
                )
        },
        // eslint-disable-next-line no-unused-vars
        register({commit}, user) {
            signUp(user)
                .then(res => {
                        alert(res.message)
                        alert(`Use this link for verification if you do not receive the email with it: ${res.secret}`)
                        router.push('/login')
                    },
                    e => {
                        if (typeof e === 'string') alert(e)
                        if (typeof e === 'object') {
                            for (const value of Object.values(e)) {
                                alert(value)
                            }
                        }
                    }
                )
        },
        logout({commit}) {
            logOut().then(() => {
                commit('logout');
                router.push('/login')
            },
            e => {
                if (typeof e === 'string') alert(e)
            });
        },
        userInfo({commit}) {
            meData().then(
                res => {
                    commit('loadUser', res)
                },
                e => {
                    if (typeof e === 'string') alert(e)
                    if (typeof e === 'object') {
                        for (const value of Object.values(e)) {
                            alert(value)
                        }
                    }
                    console.error(e)
                }
            )
        },
        profile({ commit }) {
            profileData().then(
                res => {
                    commit('loadProfile', res)
                },
                e => {
                    alert(e)
                    console.error(e)
                }
            )
        },
        loadSports({commit}) {
            loadAllSports()
                .then(
                    data => commit('loadSports', data),
                    e => {
                        if (typeof e === 'string') alert(e)
                        console.error(e)
                    }
                )
        },
        updateAccount({ commit }, data) {
            updateProfile(data).then(res => {
                    commit('loadProfile', res)
                    alert('Account updated successfully')
                },
                e => {
                    if (typeof e === 'string') alert(e)
                    if (typeof e === 'object') {
                        for (const value of Object.values(e)) {
                            alert(value)
                        }
                    }
                }
            )
        },
        changePassword({ commit }, data) {
            updatePassword(data)
                .then(() => {
                        logOut().then(() => {
                            commit('logout');
                            alert('Password changed successfully')
                            router.push('/login')
                        });
                    },
                    e => {
                        if (typeof e === 'string') alert(e)
                        if (typeof e === 'object') {
                            for (const value of Object.values(e)) {
                                alert(value)
                            }
                        }
                    }
                )
        },
    },
    modules: {},
})
