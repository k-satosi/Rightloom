import axios from 'axios';

const state = {
  user: null,
  apiStatus: null,
  loginErrorMessages: null,
  registerErrorMessages: null,
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
  setLoginErrorMessage(state, messages) {
    state.loginErrorMessages = messages;
  },
  setRegisterErrorMessage(state, message) {
    state.registerErrorMessage = message;
  }
}

const actions = {
  async login(context, data) {
    context.commit("setApiStatus", null);

    const response = await axios.post("/api/login", data).catch((err) => {
      console.log(err.response);
      return err.response;
    });

    if (response.status === 200) {
      const response2 = await axios.get("/api/user");
      if (response2.status === 200) {
        console.log(response2);
        context.commit("setUser", response2.data);
      }
      context.commit("setApiStatus", true);
      context.commit('setLoginErrorMessage', null);
      return false;
    }

    context.commit("setApiStatus", false);

    if (response.status === 401) {
      context.commit('setLoginErrorMessage', response.data);
    }

    context.commit('error/setCode', response.status, {
      root: true
    });
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

    context.commit('setApiStatus', false);

    context.commit('error/setCode', response.status, {
      root: true
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
