
<template>  
      <div class="pmian" >
 
                <el-row type="flex" justify="space-between">
                    <el-col :span="15">
                        <div class="title_left">
                        <i class="el-icon-edit-outline"></i> 工序质量检验列表
                            <el-button type="primary" @click="removeItems()" class="el-icon-minus" style="height:25px;width:25px;padding-left:5px; padding-top:6px;float:right;margin-right:5px;margin-top:2px;" circle></el-button> 
                            <el-button type="primary" @click="addNewMain()"  class="el-icon-plus" style="height:25px;width:25px;padding-left:5px; padding-top:6px;float:right;margin-right:5px;margin-top:2px;" circle></el-button> 
                        </div>
                        <div class="grid-content">
                            <el-table border  highlight-current-row @current-change="handleCurrentChange" class="elTable" ref="table" :data="maindata" stripe height="200px">
                                    <el-table-column width="45px;" :show-overflow-tooltip="true"  prop="Sys_QayPosition" label="位序" ></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_QualityName" label="检验名称" ></el-table-column>
                                    <el-table-column  :show-overflow-tooltip="true"  prop="Sys_QualityCode"  label="检验编码"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_QualityTypeName" label="检验类型"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_BatchQty" label="批次数量"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_SampQty" label="抽样数量"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_Uom" label="检验单位"></el-table-column>
                                    <el-table-column width="45px;"  prop="Sys_QualityStatusName" label="状态"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_QualityRemark" label="备注"></el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="9">
                        <div class="edit-content">
                             <el-scrollbar style="height:100%;overflow-x:hidden" > 
                                    <el-form :hide-required-asterisk="true" :inline-message="false" :show-message="false" style="width:80%; overflow:hidden"  label-position="left" label-width="80px"  :model="classForm" ref="objectForm"  :rules="rules">
                                         <el-form-item label="检验名称"   prop="sys_QualityName">
                                            <el-input :disabled="detailFlag" placeholder="请输入检验名称" v-model="classForm.sys_QualityName"  autocomplete="off" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="检验类型"   prop="sys_QualityType">
                                            <config-dict :disableflag="detailFlag"  placeholder="请选择检验类型" style="width:100%;" :disabled="detailFlag" configname="QualityInspection" :defaultvalue="QualityType" @getDictSelect="selectQualityType"  />
                                        </el-form-item>
                                        <el-form-item label="批次数量" prop="sys_BatchQty">
                                          <el-input-number controls-position="right" :disabled="detailFlag" v-model="classForm.sys_BatchQty"  :min="1"  style="width:100%;"   clearable></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="抽样数量"   prop="sys_SampQty">
                                            <el-input-number controls-position="right" :disabled="detailFlag" v-model="classForm.sys_SampQty"  :min="1"  style="width:100%;"   clearable></el-input-number>
                                        </el-form-item>
                                        <el-form-item  label="单位" prop="sys_Uom">
                                            <config-dict :disableflag="detailFlag"  placeholder="请选择单位" style="width:100%;" :disabled="detailFlag" configname="MaterialsUom" :defaultvalue="classForm.sys_Uom" @getDictSelect="selectUom"  />
                                        </el-form-item>
                                        <el-form-item label="状态" prop="sys_QualityStatus">
                                            <config-dict :disableflag="detailFlag"  placeholder="请选择状态" style="width:100%;" :disabled="detailFlag" configname="CommonStatus" :defaultvalue="Status" @getDictSelect="selectStatus"  />
                                        </el-form-item>
                                       <el-form-item label="位序"   prop="sys_QayPosition">
                                            <el-input-number v-model="classForm.sys_QayPosition"  :min="1"  style="width:100%;"   clearable></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="备注"   prop="sys_QualityRemark">
                                            <el-input  :rows="2"  :disabled="detailFlag" placeholder="请输入备注" type="textarea" v-model="classForm.sys_QualityRemark"  autocomplete="off" clearable></el-input>
                                        </el-form-item>
                                    </el-form>
                               </el-scrollbar> 
                        </div>
                        <div class="title">
                            <el-button icon="el-icon-check"  @click="submitForm('objectForm')" type="success">保存</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-between">
                    <el-col :span="15">
                        <div class="title_left" style="margin-top:5px;">
                         <i class="el-icon-edit"></i> 检验项列表
                          <el-button type="primary" @click="removeDetailItems" class="el-icon-minus" style="height:25px;width:25px;padding-left:5px; padding-top:6px;float:right;margin-right:5px;margin-top:2px;" circle></el-button> 
                          <el-button type="primary" @click="addNewDetail" class="el-icon-plus" style="height:25px;width:25px;padding-left:5px; padding-top:6px;float:right;margin-right:5px;margin-top:2px;" circle></el-button> 
                        </div>
                        <div class="grid-content">
                                <el-table  highlight-current-row @current-change="handleCurrentDetailChange"  border  class="elTable" ref="detailtable" :data="detailData" stripe height="230px">
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayPosition"  label="位序"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayName" label="检测项" ></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayTypeName" label="类型"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayHighValue" label="上限值"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayLowValue" label="下限制"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayRange" label="数据范围"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayQuest" label="检验要求"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayDetector" label="检验器具"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayMethod" label="检验方法"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayIMustName" label="是否必须"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayLevel" label="重要程度"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true"  prop="Sys_QayRemark" label="备注"></el-table-column>
                                </el-table>
                        </div>
                    </el-col>
                    <el-col :span="9">
                        <div class="edit-content">
                                <el-scrollbar style="height:100%;overflow-x:hidden" > 
                                    <el-form :hide-required-asterisk="true" :inline-message="false" :show-message="false" style="width:80%; overflow:hidden"  label-position="left" label-width="80px"  :model="detailForm" ref="objectFormDetail"  :rules="rules">
                                         <el-form-item label="">
                                             当前检验名称：{{currentQulityName||'无'}}
                                        </el-form-item>
                                        <el-form-item label="检测项"   prop="sys_QayName">
                                            <el-input :disabled="detailFlag" placeholder="请输入质量检测项" v-model="detailForm.sys_QayName"  autocomplete="off" clearable></el-input>
                                        </el-form-item>
                                       <el-form-item label="类型"   prop="sys_QayType">
                                            <config-dict :disableflag="detailFlag"  placeholder="请选择类型" style="width:100%;" :disabled="detailFlag" configname="QualityDetailType" :defaultvalue="detailForm.sys_QayType" @getDictSelect="selectDetailType"  />
                                        </el-form-item>
                                        <el-form-item label="上限值" prop="sys_QayHighValue">
                                          <el-input-number controls-position="right" :disabled="detailFlag" v-model="detailForm.sys_QayHighValue"  :min="1"  style="width:100%;"   clearable></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="下限制"   prop="sys_QayLowValue">
                                            <el-input-number controls-position="right" :disabled="detailFlag" v-model="detailForm.sys_QayLowValue"  :min="1"  style="width:100%;"   clearable></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="数据范围"   prop="sys_QayRange">
                                            <el-input :disabled="detailFlag" placeholder="请输入数据范围" v-model="detailForm.sys_QayRange"  autocomplete="off" clearable></el-input>
                                        </el-form-item>
                                          <el-form-item label="检验要求"   prop="sys_QayQuest">
                                              <el-input  :rows="3"  :disabled="detailFlag" placeholder="请输入检验要求" type="textarea" v-model="detailForm.sys_QayQuest"  autocomplete="off" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="检验器具"   prop="sys_QayDetector">
                                                <el-input  :rows="2"  :disabled="detailFlag" placeholder="请输入检验器具" type="textarea" v-model="detailForm.sys_QayDetector"  autocomplete="off" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="检验方法"   prop="sys_QayMethod">
                                                  <el-input  :rows="3"  :disabled="detailFlag" placeholder="请输入检验方法" type="textarea" v-model="detailForm.sys_QayMethod"  autocomplete="off" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="是否必须"  prop="sys_QayIMust">
                                              <el-radio v-model="detailForm.sys_QayIMust" label="1">是</el-radio>
                                              <el-radio v-model="detailForm.sys_QayIMust" label="0">否</el-radio>
                                        </el-form-item>
                                         <el-form-item label="重要程度"   prop="sys_QayLevel">
                                            <el-input :disabled="detailFlag" placeholder="请输入重要程度" v-model="detailForm.sys_QayLevel"  autocomplete="off" clearable></el-input>
                                        </el-form-item>
                                       <el-form-item label="位序"   prop="sys_QayPosition">
                                            <el-input-number v-model="detailForm.sys_QayPosition"  :min="1"  style="width:100%;"   clearable></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="备注"   prop="sys_QayRemark">
                                            <el-input  :rows="2"  :disabled="detailFlag" placeholder="请输入备注" type="textarea" v-model="detailForm.sys_QayRemark"  autocomplete="off" clearable></el-input>
                                        </el-form-item>
                                    </el-form>
                               </el-scrollbar>  
                        </div>
                        <div class="title" style="margin-top:0px;">
                            <el-button icon="el-icon-check" @click="submitFormDetail('objectFormDetail')"  type="success">保存</el-button>
                        </div>
                    </el-col>
                </el-row>
         
    
     </div>
</template>

<script>
export default {
    mounted(){
        this.loadData(0);
    },
    data(){
        return {
            URL:this.$SYSCONST.BASEINFOAPI,
            maindata:[],
            detailData:[],
            total:0,
            currentOpUrl:'',
            formLabelWidth: "120px",
            detailFlag:false,
            operationFlag:1,
            operationDetailFlag:1,
            Status:1,
            QualityType:1,
            currentSelectRowMain:{},
            currentSelectRowDetail:{},
            currentQulityName:'',
            classForm:{
                'sys_QayPosition':this.Status,
                'sys_ProceCode':this.$route.params.procecode,
                'sys_QualityCode':'',
                'sys_QualityName':'',
                'sys_QualityType':this.QualityType,
                'sys_BatchQty':0,
                'sys_SampQty':0,
                'sys_Uom':'',
                'sys_QualityStatus':0,
                'sys_QualityRemark':''
            },
            detailForm:{ 
                'sys_QayPosition':0,
                'sys_QualityId':0,
                'sys_QayName':'',
                'sys_QayHighValue':0,
                'sys_QayLowValue':1,
                'sys_QayRange':'',
                'sys_QayQuest':'',
                'sys_QayDetector':'',
                'sys_QayMethod':'',
                'sys_QayIMust':'1',
                'sys_QayType':1,
                'sys_QayLevel':'',
                'sys_QayRemark':''
            },
            rules: {
                   sys_QualityName: [
                    { required: true, message: '请输入工单名称', trigger: 'blur' },
                    { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }],
                   sys_QayName: [
                    { required: true, message: '请输入质量详情名称', trigger: 'blur' },
                    { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }],
            }
        }
    },
    methods:{
     loadData(pindex) {
            this.currentSelectRowMain={};
            let params=this.$qs.stringify({
                'PageIndex':pindex+1,
                'PageSize':100,
                'ProceCode':this.$route.params.procecode
                });
            this.$http({
                methods: "get",
                url:this.URL+"/basic/quality/list?"+params,
            }).then(resp => {
                if (resp && resp.data && resp.data.result) {
                    let respdata = resp.data;
                    this.total = respdata.data.total;
                    this.maindata = respdata.data.rows;
                }
                }).catch(err => {
                   console.log("出现异常：", err);
                });
     },
     loadDetailData(pindex,qualityId){
      
            let params=this.$qs.stringify({
                'PageIndex':pindex+1,
                'PageSize':100,
                'QualityId':qualityId
                });
            this.$http({
                methods: "get",
                url:this.URL+"/basic/quality/detail/list?"+params,
            })
            .then(resp => {
            if (resp && resp.data && resp.data.result) {
                let respdata = resp.data;
                this.detailData = respdata.data.rows;
            }
            })
            .catch(err => {
            console.log("出现异常：", err);
            });
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
       getDictSelect(params) {
           
       },
       selectQualityType(val){
        if(val){
            //检验类型选择
          this.classForm.sys_QualityType=val.configId;
        }
       },
       selectDetailType(val){
          if(val){
            //详情检验类型选择
            this.detailForm.sys_QayType=val.configId;
          }
       },
       selectUom(val){
         if(val){
           //单位选择
          this.classForm.sys_Uom=val.configKey;
       }
     },
     selectStatus(val){
        if(val){
          //状态选择
          this.classForm.sys_QualityStatus=val.configId;
        }
       console.log('this.classForm.sys_QualityStatus:', this.classForm.sys_QualityStatus);
     },
     addNewMain(){
        this.formatclear();
        this.operationFlag=1;
     },
     formatclear(){
         this.Status=1;
         this.QualityType=1;
         this.classForm= {
                'sys_QayPosition':this.Status,
                'sys_ProceCode':this.$route.params.procecode,
                'sys_QualityCode':'',
                'sys_QualityName':'',
                'sys_QualityType':this.QualityType,
                'sys_BatchQty':0,
                'sys_SampQty':0,
                'sys_Uom':'',
                'sys_QualityStatus':1,
                'sys_QualityRemark':''
        };
     },
     addNewDetail(){
       if(this.currentSelectRowMain.sys_QualityId){
            this.formatDetailInfo();
            this.operationDetailFlag=1;
         }else{
            this.$message({message:'请选择工序质量检验项',type: 'warning',showClose: true});
         }
     },
     formatDetailInfo(){
        this.detailForm={ 
                'sys_QayPosition':0,
                'sys_QualityId':this.currentSelectRowMain.sys_QualityId,
                'sys_QayName':'',
                'sys_QayHighValue':0,
                'sys_QayLowValue':1,
                'sys_QayRange':'',
                'sys_QayQuest':'',
                'sys_QayDetector':'',
                'sys_QayMethod':'',
                'sys_QayIMust':'1',
                'sys_QayType':1,
                'sys_QayLevel':'',
                'sys_QayRemark':''
        }
     },
     submitFormDetail(formName){
         if(!this.currentSelectRowMain.sys_QualityId){
              this.$message({message:'请选择工序质量检验项！',type: 'warning',showClose: true});
              return false;
         }
         let opurl='';
         if(this.operationDetailFlag===2)
         {
            opurl=this.URL+'/basic/quality/detail/update?id='+this.currentSelectRowDetail.Sys_QayId;
         }else  if(this.operationDetailFlag===1)
         {
            opurl=this.URL+'/basic/quality/detail/add'
         }
         this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addDetailObject(opurl,this.detailForm);
          }else{
            console.log('error submit!!',valid);
            return false;
          }
        });
     },
     submitForm(formName) {
         let opurl='';
         if(this.operationFlag===2)
         {
            opurl=this.URL+'/basic/quality/update?id='+this.currentSelectRowMain.sys_QualityId;
         }else  if(this.operationFlag===1)
         {
            opurl=this.URL+'/basic/quality/add'
         }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addObject(opurl,this.classForm);
          }else{
            console.log('error submit!!',valid);
            return false;
          }
        });
     },
     addObject(url,dataForm){
      let data=dataForm;
      this.$http.post(url,data).then(res=>{
            if(res.data&&res.data.result){ 
               this.loadData(0);
               this.formatclear();
            }else{
              this.$message({message: '更新失败'+res.data.error,type: 'error',showClose: true});
            }
        }).catch(err=>{
            console.log('err',err);
        })
     },
     addDetailObject(url,dataForm){
      let data=dataForm;
      this.$http.post(url,data).then(res=>{
            if(res.data&&res.data.result){ 
               this.loadDetailData(0,this.currentSelectRowMain.sys_QualityId);
               this.formatDetailInfo();
            }else{
              this.$message({message: '更新失败'+res.data.error,type: 'error',showClose: true});
            }
        }).catch(err=>{
            console.log('err',err);
        })
     },
     handleCurrentChange(row){
        if(row){
            this.operationFlag=2;
            this.classForm.sys_QayPosition=row.Sys_QayPosition;
            this.classForm.sys_ProceCode=row.Sys_ProceCode;
            this.classForm.sys_QualityCode=row.Sys_QualityCode;
            this.classForm.sys_QualityName=row.Sys_QualityName;
            this.QualityType=parseInt(row.Sys_QualityType);
            this.Status=row.Sys_QualityStatus;
            this.classForm.sys_BatchQty=row.Sys_BatchQty;
            this.classForm.sys_SampQty=row.Sys_SampQty;
            this.classForm.sys_Uom=row.Sys_Uom;
            this.classForm.sys_QualityStatus=row.Sys_QualityStatus;
            this.classForm.sys_QualityRemark=row.Sys_QualityRemark;
            this.detailForm.sys_QualityId=row.Sys_QualityId;
            this.currentQulityName=row.Sys_QualityName;
            this.currentSelectRowMain=this.classForm;
            this.currentSelectRowMain.sys_QualityId=row.Sys_QualityId;
            this.detailForm.sys_QualityId=row.Sys_QualityId;
            this.loadDetailData(0,row.Sys_QualityId);
            this.formatDetailInfo();
        }else{
            this.currentSelectRowMain={};
        }
        console.log('row:',this.currentSelectRowMain);
     },
     handleCurrentDetailChange(row){
        if(row){
            this.currentSelectRowDetail=row;
            this.operationDetailFlag=2;
            this.detailForm.sys_QayPosition=row.Sys_QayPosition;
            this.detailForm.sys_QualityId=row.Sys_QualityId;
            this.detailForm.sys_QayName=row.Sys_QayName;
            this.detailForm.sys_QayHighValue=row.Sys_QayHighValue;
            this.detailForm.sys_QayLowValue=row.Sys_QayLowValue;
            this.detailForm.sys_QayRange=row.Sys_QayRange;
            this.detailForm.sys_QayQuest=row.Sys_QayQuest;
            this.detailForm.sys_QayDetector=row.Sys_QayDetector;
            this.detailForm.sys_QayMethod=row.Sys_QayMethod;
            this.detailForm.sys_QayIMust=row.Sys_QayIMust.toString();
            this.detailForm.sys_QayType=row.Sys_QayType;
            this.detailForm.sys_QayLevel=row.Sys_QayLevel;
            this.detailForm.sys_QayRemark=row.Sys_QayRemark;
        }else{
            this.currentSelectRowDetail={};
        }
     },
     removeItems(){
       if(this.currentSelectRowMain.sys_QualityId){
         this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.get(this.URL+"/basic/quality/remove?id="+this.currentSelectRowMain.sys_QualityId).then(resp=>{
               if(resp&&resp.data&&resp.data.result)
                {
                  this.loadData(0);
                }
            }).catch(err=>{

            });
        }).catch(() => {
        });
      }else{
         this.$message({message:'请选择要移除的项',type: 'warning',showClose: true});
      }
     },
     removeDetailItems(){
      if(this.currentSelectRowDetail.Sys_QayId){
         this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
           }).then(() => {
           this.$http.get(this.URL+"/basic/quality/detail/remove?id="+this.currentSelectRowDetail.Sys_QayId).then(resp=>{
               if(resp&&resp.data&&resp.data.result){
                  this.loadDetailData(0,this.currentSelectRowDetail.Sys_QualityId);
                }
            }).catch(err=>{

            });
        }).catch(() => {
              
        });
      }else{
           this.$message({message:'请选择要移除的项',type: 'warning',showClose: true});
      }
     },
  }
}
</script>
<style>
.el-scrollbar__wrap
{
    overflow-x: hidden;
}
.el-select-dropdown__wrap 
 {
   padding-bottom:15px;
 }

.pmian
{
    padding: 5px;
}
 .bg-purple {
    background: #e5e9f2;
  }
  .grid-content
  {
     /* background-color: #cdcdcd;*/
  }
  .edit-content
  {
   padding: 10px;
   height: 200px;
   border:1px solid #cdcdcd;
   margin-left:5px;
   border-radius: 4px;
  }
  .title{
      height:30px;
      line-height: 30px;
      font-size: 14px;
      color: #666;
      margin-left:5px;
      margin-bottom: 2px;
      text-align:right;
  }
.title_left
{
      height:30px;
      line-height: 30px;
      font-size: 14px;
      color: #666;
      background:#F8F8F8;
      border: 1px solid #eee;
      border-bottom: 0px;
      border-radius: 2px 2px 0 0;
      padding-left: 5px;
}

.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 23px;
}
.el-table__body tr,
.el-table__body td {
  height: 23px;
  padding: 0px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 4px;
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, 
.el-table__body tr.current-row>td {
	background-color: #ffec8b;
}

</style>

