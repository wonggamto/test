
<template>  
      <div class="pmian" >
                <el-row type="flex" justify="space-between">
                    <el-col :span="15">
                        <div class="title_left">
                        <i class="el-icon-edit-outline"></i> 文件列表
                            <el-button type="primary" @click="removeItems()" class="el-icon-minus" style="height:25px;width:25px;padding-left:5px; padding-top:6px;float:right;margin-right:5px;margin-top:2px;" circle></el-button> 
                            <el-button type="primary" @click="addNewMain()"  class="el-icon-plus" style="height:25px;width:25px;padding-left:5px; padding-top:6px;float:right;margin-right:5px;margin-top:2px;" circle></el-button> 
                        </div>
                        <div class="grid-content">
                            <el-table border  highlight-current-row @current-change="handleCurrentChange" class="elTable" ref="table" :data="maindata" stripe height="480px">
                                    <el-table-column  :show-overflow-tooltip="true" prop="Sys_ProPathCode"  label="文件编码"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_ProPathName" label="文件名称" ></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_ProPathType" label="文件类型"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_ProPathStatusName" label="文件状态"></el-table-column>
                                    <el-table-column :show-overflow-tooltip="true"  prop="Sys_ProPathRemark" label="备注"></el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="9">
                        <div class="edit-content">
                                <el-form :hide-required-asterisk="true" :inline-message="false" :show-message="false" style="width:99%; overflow:hidden"  label-position="left" label-width="80px"  :model="classForm" ref="objectForm"  :rules="rules">
                                    <el-upload  ref="upload" drag :action="`${this.URL}/basic/procedure/file/upload`" :multiple="false"
                                        accept=".txt,.xlsx,.xls,.docx,.doc,.pptx,.ppt,.pdf,.avi,.mp4,.mpeg,.mpg,.jpg,.jpeg,.gif" :limit="1" :auto-upload="true"
                                        :on-success="uploadSuccess"
                                        :on-error="upLoadError"
                                        :before-upload="beforeUpload">
                                        <i class="el-icon-upload"></i>
                                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                        <div class="el-upload__tip" slot="tip">支持的文件类型：txt、xls、xlsx、docx、doc、pptx、ppt、pdf、avi、mp4、mpeg、mpg、jpg、jpeg、gif</div>
                                        <div class="el-upload__tip" slot="tip">文件大小：小于100MB</div>
                                    </el-upload>
                                    <el-form-item label="文件名称" style="margin-top:25px;"   prop="sys_ProPathName">
                                        <el-input :disabled="detailFlag" placeholder="请输入检验名称" v-model="classForm.sys_ProPathName"  autocomplete="off" clearable></el-input>
                                    </el-form-item>
                                    
                                    <el-form-item label="文件类型"   prop="sys_ProPathType">
                                        <el-input :disabled="true" placeholder="文件类型自动匹配" v-model="classForm.sys_ProPathType"   autocomplete="off" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="状态" prop="sys_QualityStatus">
                                        <config-dict :disableflag="detailFlag"  placeholder="请选择状态" style="width:100%;" :disabled="detailFlag" configname="CommonStatus" :defaultvalue="Status" @getDictSelect="selectStatus"  />
                                    </el-form-item>
                                    <el-form-item label="备注"   prop="sys_ProPathRemark">
                                        <el-input  :rows="2"  :disabled="detailFlag" placeholder="请输入备注" type="textarea" v-model="classForm.sys_ProPathRemark"  autocomplete="off" clearable></el-input>
                                    </el-form-item>
                                </el-form>
                                <div style="clear:both;" class="title">
                                   <el-button icon="el-icon-check"  @click="submitForm('objectForm')" type="success">保存</el-button>
                                </div>
                        </div>
                    </el-col>
                </el-row>
     </div>
</template>

<script>
import { connect } from 'net';
export default {
    mounted(){
        this.loadData(0);
    },
    data(){
        return {
            URL:this.$SYSCONST.BASEINFOAPI,
            maindata:[],
            total:0,
            currentOpUrl:'',
            fileTypeLimitList:["txt","xlsx","xls","docx","doc","pptx","ppt","pdf","avi","mp4","mpeg","mpg","jpg","jpeg","gif"],
            formLabelWidth: "120px",
            detailFlag:false,
            operationFlag:1,
            Status:1,
            FileType:1,
            currentSelectRowMain:{},
            classForm:{
                'sys_ProceCode':this.$route.params.procecode,
                'sys_ProPathName':'',
                'sys_OriginFileName':'',
                'sys_ProPathType':'',
                'sys_ProPathVlaue':'',
                'sys_ProPathStatus':0,
                'sys_ProPathRemark':''
            },
            rules: {
                   sys_ProPathName: [
                    { required: true, message: '请输入文件名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 30 个字符', trigger: 'blur' }],
                   sys_ProPathVlaue: [
                    { required: true, message: '请输入上传文件', trigger: 'blur' }],
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
                url:this.URL+"/basic/procedure/file/list?"+params,
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
     selectObjectType(val){
        if(val){
            //检验类型选择
          this.classForm.sys_ProPathType=val.configId;
        }
     },
     selectStatus(val){
        if(val){
          //状态选择
          this.classForm.sys_ProPathStatus=val.configId;
        }
     },
     addNewMain(){
        this.formatclear();
        this.operationFlag=1;
     },
     formatclear(){
        this.Status=1;
        this.FileType=1;
        this.classForm= {
            'sys_ProceCode':this.$route.params.procecode,
            'sys_ProPathName':'',
            'sys_OriginFileName':'',
            'sys_ProPathType':'',
            'sys_ProPathVlaue':'',
            'sys_ProPathStatus':1,
            'sys_ProPathRemark':''
        };
     },
     submitForm(dataForm) {
        // this.$refs.upload.submit();
        if(!this.classForm.sys_ProPathVlaue){      
            this.$message({message: '请选择文件！',type: 'warning',showClose: true});
            return false;
        }
        let opurl='';
        if(this.operationFlag===2){
            if(!this.currentSelectRowMain.sys_ProPathId){
                return false;
            }
            opurl=this.URL+'/basic/procedure/file/update?id='+this.currentSelectRowMain.sys_ProPathId;
        }else if(this.operationFlag===1){
          opurl=this.URL+'/basic/procedure/file/add'
        }
        this.$refs[dataForm].validate((valid) => {
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
     handleCurrentChange(row){
        if(row){
            this.operationFlag=2;
            this.classForm.sys_ProceCode=row.Sys_ProceCode;
            this.classForm.sys_ProPathName=row.Sys_ProPathName;
            this.classForm.sys_OriginFileName=row.Sys_OriginFileName;
            this.Status=row.Sys_ProPathStatus;
            this.classForm.sys_ProPathType=row.Sys_ProPathType;
            this.classForm.sys_ProPathVlaue=row.Sys_ProPathVlaue;
            this.classForm.sys_ProPathRemark=row.Sys_ProPathRemark;
            this.currentSelectRowMain=this.classForm;
            this.currentSelectRowMain.sys_ProPathId=row.Sys_ProPathId;
        }else{
            this.currentSelectRowMain={};
        }
     },
     removeItems(){
       if(this.currentSelectRowMain.sys_ProPathId){
         this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.get(this.URL+"/basic/procedure/file/remove?id="+this.currentSelectRowMain.sys_ProPathId).then(resp=>{
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
     beforeUpload(file){
        var fileName=new Array()
        fileName =file.name.split('.');
        let extension = fileName[fileName.length-1];
        let findindex=this.fileTypeLimitList.indexOf(extension.toLowerCase());
        const sizeLimit = file.size / 1024 / 1024 < 100
        if (findindex<0) {
            this.$message({
                message: '上传文件格式不符合要求!',
                type: 'warning'
            });
        }
        if (!sizeLimit) {
            this.$message({
                message: '上传文件大小超过了限制!',
                type: 'warning'
            });

        }
        return findindex>=0 && sizeLimit
     },
     upLoadError(response, file, fileList){
      this.$message({message: '上传文件失败，请检查文件大小和类型是否正确！',type: 'warning',showClose: true});
     },
     uploadSuccess(res, file,fileList){
        if(res&&res.result) {
                this.classForm.sys_ProPathVlaue=res.data;
                if(file){
                    this.classForm.sys_OriginFileName=file.name;
                    let filename=file.name.split('.');
                    let fileExt='unkonw'
                    if(filename.length>1){
                         fileExt=filename[filename.length-1];
                    }
                    filename=filename[0];
                    this.classForm.sys_ProPathName=filename;
                    this.classForm.sys_ProPathType=fileExt.toLowerCase();
              }
            }else{
                this.$message({message: '上传失败：'+res.error,type: 'warning',showClose: true});
            }
           this.$refs.upload.clearFiles()
     }
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
   height: 490px;
   border-radius: 4px;
   border:1px solid #cdcdcd;
   margin-left:5px;
  }
  .title{
      margin-top:10px;
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

