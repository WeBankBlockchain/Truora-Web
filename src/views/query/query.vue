<template>
    <div>
        <v-content-head :headTitle="'请求查询'"></v-content-head>
        <div class="module-wrapper" style="margin-bottom: 20px">
            <div class="search-part">
                <el-input placeholder="请求ID" v-model="inputText" class="input-with-select" @keyup.enter.native="search">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
        </div>
        <div class="search-table module-wrapper" v-loading='loading'>
            <p style="padding-top:10px;">请求查询详情:</p>
            <div style="padding: 20px 50px 30px 50px;line-height: 40px;">

                <ul v-if="JSON.stringify(searchResult) != '{}' ">
                    <template v-if="searchResult['sourceType'] == '1'">
                        <li v-for="(item , index) in searchResultVrfList" class="result-item">
                            <template v-if="item.enName == 'result'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName]}}</span>
                            </template>
                            <template v-else-if="item.enName == 'sourceType'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName] | translateSourceType}}</span>
                            </template>

                            <template v-else-if="item.enName == 'reqStatus'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName] | translateReqStatus}}</span>
                                <span v-if="searchResult['error']">（{{searchResult['error']}}）</span>
                            </template>
                            <template v-else-if="item.enName == 'processTime'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName]}} ms</span>
                            </template>
                            <template v-else-if="item.enName == 'proof'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val" v-show="searchResult[item.enName]">
                                    <i class="el-icon-copy-document font-12" @click="copyPubilcKey(searchResult[item.enName])" title="复制"></i>
                                    {{searchResult[item.enName]}}
                                </span>
                            </template>
                            <template v-else-if="item.enName == 'inputSeed'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName]}}
                                    <!-- <el-button type="text" @click="handleHex(searchResult[item.enName])">转换16进制-></el-button>
                                    <span>{{hexVal}}</span> -->
                                </span>
                            </template>
                            <template v-else>
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName]}}</span>
                            </template>
                        </li>
                    </template>
                    <template v-else>
                        <li v-for="(item , index) in searchResultKeyList" class="result-item">
                            <template v-if="item.enName == 'result'">
                                <span class="result-key">{{item.name}}：</span>
                                <el-input type="textarea" class="result-val" v-model="searchResult[item.enName]"></el-input>
                            </template>
                            <template v-else-if="item.enName == 'sourceType'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName] | translateSourceType}}</span>
                            </template>
                            <template v-else-if="item.enName == 'reqStatus'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName] | translateReqStatus}}</span>
                                <span v-if="searchResult['error']">（{{searchResult['error']}}）</span>
                            </template>
                            <template v-else-if="item.enName == 'processTime'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName]}} ms</span>
                            </template>
                            <template v-else-if="item.enName == 'proof'">
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val" v-show="searchResult[item.enName]">
                                    <i class="el-icon-copy-document font-12" @click="copyPubilcKey(searchResult[item.enName])" title="复制"></i>
                                    {{searchResult[item.enName]}}
                                </span>
                            </template>
                            <template v-else>
                                <span class="result-key">{{item.name}}：</span>
                                <span class="result-val">{{searchResult[item.enName]}}</span>
                            </template>
                        </li>
                    </template>

                </ul>
                <p v-if="errorMessage">{{errorMessage}}</p>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import contentHead from "@/components/contentHead";
import { historyQuery } from "@/util/api"

export default {
    name: "newQuery",
    components: {
        "v-content-head": contentHead
    },
    data() {
        return {
            loading: false,
            inputText: '',
            searchResult: {},
            errorMessage: '',
            baseType: true,
            // searchResultKeyList: ['sourceType', 'reqQuery', 'userContract', 'processTime', 'reqStatus', 'result', 'timesAmount', 'createTime', 'modifyTime'],
            searchResultKeyList: [{
                enName: 'sourceType',
                name: '请求类型'
            }, {
                enName: 'reqQuery',
                name: '请求地址'
            }, {
                enName: 'userContract',
                name: '用户合约地址'
            }, {
                enName: 'processTime',
                name: '处理时长'
            }, {
                enName: 'reqStatus',
                name: '请求状态'
            }, {
                enName: 'result',
                name: '随机数结果'
            }, {
                enName: 'createTime',
                name: '创建时间'
            }, {
                enName: 'modifyTime',
                name: '完成时间'
            },],
            searchResultVrfList: [{
                enName: 'sourceType',
                name: '请求类型'
            }, {
                enName: 'inputSeed',
                name: '随机数种子'
            }, {
                enName: 'actualSeed',
                name: '实际种子'
            }, {
                enName: 'userContract',
                name: '用户合约地址'
            }, {
                enName: 'processTime',
                name: '处理时长'
            }, {
                enName: 'reqStatus',
                name: '请求状态'
            }, {
                enName: 'result',
                name: '随机数结果'
            }, {
                enName: 'proof',
                name: 'Proof'
            }, {
                enName: 'createTime',
                name: '创建时间'
            }, {
                enName: 'modifyTime',
                name: '完成时间'
            },],
            hexVal: ''
        }
    },
    computed: {
        roughScale() {

        }
    },
    mounted() {
        if (this.$route.query.reqId) {
            this.inputText = this.$route.query.reqId
            this.queryHistory()
        }
    },
    methods: {
        search() {
            this.queryHistory()
        },
        queryHistory() {
            this.loading = true
            historyQuery(this.inputText)
                .then(res => {
                    this.loading = false
                    console.log(res);
                    const { status, data } = res
                    if (data.code === 0) {
                        this.searchResult = data.data
                    } else {
                        this.searchResult = {}
                        this.errorMessage = '当前无法找到查询id，请稍后再试。。。'
                    }
                })
                .catch(err => {
                    this.searchResult = {}
                    this.errorMessage = '当前无法找到查询id，请稍后再试。。。'
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
        handleHex(val){
            var val = +val
            this.hexVal = `0x${val.toString(16)}`
        }
    }
}
</script>

<style scoped>
.result-item {
    display: flex;
}
.result-key {
    display: inline-block;
    min-width: 120px;
}
.result-val {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;

}
</style>
