<template>
  <form @submit.prevent="handleSubmit">
    <label>Sign Up</label>
    <div class="form-group">
      <label>Firstname</label>
      <input
        type="text"
        class="form-control"
        v-model="firstName"
        placeholder="Firstname"
      />
    </div>
    <div class="form-group">
      <label>Lastname</label>
      <input
        type="text"
        class="form-control"
        v-model="lastName"
        placeholder="Lastname"
      />
    </div>
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
      />
    </div>
    <div class="form-group">
      <label>Confirm Password</label>
      <input
        type="password"
        class="form-control"
        v-model="confirmPassword"
        placeholder="Confirm Password"
      />
    </div>
      <div v-if="isMatchPassword" class="alert alert-warning w-100 mt-3">
        Passwords do not match.
      </div>
    <button class="btn btn-primary w-100 mt-3">Sign Up</button>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Register",
  setup() {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const router = useRouter();
    const errorMessage = ref("");
    const isMatchPassword = ref(false);

const handleSubmit = async () => {
   errorMessage.value = '';
  try {
    // Check Confirmation password
    if (password.value !== confirmPassword.value) {
        isMatchPassword.value = true;
        return;
      }

    // Execute post value in server
    const response = await axios.post("/auth/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
    console.log(response);
    router.push("/login");
} catch (error) {
  if (error.response && error.response.status === 409) {
    // Email address already registered
    errorMessage.value = 'This email address is already registered.';
  } else {
    // Unknown error occurred
    errorMessage.value = 'An unknown error occurred.';
    console.log(error);
  }
}
};
    return {
      firstName,
      lastName,
      email,
      password,
      handleSubmit,
      errorMessage,
      confirmPassword,
      isMatchPassword
    };
  },
});
</script>