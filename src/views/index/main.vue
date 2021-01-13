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
<template>
    <div class="main-wrapper">
        <div class="menu-wrapper header" :class="{'menu-show': menuShow,'menu-hide': menuHide}">
            <v-menu @sidebarChange="change($event)" :minMenu="show"></v-menu>
        </div>
        <div class="view-wrapper" :class="{'view-show': menuShow,'view-hide': menuHide}">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import sidebar from "./sidebar";
export default {
    name: "mains",
    components: {
        "v-menu": sidebar
    },
    data: function () {
        return {
            menuShow: true,
            menuHide: false,
            loading: false,
        };
    },
    computed: {
        show: function () {
            return this.menuShow;
        }
    },
    mounted() {
        
    },
    methods: {
        change: function (val) {
            this.menuShow = !val;
            this.menuHide = val;
        }
    }
};
</script>
<style scoped>
.header .el-menu {
    height: 100%;
}
.main-wrapper {
    width: 100%;
    background: #f7f7f7;
    height: 100%;
}
.main-wrapper::after {
    display: block;
    content: "";
    clear: both;
}
.menu-wrapper {
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 3;
}
.view-wrapper {
    height: 100%;
    padding-left: 200px;
}
.menu-show {
    width: 200px;
    transition: width 0.5s;
    -moz-transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -o-transition: width 0.5s;
}
.menu-hide {
    /* width: 56px; */
    width: 56px;
    transition: width 0.5s;
    -moz-transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -o-transition: width 2s;
}
.view-show {
    /* padding-left: 200px; */
    width: calc(100% - 200px);
    transition: width 0.5s;
    -moz-transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -o-transition: width 0.5s;
}
.view-hide {
    padding-left: 56px;
    /* width: calc(100% - 56px); */
    transition: width 0.5s;
    -moz-transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -o-transition: width 2s;
}
#shade {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
    /*兼容IE8及以下版本浏览器*/
    filter: alpha(opacity=30);
}

#reset-password {
    position: absolute;
    z-index: 3;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 470px;
    height: 273px;
    margin: auto;
    background-color: #fff;
    padding-top: 15px;
    /* padding-right: 25px; */
}
.reset-password-title {
    margin-bottom: 5px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
}
#add-nodes {
    position: absolute;
    z-index: 3;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 470px;
    height: 140px;
    margin: auto;
    background-color: #fff;
    padding-top: 15px;
}
.add-nodes-title {
    margin-bottom: 5px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
}
.demo-ruleForm {
    padding-right: 25px;
}
</style>
