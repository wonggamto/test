<template>
  <div class="login_main" :style="`height:${clientHeight}px`">
    <div class="login_sp">

    </div>
    <el-form
      :model="form"
      class="login"
      :rules="rules"
    >
      <el-form-item
        label=""
        label-width="80px"
        label-color="#ffffff">
        <h1>LOGIN</h1>
      </el-form-item>
      <el-form-item class="forlabel"
                    label="用户名"
                    label-width="80px">
        <el-input
          style="width:100%" placeholder="请输入用户名"
          v-model="form.username" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        label-width="80px"
      >
        <el-input
          style="width:100%"
          placeholder="请输入密码"
          v-model="form.password"
          type="password"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align:right;"
                    label=""
                    label-width="60px"
      >
        <el-button :loading="loginloading" @click="login" style="width:100%;" type="primary">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  mounted() {

    this.clientHeight = `${document.documentElement.clientHeight}`;
  },
  data() {
    return {
      clientHeight: '',
      loginloading: false,
      form: {
        username: "admin",
        password: "123456.222",
        code: '12'
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {

    async login() {
      this.loginloading = true;
      let formValue = new FormData()
      formValue.append("username", this.form.username)
      formValue.append("password", this.form.password)
      formValue.append("code", this.form.code)
      console.log('登录')
      this.$http.post('/api/agentsystem/CheckLogin?username=admin&password=123456.222&code=12', formValue)
        .then(
          res => {
            console.log(res)
            window.location.href = '/'
          }).catch(err => {console.log(err)})
      // if(this.form.username&&this.form.password){
      //   var formvalue=new FormData();
      //   formvalue.append("username",this.form.username);
      //   formvalue.append("password",this.form.password);
      //   formvalue.append("code",this.form.code)
      //   this.$http.post('/api/agentsystem/CheckLogin?username=admin&password=123456.222&code=12',formvalue,
      //   {
      //       header:{
      //           'Content-Type':'application/x-www-form-urlencoded'
      //       }
      //   }).then(res=>{
      //       let backData=res.data;
      //       if(backData.Result)
      //       {
      //           //set token
      //           let access_token=backData.Data.access_token;
      //           this.$store.commit('set_token',access_token);
      //           //decode token
      //           let jwtDecode = require('jwt-decode');
      //           var decoded = jwtDecode(access_token);
      //           let userid=decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
      //           let username=decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      //           let unitcodepath=decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid'];
      //           let unitnamepath=decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
      //           let authdata=decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'];
      //           console.log('authdata:',authdata);
      //           let userInfo={userid,username,unitcodepath,unitnamepath,authdata};
      //           this.$store.commit('save_detail_info',userInfo);
      //           let url = decodeURIComponent(this.$route.query.redirect || '/home');
      //           //this.$router.push({path: decodeURIComponent(url)});
      //           this.$router.replace(url)
      //           this.$router.go(-1)
      //           // this.$nextTick(()=>{
      //           //       this.$router.replace(url)
      //           // })
      //       }else
      //       {
      //           this.$message({
      //               message: backData.Error,
      //               type: 'error',
      //               showClose: true
      //             });
      //       }
      //       this.loginloading=false;
      //   }).catch(err=>{
      //         this.$message({
      //               message:'网络连接失败，请检查数据库连接是否正常!',
      //               type: 'error',
      //               showClose: true
      //             });
      //         this.loginloading=false;
      //   });
      // }
    }
  }
};
</script>
<style scoped>
.login_sp {
  height: 20%;
  clear: both;
}

.login_main {
  margin: 0px;
  padding: 0px 0px 0px;
  opacity: 1;
  background: url(../../assets/loginmain.gif);
  background-size: 100% 100%;
}

.login {
  opacity: 0.85;
  box-shadow: 2px 1px 2px #cccccc;
  border-radius: 3px;
  background-color: azure;
  width: 330px;
  margin: 0px auto 0px;
  /* border: 1px solid #cdcdcd; */
  padding: 30px 50px;
}

</style>

