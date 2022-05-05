<template>
  <el-form class="mqtt" :model="eamilData"  status-icon>
    <div class="form_style row">
      <label class="text_style">EmailRecipients<el-popover
          title="tips"
          content='Multiple email addresses are separated by commas'
          :width="300"
          placement="right"
      ><template #reference><img class="icon" src="../../assets/question.svg">
      </template></el-popover></label>
      <el-form-item class="block" >
        <el-input  v-model="emailData.emailRecipients"/>
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
      <el-form-item class="block" >
        <el-input  v-model="emailData.content"/>
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
        <el-input  v-model="emailData.contentType" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "Email",
  props:["address"],
  data(){
    return{
      emailData:this.address,
    }
  },
  watch:{
    emailData:{
      handler(newVal){
        this.$emit("email",newVal);
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
.text_style{
  width: 20%;
  text-align: left;
}
.row{
  padding-top: 15px;
}
.icon {
  padding-top: 5px;
  padding-left: 5px;
  width: 15px;
  height: 15px;
}
</style>