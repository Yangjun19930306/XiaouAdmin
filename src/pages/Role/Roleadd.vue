<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{tiTle}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加信息 -->
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="ruleForm.rolename"></el-input>
            </el-form-item>

            <el-form-item label="角色权限" prop="type">
                <el-tree
                    :data="data"
                    show-checkbox
                    node-key="id"
                    :default-expanded-keys="[1]"
                    :default-checked-keys="checkedArr"
                    :props="defaultProps"
                    ref="mytree"
                    check-strictly
                ></el-tree>
            </el-form-item>

            <el-form-item label="状态" prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{tiTleButton}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: "",
            tiTle: "",
            tiTleButton: "",
            menulist: [],
            checkedArr:[],
            ruleForm: {
                rolename: "",
                menus: [],
                status: false,
            },
            rules: {
                rolename: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur",
                    },
                ],
            },
            data: [],
            defaultProps: {
                children: "children",
                label: "title",
            },
        };
    },
    mounted() {
        this.id = this.$route.query.id;
        if (this.id) {
            this.tiTle = "角色修改";
            this.tiTleButton = "修改";
            this.$http.get("/roleinfo", { id: this.id }).then((res) => {
                let { status } = res.data.list;
                this.ruleForm = {
                    ...res.data.list,
                    status: status == 1 ? true : false,
                };
                this.checkedArr = res.data.list.menus.split(",")
            });
        } else {
            this.tiTle = "角色添加";
            this.tiTleButton = "添加";
        }
        this.$http.get("/menulist", { istree: true }).then((res) => {
            this.data = res.data.list;
        });
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.menus = this.$refs.mytree.getCheckedKeys()
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2;
                    if (this.id) {
                        this.$http
                            .post("/roleedit", {
                                ...this.ruleForm,
                                id: this.id,
                            })
                            .then((res) => {
                                if (res.data.code == 200) {
                                    alert("修改成功");
                                    this.$router.back();
                                }
                            });
                    } else {
                        this.$http
                            .post("/roleadd", this.ruleForm)
                            .then((res) => {
                                console.log(res);
                                if (res.data.code == 200) {
                                    alert("添加成功");
                                    this.$router.back();
                                }
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="stylus" scoped></style>