import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPost:{},
        posts: []
    },
    mutations: {
        setPosts(state, payload) {
            this.state.posts = payload
        }
    },
    actions: {
        setPost({ commit }, payload) {
            if(payload){
            commit('setPosts', payload)
            }
            else{
                this.state.posts = [];
            }
        }
    }
});