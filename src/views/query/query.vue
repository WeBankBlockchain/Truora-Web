<template>
    <div>
        <v-content-head :headTitle="'请求查询'"></v-content-head>
        <div class="module-wrapper" style="margin-bottom: 20px">
            <div class="search-part">
                <el-input placeholder="请求ID" v-model="inputText" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
        </div>
        <div class="search-table module-wrapper" v-loading='loading'>
            <div style="padding: 20px 50px 30px 50px;line-height: 40px;">
                <p>请求查询详情:</p>
                <ul v-if="JSON.stringify(searchResult) != '{}' ">
                    <li v-for="(item , index) in searchResultKeyList" class="result-item">
                        <template v-if="item.enName == 'result'">
                            <span class="result-key">{{item.name}}：</span>
                            <el-input type="textarea" class="result-val" v-model="searchResult[item.enName]"></el-input>
                        </template>
                        <template v-else-if="item.enName == 'sourceType'">
                            <span class="result-key">{{item.name}}：</span>
                            <span class="result-val">{{searchResult[item.enName] | translateSourceType}}</span>
                        </template>
                        <template v-else-if="item.enName == 'reqQuery'">
                            <span class="result-key">{{item.name}}：</span>
                            <span class="result-val">{{searchResult[item.enName]}}</span>
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
                        <template v-else>
                            <span class="result-key">{{item.name}}：</span>
                            <span class="result-val">{{searchResult[item.enName]}}</span>
                        </template>
                    </li>
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
            // searchResultKeyList: ['sourceType', 'reqQuery', 'userContract', 'processTime', 'reqStatus', 'result', 'timesAmount', 'createTime', 'modifyTime'],
            searchResultKeyList: [{
                enName: 'sourceType',
                name:'请求类型'
            },{
                enName: 'reqQuery',
                name:'请求地址'
            },{
                enName: 'userContract',
                name:'用户合约地址'
            },{
                enName: 'processTime',
                name:'处理时长'
            },{
                enName: 'reqStatus',
                name:'请求状态'
            },{
                enName: 'result',
                name:'请求结果'
            },{
                enName: 'timesAmount',
                name:'放大倍数'
            },{
                enName: 'createTime',
                name:'创建时间'
            },{
                enName: 'modifyTime',
                name:'完成时间'
            },]
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
                    const { status, data } = res
                    if (data.code === 0) {
                        this.searchResult = data.data
                    } else {
                        this.errorMessage = '当前无法找到查询id，请稍后再试。。。'
                    }
                })
                .catch(err => {
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
    display: inline-block;
}
</style>
