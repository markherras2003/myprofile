<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">My Profile</router-link>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
      </ul>
      <form class="d-flex">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link" aria-current="page"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" aria-current="page"
              >Sign Up</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="user">
          <li class="nav-item">
            <a
              href="javascript:void(0)"
              @click="handleLogout"
              class="nav-link"
              aria-current="page"
              >Logout</a
            >
          </li>
        </ul>
      </form>
    </div>
  </nav>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "Nav",
  setup() {
    const router = useRouter();
    const user = ref("");
    const store = useStore();
    const handleLogout = () => {
      localStorage.removeItem("token");
      store.dispatch("user", null);
      router.push("/login");
    };
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        }
        return Promise.reject(error);
      }
    );

    const created = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login page if token is null
          router.push("/login");
          return;
        }
        const response = await axios.get(
          `/users/${localStorage.getItem("_id")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        user.value = response?.data;
        store.dispatch("user", response?.data);
      } catch (error) {
        console.log("err->", error.response.data);
        // Handle error here, e.g. show error message to user
      }
    };

    created();

    return { user, handleLogout, user: computed(() => store.state.user) };
  },
});
</script>