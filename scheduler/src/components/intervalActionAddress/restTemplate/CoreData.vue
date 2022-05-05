<template>
  <el-form class="coreData"  :rules="coreRules" status-icon>
    <div class="form_style row">
      <label class="text_style">HttpMethod</label>
      <el-form-item class="block" >
        <el-select class="selected_width" v-model="editData.httpMethod">
          <el-option value="DELETE" label="DELETE">DELETE</el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Host
        <el-popover
            title="tips"
            content='Both Host and Port fields are editable if you have a different host address !'
            :width="300"
            placement="right"
        ><template #reference><img class="icon" src="../../../assets/question.svg">
        </template></el-popover></label>
      <el-form-item class="block" prop="host">
        <el-input v-model="editData.host" />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Port</label>
      <el-form-item class="block" prop="port">
        <el-input v-model="editData.port"  />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Path
        <el-popover
          title="tips"
          content='Remove all old events (and associated readings) based on delimiting age, the parameters delimiting age will be filled up automatically when parameters field is selected!'
          :width="300"
          placement="right">
          <template #reference><img class="icon" src="../../../assets/question.svg"></template>
        </el-popover>
      </label>
      <el-form-item class="block">
        <el-input v-model="editData.path" disabled/>
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Parameter</label>
      <el-form-item class="block with_icon">
        <el-date-picker
            class="selected_width"
            v-model="editData.parameter"
            type="datetime"
            placeholder=" "
            format="YYYYMMDDThhmmss"
        ></el-date-picker>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "CoreData",
  props:["edit","addressContent"],
  data(){
    return{
      coreRules:{
        host:[{required:true,message:"the REST address host can't be empty!",trigger:"blur"}],
        port:[{required:true,message:"the REST address port can't be empty and only pure integer is supported!",trigger:"blur"}],
      },
      editData:this.addressContent,
      hostNotEmpty:false,
      portNotEmpty:false,
      httpMethodNotEmpty:false
    }
  },
  watch:{
    editData: {
      handler(newVal) {
        this.$emit("core",newVal);
      },
      deep:true
    }
  }
}
</script>

<style scoped>
.selected_width{
  width: 100%;
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
  padding-left: 5px;
  width: 15px;
  height: 15px;
}
.with_icon{
  display: flex;
}
.calender{
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
  width: 3%;
  background-color: #e9ecef;
}
.cal_input{
  background-color: #e9ecef;
  width: 100%;
}
/deep/ .selected_width.el-input, .selected_width.el-input__inner {
  width: 100%;
}
</style>