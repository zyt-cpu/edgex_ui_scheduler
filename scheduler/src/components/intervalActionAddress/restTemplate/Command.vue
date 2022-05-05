<template>
  <el-form class="command" status-icon :rules="commandRules" :model="commandData">
    <div class="form_style row">
      <label class="text_style">HttpMethod <el-popover
          title="tips"
          content='httpMethod field will be filled up automatically when the path field is selected! '
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block">
        <el-input  disabled />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Host <el-popover
          title="tips"
          content='Both Host and Port fields are editable if you have a different host address !'
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block">
        <el-input v-model="commandData.host" />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Port</label>
      <el-form-item class="block">
        <el-input v-model="commandData.port"  />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Path</label>
      <el-form-item class="block">
        <el-select  class="select_width" placeholder=" ">
          <span class="select_table-title"><img class="icon" src="../../../assets/list-solid.svg">Device Core Command List</span>
          <el-table
              :data="options"
          >
            <el-table-column label="#" prop="#" width="20%"></el-table-column>
            <el-table-column label="device" prop="device"></el-table-column>
            <el-table-column label="deviceprofile" prop="deviceprofile"></el-table-column>
            <el-table-column label="associtaion" prop="associationcommands"></el-table-column>
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
              <span>{{item.device}}</span>
              <span>{{item.deviceprofile}}</span>
              <span>{{item.associationcommands}}</span>
            </el-option>
          </el-table>
          <div class="card-foot text-muted">
            <span class="demonstration">items per page</span>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5,10,15]"
                layout="sizes,prev,pager,next"
                :total=10
            ></el-pagination>
          </div>


        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "Command",
  props:["addressContent"],
  data(){
    return{
      options:[{
        device:"",
        deviceprofile:"",
        associationcommands:"",
      },],
      commandRules:{},
      commandData:this.addressContent,
    }
  },
  watch:{
    commandData:{
      handler(newVal){
        this.$emit("command",newVal);
      },
      deep:true,
    }
  }
}
</script>

<style scoped>
.demonstration{
  padding-top: 8px;
  text-align: right;
}
.text-muted{
  color:#6c757d;
}
.card-foot{
  padding-top: 10px;
  font-size: 15px;
  display: flex;

}
.select_table-title{
  padding-left: 5px;
  font-size: 15px;
}

.form_style{
  display: flex;
  text-align: center;
  font-size:initial;
}
.block{
  width: 100%;
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
  padding-left: 5px;
  padding-right: 5px;
  width: 15px;
  height: 15px;
}

.select_width{
  width: 100%;
}
</style>