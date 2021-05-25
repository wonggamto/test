<template>

 <el-dialog width="50%" top="30px" title="消息中心" :visible.sync="shownotify">
    <el-table :data="tableData"  height="400" stripe style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item>
            <i class="el-icon-message-solid" style="color:red;margin-right:10px;"></i><span>{{ props.row.address }}</span><el-button type="text">[标为已读]</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="消息类型"
        width="95px;"
        prop="id">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="shop">
      </el-table-column>
      <el-table-column
        label="发送者"
        prop="name">
      </el-table-column>
        <el-table-column
        label="状态"
        width="55px;"
        prop="category" >
      </el-table-column>
      <el-table-column
        label="发送时间"
        prop="desc">
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeNotify">关 闭</el-button>
    </div>
  </el-dialog>
 
</template>

<style scoped>

  .demo-table-expand label {
    padding-left: 15%;
    width: 70%;
    color: #99a9bf;
    font-weight: bolder;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }

</style>

<script>
  export default {
    props:["shownotify"],
    data() {
      return {
        showmessag: this.shownotify,
        tableData: [{
          id: '系统消息',
          name: 'MES系统',
          category: '未读',
          desc: '2019-09-01 11:12:32',
          address: '工单编号S12932电芯已经完成12234只，请及时更改该工单为完工状态。',
          shop: '工单完工提醒',
          shopId: '10333'
        }, {
          id: '通知消息',
          name: 'MES系统',
          category: '未读',
          desc: '2019-09-23 15:13:32',
          address: '电芯一工段AB卷芯数据差距为300只，其中A卷芯1000只，B卷芯1300只，请检查现场AB卷芯现场生产状况。',
          shop: 'AB卷芯差额提醒',
          shopId: '10333'
        }, {
          id: '预警消息',
          name: '电芯二工段',
          category: '未读',
          desc: '2019-03-01 15:17:32',
          address: '卷绕机编号90901212，发现切刀异常，请及时维修。切刀使用次数为：90012次，上次更换时间：2018-09-08，更换周期6个月',
          shop: '卷绕机维修提醒',
          shopId: '10333'
        }, {
          id: '预警消息',
          name: '电芯一工段',
          category: '未读',
          desc: '2019-08-11 05:13:32',
          address: '卷绕机编号90901212，发现切刀异常，请及时维修。切刀使用次数为：90012次，上次更换时间：2018-09-08，更换周期6个月',
          shop: '卷绕机维修提醒',
          shopId: '10333'
        }]
      }
    },
    methods:{
      closeNotify(){
          this.showmessag=false;
          this.$emit("on-result-change",this.showmessag,'');
      }
    },
    watch:{
        shownotify(val)
        {
            this.showmessag=val;
        },
       showmessag(val){
          this.$emit("on-result-change",this.showmessag,'');
       },
    }
  }
</script>