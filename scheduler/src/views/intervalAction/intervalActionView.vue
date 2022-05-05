<template>
  <div class="center-shrink">
<!--    <nav class="navBar">-->
<!--      <div class="d-inline">-->
<!--        <h3 class="d-inline">Interval Action List</h3>-->
<!--        <div class="next-nav">-->
<!--          <a-breadcrumb class="d-inline" separator="">-->
<!--            <a-breadcrumb-item ><a class="text-decoration-none"  href="">Scheduler</a></a-breadcrumb-item>-->
<!--            <span>></span>-->
<!--            <a-breadcrumb-item ><router-link class="text-decoration-none" to="/intervalAction">Interval Action Center</router-link></a-breadcrumb-item>-->
<!--            <span>></span>-->
<!--            <a-breadcrumb-item >Interval Action List</a-breadcrumb-item>-->
<!--          </a-breadcrumb>-->
<!--        </div>-->
<!--      </div>-->
<!--    </nav>-->
    <IntervalAction></IntervalAction>
  </div>
</template>

<script>
import IntervalAction from '@/components/IntervalAction'
export default {
  name: "interval",
  components:{IntervalAction},
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