<template>
    <div class="center-center p-3">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs font-weight-bold">
            <li class="nav-item active">
              <router-link class="nav-link text-decoration-none" to="/interval"><span> Interval</span></router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link text-decoration-none" disabled="disabled"><span> Interval Action</span></a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="card">
            <div class="card-header">
              <span><img  class="icon" src="../assets/list-solid.svg">Interval Action List</span>
            </div>
            <div class="table_button">
              <el-button  :plain="true" @click="open1" type="primary"><img class="icon" src="../assets/refresh.svg"><span class="button_text">refresh</span></el-button>
              <el-button type="warning" @click="toAddIntervalActionView"><img class="icon" src="../assets/add.svg"><span class="button_text">add</span></el-button>
              <el-button type="success" :disabled="editDisabled" @click="toEditIntervalActionView"><img class="icon" src="../assets/edit.svg"><span class="button_text">edit</span></el-button>
              <el-button  type="danger" :disabled="deleteDisabled" @click="dialogVisibled=true"><img class="icon" src="../assets/delete.svg"><span class="button_text" >delete</span></el-button>
            </div>
            <div class="card-body">
              <el-table
                  :header-cell-style="{background:'#E9ECEF',color:'black'}"
                  ref="mutipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                ></el-table-column>
                <el-table-column
                    prop="ID"
                    label="ID"
                ></el-table-column>
                <el-table-column
                    prop="Name"
                    label="Name"
                ></el-table-column>
                <el-table-column
                    prop="AssociationInterval"
                    label="AssociationInterval"
                >
                  <template v-slot="scope">
                    <el-button class="associationInterval" @click="associationInterval(scope.row.AssociationInterval)">{{scope.row.AssociationInterval}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="AddressType"
                    label="AddressType"
                ></el-table-column>
              </el-table>
            </div>
            <div class="container">
              <div class="wrapper">
                <div class="card-foot text-muted">
              <span class="demonstration">items per page</span>
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[5,10,15]"
                  layout="->,sizes,prev,pager,next"
                  :total=tableData.length
              ></el-pagination>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div>
    <el-dialog
        v-model="dialogVisibled"
        title="Warning"
    >
      <span>The data will be permanently erased!!! Are you sure to execute delete operation？</span>
      <template #footer>
        <span class="dialogFooter">
          <el-button type="info" @click="dialogVisibled=false">Cancle</el-button>
          <el-button type="danger" @click="deleteIntervalAction">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {h} from 'vue'
import {deleteIntervalAction, getAllIntervalAction} from "@/api/scheduler";

let ActionInfo=function(id,name,associationInterval,addressType){
  this.ID=id;
  this.Name=name;
  this.AssociationInterval=associationInterval;
  this.AddressType=addressType;
}

export default {
  name: "intervalAction",
  data(){
    return{
      show:false,
      tableData:[],
      mutipleSelection:[],
      editDisabled:true,
      deleteDisabled:true,
      dialogVisibled:false,
    }
  },
  created() {
    getAllIntervalAction(data => {
      for(var i=0;i<data.actions.length;i++){
        let actionInfo=new ActionInfo(data.actions[i].id,data.actions[i].name,data.actions[i].intervalName,data.actions[i].address.type);
        this.tableData.push(actionInfo);
      }
    },error=>{
      console.log(error)
    },()=>{
      console.log("final")
    })
  },
  methods:{
    associationInterval(name){
      //console.log(name)
      this.$router.push({path:"/interval",query:{name:name}})
    },
    btndata() {
      this.show = true
    },
    toAddIntervalActionView() {
      this.$router.push("/addIntervalAction");
    },
    open1(){
      this.$notify({
        message:h('i',{style:'color:#417A4E'},"refresh success!"),
        type:'success',
        showClose:true,
      })
    },
    handleSelectionChange(val){
      this.multipleSelection=val;
      if(this.multipleSelection.length>0){
        this.editDisabled=false;
        this.deleteDisabled=false;
      }else{
        this.deleteDisabled=true;
        this.editDisabled=true;
      }
      if(this.multipleSelection.length>1){
        this.editDisabled=true;
      }
      console.log(this.multipleSelection.length);
      console.log(this.disable)
    },
    toEditIntervalActionView(){
      console.log(this.multipleSelection[0].Name)
      this.$router.push({path:"/editIntervalAction",query:{name:this.multipleSelection[0].Name}});
    },
    deleteIntervalAction(){
      console.log(this.multipleSelection)
      for(var i=0;i<this.multipleSelection.length;i++){
        deleteIntervalAction(this.multipleSelection[i].Name,data=>{
          console.log(data)
        }, error =>{
          console.log("delete interval error:"+error);
        },()=>{
          console.log("delete interval final");
        })
      }
      this.dialogVisibled=false;
    },

  }
}
</script>

<style scoped>
.associationInterval{
  border-color: white;
  color: #70C4FF;
}
.demonstration{
  padding-top: 8px;
  text-align: right;
}
.text-muted{
  color:#6c757d;
}
.card-foot{
  display: flex;
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
.icon{
  padding-top: -1px;
  padding-right: 2px;
  width: 15px;
  height: 15px;
}

.table_button{
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,.125);
}
.button_text{
  padding-top: 2px;
}
.container{
  position: relative;
  padding: 0.75rem 1.25rem;
  background-color: #00000008;
  border-top:1px solid raba(0,0,0,0.125) ;
}

.wrapper {
  width: 400px;
  position: relative;
  left: 75%;
}
</style>