<template>
  <el-dialog width="80%"  :visible.sync="showchoose" append-to-body>
 <div class="ico_title">图标选择 <span class="ico_area" v-html="showICO.replace('<span','<span style=\'font-size:35px;\'')"></span></div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="系统默认" name="defaultico">
        <ul>
          <li :class="{'hoverColor':index==hoverIndex}" @mouseover="hoverIndex=index" @mouseout="hoverIndex=-1" v-for='(color,index) in defaultIco.ico' :key="color" @click="chooseico(defaultIco.script,color)">
            <span>
              <i :class="color"></i>
            </span>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="单色图标" name="singlecolorico">
        <ul>
          <li :class="{'hoverColor':index==hoverIndex}" @mouseover="hoverIndex=index" @mouseout="hoverIndex=-1" v-for='(ico,index) in singleColorIco.ico' :key='ico' @click="chooseico(singleColorIco.script,ico)">
            <span :class="ico"></span>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
        <el-button @click="showchoose=false">取 消</el-button>
        <el-button type="danger" @click="sureChoose">确定选择</el-button>
    </div>
  </el-dialog>
</template>
<script>
import ico from '../../assets/iconfont/ico.json'
export default {
  props: ["icoChooseShow","currentICO"],
  data() {
    return {
      activeName: "defaultico",
      showchoose: this.icoChooseShow,
      currentChooseICO:'',
       showICO:'',
      svgColorIco:ico.svgColorIco,
      defaultIco:ico.defaultIco,
      singleColorIco:ico.singleColorIco,
      hoverIndex: -1, //表示当前hover的是第几个li 初始为 -1 或 null 不能为0 0表示第一个li
    };
  },
  created(){
   
  },
  methods: {
    chooseico(scriptVal,val) {
        let getChooseVal=scriptVal.replace('{ico}',val)
        this.currentChooseICO=getChooseVal;
        this.showICO=this.currentChooseICO;
    },
    setVal(){
       this.currentChooseICO=this.currentICO;
       this.showICO=this.currentChooseICO;
    },
    sureChoose(){
      this.$emit("on-result-change",this.showchoose,this.currentChooseICO);
      this.showchoose=false;
    }
  },
  watch: {
    icoChooseShow(val) {
      this.showchoose = val;
    },
    showchoose(val) {
      this.$emit("on-result-change",this.showchoose,this.currentICO);
    }
  }
};
</script>
<style scoped>
ul {
  margin: 0px;
  padding: 0px;
  /* height: 300px; */
}
ul li {
  list-style-type: none;
  width:30px;
  height: 30px;
  line-height: 30px;
  margin-right: 5px;
  float: left;
}

.chooseicon li svg {
  font-size: 28px;
}
i {
  font-size: 28px;
}
ul li span {
  font-size: 26px;
}
.hoverColor{
     width:28px;
  height: 28px;
 background-color:#cccccc;
 border: 1px solid red;
}
.ico_area {
    font-size: 35px;
    line-height: 32px;
    vertical-align: middle;
  }
 .ico_title{
    height:35px;
    line-height:35px;
}
</style>
