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
        <v-contentHead :headTitle="`合约查询`"></v-contentHead>
        <div class="module-wrapper" style="padding-bottom: 20px;">
            <div class="search-part">

            </div>
            <div class="search-table">
                <el-table :data="list" tooltip-effect="dark" v-loading="loading">
                    <el-table-column v-for="head in privateKeyHead" :label="head.name" :key="head.enName" show-overflow-tooltip :width="head.tdWidth" align="center">
                        <template slot-scope="scope">
                            <span v-if="head.enName ==='oracleCoreContractAddress'">
                                <i class="wbs-icon-copy font-12 copy-public-key" @click="copyPubilcKey(scope.row[head.enName])" title="复制"></i>
                                <span>
                                    {{scope.row[head.enName]}}
                                </span>
                            </span>
                            <span v-else-if="head.enName ==='vrfContractAddress'">
                                <i class="wbs-icon-copy font-12 copy-public-key" @click="copyPubilcKey(scope.row[head.enName])" title="复制"></i>
                                <span>{{scope.row[head.enName]}}</span>
                            </span>
                            <span v-else>{{scope.row[head.enName]}}</span>
                        </template>

                    </el-table-column>

                </el-table>
                <!-- <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination> -->
            </div>
        </div>
    </div>
</template>


<script>
import contentHead from "@/components/contentHead";
import { getAddress } from "@/util/api";

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
                    name: '链编号',
                    tdWidth: '100'
                },
                {
                    enName: "group",
                    name: '群组编号',
                    tdWidth: '100'
                },
                {
                    enName: "oracleCoreContractAddress",
                    name: "OracleCore合约地址",
                    tdWidth: ""
                },
                {
                    enName: "vrfContractAddress",
                    name: "VRF合约地址",
                    tdWidth: ""
                }
            ]
            return arr
        }
    },
    data() {
        return {
            loading: false,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            list: []
        };
    },
    mounted() {
        this.queryHistory()
    },
    methods: {
        queryHistory() {
            let reqData = {
                chainId: 0,
                groupId: 0
            }
            getAddress(reqData)
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
    }
};
</script>
<style scoped>

</style>
