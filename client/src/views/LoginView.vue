<script setup>
import Login from "../components/Login.vue"
</script>

<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="mycontent">
      <div class="container">
        <div class="box-wrapper">
          <div class="box-inner">
             <Login />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

.box-wrapper {
  width: 600px !important;
}
.mycontent {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  box-sizing: border-box;
}

@media screen and (max-width: 768px) { /* Apply the styles below for screens with a maximum width of 768px */
  .box-wrapper {
    width: 100% !important; /* Change the width to 100% */
  }
}

</style>