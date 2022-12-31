<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from "./components/NavBar.vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import $ from "jquery"

export default{
 components:{
  NavBar
 },
 setup(){
    $.ajax({
      url:"http://localhost:3000/user/account/token/",
      type:"post",
      data:{
        username:"ale",
        password:"pale"
      },
      success(resp){
        console.log(resp)
      },
      error(resp){
        console.log(resp)
      }
    }
    );

    $.ajax({ 
    url:"http://localhost:3000/user/account/info/",
    type:"get",
    headers:{
      Authorization:"Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNzY2MjViYTkwMDI0ODk2ODFiZTE1MjUyYzQxMGMxYSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY3MjMwODEyMywiZXhwIjoxNjczNTE3NzIzfQ.k9jb2MfXZdGWbQTEsW-TYUPsrr5XpZCnlnL9lkXnIDI",
    },
    success(resp){
        console.log(resp)
      },
      error(resp){
        console.log(resp)
      }
    }
    );
    $.ajax({ 
    url:"http://localhost:3000/user/account/register/",  
    type:"post",
    data:{
      username:"yxc",
      password:"123",
      confirmedPassword:"123"
    },
    success(resp){
      console.log(resp);
    },  
    error(resp){
      console.log(resp);
    }
    });

 }
}
</script>

<style>
  body{
    background-image: url("assets/images/a.jpg");
    background-size: cover;
      }
</style>
