<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/specs' }">规格列表</el-breadcrumb-item>
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
            <el-form-item label="规格名称" prop="specsname">
                <el-input v-model="ruleForm.specsname"></el-input>
            </el-form-item>

            <el-form-item
                v-for="(domain, index) in ruleForm.attrs"
                :label="'域名' + index"
                :key="index"
            >
                <el-input v-model="domain.value"></el-input>
                <el-button @click="addDomain">新增域名</el-button>
                <el-button @click.prevent="removeDomain(domain)">删除</el-button>
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
            dynamicValidateForm: {
                domains: [
                    {
                        value: "",
                    },
                ],
                email: "",
            },
            id: "",
            tiTle: "",
            tiTleButton: "",
            menulist: [],
            ruleForm: {
                specsname: "",
                attrs: [
                    {
                        value: "",
                    },
                ],
                status: false,
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur",
                    },
                ],
                pid: [
                    {
                        required: true,
                        message: "请选择活动区域",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    mounted() {
        this.id = this.$route.query.id;
        // 回显
        if (this.id) {
            this.tiTle = "菜单修改";
            this.tiTleButton = "修改";
            this.$http.get("/specsinfo", { id: this.id }).then((res) => {
                let arr1 =res.data.list[0].attrs
                
                console.log(arr1)
                let { status } = res.data.list;
                this.ruleForm = {...res.data.list[0],status: status == 1 ? true : false,arr1};
                
            });
        } else {
            this.tiTle = "菜单添加";
            this.tiTleButton = "添加";
        }
        this.$http.get("/menulist").then((res) => {
            this.menulist = res.data.list;
        });
    },
    methods: {
        removeDomain(item) {
            var index = this.ruleForm.attrs.indexOf(item);
            if (index !== -1) {
                this.ruleForm.attrs.splice(index, 1);
            }
        },
        addDomain() {
            this.ruleForm.attrs.push({
                value: ""
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2;
                    if (this.id) {
                        this.ruleForm.attrs = this.ruleForm.attrs.map(item=>{
                            return item.value
                        }).join(",")
                        this.$http
                            .post("/specsedit", {
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
                        this.ruleForm.attrs = this.ruleForm.attrs.map(item=>{
                            return item.value
                        }).join(",")
                        this.$http
                            .post("/specsadd", this.ruleForm)
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