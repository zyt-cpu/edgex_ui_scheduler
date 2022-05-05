<template>
  <router-view />
</template>

<script>
export default {
  name: "Scheduler",
}
</script>

<style scoped>
.scheduler-container{
  position: fixed;
  width: 200px;
  height: 100%;
  background-color: rgba(0,0,0,.5);
}
</style>