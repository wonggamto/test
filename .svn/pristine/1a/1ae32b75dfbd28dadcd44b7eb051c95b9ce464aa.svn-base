<template>
  <div>
    <el-row type="flex" class="row-bg" style="margin:0px;padding:0px;">
       <el-col :span="24" style="height:30px;" >
       切换主题：<el-select size="mini" style="width:120px;"  @change="selectTheme" v-model="chartTheme" placeholder="请切换主题">
          <el-option
            v-for="item in themOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col type="flex" :span="24" >
        <div ref="myChart1" :style="`height:${mainHeight}px;width:100%`"></div>
      </el-col>
    </el-row>
    <div id="downloadFile" style="display:none"></div>
  </div>
</template>
<script>
// import  'echarts/theme/lms.js'
// import  'echarts/theme/chalk.js'
// import  'echarts/theme/essos.js'
import  'echarts/theme/infographic.js'
//import  'echarts/theme/halloween.js'
import  'echarts/theme/macarons.js'
// import  'echarts/theme/purple-passion.js'
import  'echarts/theme/shine.js'
// import  'echarts/theme/walden.js'
import  'echarts/theme/vintage.js'
// import  'echarts/theme/wonderland.js'
// import  'echarts/theme/westeros.js'
export default {
  props:["id"],
  created(){
    let id=15;
    this.preview_result(id);
    this.formdata.id=id;
  },
  mounted(){
     this.mainHeight = window.innerHeight-138;
     this.$nextTick(e=>{

     })
  },
  data() {
    return {
      URL: this.$SYSCONST.BASEINFOAPI,
      mainHeight:0,
      reportTitle:'',
      loading:true,
      chartTheme:'lms',
      themOptions:[
        {label:'默认',value:'lms'},
        {label:'粉色黑底',value:'chalk'},
        {label:'淡红色',value:'essos'},
        {label:'高对比',value:'infographic'},
      //{label:'万圣节前夜',value:'halloween'},
        {label:'蛋白色',value:'macarons'},
        {label:'强紫色',value:'purple-passion'},
        {label:'阳光',value:'shine'},
        {label:'瓦尔登湖',value:'walden'},
        {label:'奇境',value:'wonderland'},
        {label:'暗黑',value:'dark'},
        {label:'吉普赛',value:'roma'},
        {label:'粉色',value:'vintage'},
        {label:'深蓝',value:'westeros'}
      ],
      downdisabled:false,
      downloading:'导出',
      placeholder:'',
      mainData: [],
      formdata: {
        id:15,
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
      xdata:[],
      seriesData:[],
      legendData:[],
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
    selectTheme(val){
      this.chartTheme=val;
      console.log('this.chartTheme:', this.chartTheme);
      this.$echarts.init(this.$refs["myChart1"],this.chartTheme).dispose();
      this.drawLine();
    },
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
            this.mainData = respdata.data.data.rows;
            let seriesOne={name:"工单数量",type:'bar',data:[]};
            let seriesTwo={name:"投入数量",type:'bar',data:[]};
            let seriesThree={name:"完工数量",type:'bar',data:[]};
            let seriesFour={name:"未完工数量",type:'bar',data:[]};
            let seriesFive={name:"报废数量",type:'bar',data:[]};
            this.legendData=[seriesOne.name,seriesTwo.name,seriesThree.name,seriesFour.name,seriesFive.name];
            if(this.mainData){
               this.xdata=[];
               this.seriesData=[];
               this.mainData.forEach(item=>{
                this.xdata.push(item.SYS_ORDERNAME);
                seriesOne.data.push(item.SYS_ORDERQTY);
                seriesTwo.data.push(item.SYS_INPUTQTY);
                seriesThree.data.push(item.SYS_COMQTY);
                seriesFour.data.push(item.SYS_UNCOMQTY);
                seriesFive.data.push(item.SYS_SCRAP);
               });
            }

            this.seriesData=[
              seriesOne,seriesTwo,seriesThree,seriesFour,seriesFive
            ];

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

            this.drawLine();
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
    },
    drawLine() {


      let myChart1 = this.$echarts.init(this.$refs["myChart1"],this.chartTheme);
      let Option1 = {
        title: {
            text: this.reportTitle,
            left:'center',
            top:'top'
        },
        legend: {
           data:this.legendData,
           top:'5%'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                magicType: {
                    type: ['line', 'bar']
                },
                saveAsImage: {},
            }
        },
       tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        xAxis: {
          data:this.xdata,
          axisLabel:{
                    rotate:30,
                    interval:0
          }
        },

        yAxis: {},
        series:this.seriesData
      };
      myChart1.setOption(Option1);
      myChart1.resize();
      window.addEventListener("resize", function() {
        myChart1.resize();
      });
    }
  }
};
</script>

