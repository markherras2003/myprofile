<script setup>
import Welcome from "../components/Welcome.vue"
</script>

<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="row">
    <div class="col-md-12">
      <div class="mycontent">
      <div class="container">
        <div class="box-wrapper">
          <div class="box-inner">
       
          </div>
        </div>
      </div>
    </div>
    </div>

    <div class="col-md-12">
      <div class="mycontent">
      <div class="container">
        <div class="box-wrapper">
          <div class="box-inner">
            
          </div>
        </div>
      </div>
    </div>
    </div>
   
  </div>

  </main>
</template>


<style scoped>

.mycontent {
  position: relative;
  text-align: left;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.container {
  position: absolute;
  left: 0;
}

.box-wrapper {
  display: flex;
  width: 100%;
}

.box-inner {
  margin: 0 auto;
}
</style>