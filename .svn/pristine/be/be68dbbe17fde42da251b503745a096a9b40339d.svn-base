import Vue from 'vue'


function formatdate(date)
{
    var dateTmp = eval('new ' + date.substr(1, date.length - 2)).toJSON(); //new Date()
    return new Date(+new Date(dateTmp) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

function getNowFormatDate()
{
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate+" 00:00:00";
  return currentdate;
}

export default{
  install(Vue,options){
    Vue.prototype.myFormatDate=formatdate;
    Vue.prototype.getNowFormatDate=getNowFormatDate;
  }
}