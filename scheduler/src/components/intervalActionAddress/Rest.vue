<template>
  <div class="template">
    <div class="card-body-header">
      <div class="templateTip" v-if="isEdit">
        <span>Available and Editable templates >> </span>
        <el-popover
            title="tips"
            content='custom template will be choosed by default'
            :width="300"
            placement="right"
        ><template #reference><img class="icon" src="../../assets/question.svg">
        </template></el-popover>
      </div>
      <el-button :class="showing==='core'?'active':''" @click="jump('core')" >CoreData服务模版</el-button>
      <el-button :class="showing==='command'?'active':''" @click="jump('command')">Command服务模版</el-button>
      <el-button :class="showing==='customize'?'active':''" @click="jump('customize')">自定义模版</el-button>
    </div>
    <div class="">
      <Customize v-if="showing==='customize'" :addressContent="address" @customize="getSonMessage"></Customize>
      <Command v-else-if="showing==='command'" :addressContent="address" @command="getSonMessage"></Command>
      <CoreData v-else-if="showing==='core'" :addressContent="address" @core="getSonMessage"></CoreData>
    </div>
  </div>
</template>

<script>
import CoreData from "@/components/intervalActionAddress/restTemplate/CoreData";
import Command from "@/components/intervalActionAddress/restTemplate/Command";
import Customize from "@/components/intervalActionAddress/restTemplate/Customize";

export default {
  name: "Rest",
  components: {Customize,Command,CoreData},
  props:['address'],
  data(){
    return{
      showing: "core",
      isActive: false,
    }
  },
  methods:{
    jump(type){
      this.showing=type;
    },
    getSonMessage(data){
      this.$emit("rest",data);
    }
  },
  created() {
  }
}
</script>

<style scoped>
.card-body-header{
  display: flex;
}
.templateTip{
  color: #48A9FB;
  padding-top: 5px;
  padding-right: 5px;
}
.card-header{
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #00000008;
  border-bottom: 1px solid rgba(0,0,0,.125);
}
.template{
  text-align: left;

  /*background-color: #00000008;*/
}
.active{
  background-color: #ECF5FF;
  color:#45A0FF;
  border-color: #94C8FF;
}
.icon{
  padding-left: 5px;
  width: 15px;
  height: 15px;
}
</style>