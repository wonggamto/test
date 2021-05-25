<template>
  <div>
    <el-row type="flex" :style="`height:${homeUpHeight}px;`" justify="space-between">
      <el-col :span="8">
        <div ref="myChart1" style="height:100%;width:100%"></div>
      </el-col>
      <el-col :span="8">
        <div ref="myChart3" style="width:100%;height:100%;"></div>
      </el-col>
      <el-col :span="8">
        <div ref="myChart2" :style="{width: '100%', height: '100%'}"></div>
      </el-col>
    </el-row>

    <el-row type="flex" :style="`height:${homeUpHeight}px;`" justify="space-between">
      <el-col :span="9">
        <div style="width:100%;clear:both;">
          <el-card class="box-card" style="width:100%;">
            <div slot="header" class="clearfix">
              <span class="home_head_title">
                <i class="el-icon-s-tools"></i> 设备信息
              </span>
            </div>
            <div style="width:100%;">
              <el-card style="width:23%;float:left;padding:0px;" shadow="hover">
                <div class="icoPosition">
                  <svg class="icon svg-icon icostyle" aria-hidden="true">
                    <use xlink:href="#icon-automatic" />
                  </svg>
                </div>
                <div class="eq_title">未处理保修</div>
                <div class="eq_title" style="color:red">10</div>
              </el-card>
              <el-card style="width:23%;margin-left:2%;float:left" shadow="hover">
                <div class="icoPosition">
                  <svg class="icon svg-icon icostyle" aria-hidden="true">
                    <use xlink:href="#icon-support" />
                  </svg>
                </div>
                <div class="eq_title">今日维修</div>
                <div class="eq_title" style="color:green">5</div>
              </el-card>
              <el-card style="width:23%;margin-left:2%;float:left" shadow="hover">
                <div class="icoPosition">
                  <svg class="icon svg-icon icostyle" aria-hidden="true">
                    <use xlink:href="#icon-settings" />
                  </svg>
                </div>
                <div class="eq_title">故障数</div>
                <div class="eq_title" style="color:red">12</div>
              </el-card>
              <el-card style="width:23%;margin-left:2%;float:right" shadow="hover">
                <div class="icoPosition">
                  <svg class="icon svg-icon icostyle" aria-hidden="true">
                    <use xlink:href="#icon-positive_dynamic" />
                  </svg>
                </div>
                <div class="eq_title">设备完好率</div>
                <div class="eq_title" style="color:red">25%</div>
              </el-card>
            </div>
            <div style="width:100%;height:5px;clear:both;"></div>
            <ul class="eq_fixlist">
              <li>
                <span class="eq_fixlist_left">1 正极激光切6号故障</span>
                <span class="eq_fixlist_right">激光切设备[2019-05-30]</span>
              </li>
              <li>
                <span class="eq_fixlist_left">2 注液称重故障</span>
                <span class="eq_fixlist_right">二次注液[2019-05-30]</span>
              </li>
              <li>
                <span class="eq_fixlist_left">3 注液称重故障</span>
                <span class="eq_fixlist_right">一次注液[2019-06-30]</span>
              </li>
              <li>
                <span class="eq_fixlist_left">4 卷绕机GXES2015012热压机故障</span>
                <span class="eq_fixlist_right">4-6号[2019-07-01]</span>
              </li>
              <li>
                <span class="eq_fixlist_left">5 卷绕机GXES2015012热压机故障</span>
                <span class="eq_fixlist_right">2-6号[2019-07-03]</span>
              </li>
              <li>
                <span class="eq_fixlist_left">6 皮带故障</span>
                <span class="eq_fixlist_right">1-6号[2019-06-30]</span>
              </li>

            </ul>
          </el-card>
        </div>
      </el-col>
      <el-col :span="15">
        <el-card class="box-card" style="width:99%;float:right;">
          <div slot="header" class="clearfix">
            <span class="home_head_title">
              <svg class="icon svg-icon" style="vertical-align:middle;" aria-hidden="true">
                <use xlink:href="#icon-generic_sorting_asc" />
              </svg>
              工单进度
            </span>
          </div>
          <el-table
            class="elTable"
            ref="table"
            :data="workorderdata"
            stripe
            :height="`${homeDownHeight}px`"
            width="100%"
            style="margin-top:0px;"
          >
            <el-table-column
              align="center"
              prop="Sys_OrderName"
              label="工单名称"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column align="center" prop="Sys_OrderQty" label="工单数量"></el-table-column>
            <el-table-column align="center" prop="Sys_OrderQty" label="投入数量"></el-table-column>
            <el-table-column align="center" prop="Sys_OrderQty" label="完工数量"></el-table-column>
            <el-table-column align="center" prop="Sys_OrderQty" label="报废数量"></el-table-column>
            <el-table-column align="center" prop="StatusName" label="状态"></el-table-column>
            <el-table-column
              align="center"
              prop="ProductTypeName"
              label="类型"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              align="center"
              :formatter="formatdate"
              :show-overflow-tooltip="true"
              prop="Sys_ActualStartTime"
              label="开始日期"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  watch: {
    "$store.state.sideStatus"(val) {
      this.drawLine();
    }
  },
  mounted() {
    this.clientHeight = window.innerHeight - 155;
    this.homeUpHeight = this.clientHeight / 2;
    this.loadData();
    this.$nextTick(() => {
      this.drawLine();
      this.homeDownHeight = this.clientHeight / 2;
    });
  },
  data() {
    return {
      URL: this.$SYSCONST.BASEINFOAPI,
      total: 0,
      homeUpHeight: 0,
      homeDownHeight: 0,
      workorderdata: []
    };
  },
  methods: {

    loadData(pindex) {
      let params = this.$qs.stringify({
        PageIndex: 1,
        PageSize: 15,
        Sys_OrderCode: this.SearchOrderCode,
        Sys_OrderName: this.SearchOrderName,
        Sys_ActualStartTime: this.SearchBeginTime,
        Sys_ActualEndTime: this.SearchEndTime,
        Sys_OrderStatus: this.SearchOrderStatus || 0,
        r: Math.random()
      });
      this.$http({
        methods: "get",
        url: this.URL + "/basic/workorder?" + params
      }).then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.total = respdata.data.total;
            this.workorderdata = respdata.data.rows;
          }
        }).catch(err => {
          console.log("出现异常：", err);
        });
    },
    formatdate(row, column) {
      var ft = this.$options.filters["formatdate"];
      if (column.label == "开始日期") {
        return ft(row.Sys_ActualStartTime, "MM-DD-YYYY");
      } else {
        return ft(row.Sys_ActualEndTime, "MM-DD-YYYY");
      }
      //return this.$moment(row.CreateTime).format('YYYY-DD-MM HH:mm:ss');
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(this.$refs["myChart1"]);
      let myChart2 = this.$echarts.init(this.$refs["myChart2"]);
      let myChart3 = this.$echarts.init(this.$refs["myChart3"]);
      // 绘制图表
      let Option = {
        title: {
          text: "设备OEE情况"
        },
        legend: {
          data: ["6月", "7月"]
        },
        calculable: true,
        xAxis: [
          {
            type: "value",
            boundaryGap: [0, 0.01]
          }
        ],
        yAxis: [
          {
            type: "category",
            data: ["激光切", "卷绕机", "注液机", "涂布机", "分容机", "叠片机"]
          }
        ],
        grid: {
          left: 45
        },
        series: [
          {
            name: "6月",
            type: "bar",
            data: [50, 60, 74, 80, 94, 98]
          },
          {
            name: "7月",
            type: "bar",
            data: [56, 40, 54, 60, 74, 88]
          }
        ]
      };
      let Option2 = {
        title: { text: "电芯工段周产量趋势" },
        legend: {
          data: ["一工段", "二工段", "三工段"],
          orient: "vertical",
          x: "right",
          padding: 0
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "一工段",
            type: "line",
            stack: "总量",
            data: [150, 432, 201, 154, 190, 330, 410]
          },
          {
            name: "二工段",
            type: "line",
            stack: "总量",
            data: [120, 332, 301, 334, 390, 130, 320]
          },
          {
            name: "三工段",
            type: "line",
            stack: "总量",
            data: [220, 332, 901, 334, 290, 130, 120]
          }
        ]
      };

      let Option1 = {
        title: { text: "2019年电芯产量汇总" },
        //tooltip: {},
        xAxis: {
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {},
        grid: {
          left: 39
        },
        series: [
          {
            name: "产量",
            type: "bar",
            data: [
              5212,
              1234,
              5644,
              6777,
              2222,
              1231,
              2225,
              1220,
              1222,
              2231,
              2325,
              6320
            ]
          }
        ]
      };
      myChart1.setOption(Option1);
      myChart2.setOption(Option2);
      myChart3.setOption(Option);
      myChart1.resize();
      myChart2.resize();
      myChart3.resize();
      window.addEventListener("resize", function() {
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
      });
    }
  }
};
</script>

<style scoped>
.icostyle {
  font-size: 40px;
}
.icoPosition {
  width: 100%;
  text-align: center;
}
.eq_title {
  width: 100%;
  font-size: 12px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  color: #666666;
}
.eq_fixlist {
  padding: 0px;
  margin: 0px;
}
.eq_fixlist li {
  list-style: none;
  font-size: 12px;
  color: #666666;
}
.eq_fixlist_left {
  width: 60%;
  height: 25px;
  float: left;
}
.eq_fixlist_right {
  width: 40%;
  height: 25px;
  text-align: right;
  float: left;
}
.home_head_title {
  font-size: 14px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
