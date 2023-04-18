<template>
  <div>
    <div class="content" v-if="user">
      <p>Hello , Welcome {{ lastName }} , {{ firstName }}</p>
      <form @submit.prevent="handleUpdate">
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
        <button class="btn btn-primary w-100 mt-3">Update Value</button>
      </form>
    </div>

    <p v-if="!user">You are not logged in</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  name: "Home",
  setup() {
    const firstName = ref(null);
    const lastName = ref(null);
    const user = ref(null);
    const store = useStore();

    onMounted(async () => {
      const response = await axios.get(
        `/users/${localStorage.getItem("_id")}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      firstName.value = response.data.firstName;
      lastName.value = response.data.lastName;
      user.value = response.data;
      console.log(response);
    });

const handleUpdate = async () => {
  errorMessage.value = "";
  try {
    // Check Confirmation password
    if (password.value !== confirmPassword.value) {
      isMatchPassword.value = true;
      return;
    }

    // Execute put request to update the user data on the server
    const response = await axios.put(`/auth/users/${userId}`, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
    console.log(response);
    router.push(`/users/${userId}`);
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // Email address already registered
      errorMessage.value = "This email address is already registered.";
    } else {
      // Unknown error occurred
      errorMessage.value = "An unknown error occurred.";
      console.log(error);
    }
  }
};

    const currentUser = computed(() => store.getters.user);

    return {
      firstName,
      lastName,
      user,
      currentUser,
    };
  },
};
</script>