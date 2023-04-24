<template>
  <div>
    <div class="mytable" v-if="!isEdit">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <form class="form-inline" @submit.prevent>
              <div class="form-group mr-3 align-self-center">
                <label for="page-size-select">Items per page:</label>
              </div>
              <div class="form-group mr-3">
                <select
                  class="form-control"
                  id="page-size-select"
                  v-model="pageSize"
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div class="form-group flex-grow">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  v-model="search"
                />
              </div>
              <button type="submit" class="btn btn-primary ml-3">
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in paginatedPeople" :key="index">
              <td>{{ person.lastName }}</td>
              <td>{{ person.firstName }}</td>
              <td>{{ person.email }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="showEdit(person._id)"
                >
                  Edit
                </button>

                <button
                  type="button"
                  class="btn btn-danger"
                  @click="showDeleteModal(person._id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="currentPage -= 1">
              Previous
            </button>
          </li>
          <li
            v-for="page in pages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="goToPage(page)">
              {{ page }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === pageCount }"
          >
            <button class="page-link" @click="currentPage += 1">Next</button>
          </li>
        </ul>
      </nav>
    </div>

    <div class="content" v-if="isEdit">
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
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Email"
          />
        </div>
        <div v-if="isSuccessful" class="alert alert-warning w-100 mt-3">
          Data Update Succesfully.
        </div>
        <button
          class="btn btn-primary w-100 mt-3">
          Update Value
        </button>
        <button class="btn btn-primary w-100 mt-3" @click="editCancel">
          Cancel
        </button>
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
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
const router = useRouter();

export default {
  name: "Users",
  setup() {
    const search = ref("");
    const firstName = ref(null);
    const lastName = ref(null);
    const email = ref(null);
    let userId = ref(null);
    const user = ref(null);
    const store = useStore();
    const errorMessage = ref("");
    const isSuccessful = ref(false);
    const people = ref([]);
    const pageSize = ref(4); // number of items to show per page
    const currentPage = ref(1);
    const isEdit = ref(false);
    const isAdd = ref(false);

    onMounted(async () => {
      const response2 = await axios.get(
        `/users/${localStorage.getItem("_id")}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      user.value = response2.data;

      const response = await axios.get(`/users`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      people.value = response.data;
    });

    const currentUser = computed(() => store.getters.user);

    const goToPage = (page) => {
      currentPage.value = parseInt(page);
    };

    const showDeleteModal = () => {};

    async function handleUpdate() {
      userId = localStorage.getItem("temp_id");
      // Execute put request to update the user data on the server
      try {
        const response = await axios.put(`/auth/users/${userId}`, {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
        });
        isSuccessful.value = true;
        console.log(response);
        setTimeout(() => {
          location.reload();
        }, 2000);
      } catch (error) {
        // Unknown error occurred
        if (error.response.status === 409) {
          // Email address already registered
          isSuccessful.value = false;
          errorMessage.value = "This email address is already registered.";
        } else {
          isSuccessful.value = false;
          errorMessage.value = "An unknown error occurred.";
          //console.log(error);
        }
      }
    }

    async function showEdit(id) {
      isEdit.value = true;
      localStorage.setItem("temp_id", id);
      const response = await axios.get(`/users/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      firstName.value = response.data.firstName;
      lastName.value = response.data.lastName;
      email.value = response.data.email;
      console.log(response);
    }

    const editCancel = () => {
      isEdit.value = false;
    };

    const filteredPeople = computed(() => {
      return people.value.filter((person) => {
        return (
          person.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
          person.lastName.toLowerCase().includes(search.value.toLowerCase()) ||
          person.email.toLowerCase().includes(search.value.toLowerCase())
        );
      });
    });
    const pageCount = computed(() =>
      Math.ceil(filteredPeople.value.length / pageSize.value)
    );
    const paginatedPeople = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return filteredPeople.value.slice(start, end);
    });
    const pages = computed(() => {
      const range = [];
      for (let i = 1; i <= pageCount.value; i++) {
        range.push(i);
      }
      return range;
    });

    return {
      search,
      firstName,
      lastName,
      email,
      user,
      userId,
      currentUser,
      errorMessage,
      isSuccessful,
      filteredPeople,
      paginatedPeople,
      pages,
      pageCount,
      currentPage,
      goToPage,
      pageSize,
      showEdit,
      isEdit,
      editCancel,
      handleUpdate,
      isAdd,
    };
  },
};
</script>

<style scoped>
button {
  margin-right: 8px;
}
.table-responsive {
  overflow-x: auto;
}
.form-inline {
  display: flex;
  align-items: center;
}
.form-inline .form-group {
  margin-right: 10px;
}
.flex-grow {
  flex-grow: 1;
}

input[type="search"] {
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 5px;
  color: #333;
  font-size: 16px;
  padding: 8px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

input[type="search"]:focus {
  border-color: #0077cc;
  box-shadow: 0 0 8px #0077cc;
  outline: none;
}
</style>