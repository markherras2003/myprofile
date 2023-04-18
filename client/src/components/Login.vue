<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <div class="form-group">
      <label>Email</label>
      <input
        type="email"
        class="form-control"
        v-model="email"
        placeholder="Email"
      />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input
        type="password"
        class="form-control"
        v-model="password"
        placeholder="Password"
        :invalid="invalidPassword"
      />
      <span v-if="invalidPassword" class="text-danger w-100 mt-3">
        Invalid email or password.
      </span>
    </div>
    <button class="btn btn-primary w-100 mt-3">Login</button>
  </form>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const store = useStore();
    const invalidPassword = ref(false);

const handleSubmit = async () => {
      try {
        const response = await axios.post("/auth/login", {
          email: email.value,
          password: password.value,
        });

        if (response.status === 200 && response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("_id", response.data.user._id);
          store.dispatch("user", response.data);
          router.push("/");
        } else if (response.data && response.data.error) {
          invalidPassword.value = true;
          throw new Error(response.data.error);
        } else {
          invalidPassword.value = true;
          throw new Error("Invalid response");
        }
      } catch (error) {
        console.error(error);
        // Display error message to user
         invalidPassword.value = true;
      }
    };

    return {
      email,
      password,
      handleSubmit,
      store,
      invalidPassword,
    };
  },
};
</script>