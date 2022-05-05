<template>
  <div class="center-shrink">
<!--    <nav class="bg-light center-header px-3 pt-2 font-weight-bold">-->
<!--      <div class="d-inline">-->
<!--        <h3 class="d-inline">Edit Interval</h3>-->
<!--        <div class="next-nav">-->
<!--          <a-breadcrumb class="d-inline" separator="">-->
<!--            <a-breadcrumb-item ><a class="text-decoration-none"  href="">Scheduler</a></a-breadcrumb-item>-->
<!--            <a-breadcrumb-separator>></a-breadcrumb-separator>-->
<!--            <a-breadcrumb-item ><a class="text-decoration-none" href="">Interval Center</a></a-breadcrumb-item>-->
<!--            <a-breadcrumb-separator>></a-breadcrumb-separator>-->
<!--            <a-breadcrumb-item >Edit Interval</a-breadcrumb-item>-->
<!--          </a-breadcrumb>-->
<!--        </div>-->
<!--      </div>-->
<!--    </nav>-->
    <div class="center-center p-3">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs font-weight-bold">
            <li class="nav-item active">
              <router-link class="nav-link text-decoration-none" to="/interval"><span> Interval</span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-decoration-none" to="/intervalAction"><span> Interval Action</span></router-link>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="card">
            <div class="card-header">
              <span><img  class="icon" src="../../assets/edit.svg">Edit Interval</span>
              <el-button class="btn btn-sm btn-success float-right" @click="submitEditData" :disabled="submitDisabled">submit</el-button>
            </div>
            <div class="card-body">
              <el-form class="" :rules="intervalRules" status-icon>
                <div class="form_style">
                  <label class="text_style">Name</label>
                  <el-form-item class="block" prop="Name">
                    <el-input prop="name" v-model="selection.name"/>
                  </el-form-item>
                </div>
                <div class="form_style row">
                  <label class="text_style">开始</label>
                  <el-form-item class="block with_icon">
                    <el-date-picker
                        class="selected_width"
                        v-model="selection.start"
                        type="datetime"
                        placeholder="pick"
                        format="YYYYMMDDThhmmss"
                        value-format="YYYYMMDDThhmmss"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="form_style row">
                  <label class="text_style">结束</label>
                  <el-form-item class="block with_icon">
                    <el-date-picker
                        class="selected_width"
                        v-model="selection.end"
                        type="datetime"
                        placeholder="pick"
                        format="YYYYMMDDThhmmss"
                        value-format="YYYYMMDDThhmmss"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="form_style row">
                  <label class="text_style">单位间隔
                    <el-popover
                        popper-class="my_popover"
                        title="format tips"
                        content='Interval indicates how often the specific resource needs to be polled. It represents as a duration string. The format of this field is to be an unsigned integer followed by a unit which may be "ns", "us" (or "µs"), "ms", "s", "m", "h" representing nanoseconds, microseconds, milliseconds, seconds, minutes or hours. Eg, "100ms", "24h"'
                        :width="300"
                        placement="right"
                    ><template #reference><img class="icon" src="../../assets/question.svg">
                    </template></el-popover></label>
                  <el-form-item class="block" prop="Interval">
                    <el-input v-model="selection.interval"/>
                  </el-form-item>
                </div>
                <div class="form_style row">
                  <label class="text_style">执行单次</label>
                  <el-form-item class="block" prop="notEmpty">
                    <el-select class="selected_width" v-model="selection.runOnce">
                      <el-option value="true" label="true">true</el-option>
                      <el-option value="false" label="false">false</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ElNotification} from "element-plus";
import {updateInterval} from "@/api/scheduler";

export default {
  name: "addInterval",
  data(){
    return{
      selection:{},
      intervalRules:{
        Name:[{required:true,message:"the interval name can't be empty!",trigger:'blur'}],
        Interval:[{required:true,message:"the interval interval can't be empty!",trigger:'blur'}],
      },
      nameNotEmpty:false,
      intervalNotEmpty:false,
      submitDisabled:false,
    }
  },
  watch:{
    'selection.name':function(newVal){
      if(`${newVal}`!=""){
        this.nameNotEmpty=true;
      }else{
        this.nameNotEmpty=false;
      }
      if(this.nameNotEmpty && this.intervalNotEmpty){
        this.submitDisabled=false;
      }
      else{
        this.submitDisabled=true;
      }
    },
    'selection.interval':function (newVal){
      if(`${newVal}`!=""){
        this.intervalNotEmpty=true;
      }else{
        this.intervalNotEmpty=false;
      }
      if(this.nameNotEmpty && this.intervalNotEmpty){
        this.submitDisabled=false;
      }
      else{
        this.submitDisabled=true;
      }
    },
  },
  mounted() {
    console.log(this.$route.query)
    this.selection=this.$route.query;
  },
  methods:{
    submitEditData(){
      updateInterval(this.selection,data =>{
        console.log(data)
        this.$router.push("/interval");
        ElNotification({
          showClose:true,
          message:"edit success",
          type:'success',
        });
      }, error =>{
        console.log("editInterval error:"+error)
        ElNotification({
          showClose:true,
          message:"edit fail",
          type:'warning',
        });
      },()=>{
        console.log("editInterval final")
      })
    }
  }
}
</script>

<style scoped>
.selected_width{
  width: 100%;
}
.center-shrink{
  position: absolute;
  left: 20px;
  right: 0;
}

.text-decoration-none{
  text-decoration: none;
}
.center-center{

}

.p-3{
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;

}
.card{
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: initial;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
}
.card-header{
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #00000008;
  border-bottom: 1px solid rgba(0,0,0,.125);
}
.card-body{
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
}
.nav{
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  margin-top: 5px;
}
.nav-tabs{
  border-bottom: 1px solid #dee2e6;
}
.card-header-tabs{
  padding-top: 0.75rem;
  padding-right: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0,0,0,.125);
  margin-bottom: -0.75rem;
  border-bottom: 0;
}
.nav-item{
  padding-left: 5px;
}
.nav-link{
  margin-bottom: -1px;
  border: 1px solid #0000;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.active{
  /*background-color: #ffffff;*/
  /*border: 1px solid rgba(0,0,0,.125);*/
  /*border-radius: 0.25rem;*/
}

.btn{
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  user-select: none;
  background-color: initial;
  border: 1px solid #0000;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}
.btn-sm{
  padding: 0.25rem 0.5rem;
  font-size: .875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
.btn-success{
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}
.float-right{
  float: right;
}


.form_style{
  display: flex;
  text-align: center;
  font-size:initial;
}
.block{
  width: 100%;
}
.block_style{
  display: block;
  width: 100%;
  height: calc(1em + 0.5rem + 2px);
  border-radius: 0.25rem;
  border: 1px solid rgba(0,0,0,0.125);
}
.text_style{
  width: 20%;
  padding-top: 5px;
  text-align: left;
}
.row{
  padding-top: 15px;
}
.icon{
  padding-left: 5px;
  padding-top: 5px;
  width: 15px;
  height: 15px;
}
.with_icon{
  display: flex;
}
/deep/ .selected_width.el-input, .selected_width.el-input__inner {
  width: 100%;
}
</style>
<style>

</style>