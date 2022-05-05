<template>
  <el-form class="customize" status-icon :rules="customizeRules" :model="customizeData">
    <div class="form_style row">
      <label class="text_style">HttpMethod</label>
      <el-form-item class="block">
        <el-select
            v-model="customizeData.httpMethod"
            class="select_width"
        >
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
      <label class="text_style">Host</label>
      <el-form-item class="block" prop="host">
        <el-input v-model="customizeData.host" />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Port</label>
      <el-form-item class="block" prop="port">
        <el-input v-model="customizeData.port"  />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Path</label>
      <el-form-item class="block">
        <el-input v-model="customizeData.path"  />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Content<el-popover
          title="tips"
          content='the actual content to be sent as the body,such as one string format of JSON '
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block">
        <el-input v-model="customizeData.content"  />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">ContentType<el-popover
          title="tips"
          content='Indicates which request contentType should be used (i.e. text/html, application/json), the default is application/json if not setup'
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block">
        <el-input v-model="customizeData.contentType"  />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>

export default {
  name: "Customize",
  props:['addressContent'],
  data(){
    return{
      customizeRules:{
        host:[{required:true,message:"the REST address host can't be empty!",trigger:"blur"}],
        port:[{required:true,message:"the REST address port can't be empty and only pure integer is supported!",trigger:"blur"}],
      },
      customizeData:this.addressContent,
      options:[{
        value:"GET",
        label:"GET",
      },{
        value:"POST",
        label:"POST",
      },{
        value:"PUT",
        label:"PUT",
      },{
        value:"DELETE",
        label:"DELETE",
      },{
        value:"PATCH",
        label:"PATCH",
      },{
        value:"HEAD",
        label:"HEAD",
      },{
        value:"TRACE",
        label:"TRACE",
      },{
        value:"CONNECT",
        label:"CONNECT",
      }],
      value:''
    }
  },
  watch:{
    customizeData:{
      handler(newVal){
        this.$emit("customize",newVal);
      },
      deep:true,
    }

  }
}
</script>

<style scoped>
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

.select_width{
  width: 100%;
}
</style>