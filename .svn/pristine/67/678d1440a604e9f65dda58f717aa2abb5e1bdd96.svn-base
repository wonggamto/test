<template>
  <div>
    <el-row type="flex" class="row-bg" style="height:35px;">
       <el-col :span="24">
         <div style="width:90%;">
              <el-select  @change="selectSearch" v-model="value" align="left" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-show="showsearch"  style="width:120px;" v-model="formdata.searchOption" align="left" placeholder="请选择">
                <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-input v-show="showsearch" v-model="inputsearch" style="width:172px;" align="left"  :placeholder="`请输入${placeholder}`"></el-input>
              <el-date-picker v-show="showdate" value-format="yyyy-MM-dd HH:mm:ss"  default-time="00:00:00" v-model="inputsearchDateBegin" type="datetime" :picker-options="pickerOptions" style="width:174px;" align="left" placeholder="选择开始日期"></el-date-picker>
              <el-date-picker v-show="showdate" value-format="yyyy-MM-dd HH:mm:ss"  default-time="00:00:00" v-model="inputsearchDateEnd" type="datetime" :picker-options="pickerOptions" style="width:174px;" align="left" placeholder="选择结束日期"></el-date-picker>
              <el-button v-permission="this.btnQuery"  type="primary" @click="searchData()" icon="el-icon-search"  align="left" >查询</el-button> 
              <el-button v-permission="this.btnExport"  :disabled="downdisabled" type="primary" @click="exportData()" icon="el-icon-download"  align="left" >{{downloading}}</el-button> 
              <el-button v-permission="this.btnAdd"  type="primary" @click="additems()" icon="el-icon-edit"  align="left" >新增</el-button> 
              <el-button v-permission="this.btnUpdate"  type="warning" @click="editItems()" icon="el-icon-edit"  align="left" >编辑</el-button> 
              <el-button v-permission="this.btnDelete" type="danger" @click="removeItems()" icon="el-icon-delete"  align="left" >删除</el-button>
          </div>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col type="flex" :span="24" >
        <el-table  style="width:100%"  class="table_report" highlight-current-row  @current-change="handleCurrentChangeTable"  v-loading="loading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"  tooltip-effect="dark" border ref="table" :data="mainData" stripe :height="`${tableHeight}px`">
          <template v-for='(item,index) in datacolumn'>
            <el-table-column  sortable :fixed="false" :formatter="formatter" :width="item.width" v-if="item.isshow" :show-overflow-tooltip="true"   :key="index" align="center" :prop="item.prop" :label="item.label">
            </el-table-column> 
          </template>
        </el-table>
          <el-pagination @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="formdata.pageSize"
                        @size-change="handleSizeChange"
                        layout="total, prev, pager, next,sizes"
                        :total="total">
    </el-pagination>
      </el-col>
    </el-row>
    <div id="downloadFile" style="display:none"></div>
  </div>
</template>
<script>
export default {
  props:{
        "id":{type:String},
        "btnAdd":{type:String},
        "btnUpdate":{type:String},
        "btnDelete":{type:String},
        "btnQuery":{type:String},
        "btnExport":{type:String}
  },
  created(){
    console.log("btnAdd:",this.btnAdd);
    this.MAINID=parseInt(this.id);
    this.preview_result();
    this.formdata.id=this.MAINID;
  },
  mounted(){
    this.userAuth=this.$store.state.userInfo.authdata;
    this.$nextTick(e=>{
       this.tableHeight = window.innerHeight-this.$refs.table.$el.offsetTop-175;
    })
  },
  data() {
    return {
      URL: this.$SYSCONST.SYSTEMAPI,
      MAINID:0,
      tableHeight:0,
      reportTitle:'',
      userAuth:'',
      loading:true,
      downdisabled:false,
      downloading:'导出',
      placeholder:'',
      selectedIndex:0,
      mainData: [],
      formdata: {
        id:this.$route.params.id,
        reportSql: "",
        sort: "",
        pageIndex: 1,
        pageSize: 20,
        searchKey:'',
        searchValue:[],
        valueType:1,
        searchOption:'=',
      },
      total:0,
      options: [],
      datacolumn:[],
      currentRow:null,
      value: '',
      showdate:false,
      showsearch:false,
      selectKey:'',
      hideDesigner:true,
      inputsearch:'',
      inputsearchDateEnd:'',
      inputsearchDateBegin:'',
      pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
      },
      searchOptions:[
        {label:'等于 [ = ]',value:'='},
        {label:'包含 [ like ]',value:'like'},
        {label:'大于 [ >= ]',value:'>='},
        {label:'小于 [ <= ]',value:'<='}
      ]
    };
  },
  methods: {
    preview_result() {
      this.$forceUpdate();
      this.formdata.id= this.MAINID;
      let r=+new Date().getTime();
      this.$http.post(this.URL + "/api/report/designer/table?r="+r, this.formdata)
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.datacolumn= respdata.data.param;
            this.reportTitle=respdata.data.reportTitle;
            if(this.datacolumn){
                this.options=[];
                this.options.push({value:'',label:'全部'});
                this.datacolumn.forEach(item=>{
                    if(item&&item.query){
                        this.options.push({value:item.select,label:item.label});
                    }
                })
               
            }
            this.loading=false;
            this.total = respdata.data.data.total;
            this.mainData = respdata.data.data.rows;
           
          }
        }).catch(err => {
          console.log("出现异常：", err);
        });
        this.loading=false;
    },
    checkAuth(){

    },
    selectSearch(val){   
      let obj=this.datacolumn.find(item=>{
        return item.select==val
      });
      if(obj&&obj.query&&obj.type==='0'){
         this.showdate=true;
         this.showsearch=false;

         this.placeholder=obj.label;
         this.formdata.searchKey=val;
         this.formdata.valueType=parseInt(obj.type);
         this.formdata.searchOption=obj.searchOption;
      }else if(obj&&obj.query&&obj.type!='0'){
         this.showdate=false;
         this.showsearch=true;

         this.placeholder=obj.label;
         this.formdata.searchKey=val;
         this.formdata.valueType=parseInt(obj.type);
         this.formdata.searchOption=obj.searchOption;
      }else{
         this.showdate=false;
         this.showsearch=false;
         this.placeholder='';
         this.formdata.searchKey='';
         this.formdata.searchOption='';
      }
     
    },
    searchData(){
      this.formdata.searchValue=[];
      if(this.showsearch){
        this.formdata.searchValue.push(this.inputsearch);
      }
      if(this.showdate){
        this.formdata.searchValue.push(this.inputsearchDateBegin)
        this.formdata.searchValue.push(this.inputsearchDateEnd)
      }
      let id=this.formdata.id;
      this.preview_result();
    },
    exportData(){
      this.downdisabled=true;
      this.downloading="导出中...";
      let url = this.URL+"/api/report/export/execl";
      this.$http.post(url,this.formdata,{responseType:'blob'}).then(resp=>{
         if (resp) {
            let respdata = resp.data;
            let blob = respdata
            let reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = (e) => {
                let a = document.createElement('a')
                a.download = this.reportTitle+".xls"
                a.href = e.target.result
                document.getElementById("downloadFile").appendChild(a)
                a.click()
                document.getElementById("downloadFile").removeChild(a)
            }
        }
         this.downloading="导出";
         this.downdisabled=false;
      }).catch(err=>{
         this.downloading="导出";
         this.downdisabled=false;
      });
    },
    handleCurrentChange(val){
      console.log('val',val);
      this.formdata.pageIndex=val
      this.preview_result();
    },
    handleSizeChange(val){
        this.formdata.pageSize=val;
     this.preview_result();
    },
    formatter: function(row, column, cellValue, index,param) {
        if(!cellValue){
          return cellValue;
        }
        let itemOptions=this.datacolumn.find(item=>{
          return item.prop==column.property;
        })
        if(itemOptions&&itemOptions.format){
          let formatstring=itemOptions.formatString||'YYYY-DD-MM HH:mm:ss';
          return this.$moment(cellValue).format(formatstring)
        }else{
          return cellValue;
        }
    },
    handleCurrentChangeTable(val)
    {
      this.currentRow = val;
      console.log('this.currentRow:',this.currentRow);
    },
    removeItems(){
        this.$emit('deleteItems',this.currentRow);
    },
    editItems()
    {
        this.$emit('updateItems',this.currentRow);
    },
    additems()
    {
      this.$emit('insertItems');
    }
  }
};
</script>
<style>
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row > td {
  background-color: #a0cfff;
}
 
.el-table--striped .el-table__body tr.hover-row.el-table__row--striped > td,
.el-table__body tr.hover-row > td {
  background-color: #d9ecff !important;
}

</style>