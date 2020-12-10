/*
 * Copyright 2014-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from '@/util/util'

const main = resolve => require(['@/views/index/main'], resolve);
const newQuery = resolve => require(['@/views/query/query'], resolve);
const history = resolve => require(['@/views/history'], resolve)
const contractSearch = resolve => require(['@/views/contractSearch'], resolve);
const serverInfo = resolve => require(['@/views/serverInfo'], resolve);
const testApiQuery = resolve => require(['@/views/testApiQuery'], resolve);
const testVrfQuery = resolve => require(['@/views/testVrfQuery'], resolve);
Vue.use(Router);
const routes = [
    {
        path: '/',
        redirect: '/history',
    },
    
    {
        path: '/',
        component: main,
        name: '历史查询',
        leaf: true,
        menuShow: true,
        iconCls: 'oracle-chaxun sidebar-icon',
        children: [
            { path: '/history', component: history, name: '历史查询', enName: 'history', menuShow: true, meta: { requireAuth: false } },
        ]
    },
    {
        path: '/',
        component: main,
        name: '请求查询',
        leaf: true,
        menuShow: true,
        iconCls: 'oracle-xiangqing1 sidebar-icon',
        children: [
            { path: '/newQuery', component: newQuery, name: '请求查询', enName: 'newQuery', menuShow: true, meta: { requireAuth: false } },
        ]
    },
    {
        path: '/',
        component: main,
        name: '合约查询',
        leaf: true,
        menuShow: true,
        iconCls: 'oracle-heyue sidebar-icon',
        children: [
            { path: '/contractSearch', component: contractSearch, name: '合约查询', enName: 'contractSearch', menuShow: true, meta: { requireAuth: false } }
        ]
    },
    {
        path: '/',
        component: main,
        name: 'Oracle服务方列表',
        leaf: true,
        menuShow: true,
        iconCls: 'oracle-wangluo sidebar-icon',
        children: [
            { path: '/serverInfo', component: serverInfo, name: 'Oracle服务方列表', enName: 'serverInfo', menuShow: true, meta: { requireAuth: false } }
        ]
    },
    // {
    //     path: '/',
    //     component: main,
    //     name: '测试请求',
    //     leaf: false,
    //     menuShow: true,
    //     iconCls: 'wbs-icon-group sidebar-icon',
    //     children: [
    //         { path: '/testApiQuery', component: testApiQuery, name: 'API', enName: 'testApiQuery', menuShow: true, meta: { requireAuth: false } },
    //         { path: '/testVrfQuery', component: testVrfQuery, name: 'VRF', enName: 'testVrfQuery', menuShow: true, meta: { requireAuth: false } },
    //     ]
    // },
]
const router = new Router({
    routes
});
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router
