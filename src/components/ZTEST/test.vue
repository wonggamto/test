<template>
  <div style="width:500px; margin:50px auto;">
    <table>
      <tr v-for="(item,index) in timeline" :key="index">
        <td>{{item}}</td>
        <td :style="{background:isInOrNot(item)}">{{isInOrNot(item)}}</td>
      </tr>
    </table>
  </div>
  <!-- <table>
      <tr>
        <td>08:30</td>
        <td></td>
      </tr>
      <tr>
        <td>09:00</td>
        <td></td>
      </tr>
      <tr>
        <td>09:30</td>
        <td></td>
      </tr>
         <tr>
        <td>10:00</td>
        <td></td>
      </tr>
      <tr>
        <td>10:30</td>
        <td></td>
      </tr>
         <tr>
        <td>11:00</td>
        <td></td>
      </tr>
      <tr>
        <td>11:30</td>
        <td></td>
      </tr>
         <tr>
        <td>12:00</td>
        <td></td>
      </tr>
    </table> -->
</template>


<script>
export default {
    data(){
        return {
            data:[
                {"workorder":"GD01","color":"#cdcdcd","procedure":"GXXX","begintime":"08:30","holdtime":60},
                {"workorder":"GD02","color":"#cdcdcd","procedure":"GXXX","begintime":"11:30","holdtime":30}
            ],
            timeline:["08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00"],
            currentBeginTime:''
        }
    },
    mounted(){
        this.loadData();
    },
    methods:{
        loadData(){
           let test= this.$moment().add(7,'d');
         
        },
        isInOrNot(val){
            var findobj=this.data.find((item)=>{
              return item.begintime==val
            });
           if(findobj===null||typeof findobj==="undefined"){
                if(this.currentBeginTime){
                   let test= this.$moment(new Date(this.currentBeginTime));
                  
                }
                return "";
           }
           else{
                this.currentBeginTime=findobj.begintime;
                return findobj.color;
           }

        }
    }
};
</script>
