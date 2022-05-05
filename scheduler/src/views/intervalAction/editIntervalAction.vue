<template>
  <div class="center-shrink">
<!--    <nav class="bg-light center-header px-3 pt-2 font-weight-bold">-->
<!--      <div class="d-inline">-->
<!--        <h3 class="d-inline">Edit Interval Action</h3>-->
<!--        <div class="next-nav">-->
<!--          <a-breadcrumb class="d-inline" separator="">-->
<!--            <a-breadcrumb-item ><a class="text-decoration-none"  href="">Scheduler</a></a-breadcrumb-item>-->
<!--            <a-breadcrumb-separator>></a-breadcrumb-separator>-->
<!--            <a-breadcrumb-item ><a class="text-decoration-none" href="">Interval Action Center</a></a-breadcrumb-item>-->
<!--            <a-breadcrumb-separator>></a-breadcrumb-separator>-->
<!--            <a-breadcrumb-item >Edit Interval Action</a-breadcrumb-item>-->
<!--          </a-breadcrumb>-->
<!--        </div>-->
<!--      </div>-->
<!--    </nav>-->
    <div class="center-center p-3">

      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs font-weight-bold">
            <li class="nav-item active">
              <router-link class="nav-link text-decoration-none" to="/interval" ><span> Interval</span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-decoration-none" to="/intervalAction"><span> Interval Action</span></router-link>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="card">
            <div class="card-header">
              <span><img  class="icon" src="../../assets/edit.svg">Edit Interval Action</span>
              <el-button class="btn btn-sm btn-success float-right" :disabled="submitDisabled" @click="submitEditData">save</el-button>
            </div>
            <div class="card-body">
              <el-form class="" status-icon :rules="actionRules">
                <div class="form_style">
                  <label class="text_style">Name</label>
                  <el-form-item class="block" prop="nameR">
                    <el-input  v-model="selection.name"/>
                  </el-form-item>
                </div>
                <div class="form_style row">
                  <label class="text_style">Interval Name</label>
                  <el-form-item class="block" prop="intervalNameR">
                    <el-input v-model="selection.intervalName" />
                  </el-form-item>
                </div>
                <div class="form_style row">
                  <label class="text_style">管理状态</label>
                  <el-form-item class="block">
                    <el-select
                        v-model="selection.adminState"
                        placeholder=" "
                        class="se_width">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form_style row">
                  <label class="text_style">地址</label>
                  <div class="block">
                    <div class="card">
                      <div class="card-header btn_location">
                        <el-button :class="showing==='REST'?'active':''" @click="jump('REST')" >REST</el-button>
                        <el-button :class="showing==='MQTT'?'active':''" @click="jump('MQTT')">MQTT</el-button>
                        <el-button :class="showing==='EMAIL'?'active':''" @click="jump('EMAIL')">EMAIL</el-button>
                      </div>
                      <div class="card-body">
                        <Rest v-if="showing==='REST'" :isEdit="edit" :address="actionAddress"></Rest>
                        <Mqtt v-else-if="showing==='MQTT'" :address="actionAddress"></Mqtt>
                        <Email v-else-if="showing==='EMAIL'" :address="actionAddress"></Email>
                      </div>
                    </div>
                  </div>
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

import Email from "@/components/intervalActionAddress/Email";
import Rest from "@/components/intervalActionAddress/Rest";
import Mqtt from "@/components/intervalActionAddress/Mqtt";
import {updateIntervalAction, getIntervalActionByName} from "@/api/scheduler";
import {ElNotification} from "element-plus";

export default {
  name: "addIntervalAction",
  components: {Mqtt, Rest,Email},
  data(){
    return{
      actionRules:{
        nameR:[{required:true,message:"the interval action name can't be empty!",trigger:'blur'}],
        intervalNameR:[{required:true,message:"the interval name can't be empty!",trigger:'blur'}],
      },
      selection:[],
      actionAddress:[],
      options:[{
        value:"UNLOCKED",
        label:"UNLOCKED",
      },{
        value:"LOCKED",
        label:"LOCKED",
      }],
      value:"",
      showing: "",
      edit:true,
      editName:'',
      nameNotEmpty:false,
      intervalNotEmpty:false,
      submitDisabled:false,
    }
  },
  methods:{
    jump(type){
      this.showing=type;
    },
    submitEditData(){
      updateIntervalAction(this.intervalActionValue,data =>{
        console.log(data)
        this.$router.push("/intervalAction");
        ElNotification({
          showClose:true,
          message:"edit success",
          type:'success',
        });
      },error =>{
        console.log("edit interval error:"+error);
        ElNotification({
          showClose:true,
          message:"edit fail",
          type:'warning',
        });
      },()=>{
        console.log("edit interval final");
      })
      this.$router.push("/intervalAction");
    }
  },
  created() {
    this.editName=this.$route.query.name;
    getIntervalActionByName(this.editName,data => {
      this.selection=data.action;
      this.actionAddress=this.selection.address;
      this.showing=this.actionAddress.type;
      console.log(this.showing)
    },error => {
      console.log("editIntervalAction:"+error);
    },() => {
      console.log("editIntervalAction final");
    })
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
      }else{
        this.submitDisabled=true;
      }
    },
    'selection.intervalName':function (newVal){
      if(`${newVal}`!=""){
        this.intervalNotEmpty=true;
      }else{
        this.intervalNotEmpty=false;
      }
      if(this.nameNotEmpty && this.intervalNotEmpty){
        this.submitDisabled=false;
      }else{
        this.submitDisabled=true;
      }
    },
  },
}
</script>

<style scoped>
.center-shrink{
  position: absolute;
  left: 20px;
  right: 0;
}
.center-header{
  height: 65px;
}
.font-weight-bold{
  font-weight: 700;
}
.px-3{
  padding-right: 1rem;
}
.pt-2{
  padding-top: 0.5rem;
}
.bg-light{
  background-color: #ffffff;
}
.next-nav{
  padding-top: 10px;
}

.d-inline{
  display: inline;
}
.se_width{
  width: 100%;
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
.tip{
  margin-bottom: 15px;
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
  padding-top: 5px;
  width: 15px;
  height: 15px;
  padding-right: 5px;
}
.btn_location{
  text-align: left;
  display: flex;
}
.active{
  background-color: #ECF5FF;
  color:#45A0FF;
  border-color: #94C8FF;
}

</style>