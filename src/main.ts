import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './index.css'

import App from './App.vue'

import ForYou from './components/ForYou.vue'
import TopCharts from './components/TopCharts.vue'
import Settings from './components/Settings.vue'
import Home from './components/Home.vue'
import Admin from './components/Admin.vue'
import TopChartsByCountry from './components/TopChartsByCountry.vue'
import Auth from './components/Auth.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/for-you', component: ForYou },
    { path: '/settings', component: Settings },
    { path: '/top-charts', component: TopCharts },
    { path: '/top-charts/:sc', component: TopChartsByCountry },
    { path: '/admin', component: Admin },
    { path: '/auth', component: Auth },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

createApp(App)
    .use(router)
    .mount('#app')
