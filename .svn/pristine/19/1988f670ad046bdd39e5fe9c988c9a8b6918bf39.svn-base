<template>
  <el-container style="height:100%;">
    <div class="myhead" style="padding-left:20px">
      <el-input style="width:150px;" v-model="EqpCode" clearable placeholder="设备编号"></el-input>
      <el-input style="width:150px;" v-model="EqpName" clearable placeholder="设备名称"></el-input>
      <el-select style="width:150px;" v-model="EqpStatus" clearable placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-button style="width:120px;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button style="width:120px;" type="primary"   @click='opendialog(1,null)' >添加</el-button>
        
    </div>

    <el-main >
      <el-table   v-loading="loading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"
        :data="tableData"  fit border stripe   max-height="400"
         size='mini' :style="`width:100%;height:${clientHeight}px;`">
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
        <el-table-column prop="CreateTime" label="创建时间" :formatter="formatdatetime" sortable min-width="150"></el-table-column>
        <el-table-column prop label="操作" fixed="right" min-width="120">
          <template slot-scope="scope">
            <el-button style=" width:15%; margin:0,0,0,2px; "  @click.native.prevent="opendialog(3,scope.row)"  type="text"  size="mini">查看</el-button>
            <el-button style=" width:15%; margin:0,0,0,2px; "  @click.native.prevent="opendialog(2,scope.row)"  type="text"  size="mini">编辑</el-button>
            <el-button style=" width:15%; margin:0,0,0,2px; "  @click.native.prevent="deleteRow(scope.row)"  type="text"  size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table> 
      
      <el-dialog :title="`${currentOpName}`"  width="65%" :visible.sync="dialogFormVisible">
        <el-form  ref="configForm"  style=" width:50%;float:left;padding-top:20px">
          <el-form-item label="设备编号" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="true"  v-model="dBase.eqp_Code" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入设备名称" v-model="dBase.eqp_Name" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备型号" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入设备型号" v-model="dBase.eqp_Model" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="固定资产编号" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入固定资产编号" v-model="dBase.eqp_AssetNumber" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备类型" filterable :label-width="formLabelWidth">
          <el-select style="width:90%" filterable :disabled="isEnable"  
                      v-model="dBase.eqp_TypeId"  placeholder="请输入关键词"  @focus="getEqpType()">
              <el-option  v-for="item in dBaseOptions" 
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option> 
          </el-select> 
          </el-form-item>
          <el-form-item label="设备状态" :label-width="formLabelWidth">
          <el-select style="width:90%" :disabled="isEnable"  v-model="dBase.eqp_Status" placeholder="设备状态">
              <el-option  v-for="item in options" 
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option> 
          </el-select> 
          </el-form-item>
          <el-form-item label="出厂时间" :label-width="formLabelWidth">
              <el-date-picker style="width:90%" :disabled="isEnable" v-model="dBase.eqp_DataOfManufacture" 
                autocomplete="off" clearable value-format="yyyy-MM-dd" placeholder="请输入出厂时间"/>
          </el-form-item>
          <el-form-item label="安装年月" :label-width="formLabelWidth">
            <el-date-picker style="width:90%" :disabled="isEnable" v-model="dBase.eqp_DateOfPurChase" 
                autocomplete="off" clearable value-format="yyyy-MM-dd" placeholder="请输入安装年月"/>
          </el-form-item>
          <el-form-item label="使用年月" :label-width="formLabelWidth">
            <el-date-picker style="width:90%" :disabled="isEnable" v-model="dBase.eqp_DateOfApplication" 
                autocomplete="off" clearable value-format="yyyy-MM-dd" placeholder="请输入使用年月"/>
          </el-form-item>
        </el-form>
        <div style=" width:25%;float:left;padding-top:20px;">
          <el-upload class="devimg-uploader"
            :class="{disabled:hideUploadImg}"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-change="handleChangeImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemoveImg"
            accept="image/jpeg,image/jpg,image/png">
            <div style="font-size:24px">设备图片</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div style=" width:25%;float:left;padding-top:20px;">
          <el-upload class="devQr-uploader"
            :class="{disabled:hideUploadQr}"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-change="handleChangeQr"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemoveQr"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP">
            <div style="font-size:24px">二维码</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <el-form  ref="configForm"  style=" width:50%;float:left;padding-top:20px">
          <el-form-item label="设备经销商" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入设备经销商" v-model="dBase.eqp_DisTributor" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备产地" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入设备产地" v-model="dBase.eqp_ProArea" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备价格" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入设备价格" v-model="dBase.eqp_Price" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="价格单位" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入价格单位" v-model="dBase.eqp_PriceUnit" autocomplete="off" clearable></el-input>
          </el-form-item>
          
          <el-form-item  label="设备备注"  :label-width="formLabelWidth">
              <el-input style="width:90%" :disabled="isEnable" placeholder="请输入描述" type="textarea" v-model="dBase.eqp_Remark"  autocomplete="off" clearable></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer"  class="dialog-footer" style="clear:both;padding-right:3%;padding-top:10px">
          <el-button  style="width:16%;"  @click="dialogFormVisible = false">取 消</el-button>
          <el-button  style="width:16%;" type="primary" v-show="!isEnable"  @click="addObject">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>

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
  </el-container>
</template>


<script >
export default {
  mounted() {
    this.$http.defaults.baseURL = process.env.BASE_INFO;
    this.clientHeight = `${document.documentElement.clientHeight - 216}`;
    this.UserInfo= this.$store.state.userInfo;
    this.loadUserData();  // 初始化加载数据
  },
  methods: {
    opendialog(flag, row) {
         this.dialogFormVisible = true; 
         this.clearForm();
         this.getEqpType();
         this.isEnable=false;
         if (flag === 1) {
            this.name = "";
            this.operationFlag = 1;
            this.currentOpUrl = this.URL+"/basic/device/BaseInfo/add";
            this.currentOpName="添加设备信息";
            this.dBase = {};
            this.dBase.eqp_Code = new Date().getTime();
        }
        else if(flag===3){
            this.loadDetail(row);
            this.isEnable=true;
            this.operationFlag = 3;
            this.currentOpUrl =  this.URL+'/basic/device/BaseInfo/detail?id='+row.Eqp_Id;
            this.currentOpName="查看设备信息";
        }
        else if(flag===2){
            this.loadDetail(row);
            this.operationFlag = 2;
            this.currentOpUrl =  this.URL+"/basic/device/BaseInfo/update?id="+row.Eqp_Id;
            this.currentOpName="编辑设备信息";
        }
    },

    loadDetail(row) {
       if(row)
       {  
        this.$http.get( this.URL+'/basic/device/BaseInfo/detail?id='+row.Eqp_Id)
         .then(resp=>{
            let data=resp.data.data;
           
            this.dBase=data;

          }).catch(err=>{

         })
       } 
    },

    addObject() {
      if (!this.dBase.eqp_Name) {
        this.$message({ message: "设备定义名称不能为空",
          type: "error",
          showClose: true
        });
        return false;
      }

      let data = this.dBase;

      this.$http
        .post(this.currentOpUrl, data)
        .then(res => {
          if (res.data && res.data.result) {
              this.$message({message: this.operationFlag==1?"添加成功！":"更新成功！",type: "success",showClose: true});
              this.search();
              this.dialogFormVisible=false
          } else {
            this.$message({message: "添加失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
          }
        })
        .catch(err => {});
    },   

    deleteRow(dRow) {
      if(dRow)
      {
         this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.post(this.URL+"/basic/device/BaseInfo/delete?id="+dRow.Eqp_Id,).then(resp=>{
               if(resp&&resp.data&&resp.data.result) {
                this.$message({message: "设备定义编码：" + dRow.Eqp_Code + "删除成功！",type: "success",showClose: true});
                this.loadUserData();
                this.dialogFormVisible=false;
                } else {
            this.$message({message: "删除失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
            }
            }).catch(err=>{});
        }).catch(() => {});
      }
    },

    search(){
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,

        "data":{
          "Eqp_Name":this.EqpName,
          "Eqp_Code":this.EqpCode,
          "Eqp_Status":this.EqpStatus,
        }
      };

      let params=this.$qs.stringify(data);
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

    getEqpType() {
      
      let data = {
        pageIndex: -1,
        pageSize: 1000,

        "Eqp_TypeStatus":1
      };

      let params=this.$qs.stringify(data);
      this.$http
        .post(this.URL+"/basic/device/type/list?"+params,data)
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            let data=respdata.data.rows;

            this.dBaseOptions=[];

            for(let i=0;i<data.length;i++)
            {
              let item={"value":data[i].Eqp_TypeId,"label":data[i].Eqp_TypeName}
              this.dBaseOptions.push(item);
            }
            this.loading=false;
          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });
    },

    handleSizeChange(val) {
      this.pageSize = val;

      this.search();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;

      this.search();
    },
    clearForm(){
        this.operationFlag=0,
        this.id=0,
        this.dBase.eqp_Code='',
        this.dBase.eqp_Name='',
        this.dBase.eqp_Remark='' 
    },
    formatdate(row, column){
      let date = row[column.property];
      var ft = this.$options.filters['formatdate'];
      if (date == null) {
        return "";
      }
      return  ft(date,'YYYY-MM-DD');
    },
    formatdatetime(row, column){
      let datetime = row[column.property];
      if (datetime == null) {
        return "";
      }
      return this.$moment(datetime).format('YYYY-DD-MM HH:mm:ss');
    },
    formatlogtype(row, column) {
      return this.getType(row.Eqp_Status);
    },
    handleChangeImg(file, fileList) {
      this.hideUploadImg = (fileList.length >= 1);
    },
    handleChangeQr(file, fileList) {
      this.hideUploadQr = (fileList.length >= 1);
    },
    handleRemoveImg(file, fileList) {
      this.hideUploadImg = (fileList.length >= 1);
    },
    handleRemoveQr(file, fileList) {
      this.hideUploadQr = (fileList.length >= 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
    loadUserData() {
     
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,

        "data":{
          "Eqp_Status":1
        }
      };

      let params=this.$qs.stringify(data);
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
  },
  data() {
    return {
      URL:this.$SYSCONST.BASEINFOAPI,
      UserInfo:{},
      dateValue:'',
      formLabelWidth: "25%",
      dialogFormVisible: false,
      total: 0,
      pageIndex: 1,
      pageSize: 20,
      EqpName: "",
      EqpCode: "",
      EqpStatus: 1,
      clientHeight: "0",
      operationFlag:0,
      id:0,
      dBase: {
        eqp_Code: '',
        eqp_Name: '',
        eqp_ProArea: '',
        eqp_DisTributor: '',
        eqp_Model: '',
        eqp_DateOfPurChase: '',
        eqp_DataOfManufacture: '',
        eqp_DateOfApplication: '',
        eqp_Price: 0.0,
        eqp_PriceUnit: '',
        eqp_AssetNumber: '',
        eqp_Qrcode: '',
        eqp_Images: '',
        eqp_TypeId: 0,
        eqp_TypeName: '',
        eqp_Status: 1,
        eqp_Remark: ''
      },
      options: [
        {
          value: 1,
          label: "启用"
        },
        {
          value: 0,
          label: "禁用"
        },
      ],
      dBaseOptions: [],
      tableData: [],
      loading: true,
      currentOpName: "添加设备类别",
      isEnable:false,
      
      dialogImageUrl: '',
      dialogVisible: false,
      hideUploadImg: false,
      hideUploadQr: false,
    };
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: white;
  padding: 0px;
  font-size: 10%; 
  text-align: left;
  line-height: 30px;
}

.el-range-editor.el-input__inner {
  margin-left: 20px;
}

.el-main {
  text-align: center;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
  width: 12%;
}

.el-input {
  height: 30px;
  margin: 0, 0, 0, 5px;
}

.el-button {
  width: 100%;
  height: 30px;
  margin: 0, 0, 0, 10px;
}

.template .el-button {
  width: 10%;
  height: 30px;
  margin: 0, 0, 0, 5px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-pagination .el-select .el-input .el-input__inner {
  height: 22px;
}

</style>

<style>
  .disabled .el-upload--picture-card {
      display: none;
  }
</style>
