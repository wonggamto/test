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
              <el-button type="primary" @click="searchData()" icon="el-icon-search"  align="left" >查询</el-button> 
              <el-button :disabled="downdisabled" type="primary" @click="exportData()" icon="el-icon-download"  align="left" >{{downloading}}</el-button> 
          </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
       <el-col :span="24" >
         <h4 style="margin:0px;height:50px;line-height:50px;width:90%;text-align:center;font-size:20px; font-weight:bold">
           {{reportTitle}}  
         </h4>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col type="flex" :span="24" >
        <el-table class="table_report"  v-loading="loading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"  tooltip-effect="dark" border ref="table" :data="mainData" stripe :height="`${tableHeight}px`">
          <template v-for='(item,index) in datacolumn'>
            <el-table-column fixed :formatter="formatter" :width="item.width" v-if="item.isshow" :show-overflow-tooltip="true"   :key="index" align="center" :prop="item.prop" :label="item.label">
            </el-table-column> 
          </template>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="formdata.pageSize" :total="total"></el-pagination>
      </el-col>
    </el-row>
    <div id="downloadFile" style="display:none"></div>
  </div>
</template>
<script>
export default {
  props:["id"],
  created(){
    let id=this.id;
    this.preview_result(id);
    this.formdata.id=id;
  },
  mounted(){
   this.$nextTick(e=>{
       this.tableHeight = window.innerHeight-this.$refs.table.$el.offsetTop-218;
    })
  },
  data() {
    return {
      URL: this.$SYSCONST.BASEINFOAPI,
      tableHeight:0,
      reportTitle:'',
      loading:true,
      downdisabled:false,
      downloading:'导出',
      placeholder:'',
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
    preview_result(id) {
      this.$forceUpdate();
      this.formdata.id= id
      let r=+new Date().getTime();
      this.$http.post(this.URL + "/basic/report/designer/table?r="+r, this.formdata)
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.datacolumn= respdata.data.param;
            this.reportTitle=respdata.data.reportTitle;
            if(this.datacolumn){
                this.options=[];
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
    selectSearch(val){
      let obj=this.datacolumn.find(item=>{
        return item.select==val
      });
      if(obj&&obj.query&&obj.type==='0'){
        this.showdate=true;
        this.showsearch=false;
      }else{
        this.showdate=false;
        this.showsearch=true;
      }
      this.placeholder=obj.label;
      this.formdata.searchKey=val;
      this.formdata.valueType=parseInt(obj.type);
      this.formdata.searchOption=obj.searchOption;
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
      this.preview_result(id);
    },
    exportData(){
      this.downdisabled=true;
      this.downloading="导出中...";
      let url = this.URL+"/basic/report/export/execl";
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
      this.formdata.pageIndex=val
      let id=this.id;
      this.preview_result(id);
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
    }
  }
};
</script>

