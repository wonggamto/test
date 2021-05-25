<template>
  <div style="padding:5px;">
        <div style="width:100%;clear:both;text-align:left">
            <el-form :inline="true" :model="form" ref="objectForm"  :rules="rules">
               <el-form-item :label-width="formLabelWidth">
                  <el-select v-model="materialType" @change="materialTypeChange" style="width:170px;" placeholder="选择物料类别"  clearable>
                          <el-option v-for="item in materialTypeList" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                  </el-select>
               </el-form-item>
               <el-form-item :label-width="formLabelWidth" prop="sys_ProMatName">
                  <el-select collapse-tags  @change="materialChange" v-model="form.sys_ProMatName" :multiple="false" style="width:190px;"
                      filterable remote reserve-keyword placeholder="输入物料名称" :remote-method="querySearchAsync" :loading="loading">
                          <el-option v-for="item in materialList" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" prop="sys_Direction">
                  <config-dict style="width:90px;" :clearable="true" placeholder="用途" configname="MaterialsUse" :defaultvalue="form.sys_Direction" @getDictSelect="querySelectMaterUse"  />
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" prop="sys_Quantity">
                  <el-input v-model="form.sys_Quantity" placeholder="数量" type="number" style="width:150px;" clearable> </el-input> 
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" prop="sys_Uom">
                   <config-dict style="width:90px;" :clearable="true" placeholder="单位" configname="MaterialsUom" :defaultvalue="form.sys_Uom" @getDictSelect="querySelectMaterUom"  />
              </el-form-item>
              <el-form-item :label-width="formLabelWidth">
                  <el-button type="primary" @click="submitForm('objectForm')" icon="el-icon-edit">添加物料</el-button>
              </el-form-item>
           </el-form>
        </div>
  
        <el-table v-loading="dataloading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading" class="elTable" ref="table" :data="maindata" stripe :style="`height:${clientHeight}px;width:98%;margin-top:10px;`">
          <el-table-column :show-overflow-tooltip="true" width="155px;"  align="center" prop="Sys_ProMatCode"  label="物料编码"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="155px;"  align="center" prop="Sys_ProMatName" label="物料名称" ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="85px;"  align="center" prop="DirectName" label="物料用途"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="105px;"  align="center" prop="Sys_Quantity" label="数量"></el-table-column>
          <el-table-column width="55px;"  prop="Sys_Uom" label="单位"></el-table-column>
         <el-table-column :formatter="formatdate" :show-overflow-tooltip="true"  align="center" prop="CreateTime" width="220px" label="创建日期"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            
              <template slot-scope="scope">
                <el-button type="text" @click="removeItems(scope.row)">移除</el-button>
              </template>
          </el-table-column>
        </el-table>
  
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="pagesize" :total="total"></el-pagination>
  </div>
</template>
<script>
import { debug } from 'util';
export default {
  mounted() {
    this.loadData(0);
    this.$nextTick(function () {
        this.clientHeight = 650-this.$refs.table.$el.offsetTop-160;
    })
    this.loadMaterialType();
    this.queryMaterial('',0);
  },
  methods: {
    querySelectMaterUse(val){
      if(val){
         this.form.sys_Direction=val.configId;
      }
    },
    querySelectMaterUom(val){
        if(val){
          this.form.sys_Uom=val.configKey;
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
    loadMaterialType(){
      this.$http({
        methods: "get",
        url:this.URL+"/basic/task/flow/proce/material/type",
        }).then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data.data;
            this.materialTypeList=respdata.map(item=>{
              return { value:item.mat_TypeId,label:item.mat_TypeName }  
            });
          }
        }).catch(err => {
          console.log("出现异常：", err);
        });
    },
    querySearchAsync(query){
        if(query!==''){
            this.loading=true;
            let typeid=this.materialType||0;
            this.queryMaterial(query,typeid);
        }
    },
    materialTypeChange(){
        let typeid=this.materialType||0;
        this.queryMaterial('',typeid);
    },
    materialChange(val){
        let obj=this.materialList.find((item)=>{
            return item.value===val;
        });
        if(obj){
            this.form.sys_ProMatCode=obj.value;
            this.form.sys_ProMatName=obj.label;
        }
    },
    queryMaterial(name,typeid){
        this.$http({
            methods: "get",
            url:this.URL+"/basic/task/flow/proce/material?name="+name+"&typeid="+typeid,
            }).then(resp => {
            this.loading=false;
            if (resp && resp.data && resp.data.result) {
                let respdata = resp.data.data;
                if(respdata.length==0){
                    this.materialList=[];
                    this.form.sys_ProMatName='';
                }else{
                    this.materialList=respdata.map(item=>{
                        return { value:item.mat_DefCode,label:item.mat_DefName }  
                    });
                }
            }
            }).catch(err => {
            console.log("出现异常：", err);
            });
    },
    handleCurrentChange(val){
      this.loadData(val-1);
    },
    loadData(pindex) {
      this.dataloading=true;
      let params=this.$qs.stringify({
        'PageIndex':pindex+1,
        'PageSize':9,
        'Sys_ProceCode':this.$route.params.procecode,
         'r':Math.random()
        });
      this.$http({
        methods: "get",
        url:this.URL+"/basic/task/flow/proce/material/list?"+params,
      })
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            this.dataloading=false;
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
      this.$http.post(this.URL+"/basic/task/flow/proce/material/add",data).then(res=>{
            if(res.data&&res.data.result)
            { 
               this.$message({message:'添加成功',type: 'success',showClose: true});
               this.loadData(0);
               this.resetForm('objectForm');
            }
        }).catch(err=>{
            console.log('err',err);
        })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    formatdate(row, column) {
      return this.$moment(row.CreateTime).format('YYYY-DD-MM HH:mm:ss');
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
           this.$http.get(this.URL+"/basic/task/flow/proce/material/remove?id="+row.Sys_ProMatId,).then(resp=>{
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
  },
  data() {
    return {
      URL:this.$SYSCONST.BASEINFOAPI,
      materialTypeList:[],
      materialList:[],
      materialType:'',
      loading:false,
      dataloading:false,
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
        sys_ProceCode:this.$route.params.procecode,
        sys_ProMatCode:'',
        sys_ProMatName:'',
        sys_Direction:"",
        sys_Quantity:"",
        sys_Uom:'',
        sys_ProMatStatus:1
      },
      rules: {
          sys_ProMatName: [
            { required: true, message: '请输入物料名称', trigger: 'blur' }
          ],
          sys_Direction: [
            { required: true, message: '请选择物料用途', trigger: 'change' }
          ],
          sys_Quantity: [
             {required: true, message: '请输入物料数量', trigger: 'blur' }
          ],
          sys_Uom:[
              {required: true, message: '请选择物料单位', trigger: 'change' }
          ]
      }
    };
  }
};
</script>
<style>
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


