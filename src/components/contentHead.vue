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
    <div class="content-head-wrapper">
        <div class="content-head-title">
            <span class="content-head-icon" v-if="icon" @click="skip">
                <i class="wbs-icon-back"></i>
            </span>
            <span :class="{ 'font-color-333': headSubTitle}">{{title}}</span>
            <span v-show="headSubTitle" class="font-color-333">/</span>
            <span style="color: #979898">{{headSubTitle}}</span>
        </div>
        <!-- <div class="content-head-lang">
            <lang-select class="right-menu-item hover-effect" />
        </div> -->
    </div>
</template>

<script>
import router from "@/router";
import LangSelect from './LangSelect'
import {
    queryGroup,
    queryClientVersion
} from "@/util/api";
import { delCookie } from "@/util/util";
export default {
    name: "conetnt-head",
    props: ["headTitle", "icon", "route", "headSubTitle"],
    components: {
        LangSelect
    },
    watch: {
        headTitle: function (val) {
            this.title = val;
        }
    },
    data: function () {
        return {
            title: this.headTitle,
            headIcon: this.icon || false,
            way: this.route || "",
            path: "",
            group: localStorage.getItem('groupId') ? localStorage.getItem('groupId') : "1",
            groupName: localStorage.getItem('groupName') ? localStorage.getItem('groupName') : "group1",
            groupVisible: false,
            groupList: localStorage.getItem("cluster")
                ? JSON.parse(localStorage.getItem("cluster"))
                : [],
            version: localStorage.getItem('fisco-bcos-version') ? localStorage.getItem('fisco-bcos-version') : ""
        };
    },
    mounted: function () {
        if (localStorage.getItem("groupId")) {
            this.group = localStorage.getItem("groupId");
        }
        if (this.$route.path == "/home") {
            // this.getGroup();
            // this.getClientVersion();
        }
    },
    methods: {
        getClientVersion: function () {
            queryClientVersion(this.group)
                .then(res => {
                    const { data, status } = res;
                    if (status === 200) {
                        this.version = data['FISCO-BCOS Version'];
                        localStorage.setItem('fisco-bcos-version', this.version)
                    } else {
                        this.$message({
                            type: "error",
                            message: this.$chooseLang(res.data.code)
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                        type: "error",
                        message: this.$t('text.systemError')
                    });
                });
        },
        getGroup: function (callback) {
            queryGroup()
                .then(res => {
                    const { data, status } = res;
                    if (status === 200) {
                        let arr = data.sort(),
                            list = [];
                        for (let i = 0; i < arr.length; i++) {
                            list.push({
                                group: arr[i],
                                groupName: `group${arr[i]}`
                            });
                        }
                        this.groupList = list;
                        localStorage.setItem('groupId', this.group);
                        localStorage.setItem("cluster", JSON.stringify(list));
                        callback()
                    } else {
                        this.$message({
                            type: "error",
                            message: this.$chooseLang(res.data.code)
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                        type: "error",
                        message: this.$t('text.systemError')
                    });
                });
        },
        skip: function () {
            if (this.route) {
                router.push(this.way);
            } else {
                this.$router.go(-1);
            }
        },
        changeGroup: function (val) {
            this.group = val.group;
            this.groupName = val.groupName;
            this.path = this.$route.path;
            localStorage.setItem('groupId', this.group);
            localStorage.setItem("groupName", this.groupName);
            this.$emit("changeGroup", this.group);
            this.getClientVersion();
        },
    }
};
</script>
<style scoped>
.content-head-wrapper {
    width: calc(100%);
    background-color: #181f2e;
    text-align: left;
    line-height: 54px;
    position: relative;
}
.content-head-wrapper::after {
    display: block;
    content: "";
    clear: both;
}
.content-head-icon {
    color: #fff;
    font-weight: bold;
    cursor: pointer;
}
.content-head-title {
    margin-left: 40px;
    display: inline-block;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
}
.content-head-network {
    float: right;
    padding-right: 10px;
    position: relative;
}
.content-head-version {
    color: #bbb;
}
.content-head-version-data {
    display: inline-block;
    padding-right: 10px;
}
.browse-user {
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    cursor: pointer;
    color: #cfd7db;
}
.sign-out-wrapper {
    line-height: 32px;
    text-align: center;
}
.sign-out {
    cursor: pointer;
    color: #ed5454;
}
.change-password {
    color: #0db1c1;
    cursor: pointer;
}
.network-name {
    font-size: 12px;
    color: #9da2ab;
    padding: 3px 0px;
    /* border-right: 2px solid #e7ebf0; */
    margin-right: 16px;
}
.select-network {
    color: #2d5f9e;
    cursor: default;
}
.content-head-network-link {
    text-decoration: none;
    outline: none;
    color: #cfd7db;
    padding-right: 15px;
    border-right: 1px solid #657d95;
    margin-right: 15px;
}
.contant-head-name {
    position: relative;
    cursor: pointer;
}
.contant-head-name ul {
    position: absolute;
    width: 150%;
    left: -10px;
    top: 35px;
    background-color: #fff;
    color: #666;
    text-align: center;
    z-index: 9999999;
    box-shadow: 1px 4px 4px;
}
.contant-head-name ul li {
    width: 100%;
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
}
.group-item {
    line-height: 32px;
    text-align: center;
    max-height: 200px;
    overflow-y: auto;
    position: relative;
}
.group-item-list {
    cursor: pointer;
}
.group-item-list:hover {
    color: #0db1c1;
}
.right-menu-item {
    padding: 0 20px;
}
.hover-effect {
    cursor: pointer;
    /* transition: background 0.3s; */
}
.content-head-lang {
    position: absolute;
    /* background-color: #fff; */
    right: 350px;
    top: 0px;
}
.version-item {
    line-height: 22px;
}
</style>
