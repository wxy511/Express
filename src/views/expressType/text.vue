<template>
  <div class="expressType-container">
    <div class="expressType-containerBox">
      <div class="formBox">
        <el-form
          ref="form"
          :label-position="labelPosition"
          label-width="80px"
          :model="form"
          class="oneForm"
          :rules="rules"
        >
          <el-form-item label="快递名称中" prop="companyNamecn">
            <el-input
              v-model="form.companyNamecn"
              style="width: 100%"
            ></el-input>
          </el-form-item>

          <el-form-item label="快递名称英" prop="companyNameen">
            <el-input
              v-model="form.companyNameen"
              style="width: 100%"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="addbtn('form')"
            >
              <span>确认添加</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableBox">
        <el-table
          v-loading="loading"
          ref="retable"
          :data="tableData"
          class="table"
          :cell-style="tableCellStyle"
          :header-cell-style="{ background: '#f9fbfe' }"
          height="100%"
        >
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="cn" label="快递名称(中)"> </el-table-column>
          <el-table-column prop="en" label="快递名称(英)"> </el-table-column>
          <el-table-column prop="enable" label="是否可见">
            <template>
              <el-switch
                v-model="isable"
                active-color="#409eff"
                inactive-color="#eaecf0"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作按钮">
            <template>
              <el-button
                icon="el-icon-edit"
                circle
                @click="editbtn()"
              ></el-button>
              <el-button icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 编辑按钮弹窗 -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="formDialog">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="formDialog.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="formDialog.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { createCName } from "@/api/user.js";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ExpressType",
  components: {},
  data() {
    return {
      isable: true,
      loading: false,
      labelPosition: "top",
      tableData: [],
      dialogFormVisible: false,
      rules: {
        companyNamecn: [
          { validator: this.checkcompanyNamecn, trigger: "blur" },
        ],
        companyNameen: [
          { validator: this.checkcompanyNameen, trigger: "blur" },
        ],
      },
      form: {
        companyNamecn: "",
        companyNameen: "",
      },
      formDialog: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions(["getcompanyNameList"]),
    initialData() {
      //获得所有的快递公司
      this.getcompanyNameList();
      this.gettableData();
    },
    //table赋值
    async gettableData() {
      const response = await this.getcompanyNameList();
      if (response.error === 0 && response.ele) {
        this.loading = true;
        this.tableData = response.ele;
        this.loading = false;
      } else {
        console.log(error);
        this.loading = false;
      }
    },
    //验证消息
    checkcompanyNamecn: function (rule, value, callback) {
      if (!value) {
        return callback(new Error("快递公司名称不能为空"));
      }
      callback();
    },
    checkcompanyNameen: function (rule, value, callback) {
      if (!value) {
        return callback(new Error("快递公司名称不能为空"));
      }
      callback();
    },
    //添加
    addbtn(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let formdata = this.form;
          let formdataClone = JSON.parse(JSON.stringify(formdata));
          this.$nextTick(() => {
            this.$refs["form"].resetFields();
          });
          // console.log("添加", formdataClone);
          //添加快递公司
          let info = {
            eletype: 24,
            cn: formdataClone.companyNamecn,
            en: formdataClone.companyNameen,
            enable: 0,
          };
          let that = this;
          createCName(info)
            .then(function (response) {
              console.log(response);
              if (response.error === 0) {
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                //获取快递公司名字
                that.gettableData();
              } else if (response.error === 13) {
                // console.log(response.desc);
                that.$message({
                  message: response.desc,
                  type: "error",
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },

    //编辑
    editbtn() {
      console.log("编辑");
      this.dialogFormVisible = true;
    },
  },
  computed: {
    ...mapState(["tableCellStyle"]),
  },
  created() {
    this.initialData();
  },
};
</script>

<style lang="scss" scoped>
.expressType-container {
  padding: 10px 10px 20px 10px;
  height: calc(100vh - 50px);
  background-color: #f0f2f5;
  .expressType-containerBox {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    // border: 1px solid red;
    display: flex;
    .formBox {
      // border: 1px solid red;
      height: 100%;
      width: 300px;
      background: #fff;
      margin-right: 10px;
      border-radius: 10px;
      .oneForm {
        // border: 1px solid red;
        padding: 0 15px;
        border-radius: 10px;
      }
    }
    .tableBox {
      // border: 1px solid blue;
      background: #fff;
      height: 100%;
      width: calc(100% - 310px);
      border-radius: 10px;
      .table {
        width: 100%;
        border-radius: 10px;
        overflow: auto;
        // height: 100%;
      }
    }
  }
}
</style>

