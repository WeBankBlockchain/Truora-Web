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
    <div style="height: 100%;">
        <div style="height: 100%;background-color: #0c1220;box-sizing: border-box" class="sidebar-content" ref='sidebarContent'>
            <div class="image-flex justify-center center" style="height: 54px;position:relative;" v-if="menuShowC">
                <!-- <img :src="maxLog" alt="" style="width:120px"> -->
                <span class="font-color-fff" style="font-weight: bold;font-size: 24px;">TrustOracle</span>
                <!-- <span class="sidebar-contract-icon">
                    <i class="el-icon-caret-left font-color-aeb1b5" @click="hideMune(true)" style="font-size: 18px;"></i>
                </span> -->
            </div>
            <div class="mini-sidebar-contract-icon" v-if="!menuShowC" style="padding-bottom:40px">
                <i class="el-icon-caret-right font-color-aeb1b5" @click="hideMune(false)" style="font-size: 18px;"></i>
            </div>
            <el-menu default-active="999" router class="el-menu-vertical-demo" text-color="#9da2ab" active-text-color="#1f83e7" active-background-color="#1e293e" background-color="#0c1220" @select="select" :collapse="!menuShowC" @open="handleOpen" @close="handleClose">
                <template v-for="(item,index) in routesListC" v-if="item.menuShow">
                    <el-submenu v-if="!item.leaf" :index="`${index}`" ref="ele" class="">
                        <template slot="title">
                            <div :style="{'padding-left':  menuShowC ? '13px':''}">
                                <i :class="item.iconCls" :style="{'color': activeIndex == index ? '#1f83e7':''}"></i>
                                <span :class="{'font-color-1f83e7': activeIndex == index}">{{item.name}}</span>
                            </div>
                        </template>

                        <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow" style="padding-left: 58px" :style="{'border-left':term.path == activeRoute ? '3px solid #1f83e7': '',
                                    'padding-left':term.path == activeRoute ? '55px': '58px',
                                    'background-color':term.path == activeRoute ? '#1e293e': '#0c1220',}">
                            <span>{{term.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" :style="{'border-left':item.children[0].path == activeRoute ? '3px solid #1f83e7': '',
                                'padding-left':item.children[0].path == activeRoute ? '30px': '33px',
                                'background-color':item.children[0].path == activeRoute ? '#1e293e': '#0c1220',}">
                        <i :class="item.iconCls"></i>
                        <span slot="title">{{item.children[0].name}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import {
    queryGroup,
    queryClientVersion
} from "@/util/api";
import Bus from "@/bus"
export default {
    name: "sidebar",
    props: ["minMenu"],
    data() {
        return {
            activeIndex: 0,
            activeRoute: "",
            routesList: [],
            buttomNone: true,
        };
    },
    computed: {
        menuShowC() {
            if (this.minMenu) {
                return this.minMenu;
            } else {
                return false;
            }
        },
        routesListC() {
            var list = this.routesList
            list.forEach((item => {
                switch (item.enName) {
                    case 'contractManagement':
                        item.name = this.$t('route.contractManagement')
                        break;
                    case 'systemMonitoring':
                        item.name = this.$t('route.systemMonitoring')
                        break;

                }
                if (item.children) {
                    item.children.forEach((it) => {
                        switch (it.enName) {
                            case 'statistics':
                                it.name = this.$t('route.statistics')
                                break;
                            case 'nodeManagement':
                                it.name = this.$t('route.nodeManagement')
                                break;
                            case 'contractIDE':
                                it.name = this.$t('route.contractIDE')
                                break;
                            case 'contractList':
                                it.name = this.$t('route.contractList')
                                break;
                            case 'hostMetrics':
                                it.name = this.$t('route.hostMetrics')
                                break;
                            case 'nodeMetrics':
                                it.name = this.$t('route.nodeMetrics')
                                break;
                            case 'privateKeyManagement':
                                it.name = this.$t('route.privateKeyManagement')
                                break;
                        }
                    })
                }

            }))
            return list;
        }
    },
    mounted() {
        this.$nextTick(function () {
            localStorage.setItem("sidebarHide", false);
            this.changeRouter();
            if (this.$refs.sidebarContent.offsetHeight > document.body.clientHeight) {
                this.buttomNone = false
            } else {
                this.buttomNone = true
            }
        });
        let _this = this
        window.onresize = () => {
            return (() => {
                if (_this.$refs.sidebarContent.offsetHeight > document.body.clientHeight) {
                    _this.buttomNone = false
                } else {
                    _this.buttomNone = true
                }
            })()
        }
    },
    methods: {
        changeRouter() {
            let list = this.$router.options.routes;

            list.forEach(item => {
                if (item.name === "帐号管理") {
                    item.menuShow = false;
                }
            });
            list.forEach(item => {
                if (this.userRole === "admin" && item.name === "帐号管理") {
                    item.menuShow = true;
                }
            });
            this.routesList = list;
        },
        select(index, indexPath) {
            this.activeIndex = indexPath[0];
            this.activeRoute = index;
        },
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        },
        hideMune(val) {
            this.$emit("sidebarChange", val);
            if (this.menuShow) {
                this.menuShow = false;
            } else {
                this.menuShow = true;
            }
            if (this.$route.path === "contract" && val) {
                localStorage.setItem("sidebarHide", true);
            } else {
                localStorage.setItem("sidebarHide", false);
            }
        }
    }
};
</script>

<style scoped>
.el-menu-vertical-demo {
    /* padding-top: 31px; */
    border: none;
}
.el-menu-vertical-demo >>> .el-menu-item {
    font-size: 14px;
    color: #9da2ab;
    text-align: left;
}
.el-menu-vertical-demo >>> .el-submenu__title {
    padding-left: 33px;
}
.el-menu-item-group > ul > .el-menu-item {
    font-size: 14px;
    color: #9da2ab;
    text-align: left;
    padding-left: 57px !important;
    height: 46px;
    line-height: 46px;
}
.sidebar-content{
    position: relative;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    
}
.sidebar-content ::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.sidebar-version{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 30px;
    color: rgba(256,256,256,0.1);
    z-index: 9999;
    background-color: #0c1220;
    box-sizing: border-box;
}
.sidebar-version-item {
    line-height: 22px;
}
.sidebar-content >>> .el-menu--collapse {
    width: 56px;
}
.sidebar-content >>> .el-menu--collapse .is-active .el-tooltip {
    padding-left: 17px !important;
    background-color: #1e293e;
}
.mini-sidebar-contract-icon {
    position: relative;
    text-align: center;
}
.mini-sidebar-contract-icon i {
    position: absolute;
    top: 20px;
    right: 10px;
    z-index: 9999;
    cursor: pointer;
}

.image-flex {
    display: -webkit-box !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.image-flex,
.image-flex *,
.image-flex :after,
.image-flex :before {
}
.image-flex.justify-center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.image-flex.center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.sidebar-icon {
    font-size: 15px;
    padding-right: 5px;
}
.sidebar-contract-icon {
    position: absolute;
    display: inline-block;
    left: 180px;
    top: 18px;
    font-size: 12px;
    letter-spacing: 0;
    text-align: right;
    cursor: pointer;
    z-index: 6666;
}
.sidebar-contract-icon i {
    cursor: pointer;
}
</style>
