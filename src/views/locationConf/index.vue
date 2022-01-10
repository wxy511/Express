<template>
  <div class="expressType-container">
    <div class="expressType-containerBox">
      <div class="top">
        <el-row>
          <el-col :span="18">
            <span class="name">{{ $t("locationConf.locaName") }}</span>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              style="float: right"
              @click="addLocabtn()"
            >
              <span>{{ $t("locationConf.addLocabtn") }}</span>
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="bottom">
        <el-table
          v-loading="loading"
          ref="Locatable"
          :data="Locatable"
          class="table"
          :cell-style="tableCellStyle"
          :header-cell-style="{ background: '#f0f2f5' }"
          height="100%"
        >
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="code" :label="$t('locationConf.locaCode')">
          </el-table-column>
          <el-table-column prop="cn" :label="$t('locationConf.LocaNamecn')">
          </el-table-column>
          <el-table-column prop="en" :label="$t('locationConf.LocaNameen')">
          </el-table-column>
          <el-table-column prop="show" :label="$t('locationConf.LocaisShow')">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.show"
                :active-value="1"
                :inactive-value="0"
                disabled
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column :label="$t('locationConf.OperationBtn')">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                size="mini"
                circle
                @click="editbtn(scope.row)"
              ></el-button>
              <el-popconfirm
                :confirm-button-text="$t('locationConf.confirmBtn')"
                :cancel-button-text="$t('locationConf.cancelBtn')"
                :title="$t('locationConf.confirmdele')"
                @confirm="deletebtn(scope.row)"
              >
                <el-button
                  slot="reference"
                  icon="el-icon-delete"
                  type="danger"
                  size="mini"
                  circle
                >
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增位置弹窗 -->
      <el-dialog
        :title="$t('locationConf.NameInfo')"
        :visible.sync="LocaDialogvisible"
        width="30%"
      >
        <el-form
          ref="formLocaDialog"
          :model="formLocaDialog"
          :rules="rules"
          :label-position="labelPosition"
        >
          <el-form-item
            :label="$t('locationConf.locaCode')"
            :label-width="formLabelWidth"
            prop="Locacode"
          >
            <el-input v-model="formLocaDialog.Locacode"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('locationConf.LocaNamecn')"
            :label-width="formLabelWidth"
            prop="LocaNamecn"
          >
            <el-input v-model="formLocaDialog.LocaNamecn"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('locationConf.LocaNameen')"
            :label-width="formLabelWidth"
            prop="LocaNameen"
          >
            <el-input v-model="formLocaDialog.LocaNameen"></el-input>
          </el-form-item>

          <el-form-item :label-width="formLabelWidth">
            <span style="margin-right: 20px">
              <span>{{ $t("locationConf.LocaisShow") }}</span></span
            >
            <span>
              <el-switch
                v-model="formLocaDialog.show"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch
            ></span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="cancelDialogbtn()">
            <span>{{ $t("locationConf.cancelBtn") }}</span></el-button
          >
          <el-button type="primary" @click="addlDialogbtn('formLocaDialog')">
            <span>{{ $t("locationConf.confirmBtn") }}</span></el-button
          >
        </div>
      </el-dialog>
      <!--编辑信息弹窗 -->
      <el-dialog
        :title="$t('locationConf.editInfo')"
        :visible.sync="LocadetailDialogvisible"
        width="30%"
      >
        <el-form
          ref="formdetaillDialog"
          :model="formdetaillDialog"
          :rules="rules"
          :label-position="labelPosition"
        >
          <el-form-item
            :label="$t('locationConf.locaCode')"
            :label-width="formLabelWidth"
            prop="detailcode"
          >
            <el-input
              v-model="formdetaillDialog.detailcode"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('locationConf.LocaNamecn')"
            :label-width="formLabelWidth"
            prop="detailNamecn"
          >
            <el-input v-model="formdetaillDialog.detailNamecn"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('locationConf.LocaNameen')"
            :label-width="formLabelWidth"
            prop="detailNameen"
          >
            <el-input v-model="formdetaillDialog.detailNameen"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="show">
            <span style="margin-right: 20px">
              {{ $t("locationConf.LocaisShow") }}</span
            >
            <span>
              <el-switch
                v-model="formdetaillDialog.show"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch
            ></span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="canceleditbtn()">{{
            $t("locationConf.cancelBtn")
          }}</el-button>
          <el-button
            type="primary"
            @click="confirmeditbtn('formdetaillDialog')"
            >{{ $t("locationConf.confirmBtn") }}</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { addBranch, deleteBranch } from "@/api/user.js";
export default {
  name: "locationConf",
  components: {},
  data() {
    return {
      Locatable: [],
      LocaDialogvisible: false,
      LocadetailDialogvisible: false,
      loading: false,
      labelPosition: "top",
      formLocaDialog: {
        Locacode: "",
        LocaNamecn: "",
        LocaNameen: "",
        show: 1,
      },
      formdetaillDialog: {
        detailcode: "",
        detailNamecn: "",
        detailNameen: "",
        show: "",
      },
      rules: {
        Locacode: [{ validator: this.checkLocacode, trigger: "blur" }],
        LocaNamecn: [{ validator: this.checkLocaName, trigger: "blur" }],
        LocaNameen: [{ validator: this.checkLocaName, trigger: "blur" }],
        detailNamecn: [{ validator: this.checkdetailName, trigger: "blur" }],
        detailNameen: [{ validator: this.checkdetailName, trigger: "blur" }],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions(["getpickupLocation"]),
    initialData() {
      //得到位置信息 表格赋值
      this.getLocatable();
    },
    checkLocacode: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.locacodetips")));
      }
      callback();
    },
    checkLocaName: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.locanametips")));
      }
      callback();
    },
    checkdetailName: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.locanametips")));
      }
      callback();
    },
    //表格赋值
    async getLocatable() {
      this.loading = true;
      const response = await this.getpickupLocation();
      // console.log("11", response);
      if (response.error === 0 && response.branch) {
        this.Locatable = response.branch;
        this.loading = false;
        // console.log("得到的位置信息", this.Locatable);
      } else {
        console.log(error);
        this.loading = false;
      }
    },
    //新增位置弹窗
    addLocabtn() {
      this.LocaDialogvisible = true;
    },
    cancelDialogbtn() {
      this.LocaDialogvisible = false;
    },
    addlDialogbtn(formLocaDialog) {
      this.$refs[formLocaDialog].validate((valid) => {
        if (valid) {
          let formLocaInfo = this.formLocaDialog;
          let formLocaInfoClone = JSON.parse(JSON.stringify(formLocaInfo));
          // console.log("提交的信息是", formLocaInfoClone);
          let info = {
            code: formLocaInfoClone.Locacode,
            cn: formLocaInfoClone.LocaNamecn,
            en: formLocaInfoClone.LocaNameen,
            show: formLocaInfoClone.show,
          };
          let that = this;
          addBranch(info)
            .then(function (response) {
              // console.log(response);
              if (response.error === 0) {
                that.$message({
                  message: "操作成功",
                  type: "success",
                });
                that.getLocatable();
                that.$nextTick(() => {
                  that.$refs["formLocaDialog"].resetFields();
                });
                that.LocaDialogvisible = false;
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
    deletebtn(row) {
      // console.log("删除", row);
      let info = {
        code: row.code,
      };
      let that = this;
      deleteBranch(info)
        .then(function (response) {
          // console.log(response);
          if (response.error === 0) {
            that.$message({
              message: "删除成功",
              type: "success",
            });
            //刷新表格
            that.getLocatable();
          } else {
            console.log(error);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //详细信息
    editbtn(row) {
      // console.log("详细信息", row);
      this.formdetaillDialog.detailcode = row.code;
      this.formdetaillDialog.detailNamecn = row.cn;
      this.formdetaillDialog.detailNameen = row.en;
      this.formdetaillDialog.show = row.show;
      this.LocadetailDialogvisible = true;
    },
    canceleditbtn() {
      this.LocadetailDialogvisible = false;
    },
    confirmeditbtn(formdetaillDialog) {
      this.$refs[formdetaillDialog].validate((valid) => {
        if (valid) {
          let info = {
            code: this.formdetaillDialog.detailcode,
            cn: this.formdetaillDialog.detailNamecn,
            en: this.formdetaillDialog.detailNameen,
            show: this.formdetaillDialog.show,
          };
          console.log("info", info);
          let that = this;
          addBranch(info)
            .then(function (response) {
              console.log(response);
              if (response.error === 0) {
                that.$message({
                  message: "提交成功",
                  type: "success",
                });
                that.getLocatable();
                that.LocadetailDialogvisible = false;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
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

