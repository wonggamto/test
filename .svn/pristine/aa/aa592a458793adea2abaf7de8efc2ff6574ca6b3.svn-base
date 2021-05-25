<template>
  <div>
    <el-row>
      <el-col :span="16">
        <div>
          <!--        面包屑-->
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">门店列表</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>

    </el-row>

    <!--        卡片-->
    <el-card>
      <!--            搜索与添加-->
      <el-row :gutter="12" class="search">
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">按钮</el-button>
        </el-col>
        <el-col :span="4" :offset="12">
          <!--                        修改-->
          <el-tooltip effect="dark" content="修改"
                      placement="top"
                      :enterable="false">
            <el-button size="small" type="primary"
                       icon="el-icon-edit"
                       @click="handleEdit"
            ></el-button>
          </el-tooltip>
          <!--                        删除-->
          <el-tooltip effect="dark" content="删除"
                      placement="top"
                      :enterable="false">
            <el-button size="small" type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <!--            &lt;!&ndash;            店铺列表&ndash;&gt;-->
      <el-table
        :data="ShopList"
        stripe
        style="width: 100%"
        height="800"
        @row-click="editRowInfo"
        @row-dblclick="handleRowClick"
        highlight-current-row>
        <el-table-column type="index"
                         fixed="left"></el-table-column>
        <el-table-column
          prop="ID"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="ShopID"
          label="店号">
        </el-table-column>
        <el-table-column
          prop="ShopInID"
          label="店内码">
        </el-table-column>
        <el-table-column
          prop="CustomerID"
          label="商户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ShopName"
          label="店名"
        ></el-table-column>
        <el-table-column
          prop="BusinesstType"
          label="服务类型"
        ></el-table-column>
        <el-table-column
          prop="ShopType"
          label="店铺类型"
        ></el-table-column>
        <el-table-column
          prop="QianTaiQnty"
          label="前台数量"
        ></el-table-column>
        <el-table-column
          prop="PingBanQnty"
          label="平板数量"
        ></el-table-column>
        <el-table-column
          prop="BaoZhongQiQnty"
          label="报钟器数量"
        ></el-table-column>
        <el-table-column
          prop="ParentID"
          label="上级"
        ></el-table-column>
        <el-table-column
          prop="ManagementType"
          label="业态"
        ></el-table-column>
        <el-table-column
          prop="LinkName"
          label="联系人"
        ></el-table-column>
        <el-table-column
          prop="LinkMobile"
          label="联系电话"
        ></el-table-column>
        <el-table-column
          prop="Address"
          label="地址"
        ></el-table-column>
        <el-table-column
          prop="AddTime"
          label="增加时间"
        >
        </el-table-column>
        <el-table-column
          prop="AddUser"
          label="增加人"
        ></el-table-column>
        <el-table-column
          prop="ValidTime"
          label="有效期"
        ></el-table-column>
        <el-table-column
          prop="Description"
          label="说明"
        ></el-table-column>
        <el-table-column
          prop="ShopDistrict"
          label="华南区"
        ></el-table-column>
        <el-table-column
          prop="Provinces"
          label="省份"
        ></el-table-column>
        <el-table-column
          prop="PriceSystem"
          label="价格体系"
        ></el-table-column>
        <el-table-column
          label="备注"
          fixed="right">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right">
        </el-table-column>
      </el-table>
      <!--            &lt;!&ndash;                店铺详情对话框&ndash;&gt;-->
      <template>
        <el-dialog title="店铺详情" :visible.sync="handleDialog">
          <el-form :model="rowInfo" :disabled="false">
            <el-form-item label="ID" :label-width="formLabelWidth">
              <el-input v-model="rowInfo.ID" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="ShopID" :label-width="formLabelWidth">
              <el-input v-model="rowInfo.ShopID" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人" :label-width="formLabelWidth">
              <el-input v-model="rowInfo.LinkName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="rowInfo.LinkMobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务类型" :label-width="formLabelWidth">
              <el-input v-model="rowInfo.BusinesstType" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleDialog = false">确 定</el-button>
          </div>
        </el-dialog>
      </template>
      <!--            分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        background
        :page-sizes="[5, 30, 45]"
        :page-size="queryInfo.pagesize"
        layout="sizes, prev, pager, next"
        :total="total">>
      </el-pagination>
    </el-card>
    <!--        {{this.ShopList}}-->
  </div>

</template>
<script>
import axios from "axios"

export default {
  name: 'Tables',
  data() {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        //每页显示的数据条数
        pagesize: 2
      },
      shop: {
        ID: '',
        ShopID: '',
        CustomerID: '',
        ShopName: '',
      },
      ShopList:[],
      total: 0,
      dialogFormVisible: false,
      dialogTableVisible: false,
      handleDialog: false,
      formLabelWidth: '60px',
      rowInfo: {
        ID: "",
        ShopID: "50001001",
        ShopInID: null,
        CustomerID: "60006",
        ShopName: "测试AA",
        BusinesstType: 0,
        ShopType: 0,
        QianTaiQnty: 1,
        PingBanQnty: 1,
        BaoZhongQiQnty: 1,
        ParentID: 0,
        ManagementType: 0,
        StoreType: 0,
        LinkName: null,
        LinkMobile: null,
        ClientVersion: null,
        DBVersion: null,
        Status: 0,
        Address: null,
        AddTime: "2020-02-15T17:01:43.483",
        AddUser: null,
        ValidTime: "2032-04-03T03:00:00",
        Description: null,
        IsDataInit: false,
        Local2Net: 1,
        ShopDistrict: null,
        Provinces: null,
        PriceSystem: null,
        UpdateTime: "AAAAAAAHxG4="
      },
      disabled:true,
      canEdit:true
    }
  },
  mounted() {
    this.getAllShops()
    // console.log(this.shop.ID)
    // console.log('对象',this.ShopList)
  },
  methods: {
    editRowInfo(row) {
      //获取选中行信息
      this.rowInfo.ID = row.ID
      this.rowInfo.ShopName = row.ShopName
      this.rowInfo.CustomerID = row.CustomerID
      this.rowInfo.ShopID = row.ShopID
      this.rowInfo.Address = row.Address
      this.rowInfo.AddUser = row.Address
      this.rowInfo.BaoZhongQiQnty = row.BaoZhongQiQnty
      this.rowInfo.BusinesstType = row.BusinesstType
      this.rowInfo.PingBanQnty = row.PingBanQnty
      this.rowInfo.Description = row.Description
      this.rowInfo.ManagementType = row.ManagementType
      this.rowInfo.LinkMobile = row.LinkMobile
      this.rowInfo.QianTaiQnty = row.QianTaiQnty
      this.rowInfo.ParentID = row.ParentID
      this.rowInfo.Status = row.Status
      this.rowInfo.LinkName = row.LinkName
    },
    handleEdit() {
      //根据权限判定是否现实修改、删除按钮
      // this.canEdit = true
      //根据权限判定是否实现可修改表单数据
      this.disabled = false
      this.handleDialog = !this.handleDialog
    },
    handleRowClick(row) {
      this.handleDialog = !this.handleDialog

      // this.shop.ID = row.ID
      // this.shop.ShopID = row.ShopID
      // this.shop.CustomerID = row.CustomerID
      // this.shop.ShopName = row.ShopName
      this.canEdit = false
      this.disabled = true
      // console.log(row.ID)
    },
    handleCurrentChange(newPage) {//监听页码值改变的事件
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getAllShops()
    },
    handleSizeChange(newSize) {//监听pagesize改变的事件
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getAllShops()

    },
    getAllShops() {
      axios.post('/api/agentsystem/PostGetSysShopList?apptype=0')
        .then(response => {
          // console.log('所有门店信息')
          // console.log(response.data.Data)
          this.ShopList = response.data.Data
          // console.log(this.ShopList)
        })
        .catch(error => console.log(error))

    }
  }

}
</script>
<style lang="scss" scoped>
.el-dialog{
  .el-form{
    border:1px solid red;
    display: flex;
    flex-wrap: wrap;
    .el-form-item{
      //border:1px solid blue;
      width: 50%;
    }
  }
}

.search{
  //border:1px solid red;
  margin-bottom: 16px;
}

</style>
