import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import {
  Message
} from 'element-ui'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    message: '',
    cookie: sessionStorage.getItem('cookie') || '',
    nickname: sessionStorage.getItem('nickname') || '',
    avatarUrl: sessionStorage.getItem('avatarUrl') || '',
    userId: sessionStorage.getItem('userId') || '',
    searchValue: '',
    songList: [],
    openPage: 0,
    songDetail: [],
    banner: true,
    musicSheetDetailId: 0,
    mvID: 0
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, data) {
      state.status = 'success';
      state.message = '登录成功';
      state.userId = data.userId;
      state.nickname = data.nickname;
      state.avatarUrl = data.avatarUrl;
      state.cookie = data.cookie;
    },
    auth_error(state) {
      state.status = 'error';
      state.message = "登录失败";
    },
    logout(state) {
      state.status = 'null';
      state.message = '';
      state.userId = '';
      state.nickname = '';
      state.avatarUrl = '';
      state.cookie = '';
    },
    Search(state, data) {
      state.searchValue = data.searchValue;
    },
    playsong(state, data) {
      state.songList = [];
      state.songList.push(data.song);
    },
    playsongs(state, data) {
      state.songList = [];
      state.songList.push(data.songs);
    },
    Open(state, data) {
      state.openPage = data.openPage.openPage;
    },
    GetsongDetail(state, data) {
      state.songDetail = data.list;
    },
    changeBanner(state, data) {
      state.banner = data.data.open;
    },
    MusicSheetDetailId(state, data) {
      state.musicSheetDetailId = data;
    },
    getMvID(state, data) {
      state.mvID = data;
    },
  },
  actions: {
    Login({
      commit
    }, user) {
      // let that = this;
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post("http://localhost:3000/" + "login/cellphone", user)
          .then(res => {
            if (res.data.code === 200) {
              const avatarUrl = res.data.profile.avatarUrl;
              const nickname = res.data.profile.nickname;
              const userId = res.data.profile.userId;
              const cookie = res.data.cookie;
              sessionStorage.setItem('avatarUrl', avatarUrl);
              sessionStorage.setItem('nickname', nickname);
              sessionStorage.setItem('userId', userId);
              sessionStorage.setItem('cookie', cookie);
              commit('auth_success', {
                avatarUrl,
                nickname,
                userId,
                cookie
              })
              resolve(res);
              router.replace({
                path: '/'
              });
            } else if (res.data.code === 502) {
              Message({
                message: '密码错误',
                type: 'error',
                duration: 800,
              })
            } else {
              // const token = res.data[0].senddata[0].token;
              // const id = res.data[0].senddata[0].id;
              // const user = res.data[0].senddata[0].username;
              // localStorage.setItem('token', token)
              // localStorage.setItem('id', id)
              // localStorage.setItem('user', user)
              // 每次请求接口时，需要在headers添加对应的Token验证
              // Vue.axios.defaults.headers.common['Authorization'] = token
              // 更新token
              // commit('auth_success', {
              //   token,
              //   user
              // })
              // resolve(res)
            }
          })
          .catch(err => {
            // commit('auth_error', {message})
            sessionStorage.removeItem('cookie');
            reject(err)
          })
      })
    },
    QRLogin({
      commit
    }, cookie) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.get("http://localhost:3000/" + "login/status", {
            params: {
              cookie: cookie
            }
          })
          .then(res => {
            if (res.data.data.code === 200) {
              const avatarUrl = res.data.data.profile.avatarUrl;
              const nickname = res.data.data.profile.nickname;
              const userId = res.data.data.profile.userId;
              const cookies = cookie;
              sessionStorage.setItem('avatarUrl', avatarUrl);
              sessionStorage.setItem('nickname', nickname);
              sessionStorage.setItem('userId', userId);
              sessionStorage.setItem('cookie', cookies);
              commit('auth_success', {
                avatarUrl,
                nickname,
                userId,
                cookie
              })
              resolve(res);
              router.replace({
                path: '/'
              });
            } else if (res.data.data.code === 502) {
              // Message({
              //   message: '密码错误',
              //   type: 'error',
              //   duration: 800,
              // })
            } else {
              // const token = res.data[0].senddata[0].token;
              // const id = res.data[0].senddata[0].id;
              // const user = res.data[0].senddata[0].username;
              // localStorage.setItem('token', token)
              // localStorage.setItem('id', id)
              // localStorage.setItem('user', user)
              // 每次请求接口时，需要在headers添加对应的Token验证
              // Vue.axios.defaults.headers.common['Authorization'] = token
              // 更新token
              // commit('auth_success', {
              //   token,
              //   user
              // })
              // resolve(res)
            }
          })
          .catch(err => {
            // commit('auth_error', {message})
            sessionStorage.removeItem('cookie');
            reject(err)
          })
      })
    },
    LogOut({
      commit,
    }) {
      axios.get("http://localhost:3000" + "/logout").then(res => {
        if (res.data.code === 200) {
          Message({
            message: '退出成功',
            type: 'success',
            duration: 800,
          })
          sessionStorage.removeItem('avatarUrl');
          sessionStorage.removeItem('nickname');
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('cookie');
          commit('logout')

        }
      })
    },
    Search({
        commit
      },
      searchValue
    ) {
      commit('Search', {
        searchValue
      })
    },
    Playsong({
        commit
      },
      song
    ) {
      commit('playsong', {
        song
      })
    },
    Playsongs({
        commit
      },
      songs
    ) {
      commit('playsongs', {
        songs
      })
    },
    Open({
        commit
      },
      openPage
    ) {
      commit('Open', {
        openPage
      })
    },
    GetsongDetail({
        commit
      },
      list
    ) {
      commit('GetsongDetail', {
        list
      })
    },
    changeBanner({
        commit
      },
      data
    ) {
      commit('changeBanner', {
        data
      })
    },
  },
  modules: {},
  getters: {}
})