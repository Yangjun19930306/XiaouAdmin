<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>规格列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="menuadd">添加</el-button>
        <!-- 表格 -->
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
            <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
            <el-table-column prop="attrs" label="规格属性" width="180">
                <template slot-scope="scope">
                    <el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-tag type="success">{{scope.row.status | statusFormat}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="del(scope.row.id)">
                        <el-button size="mini" type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
        };
    },
    methods: {
        menuadd() {
            this.$router.push("/specs/add");
        },
        handleEdit(index, row) {
            this.$router.push("/specs/edit?id=" + row.id);
        },
        del(id) {
            this.$http.post("/specsdelete", { id }).then((res) => {
                this.addList();
                if (res.data.code == 200) {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success",
                    });
                }
            });
        },
        addList() {
            this.$http.get("/specslist", { istree: true }).then((res) => {
                this.tableData = res.data.list;
            });
        },
    },
    mounted() {
        this.addList();
    },
};
</script>

<style scoped>
</style>