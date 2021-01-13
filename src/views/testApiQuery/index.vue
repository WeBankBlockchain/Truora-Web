<template>
    <div>
        <content-head :headTitle="`测试API`"></content-head>
        <div class="module-wrapper" style="padding-bottom: 20px;">
            <div class="search-part">
                <el-input placeholder="请输入内容" v-model="inputText">
                    <template slot="prepend">URL</template>
                    <i slot="suffix" class="el-input__icon el-icon-refresh" @click="random"></i>
                    <el-button slot="append" icon="el-icon-search">请求测试</el-button>

                </el-input>
            </div>
        </div>
        <div class="search-table module-wrapper" v-loading='loading'>
            <div style="padding: 20px 50px 30px 50px;line-height: 40px;">
                <p>值是:</p>
                
                
            </div>
        </div>
    </div>
</template>

<script>
import contentHead from "@/components/contentHead";
export default {
    name: 'testApiQuery',

    components: {
        contentHead
    },

    props: {
    },

    data() {
        return {
            inputText: '',
            loading: false,
            
        }
    },

    computed: {
    },

    watch: {
    },

    created() {
    },

    mounted() {
    },

    methods: {
        random(){
            console.log(1111);
        }
    }
}
</script>

<style scoped>
</style>
