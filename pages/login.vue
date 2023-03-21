<template>
  <div class="my-container">
    <div class="login-box mx-auto">
      <img
        src="@/assets/images/sas_logo.png"
        alt="Search and Stay Company Logo"
        title="Search and Stay Logo"
        class="logo"
      />

      <b-form @submit.prevent="login">
        <b-form-group
          id="email-input-group"
          label-for="email-input"
          :state="emailState"
        >
          <b-form-input
            id="email-input"
            v-model="email"
            class="login-input"
            type="email"
            required
            placeholder="Email"
            @focus="resetFeedbackMessage"
          ></b-form-input>
          <b-form-invalid-feedback :state="emailState"
            >Please enter a valid email.</b-form-invalid-feedback
          >
        </b-form-group>
        <b-form-group
          id="password-input-group"
          label-for="password-input"
          :state="passwordState"
        >
          <b-form-input
            id="password-input"
            v-model="password"
            class="login-input"
            type="password"
            autocomplete="off"
            required
            placeholder="Password"
            @focus="resetFeedbackMessage"
          ></b-form-input>
          <b-form-invalid-feedback :state="passwordState"
            >Please enter a password.</b-form-invalid-feedback
          >
        </b-form-group>
        <b-button v-if="!spinner" type="submit" block class="btn-color"
          >Login</b-button
        >
        <div v-else class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <p v-if="feedback" class="text-center mt-2 text-danger">
          {{ feedback }}
        </p>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      spinner: false,
      feedback: '',
    }
  },
  computed: {
    emailState() {
      if (!this.email) {
        return null
      }

      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
      return isValid
    },
    passwordState() {
      if (!this.password) {
        return null
      }
      return this.password.length >= 6
    },
  },
  methods: {
    ...mapMutations(['LOGIN_USER']),

    login() {
      const loginEndpoint = this.$config.login
      const payload = {
        login: {
          email: this.email,
          password: this.password,
        },
      }

      if (this.emailState && this.passwordState) {
        this.spinner = true
        this.$axios
          .post(loginEndpoint, payload)
          .then((res) => {
            console.log(res)
            const { data } = res
            this.feedback = `${data.message} Redirecting...`

            const mutationPayload = {
              email: this.email,
              token: data.data.result.access_token,
            }

            this.LOGIN_USER(mutationPayload)

            setTimeout(() => {
              this.$router.push('/admin')
            }, 3000)
          })
          .catch((err) => {
            console.log(err)
            this.feedback = 'Invalid email/password.'
          })
          .finally(() => {
            this.spinner = false
          })
      }
    },

    resetFeedbackMessage() {
      this.feedback = ''
    },
  },
}
</script>



<style>
.my-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  border: 1px solid;
  border-color: rgb(212 212 216);
  border-radius: 1rem;
  padding: 4rem;
}

.login-input {
  border: 0;
  border-bottom: 2px solid;
  border-right: 2px solid;
  border-color: rgb(212 212 216);
  margin-top: 2rem;
}

.btn-color {
  background: #fb3b11 !important;
  border: none;
}

.btn-color:hover {
  background: #f84e27;
}

.logo {
  max-height: 70px;
  margin: 2rem auto 2rem auto;

  display: block;
}

@media (max-width: 768px) {
  .logo {
    max-height: 50px;
  }
}
</style>
