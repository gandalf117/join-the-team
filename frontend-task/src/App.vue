<template>
  <div id="app">

    <keep-alive>
      <router-view/>
    </keep-alive>

    <footer class="text-center my-5 py-5 border-top">
      <router-link to="/">Home</router-link> |
      <router-link to="/schedule">Schedule</router-link> |
      <router-link to="/summary">Summary</router-link>
    </footer>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: sans-serif;
    width: 90%;
    margin: 30px auto;
  }

  #page {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
  }
</style>
