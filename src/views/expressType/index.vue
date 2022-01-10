<template>
  <div class="expressType-container">
    <div class="expressType-containerBox">
      <div class="top">
        <el-row>
          <el-col :span="18">
            <span class="name">{{ $t("expressType.companyName") }}</span>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style="float: right" @click="addbtn()">
              <span>{{ $t("expressType.addbtn") }}</span>
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="bottom">
        <el-table
          v-loading="loading"
          ref="tableData"
          :data="tableData"
          class="table"
          :cell-style="tableCellStyle"
          :header-cell-style="{ background: '#f0f2f5' }"
          height="100%"
        >
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="cn" :label="$t('expressType.companyNamecn')">
          </el-table-column>
          <el-table-column prop="en" :label="$t('expressType.companyNameen')">
          </el-table-column>
          <el-table-column prop="enable" :label="$t('expressType.addisable')">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enable"
                :active-value="1"
                :inactive-value="0"
                disabled
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column :label="$t('expressType.OperationBtn')">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                circle
                @click="editbtn(scope.row)"
              ></el-button>
              <el-popconfirm
                :confirm-button-text="$t('expressType.confimbtn')"
                :cancel-button-text="$t('expressType.cancelbtn')"
                :title="$t('expressType.confirmdele')"
                @confirm="deletebtn(scope.row)"
              >
                <el-button
                  slot="reference"
                  icon="el-icon-delete"
                  type="danger"
                  size="mini"
                  circle
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加按钮弹窗 -->
      <el-dialog
        :title="$t('expressType.NameInfo')"
        :visible.sync="dialogFormVisible"
        width="30%"
      >
        <el-form
          ref="formDialog"
          :model="formDialog"
          :rules="rules"
          :label-position="labelPosition"
        >
          <el-form-item
            :label="$t('expressType.companyNamecn')"
            :label-width="formLabelWidth"
            prop="companyNamecn"
          >
            <el-input v-model="formDialog.companyNamecn"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('expressType.companyNameen')"
            :label-width="formLabelWidth"
            prop="companyNameen"
          >
            <el-input v-model="formDialog.companyNameen"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <span style="margin-right: 20px">
              {{ $t("expressType.addisable") }}</span
            >
            <span>
              <el-switch
                v-model="formDialog.enable"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch
            ></span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="cancelDialogFormbtn()">
            <span>{{ $t("expressType.cancelbtn") }}</span></el-button
          >
          <el-button type="primary" @click="addDialogFormbtn('formDialog')">
            <span>{{ $t("expressType.confimbtn") }}</span></el-button
          >
        </div>
      </el-dialog>
      <!-- 编辑按钮弹窗 -->
      <el-dialog
        :title="$t('expressType.EditInfo')"
        :visible.sync="editdialogFormVisible"
        width="30%"
      >
        <el-form
          ref="editformDialog"
          :model="editformDialog"
          :rules="rules"
          :label-position="labelPosition"
        >
          <el-form-item
            :label="$t('expressType.companyNamecn')"
            :label-width="formLabelWidth"
            prop="editcompanyNamecn"
          >
            <el-input
              v-model="editformDialog.editcompanyNamecn"
              style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('expressType.companyNameen')"
            :label-width="formLabelWidth"
            prop="editcompanyNameen"
          >
            <el-input
              v-model="editformDialog.editcompanyNameen"
              style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <span style="margin-right: 20px">
              {{ $t("expressType.addisable") }}</span
            >
            <span>
              <el-switch
                v-model="editformDialog.enable"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="editcancelbtn()"
            ><span>{{ $t("expressType.cancelbtn") }}</span></el-button
          >
          <el-button type="primary" @click="editconfirmbtn('editformDialog')"
            ><span>{{ $t("expressType.confimbtn") }}</span></el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { createCName, modifyCName, deleteCName } from "@/api/user.js";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ExpressType",
  components: {},
  data() {
    return {
      loading: false,
      // enable: true,
      tableData: [],
      dialogFormVisible: false,
      editdialogFormVisible: false,
      labelPosition: "top",
      rules: {
        companyNamecn: [
          { validator: this.checkcompanyNamecn, trigger: "blur" },
        ],
        companyNameen: [
          { validator: this.checkcompanyNameen, trigger: "blur" },
        ],
        editcompanyNamecn: [{ validator: this.checkeditcn, trigger: "blur" }],
        editcompanyNameen: [{ validator: this.checkediten, trigger: "blur" }],
      },
      formDialog: {
        companyNamecn: "",
        companyNameen: "",
        enable: 1,
      },
      editformDialog: {
        editid: "",
        editcompanyNamecn: "",
        editcompanyNameen: "",
        enable: "",
      },

      formLabelWidth: "120px",
    };
  },
  created() {
    this.initialData();
  },
  methods: {
    ...mapActions(["getcompanyNameList"]),
    initialData() {
      //获得快递公司，进行table赋值
      this.gettableData();
    },
    //table赋值
    async gettableData() {
      this.loading = true;
      const response = await this.getcompanyNameList();
      // console.log(response);
      if (response.error === 0 && response.ele) {
        // console.log(response.ele);
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
        return callback(new Error(this.$t("tips.companyNametips")));
      }
      callback();
    },
    checkcompanyNameen: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.companyNametips")));
      }
      callback();
    },

    checkeditcn: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.companyNametips")));
      }
      callback();
    },
    checkediten: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.companyNametips")));
      }
      callback();
    },
    addbtn() {
      // console.log("添加");
      this.dialogFormVisible = true;
    },
    addDialogFormbtn(formDialog) {
      this.$refs[formDialog].validate((valid) => {
        if (valid) {
          let formDialogdata = this.formDialog;
          let formDialogdataClone = JSON.parse(JSON.stringify(formDialogdata));
          // console.log("hello", formDialogdataClone);
          let info = {
            eletype: 24,
            cn: formDialogdataClone.companyNamecn,
            en: formDialogdataClone.companyNameen,
            enable: formDialogdataClone.enable,
          };
          // console.log("info信息", info);
          let that = this;

          createCName(info)
            .then(function (response) {
              // console.log(response);
              if (response.error === 0) {
                //获取快递公司名字
                that.gettableData();
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                that.$nextTick(() => {
                  that.$refs["formDialog"].resetFields();
                });
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
          //
        } else {
          return false;
        }
      });
    },
    cancelDialogFormbtn() {
      this.dialogFormVisible = false;
      this.$nextTick(() => {
        this.$refs["formDialog"].resetFields();
      });
    },
    editbtn(row) {
      // console.log("编辑按钮", row);
      let that = this;
      that.editdialogFormVisible = true;
      that.editformDialog.editid = row.id;
      that.editformDialog.editcompanyNamecn = row.cn;
      that.editformDialog.editcompanyNameen = row.en;
      if (row.enable && row.enable !== "") {
        that.editformDialog.enable = row.enable;
      } else {
        that.editformDialog.enable = 0;
      }
    },
    editconfirmbtn(editformDialog) {
      this.$refs[editformDialog].validate((valid) => {
        if (valid) {
          let that = this;
          let info = {
            eletype: 24,
            id: that.editformDialog.editid,
            en: that.editformDialog.editcompanyNameen,
            cn: that.editformDialog.editcompanyNamecn,
            enable: that.editformDialog.enable,
          };
          console.log(info);
          modifyCName(info)
            .then(function (response) {
              // console.log(response);
              if (response.error === 0) {
                //清空数据
                that.$refs["editformDialog"].resetFields();
                that.editformDialog.editid = "";
                that.editformDialog.editcompanyNamecn = "";
                that.editformDialog.editcompanyNameen = "";
                that.editformDialog.enable = "";
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                //刷新数据
                that.gettableData();
                that.editdialogFormVisible = false;
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
    editcancelbtn() {
      this.editdialogFormVisible = false;
    },
    deletebtn(row) {
      console.log("删除", row);
      let info = {
        eletype: 24,
        id: row.id,
      };
      let that = this;
      deleteCName(info)
        .then(function (response) {
          // console.log(response);
          if (response.error === 0) {
            that.$message({
              message: "删除成功",
              type: "success",
            });
            //刷新表格
            that.gettableData();
          } else {
            console.log(error);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState(["tableCellStyle"]),
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
    background-color: #fff;
    // border: 1px solid red;
    .top {
      // border: 1px solid blue;
      border-radius: 10px;
      height: 60px;
      padding: 10px;
      .name {
        font-size: 30px;
      }
    }
    .bottom {
      // border: 1px solid red;
      border-radius: 10px;
      height: calc(100% - 60px);
      padding: 10px;
      .table {
        // border: 1px solid red;
        overflow: auto;
      }
    }
  }
}
</style>

