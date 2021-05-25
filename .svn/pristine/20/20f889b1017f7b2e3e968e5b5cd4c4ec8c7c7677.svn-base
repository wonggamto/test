<template>
    <div>
        <el-row>
        <el-col :span="24">操作</el-col>
        </el-row>
        <el-row>
        <el-col :span="12" style="height:500px">
             <el-table   v-loading="loading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"
                :data="tableData"  fit border stripe   max-height="400"
                :style="`width:100%;height:${clientHeight}px;`">
                <el-table-column prop="RowNo" label="序号" fixed sortable min-width="70"></el-table-column>
                <el-table-column prop="Eqp_Code" label="设备编号" sortable min-width="150"></el-table-column>
                <el-table-column prop="Eqp_Name" label="设备名称" sortable min-width="120"></el-table-column>
                <el-table-column prop="Eqp_Model" label="设备型号" sortable min-width="120"></el-table-column>
                <el-table-column prop="Eqp_ProArea" label="设备产地" sortable min-width="100"></el-table-column>
                <el-table-column prop="Eqp_DisTributor" label="设备经销商" sortable min-width="120"></el-table-column>
                <el-table-column prop="Eqp_DataOfManufacture" label="出厂时间" :formatter="formatdate" sortable min-width="100"></el-table-column>
                <el-table-column prop="Eqp_DateOfPurChase" label="安装年月" :formatter="formatdate" sortable min-width="100"></el-table-column>
                <el-table-column prop="Eqp_DateOfApplication" label="使用年月" :formatter="formatdate" sortable min-width="100"></el-table-column>
                <el-table-column prop="Eqp_Price" label="设备价格" sortable min-width="100"></el-table-column>
                <el-table-column prop="Eqp_PriceUnit" label="价格单位" sortable min-width="100"></el-table-column>
                <el-table-column prop="Eqp_AssetNumber" label="固定资产编号" sortable min-width="120"></el-table-column>
                <!-- <el-table-column prop="Eqp_Qrcode" label="二维码" sortable min-width="120"></el-table-column>
                <el-table-column prop="Eqp_Images" label="设备图片" sortable min-width="120"></el-table-column> -->
                <el-table-column prop="Eqp_TypeName" label="设备类型" sortable min-width="120"></el-table-column>
                <el-table-column prop="Eqp_Status" label="设备状态" :formatter="formatlogtype" sortable  min-width="120" ></el-table-column>
                <el-table-column prop="Eqp_Remark" label="设备备注" sortable min-width="180"></el-table-column>
                <el-table-column prop="Name" label="创建人" sortable min-width="120"></el-table-column>
             </el-table> 
      <el-footer style="height:30px;">
      <el-pagination
        background
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="pageIndex"
        :total="total"
      ></el-pagination>
    </el-footer>
        </el-col>
        <el-col :span="12">右边</el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    mount(){
        this.clientHeight = `${document.documentElement.clientHeight - 216}`;
        this.loadData();
    },
    data(){
        return {
            URL:this.$SYSCONST.BASEINFOAPI,
            tableData: [],
            total: 0,
            pageIndex: 1,
            pageSize: 20,
            loading: true,
            clientHeight: "0",
        }
    },
    methods:{
      loadData(){
        let data = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            "data":{
            "Eqp_Name":'',
            "Eqp_Code":'',
            "Eqp_Status":'',
            }
        };
        let params=this.$qs.stringify(data)
        this.$http
            .post(this.URL+"/basic/device/BaseInfo/list?"+params,data)
            .then(resp => {
            if (resp && resp.data && resp.data.result) {
                let respdata = resp.data;
                this.total = respdata.data.total;
                this.tableData = respdata.data.rows;
                this.loading=false;

            }
            })
            .catch(err => {
            console.log("出现异常：", err);
            });
      },
     formatdate(row, column){
      let date = row[column.property];
      var ft = this.$options.filters['formatdate'];
      if (date == null) {
        return "";
      }
      return  ft(date,'YYYY-MM-DD');
    },
    formatlogtype(row, column) {
      return this.getType(row.Eqp_Status);
    },
    getType(val) {
      let res = "";
      switch (val) {
        case 0:
        case "0":
          res = "禁用";
          break;
        case 1:
        case "1":
          res = "启用";
          break;
        default://2
          res = "未知";
          break;
      }
      return res;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.loadData();
    },
  }
}
</script>
<style>

</style>


