<template>
    <ContentField>
          <div class = "row justify-content-md-center">
            <div class = "col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input  v-model="password"    type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class = "error_message">{{ error_message }}</div>   
                    <button type="submit" class="btn btn-primary">提交</button>
                </form>   
            </div>
          </div>
    </ContentField>
</template>
    


<script>
import ContentField from "../../../components/ContentField.vue"
import {ref} from 'vue' //所有的变量
import { useStore } from "vuex"; 
import router from "../../../router/index";

  export default{
    components:{
        ContentField,
    },
    setup(){ 
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_message = ref('');
        const login = () =>{
            error_message.value = ''; //每次输入前都需要清空
            store.dispatch("login",{
                username:username.value,
                password:password.value,
                success(){
                    store.dispatch("getinfo",{
                        success(){
                            router.push({name:'home'});
                            console.log(store.state.user);
                        }
                    })
                },
                error(){
                    error_message.value = "用户名或密码错误";
                }
                
            })
        }
        return {
            username,
            password,
            error_message,
            login,
        }
    }
  }
</script>
    
<style scoped>
div.error_message{
    color: rgb(0, 140, 255);;
}

button{
     text-align: center;
     width: 100%;;
}

</style>