<template>
  <div id="app">
    <bottom-nav></bottom-nav>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <player></player>
  </div>
</template>

<script>
  import BottomNav from 'components/bottom-nav/bottom-nav';
  import Player from 'components/player/player';
  import {mapMutations, mapGetters} from 'vuex';
  import {SET_USER_TOKEN, SET_USER_INFO} from 'store/mutation-types';
  import {authToken} from 'api/login';

  export default {
    created() {
      // 如果有token，验证是否有效
      if (this.userToken) {
        authToken().then(res => {
          if (res.code == 200) {
            this.setUserInfo(res.data);
          }
        }).catch(err => {
          // 如果token无效或者过期，清理本地localStrage和修改state
          localStorage.removeItem('token');
          this.setUserToken(null);
        });
      }
    },
    methods: {
      ...mapMutations({
        setUserToken: SET_USER_TOKEN,
        setUserInfo: SET_USER_INFO,
      })
    },
    computed: {
      ...mapGetters(['userToken'])
    },
    components: {
      BottomNav,
      Player
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet">
</style>