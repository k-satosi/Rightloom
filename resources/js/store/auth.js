import axios from 'axios';

const state = {
  user: null,
  apiStatus: null,
}

const getters = {
  check: state => !!state.user,
  username: state => (state.user ? state.user.name : ""),
}

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setApiStatus(state, status) {
    state.apiStatus = status;
  },
}

const actions = {
  async login(context, data) {
    context.commit("setApiStatus", null);

    const response = await axios.post("/api/login", data);

    if (response.status === 200) {
      const response2 = await axios.get("api/user");
      if (response2.status === 200) {
        console.log(response2);
        context.commit("setUser", response2.data);
      }
      context.commit("setApiStatus", true);
      return false;
    }

    context.commit("setApiStatus", false);
  },
  async logout(context) {
    context.commit("setApiStatus", null);

    const response = await axios.post("/api/logout");

    if (response.status === 200) {
      context.commit("setApiStatus", true);
      context.commit("setUser", null);
      return false;
    }

    context.commit('setApiStatus', false);
  },
  async register(context, data) {
    context.commit("setApiStatus", null);

    const response = await axios.post("/api/register", data);

    if (response.status === 200) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data);
      return false;
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
