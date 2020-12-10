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
    <div class="rivate-key-management-wrapper">
        <v-contentHead :headTitle="`历史查询`"></v-contentHead>
        <div class="module-wrapper" style="padding-bottom: 20px;">
            <div class="search-part">
                 <el-form :inline="true" :model="formInline" class="" :rules="rules" ref="ruleForm">
                    <el-form-item label="链" prop="chainId">
                        <el-select v-model="formInline.chainId" placeholder="链" @change="changeChain">
                            <el-option v-for="item in allChainAndGroup" :label="item.chainId" :value="item.chainId" :key="item.chainId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="群组" prop="groupId">
                        <el-select v-model="formInline.groupId" placeholder="群组">
                            <el-option v-for="item in groupList" :label="item" :value="item" :key="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="search-table">
                <el-table :data="list" tooltip-effect="dark" v-loading="loading">
                    <el-table-column v-for="head in privateKeyHead" :label="head.name" :key="head.enName" show-overflow-tooltip :width="head.tdWidth" align="center">
                        <template slot-scope="scope">
                            <span v-if="head.enName ==='reqId'">
                                <i class="el-icon-copy-document font-12" @click="copyPubilcKey(scope.row[head.enName])" title="复制"></i>
                                <span class="link" @click="link(scope.row[head.enName])">
                                    {{scope.row[head.enName]}}
                                </span>
                            </span>
                            <span v-else-if="head.enName ==='reqStatus'">
                                <span>{{scope.row[head.enName] | translateReqStatus}}</span>
                            </span>
                            <span v-else-if="head.enName ==='sourceType'">
                                <span>{{scope.row[head.enName] | translateSourceType}}</span>
                            </span>
                            <span v-else>{{scope.row[head.enName]}}</span>
                        </template>

                    </el-table-column>

                </el-table>
                <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import contentHead from "@/components/contentHead";
import { historyList, getChainAndGroup } from "@/util/api";

export default {
    name: "History",
    components: {
        "v-contentHead": contentHead,
    },
    computed: {
        privateKeyHead() {
            var arr = [
                {
                    enName: "chainId",
                    name: '链ID',
                    tdWidth: '100'
                },
                {
                    enName: "groupId",
                    name: '群组ID',
                    tdWidth: '100'
                },
                {
                    enName: "reqId",
                    name: '请求ID',
                    tdWidth: ''
                },
                {
                    enName: "sourceType",
                    name: '请求类型',
                    tdWidth: '150'
                },
                {
                    enName: "reqStatus",
                    name: "请求结果",
                    tdWidth: "150"
                },
                {
                    enName: "processTime",
                    name: "请求耗时（ms）",
                    tdWidth: "150"
                },
                {
                    enName: "modifyTime",
                    name: "修改时间",
                    tdWidth: "200"
                },
            ]
            return arr
        },
        rules() {
            let data = {
                chainId: [
                    {
                        required: true,
                        message: '请选择链',
                        trigger: "change"
                    },
                ],
                groupId: [
                    {
                        required: true,
                        message: '请选择群组',
                        trigger: "change"
                    },
                ],
            }
            return data
        }
    },
    data() {
        return {
            loading: false,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            list: [],
            allChainAndGroup: [],
            formInline: {
                chainId: '',
                groupId: ''
            },
            groupList: []
        };
    },
    mounted() {
        this.queryChainAndGroup()
        // this.queryHistory()
    },
    methods: {
        queryChainAndGroup() {
            getChainAndGroup()
                .then(res => {
                    this.loading = false
                    const { status, data } = res
                    if (data.code === 0) {
                        this.allChainAndGroup = data.data
                        if (data.data.length > 0) {
                            this.formInline.chainId = data.data[0]['chainId']
                            this.groupList = data.data[0]['groupIdList']
                            if (this.groupList.length > 0) {
                                this.formInline.groupId = data.data[0]['groupIdList'][0]
                            }
                            this.onSubmit('ruleForm')
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: data.message,
                            duration: 2000
                        })
                    }
                })
                .catch(err => {

                })
        },
        queryHistory() {
            let reqData = {
                pageNumber: this.currentPage,
                pageSize: this.pageSize,
                chainId: this.formInline.chainId,
                groupId: this.formInline.groupId
            }
            historyList(reqData)
                .then(res => {
                    this.loading = false
                    const { status, data } = res
                    if (data.code === 0) {
                        this.list = data.data
                        this.total = data.totalCount
                    } else {
                        this.$message({
                            type: 'error',
                            message: data.message,
                            duration: 2000
                        })
                    }
                })
                .catch(err => {

                })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.queryHistory();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.queryHistory();
        },
        link(reqId) {
            this.$router.push({
                path: '/newQuery',
                query: {
                    reqId: reqId
                }
            })
        },
        copyPubilcKey(val) {
            if (!val) {
                this.$message({
                    type: "fail",
                    showClose: true,
                    message: 'key为空，不复制。',
                    duration: 2000
                });
            } else {
                this.$copyText(val).then(e => {
                    this.$message({
                        type: "success",
                        showClose: true,
                        message: '复制成功',
                        duration: 2000
                    });
                });
            }
        },
        changeChain(val) {
            this.allChainAndGroup.forEach(item => {
                if (val == item.chainId) {
                    this.groupList = item.groupIdList
                }
            })
        },
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.queryHistory()
                } else {
                    return false;
                }
            });
        },
    }
};
</script>
<style scoped>

</style>
