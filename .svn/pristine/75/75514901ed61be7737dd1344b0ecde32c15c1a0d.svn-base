<template>
  <el-container style="height:100%;">
    <div class="myhead" style="padding-left:20px">
      <el-input style="width:150px;" v-model="BomCode" clearable placeholder="BOM编号"></el-input>
      <el-input style="width:150px;" v-model="BomName" clearable placeholder="BOM名称"></el-input>
      <el-select style="width:150px;" v-model="BomStatus" clearable placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button style="width:120px;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button style="width:120px;" type="primary" @click="opendialog(1,null)">添加</el-button>
    </div>

    <el-main >
      <el-table   v-loading="loading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"
        :data="tableData"  fit border stripe   max-height="400"
         size='mini' :style="`width:100%;height:${clientHeight}px;`">
        <el-table-column prop="RowNo" label="序号" fixed sortable min-width="70"></el-table-column>
        <el-table-column prop="Mat_BomCode" label="BOM编号" sortable min-width="150"></el-table-column>
        <el-table-column prop="Mat_BomName" label="BOM名称" sortable min-width="120"></el-table-column>
        <el-table-column prop="Mat_DefName" label="物料名称" sortable min-width="120"></el-table-column>
        <el-table-column prop="Mat_BomStatus" label="BOM状态"  :formatter="formatlogtype" sortable  min-width="120" ></el-table-column>
        <el-table-column prop="Mat_BomRemark" label="BOM备注" sortable min-width="180"></el-table-column>
        <el-table-column prop="Mat_BomQuantity" label="数量" sortable min-width="120"></el-table-column>
        <el-table-column prop="Mat_Uom" label="单位" sortable min-width="120"></el-table-column>
        <el-table-column prop="Name" label="创建人" sortable min-width="120"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" :formatter="formatdatetime" sortable min-width="150"></el-table-column>
        <el-table-column prop label="操作" fixed="right" min-width="120">
          <template slot-scope="scope">
            <!-- <el-button style=" width:15%; margin:0,0,0,5px;"  @click.native.prevent="opendialog(3,scope.row)"  type="text"  size="mini">查看</el-button> -->
            <el-button style=" width:15%; margin:0,0,0,5px;"  @click.native.prevent="opendialog(2,scope.row)"  type="text"  size="mini">BOM单详情</el-button>
          </template>
        </el-table-column>
      </el-table> 
  
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
        
    <el-dialog :title="`${currentOpName}`"  width="55%" :visible.sync="dialogFormVisible">
      <div v-if="showAll">
        <el-radio-group v-model="radioBom" @change="handleRadioChange">
          <el-radio class="radio" label="添加BOM" border>添加BOM</el-radio>
          <el-radio class="radio" label="修改BOM" border>修改BOM</el-radio>
          <el-radio class="radio" label="删除BOM" border>删除BOM</el-radio>
        </el-radio-group>
      </div>
      <div class="block" style=" width:40%;float:left;" v-if="showAll">
        <el-scrollbar  style="height:420px;" class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view">
          <el-tree :data="treedata" :props="defaultProps" :highlight-current="true"
          node-key="id"  :load="loadBomNode" lazy @node-click="handleNodeClick" ref="bomtree" >
          </el-tree>
        </el-scrollbar>
      </div >
      <div class="block" style="float:left; width:55%;height:460px; padding-left:30px;">
        <el-tabs v-model="tabActiveName" >
        <el-tab-pane label="BOM详细配置" name="first" style="height:420px">
          <el-form style="" ref="configForm">
            <el-form-item label="BOM编号" :label-width="formLabelWidth">
              <el-input style="width:80%" :disabled="true"  v-model="mBom.mat_BomCode" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="BOM名称" :label-width="formLabelWidth">
              <el-input style="width:80%" :disabled="isEnable" placeholder="请输入BOM名称" v-model="mBom.mat_BomName" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="物料名称" :label-width="formLabelWidth">
              <el-cascader style="width:80%" placeholder="请输入关键词"
                  :options="mDefOptions" :show-all-levels="false" :disabled="isEnable" 
                  filterable @change="getmatDefId" v-model="matValue"
                  :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children'
                  }">
              </el-cascader>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
              <el-input style="width:80%" :disabled="isEnable" placeholder="请输入数量" v-model="mBom.mat_BomQuantity" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="单位" :label-width="formLabelWidth">
              <el-input style="width:80%" :disabled="isEnable" placeholder="请输入单位" v-model="mBom.mat_Uom" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="优先级" :label-width="formLabelWidth">
              <el-input style="width:80%" :disabled="isEnable" placeholder="请输入优先级" v-model="mBom.priority" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="BOM状态" :label-width="formLabelWidth">
              <el-select style="width:80%" :disabled="isEnable"  v-model="mBom.mat_BomStatus" placeholder="物料状态">
                  <el-option  v-for="item in options" 
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option> 
              </el-select> 
            </el-form-item>
            <el-form-item  label="物料备注"  :label-width="formLabelWidth">
                  <el-input style="width:80%" :disabled="isEnable" placeholder="请输入描述" type="textarea" v-model="mBom.mat_BomRemark"  autocomplete="off" clearable></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="替代料列表" name="second" style="height:420px" v-if="showAll" >
          <span slot="label" style="position;relative;">
            替代料列表
            <el-badge :value="exCount" class="badge-a" type="primary"/>
          </span>
          <div> 原物料名称
            <el-input style="width:200px;padding-left:5px" :disabled="true"  v-model="mDefSub.mat_DefName" placeholder="原物料名称"> </el-input>
          </div>
          <div style="float:left;"> 替代料名称
            <el-cascader style="width:200px;padding-left:5px"  placeholder="请输入关键词"
                :options="mDefOptions" :show-all-levels="false" filterable @change="getmatSubDefId" 
                :props="{
                  value: 'id',
                  label: 'name',
                  children: 'children'
                }">
            </el-cascader>
          </div>
          <div style="float:left;padding-left:10px">
            <el-button  type="primary" v-show="!isEnable"  @click="addDefSub">添 加</el-button>
          </div>
          <div  style="clear:both;padding-top:20px">
            <el-table :data="extableData" style="width: 100%" max-height="300" border stripe fixed>
              <el-table-column prop="oMatDefCode" label="原物料编号" width="150"/>
              <el-table-column prop="oMatDefName" label="原物料名称" width="150"/>
              <el-table-column prop="subMatDefCode" label="替代物料编号" width="150"/>
              <el-table-column prop="subMatDefName" label="替代物料名称" width="150"/>
              <el-table-column fixed="right" label="操作" width="80">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer" style="clear:both;padding-right:9%">
        <el-button   @click="dialogFormVisible = false">关 闭</el-button>
        <el-button  type="primary" v-show="!isEnable"  @click="actionObject">确 定</el-button>
      </div>

    </el-dialog>

  </el-container>
</template>


<script >
import { fail } from 'assert';
export default {
  mounted() {
    this.$http.defaults.baseURL = process.env.BASE_INFO;
    this.clientHeight = `${document.documentElement.clientHeight - 216}`;
    this.UserInfo= this.$store.state.userInfo;
    this.loadUserData();  // 初始化加载数据
  },
  methods: {
    opendialog(flag, row) {
        this.clearForm();

        //获取物料信息
        this.loadMatDef();

        if (flag === 1) {

            this.dialogWidth = 40;
            this.BomEditWidth = 100;
            this.showAll = false;
            this.currentOpUrl = this.URL+"/basic/material/Bom/add";
            this.currentOpName="添加BOM表";
            this.mBom.mat_BomCode = new Date().getTime();
        }
        else if(flag===3){
            this.showAll = true;
            this.loadDetail(row);
            this.isEnable=true;
            this.currentOpName="BOM表详情";
            this.currentOpUrl =  this.URL+"/basic/material/Bom/detail?id="+row.Mat_BomId;

        }
        else if(flag===2){
            this.showAll = true;
            this.dialogWidth = 55;
            this.BomEditWidth = 55;
            this.loadDetail(row);
            this.currentOpName="BOM表详情 - " + this.radioBom;
            this.currentOpUrl =  this.URL+"/basic/material/Bom/update?id="+row.Mat_BomId;
        }

        this.operationFlag = flag;
        this.dialogFormVisible = true; 
        this.isEnable=false;

    },
    loadDetail(row) {
      if(row)
      {  
        this.$http.get( this.URL+'/basic/material/Bom/detail?id='+row.Mat_BomId)
          .then(resp=>{
            let data=resp.data.data;
            this.mBom=data;

            //显示根节点
            this.treedata=[{
              id: data.mat_BomId,
              label: data.mat_BomName}];


            if(this.radioBom == "修改BOM")
            {
                this.mBom=data;
                this.getMatTypeDef(this.mBom.mat_DefId);
            }
            else
            {
              this.mBom={};
              this.matValue=[];
              this.mBom.mat_BomCode = new Date().getTime();
            }

            this.mBom.mat_tempId = row.Mat_BomId;

          }).catch(err=>{})} 
    },

    loadBomNode(node, resolve) {

      if (node.level === 0) {
        return resolve([{
          id:0,
          label: 'Bom清单列表',
        }]);
      }
      
      setTimeout(() => {

        let tdata = [];

        if(node && node.data.id)
        {
          let tId=node.data.id;
          
          this.$http.get(this.URL+"/basic/material/Bom/Open?BomId=" + tId)
            .then(resp=>{

            if (resp.data && resp.data.result)
            {
              let bomdata = resp.data.data.rows;

              for(let i=0;i<bomdata.length;i++)
              {
                tdata.push({id:bomdata[i].mat_BomId,label:bomdata[i].mat_BomName});
              }
              resolve(tdata);
            }

          }).catch(err=>{})
        }
        else{
          resolve([]);
        }
        
      }, 500);

    },
    reloadBomNode (node){
 
      if(node && node.data.id)
      {         
        var theChildren = node.childNodes
        theChildren.splice(0, theChildren.length)

        let tdata = [];
        let tId=node.data.id;

        this.$http.get(this.URL+"/basic/material/Bom/Open?BomId=" + tId)
          .then(resp=>{

          if (resp.data && resp.data.result)
          {
            let bomdata = resp.data.data.rows;

            for(let i=0;i<bomdata.length;i++)
            {
              tdata.push({id:bomdata[i].mat_BomId,label:bomdata[i].mat_BomName});
            }

            node.doCreateChildren(tdata)
          }

        }).catch(err=>{})
      }
    },

    getMatTypeDef(tId) {
      
      let data = {
        pageIndex: -1,
        pageSize: 1000,

        "Mat_TypeStatus":1
      };
              
      let params=this.$qs.stringify(data);
      this.$http
        .post(this.URL+"/basic/material/Definition/list?"+params,data)
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            let data=respdata.data.rows;

            this.matValue=[];

            for(let i=0;i<data.length;i++)
            {
              if(tId == data[i].Mat_DefId)
              {
                this.matValue = [data[i].Mat_TypeId,data[i].Mat_DefId];
                this.mDefSub.mat_DefName = data[i].Mat_DefName;

                break;
              }
            }

          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });
    },
    
    handleNodeClick(data){

      this.bomnode = this.$refs.bomtree.getNode(data);

      let tId = data.id;

        this.$http.get( this.URL+'/basic/material/Bom/detail?id='+tId)
          .then(resp=>{
            let data=resp.data.data;
            
            this.mBom=data;

            if(this.radioBom != "添加BOM" || this.tabActiveName == 'second')
            {
              this.getMatTypeDef(data.mat_DefId);
            }

            this.mDefSub.mat_BomId = tId;
            this.mDefSub.mat_DefId = data.mat_DefId;

            this.loadSubDeflist();
            
            if(this.radioBom == "添加BOM")
            {
              this.mBom={};
              this.matValue=[];
              this.mBom.mat_BomCode = new Date().getTime();
            }

            this.mBom.mat_tempId = tId;

        }).catch(err=>{})

        
      
    },
    handleRadioChange(value){
        this.currentOpName="BOM表详情 - " + value;
    },
    actionObject() {

      let flag = 0;
      let data = this.mBom;
  
      if(this.radioBom == "添加BOM" || this.operationFlag == 1)
      {//添加
        flag = 1;
        data.mat_Parent = this.mBom.mat_tempId;
        this.currentOpUrl = this.URL+"/basic/material/Bom/add";
      }
      else if(this.radioBom === "修改BOM")
      {//修改
        flag = 2;
        this.currentOpUrl =  this.URL+"/basic/material/Bom/update?id="+ this.mBom.mat_BomId;
      }
      else if(this.radioBom === "删除BOM")
      {
        flag = 3;

        this.deleteBom(this.mBom);
        return true;
      }

      if (!this.mBom.mat_BomName) {
        this.$message({ message: "Bom名称不能为空",
          type: "error",
          showClose: true
        });
        return false;
      }

      this.$http
        .post(this.currentOpUrl, data)
        .then(res => {
          if (res.data && res.data.result) {

              if(flag == 2)
              {
                this.$message({message: "更新成功！",type: "success",showClose: true});
                this.reloadBomNode(this.bomnode.parent);
              }
              else
              {
                this.$message({message: "添加成功！",type: "success",showClose: true});
                
                if(this.operationFlag == 1)
                {
                  this.search();
                  this.dialogFormVisible=false;
                }
                this.reloadBomNode(this.bomnode);
              }
          } else {
            this.$message({message: "添加失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
          }
        })
        .catch(err => {});
    },   
    deleteBom(data) {

      if (!data.mat_BomId) {
        this.$message({ message: "BomId不能为空,请选择要删除的Bom",
          type: "error",
          showClose: true
        });
        return false;
      }

      this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$http.post(this.URL+"/basic/material/Bom/delete?id="+data.mat_BomId,).then(resp=>{
              if(resp&&resp.data&&resp.data.result) {
              this.$message({message: "BOM表：" + data.mat_BomName +  "删除成功！",type: "success",showClose: true});

              this.reloadBomNode(this.bomnode.parent);
              } else {
          this.$message({message: "删除失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
          }
          }).catch(err=>{});
      }).catch(() => {});

    },
    addDefSub(){

      let data = this.mDefSub;
      this.$http
        .post(this.URL+"/basic/material/subdef/add", data)
        .then(res => {
          if (res.data && res.data.result) {
              this.$message({message: "添加成功！",type: "success",showClose: true});

              this.loadSubDeflist();
              
          } else {
            this.$message({message: "添加失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
          }
        })
        .catch(err => {});

    },
    deleteRow(dRow) {
      if(dRow)
      {

        this.$http
         .post(this.URL+"/basic/material/subdef/delete?id="+dRow.mat_DefSubID)
         .then(resp=>{
            if(resp&&resp.data&&resp.data.result) {
              this.$message({message: "删除成功！",type: "success",showClose: true});
              this.loadSubDeflist();
            } else {
              this.$message({message: "删除失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
            }
            })
            .catch(err=>{});
      }
    },
    loadSubDeflist(){

      this.$http.post(this.URL+"/basic/material/subdef/list?BomId="+this.mDefSub.mat_BomId)
        .then(resp=>{
        if (resp && resp.data && resp.data.result) {
          let respdata = resp.data;

          this.exCount = respdata.data.total;
        
          this.extableData = respdata.data.rows;

          this.loading=false;
        }
      })
      .catch(err => {
        console.log("出现异常：", err);
      });
    },

    search(){
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,

        "data":{
          "Mat_BomCode":this.BomName,
          "Mat_BomName":this.BomCode,
          "Mat_BomStatus":this.BomStatus,
        }
      };

      let params=this.$qs.stringify(data);
      this.$http
        .post(this.URL+"/basic/material/Bom/list?"+params,data)
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

    getmatDefId(value){
      this.mBom.mat_DefId = value[1];
    },
    getmatSubDefId(value){
      this.mDefSub.mat_SubDefId = value[1];
    },
    loadMatDef() {

      this.$http
        .get(this.URL+"/basic/material/Mat/group")
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;

            this.mDefOptions=respdata.data;
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
        this.mBom ={};
        this.matValue=[];
        this.operationFlag = 0;
    },
    formatdatetime(row, column){
      let datetime = row[column.property];
      if (datetime == null) {
        return "";
      }
      return this.$moment(datetime).format('YYYY-DD-MM HH:mm:ss');
    },
    formatlogtype(row, column) {
      return this.getType(row.Mat_BomStatus);
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
          "Mat_BomStatus": 1,
        }
      };

      let params=this.$qs.stringify(data);
      this.$http
        .post(this.URL+"/basic/material/Bom/list?"+params,data)
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
    } 
  },
  data() {
    return {
      URL:this.$SYSCONST.BASEINFOAPI,
      UserInfo:{},
      dateValue:'',
      formLabelWidth: "20%",
      dialogFormVisible: false,
      total: 0,
      pageIndex: 1,
      pageSize: 20,
      BomName: "",
      BomCode: "",
      BomStatus: 1, 
      operationFlag:0,
      clientHeight: "0",
      currentOpUrl: "",
      
      mDefSub:{
        mat_BomId:0,
        mat_DefId:0,
        mat_DefCode:'',
        mat_DefName:'',
        mat_SubDefId:0,
      },
      mBom: {
        mat_BomCode: '',
        mat_BomName: '',
        mat_DefId: 0,
        priority: 1,
        mat_BomStatus: 1,
        mat_BomQuantity:1,
        mat_Uom: '',
        mat_Parent: 0,
        mat_BomRemark: '',
        mat_tempId: 0,
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

      isFirst: true,
      bomnode: {},
      matValue: [],
      mDefOptions: [],
      tableData: [],
      loading: true,
      currentOpName: "BOM表详情",
      isEnable:false, 
      dialogWidth: 40,
      BomEditWidth: 100,

      tabActiveName: 'first',
      
      showAll: false,
      radioBom: "添加BOM",
      treedata: [],
      defaultProps: {
        id: 'id',
        label: 'label',
        children: 'children',
      },
      exCount: 0,
      extableData: [],
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

 .default-scrollbar .default-scrollbar__wrap{
      overflow-y: scroll;
      overflow-x: scroll;
      width:80px;
      height: 400px;
  }
 .el-tree {
     min-width: 100%;
     height: 400px;
     display:inline-block;
 }


</style>