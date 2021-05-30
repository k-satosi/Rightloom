<template>
  <div>
    <b-card
      no-body
      bg-variant="dark"
    >
      <b-tabs card>
        <b-tab title="Login">
          <b-container fluid>
            <b-form @submit="login">
              <b-row class="my-2">
                <b-form-input
                  v-model="loginForm.email"
                  placeholder="Id"
                />
              </b-row>
              <b-row class="my-2">
                <b-form-input
                  v-model="loginForm.password"
                  type="password"
                  placeholder="Password"
                />
              </b-row>
              <b-row class="my-2">
                <b-button type="submit">
                  Login
                </b-button>
              </b-row>
            </b-form>
          </b-container>
        </b-tab>
        <b-tab title="Register">
          <b-container fluid>
            <b-form @submit="register">
              <b-row class="my-2">
                <b-form-input
                  v-model="registerForm.name"
                  placeholder="Name"
                />
              </b-row>
              <b-row class="my-2">
                <b-form-input
                  v-model="registerForm.email"
                  type="email"
                  placeholder="Email"
                />
              </b-row>
              <b-row class="my-2">
                <b-form-input
                  v-model="registerForm.password"
                  type="password"
                  placeholder="Password"
                />
              </b-row>
              <b-row class="my-2">
                <b-form-input
                  v-model="registerForm.passwordConfirmation"
                  type="password"
                  placeholder="Password confirmation"
                />
              </b-row>
              <b-row class="my-2">
                <b-button type="submit">
                  Register
                </b-button>
              </b-row>
            </b-form>
          </b-container>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
    };
  },
  computed: {
    apiStatus() {
      return this.$store.state.auth.apiStatus;
    }
  },
  methods: {
    async login(event) {
      event.preventDefault();
      await this.$store.dispatch('auth/login', this.loginForm);
      if (this.apiStatus) {
        this.$router.push('/');
      }
    },
    async register(event) {
      event.preventDefault();
      await this.$store.dispatch('auth/register', this.registerForm);
      // if (this.apiStatus) {
      //   this.$router.push('/');
      // }
    },
  },
};
</script>
