<template>
<div>
    <el-container>
        <el-aside width="245px">
       
            <el-input style='width:200px;'
                placeholder="输入关键字进行过滤"
                 
                v-model="filterText">
            </el-input>
            <div style="width:100%; clear:both;margin:10px 0 10px;height:30px;">
                <el-button-group>
                <el-button type="primary" @click="opendialog(1)" >添加子节点</el-button>
                <el-button type="primary" @click="opendialog(2)" >编辑</el-button>
                <el-button type="danger"  @click="deleteOrg()" >删除</el-button>
                </el-button-group>
            </div>
              <el-scrollbar :style="`height:${clientHeight}px;width:100%;`">  
            
                  <el-tree
                      class="filter-tree"
                      :data="orgdata"
                      :props="defaultProps"
                       node-key="code"
                      :highlight-current="true"
                       default-expand-all
                      :default-expanded-keys="currentExpanded"
                      @node-click="handleNodeClick"
                      :filter-node-method="filterNode"
                      ref="orgtree">
                  </el-tree>
            
              </el-scrollbar>
         
        </el-aside>
        <el-main>
         <div class="currentNode">
               当前节点：{{this.currentNodeName}}
             </div>
        </el-main>
    </el-container>

    <el-dialog :title="`当前节点：${currentNodeName}`" width="50%"  :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input  style="width:70%" placeholder="请输入菜单名称" v-model="form.funShowName" autocomplete="off" clearable></el-input>
           <el-checkbox v-model="form.funIdentParam">报表</el-checkbox>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-switch v-model="form.funIdentValue"></el-switch>
        </el-form-item>
        <el-form-item :label='form.funIdentValue?"功能值":"菜单地址"' :label-width="formLabelWidth">
          <el-input  style="width:70%" :placeholder='form.funIdentValue?"请输入功能值":"请输入菜单地址"' v-model="form.funIdent" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
           <el-input   style="width:70%" placeholder="请输入排序值" v-model="form.orderNum" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item v-show="!form.funIdentValue" label="图标" :label-width="formLabelWidth">
           <el-button type="text" @click="chooseICOEvent">选择图标</el-button>
           <!--<span class="iconfont">&#xe723;</span> {{currentchoosedICO}}-->
             <p class="ico_area" v-html="this.showICO.replace('<span','<span style=\'font-size:35px;\'')">
             </p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrgNode">确 定</el-button>
      </div>
     <chooseico ref="chooseico" :icoChooseShow="icoChoose" :currentICO="this.form.icoStream" @on-result-change="chooicomethod(arguments)"></chooseico>
    </el-dialog>
</div>
</template>
<script>
import chooseico from '../tools/chooseico.vue'
export default {
    components:{
      'chooseico':chooseico
    },
    watch: {
      filterText(val) {
        this.$refs.orgtree.filter(val);
      },
      currentCode(val){
        this.currentNodeName=this.currentSelectNodeName;
        this.getParentNode(val);
      }
    },
    data() {
      return {
        showICO:'',
        icoChoose:false,
        currentchoosedICO:'',
        clientHeight:'',
        currentCode:'',
        returnOrgCode:'',
        currentHightLight:'0',
        currentExpanded:['0'],
        currentOrgOpUrl:'',
        currentNodeName:'根节点',
        currentSelectNodeName:'',
        dialogFormVisible: false,
        tableData:[],
        form: {
            funIdentValue: false,
            parentId:'',
            funIdent:'',
            funShowName:'',
            operationFlag:1,
            icoStream:'',
            orderNum:0,
            funIdentParam:"0"
        },
        formLabelWidth: '120px',
        filterText: '',
        orgdata:[],
        defaultProps: {
            children: 'children',
            label: 'label'
        },
      };
     },
    mounted()
    {
      this.clientHeight=`${document.documentElement.clientHeight-213}`;
      this.loadOrg();
    },
    methods: {
      chooseICOEvent(){
        this.icoChoose=true;
        this.$refs.chooseico.setVal();
      },
      chooicomethod(val){
        this.icoChoose=val[0];
        this.form.icoStream=val[1];
        this.showICO=this.form.icoStream;
      },
      handleNodeClick(data)
      {
         this.currentOrg=data.label;
         this.currentSelectNodeName=data.label;
         this.currentCode=data.code;
      },
      getParentNode(code)
      {
         if(code!=null)
         {
           if(this.$refs.orgtree.getNode(code)!=null&&this.$refs.orgtree.getNode(code).parent!=null)
           { 
               let temp=this.$refs.orgtree.getNode(code).parent.data
               if(temp.label!=null&&temp.label!='undefined')
               {
                 let tempLabel=temp.label;
                 this.currentNodeName=tempLabel+' > '+this.currentNodeName;
               }
               this.getParentNode(temp.code);
           }
         }
      },
      opendialog(flag){
        if(flag==1)
        {
          //添加组织机构
          this.form.funShowName="";
          this.form.funIdentValue=false;
          this.form.parentId='';
          this.form.funIdent='';
          this.form.operationFlag=1;
          this.form.orderNum=0;
          this.form.icoStream='';
          this.currentOrgOpUrl='/api/roles/addfuntree';
          this.form.funIdentParam="0";
        }
        else
        {
            if(this.currentCode==="0")
            {
              this.$message({
                        message: '根节点不能编辑！',
                        type: 'error',
                        showClose: true
                      });
             return false;
            }
            this.loadOrgDetail(this.currentCode)
            this.form.operationFlag=2;
            this.currentOrgOpUrl='/api/roles/updatefuntree';
        }
        this.dialogFormVisible = true;
      },
      addOrgNode()
      {
          if(this.form.funShowName=='')
          {
             this.$message({
                        message: '名称不能为空！',
                        type: 'error',
                        showClose: true
                      });
             return false;
          }
          else if(this.form.funIdentValue&&this.form.funIdent=='')
          {
             this.$message({
                        message: '功能值不能为空！',
                        type: 'error',
                        showClose: true
                      });
             return false;
          }
          else{
              let data={};
              let paramValue=this.form.funIdentParam?'9':'0';
              if(this.form.operationFlag===1)
              {
                 data={'funShowName':this.form.funShowName,'funIdentValue':this.form.funIdentValue,'funIdent':this.form.funIdent,'parentId':this.currentCode,'icoStream':this.form.icoStream,'orderNum':parseInt(this.form.orderNum),'funIdentParam':paramValue};
              }
              else
              {
                data={'funShowName':this.form.funShowName,'funIdentValue':this.form.funIdentValue,'funIdent':this.form.funIdent,'permissionId':this.currentCode,'icoStream':this.form.icoStream,'orderNum':parseInt(this.form.orderNum),'funIdentParam':paramValue};
              }
               this.$http.post(this.currentOrgOpUrl,data).then(res=>{
                  if(res.data&&res.data.result)
                  {
                     
                       this.$refs.orgtree.data=this.orgdata;
                       this.currentHightLight=this.form.operationFlag==1?res.data.data:this.currentCode;
                       this.returnOrgCode=this.form.operationFlag==1?res.data.data:this.currentCode;
                       this.currentSelectNodeName=this.form.funShowName;
                       this.loadOrg();
                       this.$message({message: this.form.operationFlag==1?'添加成功！':'更新成功！',type: 'success',showClose: true});
                       this.dialogFormVisible = false;
                  }
                  else
                  {
                    this.$message({
                        message: '添加失败 '+res.data.error,
                        type: 'error',
                        showClose: true
                      });
                  }
                
              }).catch(err=>{

              })

            
          }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      deleteOrg()
      {
         this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.removeOrg();
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
      },
      removeOrg(){
        if(this.currentCode!='')
        {
          this.$http({methods:'get',url:'/api/roles/remove/permission/'+this.currentCode}).then(resp=>{
                if(resp&&resp.data&&resp.data.result)
                {
                  let currentNode=this.$refs.orgtree.getNode(this.currentCode);
                  if(this.$refs.orgtree.getNode(this.currentCode)!=null&&this.$refs.orgtree.getNode(this.currentCode).parent!=null)
                  {
                      let temp=this.$refs.orgtree.getNode(this.currentCode).parent.data
                      if(temp!=null)
                      {
                        this.currentHightLight=temp.code;
                        this.currentCode=temp.code;
                        this.currentSelectNodeName=temp.label;
                      }
                  }
                  this.form.operationFlag=3;
                  this.$message({message: '删除成功！',type: 'success',showClose: true});
                  this.loadOrg();
                }
          })
        }
        else
        {
          this.$message({message: '请先选择要删除菜单项！',type: 'success',showClose: true});
        }
      },
      loadOrg()
      {
        this.$http({
          methods:'get',
          url:'/api/roles/permission/tree'
        }).then(resp=>{
            if(resp&&resp.data&&resp.data.result)
            {
              let respdata=resp.data;
              let data=respdata.data.rows;
              this.orgdata=[];
              this.orgdata.push(data);
              this.$nextTick(function(){
                this.$refs.orgtree.setCurrentKey(this.currentHightLight);  
                this.$refs.orgtree.store.defaultExpandAll = false;
                this.currentExpanded=[];
                this.currentExpanded.push(this.currentHightLight);
                if(this.form.operationFlag!=3)
                {
                   this.currentCode=this.returnOrgCode;
                   if(this.form.operationFlag===2)
                   {
                     this.currentNodeName=this.currentSelectNodeName;
                     this.getParentNode(this.currentCode);
                   }
                }
               })
              
            }
        }).catch(err=>{
             console.log("出现异常：",err);
        });

      },
      loadOrgDetail(id)
      {
        this.$http({methods:'get',url:'/api/roles/getpermission/'+id}).then(resp=>{
            if(resp&&resp.data&&resp.data.result)
            {
              let respdata=resp.data.data;
              this.form.funShowName=respdata.funShowName
              this.form.funIdentValue=respdata.funIdentValue
              this.form.funIdent=respdata.funIdent
              this.form.parentId=respdata.parentId
              this.form.icoStream=respdata.icoStream
              this.form.orderNum=respdata.orderNum
              this.showICO=this.form.icoStream
              this.form.funIdentParam=respdata.funIdentParam==="9"?true:false;
            }
        }).catch(err=>{});
      }
   }
};
</script>
<style scoped>
 .el-aside {
    color: #333;
    text-align: center;
    border-right: 1px solid #eeecec;
    padding: 10px;
  }
  
  .el-main {
    color: #333;
    text-align: center;
  }
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
  .ico_area {
    font-size: 32px;
  }
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size:36px;
}
</style>

