<template>
  <div>
    <div style="width:100%;clear:both;text-align:left">
      <el-select v-model="form.logtype" placeholder="日志类型"  >
        <el-option label="全部" value></el-option>
        <el-option label="请求日志" value="Info"></el-option>
        <el-option label="异常日志" value="Error"></el-option>
        <el-option label="一般日志" value="Warn"></el-option>
      </el-select>
      <el-button  type="primary" icon="el-icon-search"  @click="search">搜索</el-button>
    </div>
    <el-table
      class="elTable"
      :data="maindata"
       stripe
      :style="`height:${clientHeight}px;width:98%`"
    >
      <el-table-column
        prop="logger"
        :show-overflow-tooltip="true"
        label="日志类型"
        :formatter="formatlogtype"
        width="80px">
        </el-table-column>
      <el-table-column prop="date" width="150px" :formatter="formatdate" label="日期"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="message" label="日志信息"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="exception" label="异常信息"></el-table-column>
      <el-table-column fixed="right" label="操作" width="70px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="opendialog(3,scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="total"
    ></el-pagination>

    <el-dialog top="15px" :title="`${currentOpName}`" width="60%" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="configForm">
        <el-form-item label="时间" :label-width="formLabelWidth">{{this.detail.date|formatdate}}</el-form-item>
        <el-form-item
          label="日志类型"
          :label-width="formLabelWidth"
        >{{this.detail.logger|formattlogtype}}</el-form-item>
        <el-form-item label="日志信息" :label-width="formLabelWidth">
          <el-scrollbar
            style="height:100px; padding:5px; border:1px solid #FFF68F"
          >{{this.detail.message}}</el-scrollbar>
        </el-form-item>
        <el-form-item label="错误信息" :label-width="formLabelWidth">
          <el-scrollbar style="height:180px;border:1px solid #CD3700">
            <div style="padding:10px;">{{this.detail.exception}}</div>
          </el-scrollbar>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  filters: {
    formatdate: function(val) {
      return val.replace("T", " ");
    },
    formattlogtype: function(val) {
      let res = "";
      switch (val) {
        case "Info":
          res = "请求日志";
          break;
        case "Error":
          res = "异常日志";
          break;
        case "Warn":
          res = "一般日志";
          break;
        default:
          break;
      }
      return res;
    }
  },
  mounted() {
    this.loadData(0, "");
    this.clientHeight = `${document.documentElement.clientHeight - 180}`;
  },
  methods: {
    search() {
      this.loadData(0, this.searchWord);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.loadData(val - 1, "");
      console.log(`当前页: ${val}`);
    },
    opendialog(flag, row) {
      this.dialogFormVisible = true;
      this.clearForm();
      this.isEnable = false;
      if (flag === 3) {
        this.loadDetail(row);
        this.form.operationFlag = 3;
        this.currentOpName = "日志详情";
        this.isEnable = true;
      }
    },
    loadDetail(row) {
      this.$http({ methods: "get", url: "/api/config/log/detail/" + row.id })
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.detail = respdata.data;
          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });
    },
    loadData(pindex, configKey) {
      this.$http({
        methods: "get",
        url:
          "/api/config/log/list?pageindex=" +
          pindex +
          "&pagesize=10&type=" +
          this.form.logtype
      })
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.total = respdata.data.total;
            this.maindata = respdata.data.rows;
          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });
    },
    clearForm() {
      this.detail = {
        date: "",
        logger: "",
        message: "",
        exception: ""
      };
    },
    formatdate(row, column) {
      return row.date.replace("T", " ");
    },
    formatlogtype(row, column) {
      return this.getType(row.logger);
    },
    getType(val) {
      let res = "";
      switch (val) {
        case "Info":
          res = "请求日志";
          break;
        case "Error":
          res = "异常日志";
          break;
        case "Warn":
          res = "一般日志";
          break;
        default:
          break;
      }
      return res;
    }
  },
  data() {
    return {
      searchWord: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      maindata: [],
      isEnable: false,
      currentOpUrl: "",
      pageindex: 0,
      pagesize: 10,
      clientHeight: "0",
      total: 0,
      currentOpName: "",
      form: {
        operationFlag: 0,
        logtype: ""
      },
      detail: {
        date: "",
        logger: "",
        message: "",
        exception: ""
      }
    };
  }
};
</script>
<style >
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 30px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0px;
}
.el-select-dropdown__list {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-bottom: 20px;
}
.elTable
{
  margin-top: 5px;
}
</style>

