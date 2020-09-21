<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/category' }">商品分类列表</el-breadcrumb-item>
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
            <el-form-item label="上级分类" prop="pid">
                <el-select v-model="ruleForm.pid" placeholder="请选择分类">
                    <el-option label="顶级分类" :value="0"></el-option>
                    <el-option
                        :label="item.catename"
                        :value="item.id"
                        v-for="(item) in menulist"
                        :key="item.id"
                        
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="分类名称" prop="catename">
                <el-input v-model="ruleForm.catename"></el-input>
            </el-form-item>

            <el-form-item label="图片" prop="img">
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :on-change="change"
                    :auto-upload="false"
                    :file-list="arr"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
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
            dialogImageUrl: '',
            dialogVisible: false,
            id: "",
            tiTle: "",
            tiTleButton: "",
            menulist: [],
            arr:[],
            ruleForm: {
                pid: "",
                status: false,
                catename: "",
                img: "",
            },
            rules: {
                catename: [
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
        if (this.id) {
            this.tiTle = "菜单修改";
            this.tiTleButton = "修改";
            this.$http.get("/cateinfo", { id: this.id }).then((res) => {
                let { status } = res.data.list;
                this.ruleForm = {
                    ...res.data.list,
                    status: status == 1 ? true : false,
                };
                this.arr.push({
                    url:"http://localhost:3000" + res.data.list.img
                })
            });
        } else {
            this.tiTle = "菜单添加";
            this.tiTleButton = "添加";
        }
        this.$http.get("/catelist", { pid:0}).then((res) => {
            this.menulist = res.data.list;
        });
    },
    methods: {
        change(file,fileList){
            this.ruleForm.img = file.raw
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2;
                    let form = new FormData()
                    for(var key in this.ruleForm){
                        form.append(key,this.ruleForm[key])
                    }
                    
                    if (this.id) {
                        form.append("id",this.id)
                        this.$http
                            .post("/cateedit",form)
                            .then((res) => {
                                if (res.data.code == 200) {
                                    alert("修改成功");
                                    this.$router.back();
                                }
                            });
                    } else {
                        this.$http
                            .post("/cateadd", form)
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

<style lang="stylus" scoped>

</style>