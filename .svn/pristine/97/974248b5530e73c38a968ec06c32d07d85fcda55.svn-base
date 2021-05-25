<template>
  <div>
        <div style="width:100%;clear:both;text-align:left">
            <config-dict style="width:135px;" :clearable="true" placeholder="请选择工单状态" configname="WorkOrderStatus" defaultvalue="" @getDictSelect="querySelectOrderStatus"  />
            <el-input v-model="SearchOrderCode" placeholder="输入工单编号" style="width:170px;"> </el-input> 
            <el-input v-model="SearchOrderName" placeholder="输入工单名称" style="width:150px;"> </el-input> 
            <el-date-picker v-model="SearchBeginTime" type="date" style="width:140px;" placeholder="实际开始日期"></el-date-picker>
            <el-date-picker v-model="SearchEndTime" type="date" style="width:140px;" placeholder="实际结束日期"></el-date-picker>
            <el-button type="primary" icon="el-icon-search"  @click="search">搜索</el-button>
            <el-button type="primary" @click="opendialog(1,null)" icon="el-icon-edit">添加工单</el-button>
            <el-button type="primary" @click="exportWorkOrder">导入工单<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <el-table border class="elTable" ref="table" :data="maindata" stripe :style="`height:${clientHeight}px;width:98%;margin-top:10px;`">
          <el-table-column :show-overflow-tooltip="true" width="155px;" prop="Sys_OrderCode"  label="工单编码"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="155px;" prop="Sys_OrderName" label="工单名称" ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="155px;" prop="FlowName" label="工艺名称"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="105px;" prop="BomName" label="BOM名称"></el-table-column>
          <el-table-column width="55px;"  prop="StatusName" label="状态"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="75px;" prop="ProductTypeName" label="生产类型"></el-table-column>
          <el-table-column :formatter="formatdate" :show-overflow-tooltip="true" prop="Sys_ActualStartTime"  label="实际开始日期"></el-table-column>
          <el-table-column :formatter="formatdate" :show-overflow-tooltip="true" prop="Sys_ActualStartTime"  label="实际结束日期"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="opendialog(3,scope.row)">查看</el-button>
                <el-button type="text" @click="opendialog(2,scope.row)">编辑</el-button>
                <el-button type="text" @click="removeItems(scope.row)">移除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="pagesize" :total="total"></el-pagination>
        <el-dialog top="5px" :title="`${currentOpName}`" width="50%" :visible.sync="dialogFormVisible">
          <el-form :model="form" ref="objectForm"  :rules="rules">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="基本信息" name="first">
                      <el-form-item label="工单名称" :label-width="formLabelWidth" prop="Sys_OrderName">
                        <el-input :disabled="detailFlag"   :style="`width:${formValueWidth}`" placeholder="请输入工单名称"  v-model="form.Sys_OrderName" autocomplete="off" clearable></el-input>
                      </el-form-item>
                      <el-form-item  label="工单状态" :label-width="formLabelWidth">
                        <config-dict :disableflag="detailFlag" :style="`width:${formValueWidth}`" placeholder="请选择工单状态" :disabled="detailFlag" :clearable="false" configname="WorkOrderStatus" :defaultvalue="form.Sys_OrderStatus" @getDictSelect="selectOrderStatus"  />
                      </el-form-item>
                      <el-form-item label="工艺流程" :label-width="formLabelWidth" prop="Sys_FlowId">
                           <el-select :disabled="detailFlag" :style="`width:${formValueWidth}`" v-model="form.Sys_FlowId"  placeholder="请选择" >
                            <el-option v-for="item in workmanship" :key="item.configValue" :label="item.configKey" :value="item.configValue">
                            </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item  label="物料BOM" :label-width="formLabelWidth" prop="Bom_DefId">
                        <el-select :disabled="detailFlag" :style="`width:${formValueWidth}`" v-model="form.Bom_DefId" placeholder="请选择物料定义" clearable>
                          <el-option
                            v-for="item in matDef"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="单位" :label-width="formLabelWidth">
                        <config-dict :disableflag="detailFlag" :style="`width:${formValueWidth}`" placeholder="请选择单位" :disabled="detailFlag" configname="WorkOrderUnit" :defaultvalue="form.Sys_OrderUom" @getDictSelect="selectOrderUom"  />
                      </el-form-item>
                      <el-form-item label="生产类型" :label-width="formLabelWidth">
                        <config-dict :disableflag="detailFlag" :style="`width:${formValueWidth}`" placeholder="请选择生产类型" :disabled="detailFlag" configname="ProductType" :defaultvalue="form.Sys_ProType" @getDictSelect="selectProductType"  />
                      </el-form-item>
                  
                      <el-form-item label="计划开始时间" :label-width="formLabelWidth" prop="Sys_PlanDateMin" ref="Sys_PlanDateMin">
                         <el-date-picker :style="`width:${formValueWidth}`" v-model="form.Sys_PlanDateMin" type="date" :disabled="detailFlag" placeholder="请选择计划开始时间"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="计划结束时间" :label-width="formLabelWidth" prop="Sys_PlanDateMax" ref="Sys_PlanDateMax">
                         <el-date-picker :style="`width:${formValueWidth}`" v-model="form.Sys_PlanDateMax" type="date" :disabled="detailFlag" placeholder="请选择计划结束时间"></el-date-picker>
                      </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane label="其他信息" name="second">
                   
                      <el-form-item label="实际开始时间" :label-width="formLabelWidth" prop="Sys_ActualStartTime" ref="Sys_ActualStartTime">
                        <el-date-picker :style="`width:${formValueWidth}`" v-model="form.Sys_ActualStartTime" type="date" :disabled="detailFlag" placeholder="请选择实际开始日期"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="实际结束时间" :label-width="formLabelWidth" prop="Sys_ActualEndTime" ref="Sys_ActualEndTime">
                         <el-date-picker :style="`width:${formValueWidth}`" v-model="form.Sys_ActualEndTime" type="date" :disabled="detailFlag" placeholder="请选择实际结束日期"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="工单数量" :label-width="formLabelWidth">
                        <el-input  type="number" v-model="form.Sys_OrderQty" :style="`width:${formValueWidth}`" :disabled="detailFlag" placeholder="请输入工单数量"  autocomplete="off" clearable></el-input> 
                      </el-form-item>
                      <el-form-item label="已投入数量" :label-width="formLabelWidth">
                        <el-input  type="number" v-model="form.Sys_InputQty" :style="`width:${formValueWidth}`" :disabled="detailFlag" placeholder="请输入已投入数量"  autocomplete="off" clearable></el-input> 
                      </el-form-item>
                      <el-form-item label="已完工数量" :label-width="formLabelWidth">
                        <el-input  type="number" v-model="form.Sys_ComQty" :style="`width:${formValueWidth}`" :disabled="detailFlag" placeholder="请输入已完工数量"  autocomplete="off" clearable></el-input> 
                      </el-form-item>
                      <el-form-item label="未完工数量" :label-width="formLabelWidth">
                        <el-input  type="number" v-model="form.Sys_UnComQty" :style="`width:${formValueWidth}`" :disabled="detailFlag" placeholder="请输入未完工数量"  autocomplete="off" clearable></el-input> 
                      </el-form-item>
                      <el-form-item label="报废数量" :label-width="formLabelWidth">
                        <el-input  type="number" v-model="form.Sys_Scrap" :style="`width:${formValueWidth}`" :disabled="detailFlag" placeholder="请输入报废数量"  autocomplete="off" clearable></el-input> 
                      </el-form-item>
                      <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input :style="`width:${formValueWidth}`" :rows="2"  :disabled="detailFlag" placeholder="请输入备注" type="textarea" v-model="form.Sys_OrderRemark"  autocomplete="off" clearable></el-input>
                      </el-form-item>
                  </el-tab-pane>
                </el-tabs>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('objectForm')">取 消</el-button>
            <el-button v-show="!detailFlag" type="primary" @click="submitForm('objectForm')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="导入工单" :visible.sync="exportObject" width="400px" >
          <div class="donwloadTemplate">
              <el-link type="primary" @click="downloadExecl" :underline="false">工单导入模板下载</el-link>
          </div>
          <div>
            <el-upload  ref="upload" drag :action="`${this.URL}/basic/workorder/upload/order`" :multiple="false"
              accept=".xlsx,.xls" :limit="1" :headers="myHeaders" :auto-upload="false"
              :on-success="uploadSuccess"
              :on-error="upLoadError"
              :before-upload="beforeUpload" 
              >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传xls、xlsx文件，且不超过30MB</div>
            </el-upload>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="exportObject = false">关 闭</el-button>
              <el-button @click="commitfile" type="primary">提 交</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
export default {
  mounted() {
    this.loadData(0);
    this.$nextTick(function () {
          this.clientHeight = window.innerHeight-this.$refs.table.$el.offsetTop- 132;
    })
    this.loadWorkmanShip();
    this.loadBomlist();
    if (this.$store.state.token) {  
            var bearer =`bearer ${this.$store.state.token}`;
            this.myHeaders={"Authorization":bearer};
    }
  },
  methods: {
    loadWorkmanShip(){
        this.$http.get(this.URL+'/basic/task/flow/list?PageIndex=1&PageSize=500').then(resp=>{
          if(resp.data&&resp.data.result)
          {
              let data=resp.data.data.rows;
              data.forEach(element => {
                 this.workmanship.push({"configKey":element.Sys_FlowName,"configValue":element.Sys_FlowId});
              });
          
          }
        }).catch(err=>{
            console.log('err:',err);
        });
    },
    loadBomlist(){
        this.$http.get(this.URL+'/basic/material/bom/list').then(resp=>{
          if(resp.data&&resp.data.result){
              let data=resp.data.data
              this.matDef=data;
          }
        }).catch(err=>{
            console.log('err:',err);
        });
    },
    selectProductType(val){
      if(val){
        this.form.Sys_ProType=val.configId;
      }
    },
    querySelectOrderStatus(val){
      this.SearchOrderStatus=val.configId;
    },
    selectOrderUom(val){
      if(val){
        this.form.Sys_OrderUom=val.configKey;
      }
    },
    selectOrderStatus(val){
      if(val){
        this.form.Sys_OrderStatus=val.configId;
      }
    },
    search() {
      this.loadData(0);
    },
    opendialog(flag,row){
        this.clearForm();
        this.detailFlag=false;
        this.activeName='first';
        if(flag==1){
         this.currentOpName="添加工单"
         this.currentOrgOpUrl=this.URL+'/basic/workorder/add';
         this.operationFlag=1;
        }
        else if(flag==2)
        {
            this.currentOpName="编辑工单"
            this.loadDetail(row);
            this.operationFlag=2;
           
        }
        else if(flag==3)
        {                
            this.currentOpName="查看工单详情"
            this.loadDetail(row);
            this.operationFlag=3;
            this.detailFlag=true;
        }
        else if(flag==4)
        {
            this.loadDetail(row);
            this.operationFlag=3;
            this.detailFlag=true;
        }
        this.dialogFormVisible = true;
    },
    loadDetail(row) {
       if(row){  
         this.currentOrgOpUrl=this.URL+'/basic/workorder/update?id='+row.Sys_OrderId;
         this.$http.get(this.URL+'/basic/workorder/detail?id='+row.Sys_OrderId)
         .then(resp=>{
               let data=resp.data.data;
               this.form=this.toUpperCase(data);
         }).catch(err=>{
               console.log('err:',err);
         })
       }
    },
    toUpperCase(jsonObj){
      if(typeof(jsonObj)=='object'){
            for (var key in jsonObj){
            jsonObj[key.substring(0,1).toUpperCase()+key.substring(1)] = jsonObj[key];  
            delete(jsonObj[key]);  
           }  
           return jsonObj;  
      }
      return data;
    },
    handleCurrentChange(val){
      this.loadData(val-1);
    },
    loadData(pindex) {
      let params=this.$qs.stringify({
        'PageIndex':pindex+1,
        'PageSize':15,
        'Sys_OrderCode':this.SearchOrderCode,
        'Sys_OrderName':this.SearchOrderName,
        'Sys_ActualStartTime':this.SearchBeginTime,
        'Sys_ActualEndTime':this.SearchEndTime,
        'Sys_OrderStatus':this.SearchOrderStatus||0,
         'r':Math.random()
        });
      this.$http({
        methods: "get",
        url:this.URL+"/basic/workorder?"+params,
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
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addObject();
          }else{
            console.log('error submit!!',valid);
            return false;
          }
        });
    },
    addObject(){
      let data=this.form;
      this.$http.post(this.currentOrgOpUrl,data).then(res=>{
            if(res.data&&res.data.result)
            { 
               this.$message({message: this.operationFlag==1?'添加成功':'更新成功',type: 'success',showClose: true});
               this.dialogFormVisible = false;
               this.loadData(0);
            }
            else
            {
              this.$message({message: '更新失败'+res.data.error,type: 'error',showClose: true});
            }
        }).catch(err=>{
            console.log('err',err);
        })
    },
    resetForm(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
    },
    clearForm() {
      if (this.$refs.objectForm){
             this.$nextTick(() => {
              this.$refs.objectForm.resetFields()
            })
      }
    },
    formatdate(row, column) {
       var ft = this.$options.filters['formatdate'];
       if(column.label=="实际开始日期"){
          return ft(row.Sys_ActualStartTime,'YYYY-MM-DD')
       }else{
          return ft(row.Sys_ActualEndTime,'YYYY-MM-DD')
       }
      //return this.$moment(row.CreateTime).format('YYYY-DD-MM HH:mm:ss');
    },
    formatstatus(row, column) {
      return this.getType(row.Sys_FlowStatus);
    },
    getType(val) {
      if(val=='0'||val==0)
      {
        return '禁用';
      }else
      {
        return '启用';
      }
    },
    removeItems(row) {
      if(row)
      {
         this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.get(this.URL+"/basic/workorder/remove?id="+row.Sys_OrderId,).then(resp=>{
               if(resp&&resp.data&&resp.data.result)
                {
                  this.$message({message: '删除成功！',type: 'success',showClose: true});
                  this.loadData(0);
                }
            }).catch(err=>{

            });
        }).catch(() => {
              
        });
       
      }
    },
    commitfile(){
       this.$refs.upload.submit();
    },
    uploadSuccess(res, file,fileList){
      if(res&&res.result&&res.data>0)
      {
       this.$message({message: '导入完成',type: 'success',showClose: true});
       this.loadData(0);
       this.exportObject=false;
      }else{
        this.$message({message: '导入完成，但导入失败：'+res.error,type: 'warning',showClose: true});
      }
        this.$refs.upload.clearFiles()
    },
    beforeUpload(file){
         var fileName=new Array()
                fileName =file.name.split('.');
                const extension = fileName[fileName.length-1] === 'xls'
                const extension2 =  fileName[fileName.length-1]=== 'xlsx'
                const sizeLimit = file.size / 1024 / 1024 < 30
                if (!extension && !extension2) {
                    this.$message({
                        message: '上传模板只能是xls、xlsx格式!',
                        type: 'warning'
                    });

                }
                if (!sizeLimit) {
                    this.$message({
                        message: '上传模板大小不能超过 30MB!',
                        type: 'warning'
                    });

                }
               return extension || extension2 && sizeLimit
    },
    upLoadError(response, file, fileList){
      this.$message({message: '导入失败：请检查是否与模板一致！',type: 'warning',showClose: true});
    },
    downloadExecl(){
      let url = this.URL+"/basic/workorder/download/template";
      window.location.href = url;
    },
    exportWorkOrder(){
      this.exportObject = true;
    }
  },
  data() {
    let validatePlanBeginDate=(rule, value, callback) => {
        if (value&&this.form.Sys_PlanDateMax&&value>this.form.Sys_PlanDateMax) {
          callback(new Error('计划[开始时间]不能大于[结束时间]'));
        }else{
          this.$refs['Sys_PlanDateMax'].clearValidate()
          callback();
        }
        // if (value !==''&&this.form.Sys_PlanDateMax!==''&&value>this.form.Sys_PlanDateMax) {
        //   callback(new Error('计划[开始时间]不能大于[结束时间]'));
        // }else{
        //   this.$refs['Sys_PlanDateMax'].clearValidate()
        //   callback();
        // }
    };
    let validatePlanEndDate = (rule, value, callback) => {
        if (value&&this.form.Sys_PlanDateMin&&value<this.form.Sys_PlanDateMin) {
          callback(new Error('计划[结束时间]不能小于[开始时间]'));
        }else{
          this.$refs['Sys_PlanDateMin'].clearValidate()
          callback();
        }
    };
    let validateActualBeginDate = (rule, value, callback) => {
       if (value&&this.form.Sys_ActualEndTime&&value>this.form.Sys_ActualEndTime) {
          callback(new Error('实际[开始时间]不能大于[结束时间]'));
        }else{
          this.$refs['Sys_ActualEndTime'].clearValidate()
          callback();
        }
    };
    let validateActualEndDate = (rule, value, callback) => {
        if (value&&this.form.Sys_ActualStartTime&&value<this.form.Sys_ActualStartTime) {
          callback(new Error('实际[结束时间]不能小于[开始时间]'));
        }else{
          this.$refs['Sys_ActualStartTime'].clearValidate()
          callback();
        }
    };
    return {
      URL:this.$SYSCONST.BASEINFOAPI,
      fileList:[],
      myHeaders:{"Authorization":"bearer"},
      activeName:'first',
      SearchOrderCode:'',
      SearchOrderName:'',
      SearchBeginTime:'',
      SearchEndTime:'',
      SearchOrderStatus:0,
      workmanship:[],
      matDef:[],
      detailFlag:false,
      searchWord: "",
      dialogFormVisible: false,
      exportObject:false,
      formLabelWidth: "120px",
      formValueWidth:'70%',
      maindata: [],
      isEnable: false,
      currentOpUrl: "",
      pageindex: 0,
      pagesize: 15,
      clientHeight: "0",
      total: 0,
      currentOpName: "",
      operationFlag: 0,
      form: {
        Sys_OrderId:0,
        Sys_OrderCode:'',
        Sys_OrderName:'',
        Sys_OrderStatus:1,
        Sys_PlanDateMax:'',
        Sys_PlanDateMin:'',
        Sys_ActualStartTime:'',
        Sys_ActualEndTime:'',
        Sys_OrderQty: 0,
        Sys_InputQty:0,
        Sys_ComQty:0,
        Sys_UnComQty:0,
        Sys_Scrap:0,
        Sys_OrderUom:1,
        Sys_ProType:1,
        Sys_FlowId:'',
        Bom_DefId:1,
        Sys_OrderRemark:""
      },
      rules: {
          Sys_OrderName: [
            { required: true, message: '请输入工单名称', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          Sys_PlanDateMin:[
               { validator: validatePlanBeginDate, trigger: 'blur' }
          ],
          Sys_PlanDateMax:[
               { validator: validatePlanEndDate, trigger: 'blur' }
          ],
          Sys_ActualStartTime:[
               { validator: validateActualBeginDate, trigger: 'blur' }
          ],
          Sys_ActualEndTime:[
               { validator: validateActualEndDate, trigger: 'blur' }
          ],
          Sys_OrderName: [
            { required: true, message: '工单名称不能为空', trigger: 'blur' }
          ],
          Sys_FlowId: [
             {required: true, message: '请选择工艺流程', trigger: 'change' }
          ],
          Bom_DefId:[
              {required: true, message: '请选择物料定义', trigger: 'change' }
          ],
          password: [
            { required: false, min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
          ],
          other:[]
      }
    };
  }
};
</script>
<style scoped>
.donwloadTemplate
{
height:30px;
 text-align:right;
}
.donwloadTemplate>a:link
{
  color: darkblue;
}
</style>

