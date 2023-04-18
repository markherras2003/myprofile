<template>
  <div>
    <div class="content" v-if="user">
      <p>Hello , Welcome {{ lastName }} , {{ firstName }}</p>
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