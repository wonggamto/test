<template>
  <el-card>
    <el-row :gutter="12" class="search">
      <el-col :span="6">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-download">导出</el-button>
        <el-button type="primary">新增</el-button>
        <el-button type="warning" icon="el-icon-edit" @click="editForm">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="moduleList"
      style="width: 100%"
      row-key="ID"
      border
      lazy
      :load="load"
      max-height="800"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      highlight-current-row
      @current-change="handleCurrentChange"
      @row-dblclick="showRowInfo">
      <el-table-column
        title="序号"
        type="index">
      </el-table-column>
      <el-table-column
        prop="ModuleName"
        label="字典数据"
      >
      </el-table-column>
      <el-table-column
        prop="Encode"
        label="模块编码">
      </el-table-column>
      <el-table-column
        prop="CreateDate"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="CreateUserName"
        label="创建者">
      </el-table-column>
      <el-table-column
        prop="ParentID"
        label="上级模块">
      </el-table-column>
      <el-table-column
        prop="UrlAddress"
        label="url地址">
      </el-table-column>
      <el-table-column
        prop="SortID"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="Status"
        label="状态">

      </el-table-column>
      <el-table-column
        prop="GrantString"
        label="权限">
      </el-table-column>
      <el-table-column
        prop="Description"
        label="描述">
      </el-table-column>
    </el-table>
    <template>
      <div>
        <el-dialog title="详情" :visible.sync="dialogFormVisible">
          <el-form :model="details" label-position="right" label-width="80px">
            <el-form-item label="字典数据">
              <el-input v-model="details.ModuleName" autocomplete="off" :readonly="edit"></el-input>
            </el-form-item>
            <el-form-item label="模块编码">
              <el-input v-model="details.Encode" autocomplete="off" :readonly="edit"></el-input>
            </el-form-item>
            <el-form-item label="创建日期">
              <el-input v-model="details.CreateDate" autocomplete="off" :readonly="edit"></el-input>
            </el-form-item>
            <el-form-item label="创建者">
              <el-input v-model="details.CreateUserName" autocomplete="off" :readonly="edit"></el-input>
            </el-form-item>
            <el-form-item label="上级ID">
              <el-input v-model="details.ParentID" autocomplete="off" :readonly="edit"></el-input>
            </el-form-item>
            <el-form-item label="序号">
              <el-input v-model="details.SortID" autocomplete="off" :readonly="edit"></el-input>
            </el-form-item>
            <!--              <el-input v-model="details.GrantString" autocomplete="off" :readonly="edit"></el-input>-->
            <el-form-item label="url地址">
              <el-input v-model="details.CreateUserName" autocomplete="off" :readonly="edit"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="details.Status" autocomplete="off" :readonly="edit"></el-input>
            </el-form-item>
            <el-form-item label="权限" class="permission" v-model="test">
              <el-checkbox-group v-model="test" @change="getValue()">
                <el-checkbox v-for="(item,i) in items" :key="i" :label="item.TypeID">
                  {{ item.TypeMemo }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="描述" class="desc">
              <el-input type="textarea" v-model="details.Description" :rows="10"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" v-if="edit===false">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </template>
    {{ this.test }}


  </el-card>

</template>
<script>
export default {
  name: 'treeMenus',
  mounted() {
    this.loadTreeFunction()
    this.getPermission()
    // this.getValue()
  },
  data() {
    return {
      test: [], // 默认选项，要在el-checkbox-group里绑定一个空数组
      items: [],
      permissionList: [],
      moduleList: [],
      defaultProps: {
        children: 'children',
        label: 'ModuleName'
      },
      dialogFormVisible: false,
      readonly: true,
      desc: '',
      details: {
        ID: '',
        ModuleName: '',
        CreateDate: '',
        CreateUsername: ''
      },
      //input :readonly 的属性 true 为只读，false 为 可写
      edit: true,
      currentRow: null,
    }
  },
  methods: {
    getValue() {
      console.log('test', this.items)
    },
    getPermission() {
      this.$http.post('/api/agentsystem/PostGetOperTypeList')
        .then(resp => {
          if (resp) {
            // console.log('resp',resp.data.Data)
            this.permissionList = resp.data.Data
            this.items = this.permissionList.map(data => {
              return data
              // console.log(data.TypeID)
            })
          }
        })
    },
    handleCurrentChange(val) {
      //选中当前行
      this.details = val
      this.items = val
      // console.log('currentRow', this.details)

    },
    loadTreeFunction() {
      //模块列表树形菜单
      this.$http.post('/api/agentsystem/PostGetModuleList?accountno=0')
        .then(resp => {
          if (resp) {
            const respData = resp.data.Data
            // console.log(respData)
            if (respData) {
              this.moduleList = respData
              console.log(this.moduleList[0].CreateDate)
              // console.log('shijian',this.moduleList.CreateDate)
              if (this.mainMenu && this.mainMenu[2].children) {
                this.menuslist = this.mainMenu[2].children
              }
            }
          }
        }).catch(err => {console.log(err)})
    },

    editForm() {
      this.dialogFormVisible = !this.dialogFormVisible
      this.edit = false
    },
    showRowInfo(row) {
      //双击行现实详情
      this.edit = true
      this.dialogFormVisible = !this.dialogFormVisible
      // this.checkList = row.GrantString
      this.details.ModuleName = row.ModuleName
      this.details.ID = row.ID
      this.details.CreateDate = this.timeFormatSeconds(row.CreateDate)
      this.details.CreateUserName = row.CreateUserName
      // console.log(this.details.moduleName)
    },
    timeFormatSeconds (time) {
      let d = time ? new Date(time) : new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let hours = d.getHours();
      let min = d.getMinutes();
      let seconds = d.getSeconds();
      if (month < 10) month = '0' + month;
      if (day < 10) day = '0' + day;
      if (hours < 0) hours = '0' + hours;
      if (min < 10) min = '0' + min;
      if (seconds < 10) seconds = '0' + seconds;

      return (year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds);
    }
  }

}

</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 16px;
}

.el-dialog {
  .el-form {
    display: flex;
    flex-wrap: wrap;

    .el-form-item {
      width: 50%;
    }

    .permission {
      width: 100%;
      //width: 600px;
      height: 120px;
      border:1px solid red;
      //display: flex;
    }
    .el-checkbox-group{
      border:1px solid green;
      padding: 10px ;
    }
    .desc {
      width: 100%;
      height: 200px;
    }

    .descInput {

    }

  }
}
</style>
