<template>
  <el-form class="mqtt" :model="mqttData" :rules="mqttRules" status-icon>
    <div class="form_style row">
      <label class="text_style">Host</label>
      <el-form-item class="block" prop="host">
        <el-input  v-model="mqttData.host"/>
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Port</label>
      <el-form-item class="block" prop="port">
        <el-input  v-model="mqttData.port"/>
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Content<el-popover
          title="tips"
          content='the actual content to be sent as the body,such as one string format of JSON'
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block">
        <el-input  v-model="mqttData.content" />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">ContentType<el-popover
          title="tips"
          content='Indicates which request contentType should be used (i.e. text/html, application/json), the default is application/json if not setup'
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block">
        <el-input  v-model="mqttData.contentType" />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Publisher</label>
      <el-form-item class="block" prop="publisher">
        <el-input  v-model="mqttData.publisher"/>
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Topic</label>
      <el-form-item class="block" prop="topic">
        <el-input  v-model="mqttData.topic" />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">QoS<el-popover
          title="format tips"
          content='only pure integer supported!'
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block">
        <el-input-number
            v-model="mqttData.qoS"
            class="input_number"
            :min="-10"
            :max="100"
            controls-position="right"
        />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">KeepAlive<el-popover
          title="format tips"
          content='only pure integer supported!'
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block">
        <el-input-number
            v-model="mqttData.keepAlive"
            class="input_number"
            :min="-10"
            :max="100"
            controls-position="right"
        />
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">Retained</label>
      <el-form-item class="block">
        <el-select
            v-model="mqttData.retained"
            class="input_number"
        >
          <el-option>true</el-option>
          <el-option>false</el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">AutoConnect</label>
      <el-form-item class="block">
        <el-select
            v-model="mqttData.autoConnect"
            class="input_number"
        >
          <el-option>true</el-option>
          <el-option>false</el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="form_style row">
      <label class="text_style">ConnectTimeout<el-popover
          title="format tips"
          content='only pure integer supported!'
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block">
        <el-input-number
            v-model="mqttData.connectTimeout"
            class="input_number"
            :min="-10"
            :max="100"
            controls-position="right"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "Mqtt",
  props:["address"],
  data(){
    return{
      mqttData:this.address,
      mqttRules:{
        host:[{required:true,message:"the MQTT address host can't be empty!",trigger:"blur"}],
        port:[{required:true,message:"the MQTT port can't be empty and only pure integer is supported!",trigger:"blur"}],
        publisher:[{required:true,message:"the MQTT publisher can't be empty!",trigger:"blur"}],
        topic:[{required:true,message:"the MQTT topic can't be empty!",trigger:"blur"}],

      }
    }
  },
  watch:{
    mqttData:{
      handler(newVal){
        console.log("data")
        this.$emit("mqtt",newVal);
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
.input_number{
  width: 100%;
}
</style>