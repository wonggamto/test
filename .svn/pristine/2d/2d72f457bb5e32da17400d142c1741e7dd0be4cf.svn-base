<template>
  <div>
        <div style="width:100%;clear:both;text-align:left">
            <el-input v-model="searchReportname" placeholder="输入报表名称" style="width:170px;"> </el-input> 
            <el-button type="primary" icon="el-icon-search"  @click="search">搜索</el-button>
            <el-button type="primary" @click="opendialog(1,null)" icon="el-icon-edit">添加报表</el-button>
            <!--<el-button type="primary" @click="test" icon="el-icon-edit">TEST</el-button> -->
        </div>
        <el-table class="elTable" highlight-current-row  @current-change="handleCurrentChangeTable" ref="table" :data="maindata" stripe :style="`height:${clientHeight}px;width:98%;margin-top:10px;`">
          <el-table-column :show-overflow-tooltip="true" width="155px;" prop="ReportName" label="报表名称" ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="155px;" prop="MenuName"  label="所属菜单"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="155px;" prop="ReportType" label="展示方式"></el-table-column>
          <el-table-column width="55px;"  prop="StatusName" label="状态"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="155px;" prop="DataAccess" label="接入方式"></el-table-column>
          <el-table-column :formatter="formatdate" :show-overflow-tooltip="true" prop="CreateTime"  label="创建日期"></el-table-column>
          <el-table-column  :show-overflow-tooltip="true" prop="CreateUser"  label="创建人"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="opendialog(3,scope.row)">查看</el-button>
                <el-button type="text" @click="opendialog(2,scope.row)">编辑</el-button>
                <el-button type="text" @click="removeItems(scope.row)">移除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="pagesize" :total="total"></el-pagination>
        <el-dialog :top="dialogtop" :title="`${currentOpName}`" width="80%" :visible.sync="dialogFormVisible">
          <el-form :model="form" ref="objectForm"  :rules="rules">
                <el-form-item label="报表名称" :label-width="formLabelWidth" prop="reportName" >
                       <el-input :disabled="detailFlag"   :style="`width:${formValueWidth}`" placeholder="请输入报表名称"  v-model="form.reportName" autocomplete="off" clearable></el-input>
                       <span style="width:80px;height:25px;">&nbsp;所属菜单&nbsp;</span>
                       <el-select :disabled="detailFlag" :style="`width:${formValueWidth}`" v-model="form.menuId"  placeholder="请选择" >
                       <el-option v-for="item in reportMemu" :key="item.memuId" :label="item.memuName" :value="item.memuId">
                       </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报表脚本" :label-width="formLabelWidth" prop="dataScript" ref="Sys_ActualStartTime">
                     <el-input :disabled="detailFlag" type="textarea" :rows="5" placeholder="请输入SQL报表语句" v-model="form.dataScript"></el-input>
                </el-form-item>
                <!-- <el-form-item label="报表参数" :label-width="formLabelWidth" prop="param">
                    <el-button @click="hideOrShow" :disabled="detailFlag" type="primary">显示/隐藏</el-button> <div v-show="showOrHide">{{JSON.stringify(form.param)}}</div>
                </el-form-item> -->
                <el-form-item  label="排序语句" :label-width="formLabelWidth" prop="Mat_DefId">
                    <el-input :disabled="detailFlag" :style="`width:${formValueWidth}`" v-model="form.dataScriptParam" placeholder="请输入排序语句"></el-input> 
                    <span style="width:80px;height:25px;">&nbsp;页面标题&nbsp;</span> 
                    <el-input :disabled="detailFlag"   :style="`width:${formValueWidth}`" placeholder="请输入页面标题"  v-model="form.reportTitle" autocomplete="off" clearable></el-input>
                   <el-button @click="createReport" :disabled="detailFlag" type="primary">配置报表</el-button>
                </el-form-item>
                <el-form-item v-show="configVisable"  label="" :label-width="formLabelWidth">
                       <div :style="`height:${dynamicHeight}px;`">
                          <el-scrollbar style="height:100%;overflow-x:hidden" > 
                          <table style="width:100%;">
                            <tr style="background-color:#F0F0F0;">
                                <td class="config01 title">配置项值</td>
                                <td class="config02 title">配置项名称</td>
                                <td class="config03 title">值类型</td>
                                <td class="config04 title">是否显示</td>
                                <td class="config05 title">显示宽度</td>
                                <td class="config04 title">格式化</td>
                                <td class="config05 title">格式化字符</td>
                            </tr>
                             <tr v-for="(item,index) in form.param" :key="index">
                              <td class="config01">
                                <el-input :disabled="true" v-model="item.select" placeholder="配置项值"></el-input>
                              </td>
                              <td class="config02">    
                                <el-input v-model="item.label" placeholder="配置项名称"></el-input>
                              </td>
                              <td class="config03">                  
                                <el-select  v-model="item.type" placeholder="类型">
                                  <el-option v-for="item in columnType" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                               </el-select>
                              </td>
                              <td class="config04">      
                              <el-select  v-model="item.isshow" placeholder="是否显示">
                                <el-option v-for="item in columnShow" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                              </el-select>
                              </td>
                              <td class="config05">
                                <el-input v-model="item.width" placeholder="显示宽度"></el-input>
                              </td>
                              <td class="config04">      
                              <el-select  v-model="item.format" placeholder="是否格式化">
                                <el-option v-for="item in columnFormat" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                              </el-select>
                              </td>
                              <td class="config05">
                                <el-input v-model="item.formatString" placeholder="格式化字符"></el-input>
                            </td>
                           </tr>
                          </table>
                          </el-scrollbar>
                      </div>
                </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('objectForm')">取 消</el-button>
            <el-button v-show="!detailFlag" type="primary" @click="submitForm('objectForm')">确 定</el-button>
          </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  mounted() {
    this.loadData(0);
    this.$nextTick(function () {
          this.clientHeight = window.innerHeight-this.$refs.table.$el.offsetTop- 132;
          this.dynamicHeight = window.innerHeight-420;
    })
    this.loadMemu();
  },
  methods: {
    hideOrShow(){
      this.showOrHide=!this.showOrHide;
    },
    loadMemu(){
      this.$http({methods: "get",url:this.URL+"/api/report/menu"})
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.reportMemu = respdata.data;
          }
        }).catch(err => {
          console.log("出现异常：", err);
        });
    },
    search() {
      this.loadData(0);
    },
    opendialog(flag,row){
        this.clearForm();
        this.detailFlag=false;
        this.activeName='first';
        if(flag==1){
          this.currentOpName="添加表报"
          this.currentOrgOpUrl=this.URL+'/api/report/design/add';
          this.operationFlag=1;
        }
        else if(flag==2){
            this.currentOpName="编辑表报"
            this.loadDetail(row);
            this.operationFlag=2;
           
        }
        else if(flag==3){                
            this.currentOpName="查看表报详情"
            this.loadDetail(row);
            this.operationFlag=3;
            this.detailFlag=true;
        }
        else if(flag==4){
            this.loadDetail(row);
            this.operationFlag=3;
            this.detailFlag=true;
        }
        this.dialogFormVisible = true;
    },
    loadDetail(row) {
       if(row){  
         this.currentOrgOpUrl=this.URL+'/api/report/design/update?id='+row.Id;
         this.$http.get(this.URL+'/api/report/design/detail?id='+row.Id)
         .then(resp=>{
                let data=resp.data.data;
                this.form.reportName=data.reportName;
                this.form.menuId=data.menuId;  
                this.form.reportType=data.reportType;  
                this.form.dataSource=data.dataSource;  
                this.form.dataSourceType=data.dataSourceType;  
                this.form.status=data.status;  
                this.form.reportTitle=data.reportTitle;  
                this.form.dataAccess=data.dataAccess;  
                this.form.dataScript=data.dataScript;  
                this.form.dataScriptParam=data.dataScriptParam;  
                this.form.param=JSON.parse(data.param);  
                if(this.form.param){
                   this.configVisable=true;
                   this.dialogtop='5px';
                }
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
        'ReportName':this.searchReportname
        });
      this.$http({
        methods: "get",
        url:this.URL+"/api/report/design/list?"+params,
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
      //this.form.dataScript=this.form.dataScript.replace(/[\r\n]/g,'');
      let data=this.form;
      this.$http.post(this.currentOrgOpUrl,data).then(res=>{
            if(res.data&&res.data.result){ 
               this.$message({message: this.operationFlag==1?'添加成功':'更新成功',type: 'success',showClose: true});
               this.dialogFormVisible = false;
               this.loadData(0);
            }
            else{
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
      return this.$moment(row.CreateTime).format('YYYY-DD-MM HH:mm:ss');
    },
    removeItems(row) {
      if(row){
         this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.get(this.URL+"/api/report/design/remove?id="+row.Id,).then(resp=>{
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
    createReport(){
      this.configVisable=true;
      this.dialogtop='5px';
      this.form.dataScript=this.form.dataScript.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g, ' ').replace(/[\r\n]/g,'');
      let str=this.form.dataScript.match(/SELECT.*FROM/i)[0];
      let getOptionParam=str.toUpperCase().replace('SELECT','').replace('FROM','');
      let arrayParam=getOptionParam.split(',');
      this.form.param=[];
      arrayParam.forEach(item=>{
        if(item){
          let newItem=item;
          let firstChar=item.substr(0,1);
          if(firstChar!=='['){
             let findindex=item.indexOf('.');
             newItem=item.substr(findindex+1,item.length-1);
          }
          let paramItem={label:'',prop:newItem,select:item,searchOption:'=',type:'1',query:true,width:'150px',isshow:true,format:false,formatString:''};
          this.form.param.push(paramItem);
        }
      });
      // this.form.param=[
      //     {label:'序号',prop:'RowNo',select:'RowNo',searchOption:'=',type:'1',query:false,width:'50px',isShow:true,format:false,formatString:''},
      //     {label:'ID',prop:'Sys_OrderId',select:'a.Sys_OrderId',searchOption:'=',type:'1',query:false,width:'50px',isShow:false,format:false,formatString:''},
      //     {label:'工单名称',prop:'Sys_OrderName',select:'a.Sys_OrderName',searchOption:'LIKE',type:'1',query:true,width:'100px',isShow:true,format:false,formatString:''},
      //     {label:'工单编码',prop:'Sys_OrderCode',select:'a.Sys_OrderCode',searchOption:'=',type:'1',query:true,width:'180px',isShow:true,format:false,formatString:''},
      //     {label:'工单数量',prop:'Sys_InputQty',select:'a.Sys_InputQty',searchOption:'=',type:'1',query:true,width:'100px',isShow:true,format:false,formatString:''},
      //     {label:'开始时间',prop:'Sys_ActualStartTime',select:'a.Sys_ActualStartTime',searchOption:'=',type:'0',query:true,width:'250px',isShow:true,format:true,formatString:'YYYY-MM-DD'},
      //];
    },
    handleCurrentChangeTable(val)
    {
      this.currentRow = val;
      console.log('this.currentRow:',this.currentRow);
    }
  },
  data() {
    return {
      URL:this.$SYSCONST.SYSTEMAPI,
      showOrHide:false,
      searchReportname:'',
      clientHeight:0,
      pagesize:20,
      total:0,
      maindata:[],
      currentOpName:'',
      configVisable:false,
      dialogFormVisible:false,
      dialogtop:'6%',
      formValueWidth:"40%;",
      formLabelWidth: "120px",
      reportMemu:[],
      currentRow: null,
      columnType:[
        {label:'普通',value:'1'},
        {label:'日期',value:'0'},
      ],
      columnShow:[
        {label:'显示',value:true},
        {label:'隐藏',value:false},
      ],
      columnFormat:[
        {label:'是',value:true},
        {label:'否',value:false},
      ],
      datacolumn:[],
      dynamicHeight:0,
      detailFlag:false,
      form: {
        reportName:'',
        menuId:'',
        reportType:'表格',
        dataSource:'LMS',
        dataSourceType:'SQLSERVER',
        status:1,
        reportTitle:'',
        dataAccess: 'SQL语句',
        dataScript:'SELECT a.Sys_OrderId,a.Sys_OrderName,a.Sys_OrderCode,a.Sys_InputQty,a.Sys_ActualStartTime FROM [BasicDataInfo].[dbo].[Sys_WorkOrder] a where 1=1',
        dataScriptParam:'Sys_OrderId asc',
        param:[]
      },
      rules: {
          ReportName: [
            { required: true, message: '请输入工单名称', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ]
      }
    };
  }
};
</script>
<style scoped>
.config01{
  width:15%;
  text-align:left;
}
.config02{
  width:15%;
  text-align:left;
}
.config03{
  width:5%;
  text-align:left;
}
.config04{
  width:5%;
  text-align:left;
}
.config05{
  width:10%;
  text-align:left;
}
.title{
  padding-left:10px;
  font-size:13px
}
</style>

