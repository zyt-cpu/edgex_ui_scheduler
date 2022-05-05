<template>
  <div class="center-center p-3">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs font-weight-bold">
            <li class="nav-item active">
              <a class="nav-link text-decoration-none" disabled="disabled"><span> Interval</span></a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-decoration-none" to="/intervalAction"><span> Interval Action</span></router-link>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="card">
            <div class="card-header">
              <span><img  class="icon" src="../assets/list-solid.svg">Interval List</span>
            </div>
            <div class="table_button">
              <el-button  :plain="true" type="primary" @click="open1"><img class="icon" src="../assets/refresh.svg"><span class="button_text">refresh</span></el-button>
              <el-button type="warning" @click="toAddIntervalView"><img class="icon" src="../assets/add.svg">
                <span class="button_text">
                  add
                </span>
              </el-button>
              <el-button type="success" :disabled="editDisabled" @click="toEditIntervalView"><img class="icon" src="../assets/edit.svg"><span class="button_text">edit</span></el-button>
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
                    prop="id"
                    label="ID"
                    width="350"
                ></el-table-column>
                <el-table-column
                    prop="name"
                    label="Name"
                    width="350"
                ></el-table-column>
                <el-table-column
                    prop="start"
                    label="Start"
                    width="200"
                ></el-table-column>
                <el-table-column
                    prop="end"
                    label="End"
                    width="200"
                ></el-table-column>
                <el-table-column
                    prop="interval"
                    label="Interval"
                ></el-table-column>
                <el-table-column
                    prop="runOnce"
                    label="RunOnce"
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
                      :page-sizes="[2,5,8]"
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
      <span>Associated actions will also be deleted and the data will be permanently erased!!! Are you sure to execute delete operation？</span>
      <template #footer>
        <span class="dialogFooter">
          <el-button type="info" @click="dialogVisibled=false">Cancle</el-button>
          <el-button type="danger" @click="deleteInterval">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ElNotification} from 'element-plus'
import {getAllInterval,deleteInterval,getIntervalByName} from "@/api/scheduler";
//import Bus from '@/plugins/Bus'

let IntervalInfo=function(id,name,start,end,interval,runOnce){
  this.id=id;
  this.name=name;
  this.start=start;
  this.end=end;
  this.interval=interval;
  this.runOnce=runOnce;
}

export default {
  name: "interval",
  data(){
    const open1=()=> {
      ElNotification({
        showClose:true,
        message: 'refresh success',
        type: 'success',
      })
    }
    return{
      show:false,
      editDisabled:true,
      deleteDisabled:true,
      open1,
      tableData:[],
      multipleSelection:[],
      currentPage2:5,
      dialogVisibled:false,
      ifIntervalToAction:"",
    }
  },
  created() {
    getAllInterval(
        data => {
          for(var i=0;i<data.intervals.length;i++){
           let intervalInfo=new IntervalInfo(data.intervals[i].id,data.intervals[i].name,data.intervals[i].start,data.intervals[i].end,data.intervals[i].interval,"false",);
           this.tableData.push(intervalInfo);
          }
          console.log(this.tableData)
        },
        error => {
          console.log("error:"+error);
        },
        () => {
          console.log("final");
        }
    );
    this.ifIntervalToAction=this.$route.query.name;
    if(this.ifIntervalToAction!=null){
      getIntervalByName(this.ifIntervalToAction,data=>{
        console.log(data.interval)
        this.tableData=[]
        console.log(this.tableData)
        let intervalInfo=new IntervalInfo(data.interval.id,data.interval.name,data.interval.start,data.interval.end,data.interval.interval,"false");
        this.tableData.push(intervalInfo)
        console.log(this.tableData)
        console.log("getIntervalByName",this.tableData);
      },error =>{
        console.log("action to interval error:"+error);
      },()=>{
        console.log("action to interval final")
      })}
    this.ifIntervalToAction=""
  },
  mounted() {

  },
  methods:{
    btndata() {
      this.show = true
    },
    toAddIntervalView(){
      this.$router.push("/addInterval");
    },
    handleSelectionChange(val){
      this.multipleSelection=val;
      if(this.multipleSelection.length>0){
        this.deleteDisabled=false;
      }else{
        this.deleteDisabled=true;
      }
      if(this.multipleSelection.length===1){
        this.editDisabled=false;
      }else{
        this.editDisabled=true;
      }
      console.log("Interval", this.multipleSelection);

    },
    handleSizeChange(val){

      console.log(`每页${val}条`);
    },
    handleCurrentChange(val){
      console.log(`当前页:${val}`);
    },
    toEditIntervalView(){
      this.$router.push({path:"/editInterval",query:this.multipleSelection[0]});

    },

    deleteInterval(){
      console.log(this.multipleSelection)
      for(var i=0;i<this.multipleSelection.length;i++){
        deleteInterval(this.multipleSelection[i].Name,data=>{
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
.el-dialog_title{
  color: red;
}
.back{
  background: white;
  border-color: rgba(0,0,0,.125)  ;
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