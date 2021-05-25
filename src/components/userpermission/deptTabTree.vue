<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="部门" name="first">
               <el-input   style='width:200px;margin:0px 0 5px' placeholder="输入关键字进行过滤" v-model="filterText_dept">
            </el-input>
             <el-scrollbar :style="`height:${clientLeftHeight}px;width:98%;`">
                  <el-tree
                      class="filter-tree"
                      :show-checkbox="true"
                      :data="deptTreeData"
                      :props="defaultProps"
                       node-key="id"
                      :highlight-current="true"
                       default-expand-all
                      :default-expanded-keys="currentExpanded"
                      @check="handleNodeCheck_dept"
                      @node-click="handleNodeClick_dept"
                      :filter-node-method="filterNode_dept"
                      :expand-on-click-node="false"
                      ref="depttree">
                  </el-tree>
                  </el-scrollbar>
                  </el-tab-pane>

 <el-tab-pane label="员工" name="second">
   <el-input   style='width:200px;margin:0px 0 5px' placeholder="输入关键字进行过滤" v-model="filterText_emp">
            </el-input>
             <el-scrollbar :style="`height:${clientLeftHeight}px;width:98%;`">
                 <el-tree
                      class="filter-tree"
                      :show-checkbox="true"
                      :data="empTreeData"
                      :props="defaultProps"
                       node-key="id"
                      :highlight-current="true"
                       default-expand-all
                      :default-expanded-keys="currentExpanded"
                      @check="handleNodeCheck_emp"
                      @node-click="handleNodeClick_emp"
                      :filter-node-method="filterNode_emp"
                      :expand-on-click-node="false"
                      ref="emptree">
                  </el-tree>
 </el-scrollbar>
 </el-tab-pane>
  <el-tab-pane label="业务" name="third">
   <el-input   class="inline-input" v-model="qEmpCode" style='width:200px;margin:0px 0 15px' placeholder="请输入工号进行搜索" >
    <el-button slot="append"  @click="quickEmpCode()" icon="el-icon-search"></el-button>
   </el-input>
    <el-input   class="inline-input" v-model="qEmpName"  style='width:200px;margin:0px 0 15px' placeholder="请输入姓名进行搜索">
      <el-button slot="append"  @click="quickEmpName()" icon="el-icon-search"></el-button>
    </el-input>
                <el-select  style='width:200px;margin:0px 0 15px' v-model="qField" filterable placeholder="请选择搜索列">
               <el-option v-for="item in columsList" :key="item.prop" :label="item.label" :value="item.prop"></el-option>
              </el-select>
                 <el-select v-model="qType" placeholder="条件"  style='width:200px;margin:0px 0 15px'>
                <el-option label="等于" value="="></el-option>
                <el-option label="大于" value=">"></el-option>
                <el-option label="小于" value="<"></el-option>
                  <el-option label="不等于" value="<>"></el-option>
                <el-option label="包括" value="Like"></el-option>
              </el-select>
  <el-input  v-model="qValue"   style='width:200px;margin:0px 0 15px' align="left"  placeholder="请输入搜索关键字" >
    <el-button slot="append"   @click="quickValue()" icon="el-icon-search"></el-button>
  </el-input>
  </el-tab-pane>
  </el-tabs>
    </div>
</template>


<script>
export default {
props: {
 columsList: {
      type: Array,
      default: function() {
        return [];
      }
    }
},
data() {
  return{
 URL: this.$SYSCONST.SYSTEMAPI,
 clientHeight:"",
 clientLeftHeight:"",
 currentExpanded:[],
 activeName: "first",//tabs的默认显示的页面
 filterText_dept:"",//部门树的过滤条件
 filterText_emp:"",//员工树的过滤条件
 qField:"",  //查询字段
 qType:"",  //查询条件
 qValue:"", //查询值
 qEmpCode:"",//工号的快速搜索
 qEmpName:"",//姓名的快速搜索
 inputdepttree:'',//部门树传给员工树的查询条件
 inputemptree:'',//员工树的查询条件
 deptTreeData:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
// empTreeData:[],
//         defaultProps: {
//           children: 'children',
//           label: 'label'
//         }
}
},
 mounted: function(){
     /* this.$nextTick(e=>{
       this.tableHeight = window.innerHeight-this.$refs.table.$el.offsetTop-175;
    }) */
    this.clientHeight=`${document.documentElement.clientHeight-175}`;
   this.clientLeftHeight=`${document.documentElement.clientHeight-195}`;
    this.loadDeptTree();
    this.loadEmpTree();
},
methods:{
     handleClick(){
    },//tab选项卡的事件
  handleNodeClick_dept(data) {
  let outString='';
     if(data.id == "0"){
     this.inputdepttree="";
     }else{
    this.inputdepttree=data.attributes.filter;
     }
  this.inputemptree = this.inputdepttree;
  this.loadEmpTree();
  outString=this.inputdepttree;
  this.$emit("treeOutEvent", outString);
    },//当部门树点击某一节点的时候
handleNodeCheck_dept(data){
  let outString='';
 if(data.id == "0"){
     this.inputdepttree="";
     }else{
    let nodes = this.$refs.depttree.getCheckedNodes()
    let s = '';
    let sign = ' or ';
    for (let i = 0; i < nodes.length; i++) {
        if (s != '')
            s += sign;
        s+= '(' + nodes[i].attributes.filter + ')';
    }
   this.inputdepttree = s;
     }
  this.inputemptree = this.inputdepttree;
  this.loadEmpTree();
  outString=this.inputdepttree;
  this.$emit("treeOutEvent", outString);
},//当部门树勾选某一节点的复选框的时候
     handleNodeClick_emp(data) {
    let outString='';
     if(data.id == "0"){
     this.inputdepttree="";
     }else{
    this.inputdepttree="emp_id ='"+data.id+"'";
     }
  outString=this.inputdepttree;
  this.$emit("treeOutEvent", outString);
    },//当员工树点击某一节点的时候
handleNodeCheck_emp(data){
  let outString='';
 if(data.id == "0"){
     this.inputdepttree="";
     }else{
    let nodes = this.$refs.emptree.getCheckedNodes()
    let s = '';
    let sign = ' or ';
    for (let i = 0; i < nodes.length; i++) {
        if (s != '')
            s += sign;
        s+= '(emp_id =' + nodes[i].id + ')';
    }
  this.inputdepttree = s;
  outString=this.inputdepttree;
  this.$emit("treeOutEvent", outString);
    }
},//当员工树勾选某一节点的复选框的时候
  filterNode_dept(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },//当部门树进行过滤的时候
  filterNode_emp(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },//当员工树进行过滤的时候
 loadDeptTree(){
     var getUrl="/api/userauth/UserDeptTree/depttree";
      this.$http.get(getUrl)
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata =JSON.parse(resp.data.data);
            this.deptTreeData=respdata;
            console.log('后台返回的结果：',respdata);
          }
        }).catch(err => {
          console.log("部门架构树出现异常：", err);
        });
        this.loading=false;
    },//加载左边的资料分类树
 loadEmpTree(){
      this.empTreeData=[];
     var getUrl="/api/userauth/UserDeptTree/emptree?&check_dept="+this.inputemptree+"";
      this.$http.get(getUrl)
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            console.log('respdata.data):',respdata.data);
            this.empTreeData.push(respdata.data);
          }
        }).catch(err => {
          console.log("员工列表树出现异常：", err);
        });
        this.loading=false;
    },//加载左边的资料分类树
   quickEmpCode(){
      let outString='';
      this.inputdepttree="emp_code like " + "'%"+this.qEmpCode+"%'";
     // this.inputdepttree=this.inputdepttree.replace(/\%/g,"%25");
      outString=this.inputdepttree;
      this.$emit("treeOutEvent", outString);
    },//快速搜索工号
    quickEmpName(){
      let outString='';
      this.inputdepttree="emp_name like " + "'%"+this.qEmpName+"%'";
      //this.inputdepttree=this.inputdepttree.replace(/\%/g,"%25");
      outString=this.inputdepttree;
      this.$emit("treeOutEvent", outString);
    },//快速搜索姓名
    quickValue(){
      let outString='';
    if(this.qValue=="" || this.qField=="" || this.qType==""){
        this.inputdepttree="";
      }else if(this.qType.toUpperCase()=="LIKE"){
        this.inputdepttree=""+ this.qField + " " + this.qType+ " " + "'%"  +this.qValue +"%'";
        //this.inputdepttree=this.inputdepttree.replace(/\%/g,"%25");
      }else{
        this.inputdepttree=this.qField + this.qType + "'"+this.qValue.toString()+"'";
      }
      outString=this.inputdepttree;
      this.$emit("treeOutEvent", outString);
    },//快速搜索自定条件
     checkAllClum() {
   /*    let list = [];
      this.columsList.forEach(item => {
        list.push(item.prop);
      }); */
    }//改变了columsList
},
watch: {
  columsList: function() {
      this.checkAllClum();
    },
    filterText_dept(val) {
        this.$refs.depttree.filter(val);
      },//部门树过滤
    filterText_emp(val){
       this.$refs.emptree.filter(val);
      },//员工树过滤
      currentCode(val){
        this.currentNodeName=this.currentSelectNodeName;
        this.getParentNode(val);
      }
} //数据监听

}
</script>


<style scoped>
 .filter-tree
 {
  padding-bottom: 20px;
 }
 .currentNode
 {
    width:100%;
    text-align:left;
    height:50px;
    line-height:50px;
    border-bottom:1px solid #f0eded;
    color:#666;
 }
</style>
