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
        <div v-if="isSuccessful" class="alert alert-warning w-100 mt-3">
          Data Update Succesfully.
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
import { useRouter } from "vue-router";

export default {
  name: "Home",
  setup() {
    const firstName = ref(null);
    const lastName = ref(null);
    const userId = ref(null);
    const router = useRouter();
    const user = ref(null);
    const store = useStore();
    const isSuccessful = ref(false);

    const handleUpdate = async () => {
      let userId = localStorage.getItem("_id");
      // Execute put request to update the user data on the server
      const response = await axios.put(`/auth/users/${userId}`, {
        firstName: firstName.value,
        lastName: lastName.value,
      });
      isSuccessful.value = true;
      console.log(response);
      router.push(`/`);
      try {
      } catch (error) {
        // Unknown error occurred
         isSuccessful.value = false;
        errorMessage.value = "An unknown error occurred.";
        console.log(error);
      }
    };

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

    const currentUser = computed(() => store.getters.user);

    return {
      firstName,
      lastName,
      user,
      currentUser,
      handleUpdate,
      isSuccessful,
    };
  },
};
</script>