<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="/">King of Bots</a>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <router-link class="nav-link" active-class="active" :to="{ name: 'pk_index' }">匹配对战</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" active-class="active" :to="{ name: 'record_index' }">对战列表</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" active-class="active" :to="{ name: 'ranklist_index' }">排行榜</router-link>
        </li>
      </ul>
      <div class="navbar-nav">
         <li class="nav-item dropdown">
             <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Ale
            </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li> <router-link class="nav-link" active-class="active" :to="{ name: 'user_bot_index' }">my bot</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">退出</a></li>
          </ul>
        </li>
    </div>  
    </div>
  </div>
</nav>
</template>

<script>

</script>

<style scoped>
/*scoped加入后只能影响目前的组件，不会影响全局 */

</style>