<template>
<div>

  <div class="ico_area" v-html="showICO.replace('<span','<span style=\'font-size:35px;\'')">请选择图标</div>
  <div class="ico_area_string"> <el-input v-model="showICO" placeholder="请输入内容"></el-input></div>
  <div style="clear:both;"></div>
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
      <el-tab-pane label="多色图标" name="colorico">
        <ul class="chooseicon">
          <li :class="{'hoverColor':index==hoverIndex}" @mouseover="hoverIndex=index" @mouseout="hoverIndex=-1" v-for='(color,index) in svgColorIco.ico' :key="color" @click="chooseico(svgColorIco.script,color)">
            <svg class="icon svg-icon" aria-hidden="true">
              <use :xlink:href="color"></use>
            </svg>
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
      <el-tab-pane label="FontAwesome">
       <ul>
          <li :class="{'hoverColor':index==hoverIndex}" @mouseover="hoverIndex=index" @mouseout="hoverIndex=-1" v-for='(ico,index) in fontawesomeWeb.ico' :key='index' @click="chooseico(fontawesomeWeb.script,ico)">
            <span :class="ico"></span>
          </li>
        </ul>
      </el-tab-pane>
        <el-tab-pane label="FontAwesome其他">
       <ul>
          <li :class="{'hoverColor':index==hoverIndex}" @mouseover="hoverIndex=index" @mouseout="hoverIndex=-1" v-for='(ico,index) in fontawesomeOther.ico' :key='index' @click="chooseico(fontawesomeOther.script,ico)">
            <span :class="ico"></span>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import ico from '../../assets/iconfont/ico.json'
export default {
  data() {
    return {
      activeName: "defaultico",
      showICO:'<i class="el-icon-picture-outline"></i>',
      svgColorIco:ico.svgColorIco,
      defaultIco:ico.defaultIco,
      singleColorIco:ico.singleColorIco,
      fontawesomeWeb:ico.fontawesomeWeb,
      fontawesomeOther:ico.fontawesomeOther,
      hoverIndex: -1, //表示当前hover的是第几个li 初始为 -1 或 null 不能为0 0表示第一个li
    };
  },
  methods: {
    chooseico(scriptVal,val) {
        let getChooseVal=scriptVal.replace('{ico}',val)
        this.showICO=getChooseVal
    }
  }
};
</script>
<style scoped>
h4{
  width:100%;
  margin:0px;
  padding:10px 0px;
  text-align: center;
}
ul {
  margin: 0px;
  padding: 0px;
  /*height: 300px;*/
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
    padding: 5px;
    height: 45px;
    line-height: 35px;
    vertical-align: middle;
    font-size: 35px;
     float: left;
     width:50px;
  }
.ico_area_string{
    padding: 5px;
    height: 45px;
    line-height: 35px;
    vertical-align: middle;
    float: left;
     width:650px;
}
</style>

