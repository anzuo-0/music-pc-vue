import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index',
    component: Index,
    children: [{
        path: '/index',
        name: 'home',
        component: Main,
      }, {
        path: '/search/:searchValue',
        name: 'search',
        component: () => import( /* webpackChunkName: "search" */ '../views/SearchPage.vue')
      }, {
        path: '/persondata',
        name: 'persondata',
        component: () => import( /* webpackChunkName: "persondata" */ '../views/PersonData.vue')
      }, {
        path: '/top_music_detail',
        name: 'top_music_detail',
        component: () => import( /* webpackChunkName: "top_music_detail" */ '../components/TopMusicDetail.vue')
      }, {
        path: '/musicSheet_detail',
        name: 'musicSheet_detail',
        component: () => import( /* webpackChunkName: "musicSheet_detail" */ '../components/MusicSheetDetail/MusicSheetDetail.vue'),
        children: [{
            path: "/musicSheet_detail/MusicSheetList",
            name: "/musicSheet_detail/MusicSheetList",
            component: () => import( /* webpackChunkName: "musicSheet_detail/MusicSheetList" */ '../components/MusicSheetDetail/MusicSheetDetail_Coms/MusicSheetList.vue'),
          },
          {
            path: "/musicSheet_detail/Comment",
            name: "/musicSheet_detail/Comment",
            component: () => import( /* webpackChunkName: "/musicSheet_detail/Comment/MusicSheetList" */ '../components/MusicSheetDetail/MusicSheetDetail_Coms/Comment.vue'),
          },
          {
            path: "/musicSheet_detail/Collector",
            name: "/musicSheet_detail/Collector",
            component: () => import( /* webpackChunkName: "/musicSheet_detail/Collector" */ '../components/MusicSheetDetail/MusicSheetDetail_Coms/Collector.vue'),
          }

        ]
      },
      {
        path: '/top_music',
        name: 'top_music',
        component: () => import( /* webpackChunkName: "top_music" */ '../views/TopPage.vue'),
      },
      {
        path: '/mvDetail',
        name: 'mvDetail',
        component: () => import( /* webpackChunkName: "mvDetail" */ '../components/MvDetail/MvDetail.vue')

      },
      {
        path: '/myLikeMusic',
        name: 'myLikeMusic',
        component: () => import( /* webpackChunkName: "myLikeMusic" */ '../views/MyLikeMusic.vue'),
      }, {
        path: '/rePlay',
        name: 'rePlay',
        component: () => import( /* webpackChunkName: "rePlay" */ '../views/RePlay.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/LoginPage.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router