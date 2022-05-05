<template>
  <div class="center-shrink">
<!--    <nav class="navBar">-->
<!--      <div class="d-inline">-->
<!--        <h3 class="d-inline">Interval List</h3>-->
<!--        <div class="next-nav">-->
<!--          <a-breadcrumb class="d-inline" separator="">-->
<!--            <a-breadcrumb-item ><a class="text-decoration-none"  href="">Scheduler</a></a-breadcrumb-item>-->
<!--            <span>></span>-->
<!--            <a-breadcrumb-item ><a class="text-decoration-none" href="../interval/intervalView.vue">Interval Center</a></a-breadcrumb-item>-->
<!--            <span>></span>-->
<!--            <a-breadcrumb-item >Interval List</a-breadcrumb-item>-->
<!--          </a-breadcrumb>-->
<!--        </div>-->
<!--      </div>-->
<!--    </nav>-->
    <Interval></Interval>
  </div>
</template>

<script>
import Interval from '@/components/Interval'
export default {
  name: "interval",
  components:{Interval}
}
</script>

<style scoped>
.center-shrink{
  position: absolute;
  left: 20px;
  right: 0;
}
.navBar{
  height: 65px;
  padding-right: 1rem;
  padding-top: 0.5rem;
  font-weight: 700;
}
.d-inline{
  display: inline;
}
.text-decoration-none{
  text-decoration: none;
}
.next-nav{
  padding-top: 10px;
}
</style>