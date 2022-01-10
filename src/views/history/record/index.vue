
<template>
  <div class="record-container">
    <div class="record-containerBox">
      <div class="top">
        <el-form
          ref="form"
          :label-position="labelPosition"
          label-width="80px"
          :model="form"
          class="oneForm"
          :rules="rules"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="form.starttime"
                  type="datetime"
                  style="width: 90%"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  default-time="00:00:00"
                  @change="handelDateFrom"
                  placeholder="请选择开始时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="form.endtime"
                  type="datetime"
                  style="width: 90%"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  default-time="23:59:59"
                  @change="handelDateTo"
                  placeholder="请选择结束时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="操作类型" prop="pickupType">
                <el-select v-model="form.pickupType" style="width: 90%">
                  <el-option
                    v-for="(item, index) in typeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="margin-top: 50px">
              <el-form-item>
                <el-button type="primary" @click="queryBtn('form')"
                  >查询</el-button
                >
                <el-button
                  type="primary"
                  @click="exportBtn()"
                  style="margin-left: 30px"
                  >导出</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="bottom">
        <el-table
          v-loading="loadingRecord"
          ref="tableDataRecord"
          :data="tableDataRecord"
          class="table"
          :header-cell-style="{ background: '#f0f2f5' }"
          :cell-style="tableCellStyle"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            :resizable="false"
            label="序号"
            width="50"
          >
          </el-table-column>
          <el-table-column prop="timeLocal" label="收/寄件时间" width="160">
          </el-table-column>
          <el-table-column prop="companyName" label="快递公司" width="">
          </el-table-column>
          <el-table-column prop="courierCode" label="快递单号" width="">
          </el-table-column>
          <el-table-column prop="details" label="包裹数量" width="80">
          </el-table-column>
          <el-table-column prop="operName" label="操作员" width="80">
          </el-table-column>
          <el-table-column prop="pickupType" label="操作类型" width="">
          </el-table-column>
          <el-table-column prop="name" label="收/寄件人姓名" width="">
          </el-table-column>
          <el-table-column prop="email" label="收/寄件人E-Mail" width="">
          </el-table-column>
          <el-table-column prop="phone" label="收/寄件人手机" width="140">
          </el-table-column>
          <el-table-column prop="pickupLocation" label="收/寄位置" width="">
          </el-table-column>
          <!-- ???/取件人 -->
          <el-table-column prop="receiver.empName" label="取件人姓名" width="">
          </el-table-column>
          <el-table-column prop="receiver.email" label="取件人E-Mail" width="">
          </el-table-column>
          <el-table-column
            prop="receiver.empPhone"
            label="取件人手机"
            width="140"
          >
          </el-table-column>
          <el-table-column prop="receiver.badgeID" label="取件卡号" width="">
          </el-table-column>
          <el-table-column
            prop="receiver.timeLocal"
            label="取件时间"
            width="160"
          >
          </el-table-column>
          <el-table-column prop="receiver.operName" label="取件操作员">
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 15, 20, 30, 40, 50]"
          :current-page="pageindex"
          :page-size="pagesize"
          :total="totalcount"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getNowFormatDate } from "@/utils/index";
import { receive } from "@/api/user.js";
import { mapState } from "vuex";
export default {
  name: "Record",
  data() {
    return {
      //验证规则
      rules: {
        starttime: [{ validator: this.checkstarttime, trigger: "blur" }],
        endtime: [{ validator: this.checkendtime, trigger: "blur" }],
        pickupType: [{ validator: this.checkpickupType, trigger: "change" }],
      },
      labelPosition: "top",
      loadingRecord: "false",
      form: {
        // starttime: "", //注意空格
        // endtime: "",
        starttime: getNowFormatDate() + " 00:00:00",
        endtime: getNowFormatDate() + " 23:59:59",
        pickupType: 0,
      },
      typeList: [
        {
          value: 0,
          label: "不限",
        },
        {
          value: 2049,
          label: "收件",
        },
        {
          value: 2051,
          label: "寄件",
        },
      ],
      tableDataRecord: [],
      totalcount: 0,
      pagesize: 30,
      pageindex: 1,
    };
  },
  methods: {
    initialData() {
      // console.log("时间", getNowFormatDate());
      //初始化加载当天所有的数据
      this.Recordfunction();
    },
    //初始化加载所有的table表数据，查询当天的
    Recordfunction() {
      let type = {
        pageindex: this.pageindex,
        pagesize: this.pagesize,
      };
      let that = this;
      that.loadingRecord = true;
      receive(type)
        .then(function (response) {
          console.log("初始化response", response);
          if (response.error === 0 && response.data) {
            that.totalcount = response.totalcount || 0;
            let rece = [];
            response.data.forEach((item) => {
              if (item.pickupType === 2049) {
                item.pickupType = "收件";
              } else if (item.pickupType === 2051) {
                item.pickupType = "寄件";
              }
              item.phone = "+" + item.countryCode + " " + item.phone;
              if (item.receiver !== null && item.receiver !== undefined) {
                // console.log(item.receiver.empName);
                item.receiver.empPhone =
                  "+" +
                  item.receiver.empCountryCode +
                  " " +
                  item.receiver.empPhone;
              }

              rece.push(item);
            });
            that.tableDataRecord = rece;
            that.loadingRecord = false;
          } else {
            console.log(error);
            that.loadingRecord = false;
          }
        })
        .catch(function (error) {
          console.log(error);
          that.loadingRecord = false;
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.pageindex = 1;
      this.Recordfunction();
    },
    handleCurrentChange(val) {
      this.pageindex = val;
      this.Recordfunction();
    },
    //分页索引接着上一页的索引
    indexMethod(index) {
      return (this.pageindex - 1) * this.pagesize + index + 1;
    },
    // (校验开始日期)
    checkstarttime: function (rule, value, callback) {
      if (!value) {
        return callback(new Error("开始时间不能为空"));
      } else {
        if (
          new Date(this.form.endtime) - new Date(value) <= 0 &&
          this.form.endtime &&
          value
        ) {
          return callback(new Error("*开始时间不能大于结束时间"));
        }
        callback();
      }
      callback();
    },
    // (校验截止日期)
    checkendtime: function (rule, value, callback) {
      if (!value) {
        return callback(new Error("结束时间不能为空"));
      } else {
        if (
          new Date(value) - new Date(this.form.starttime) <= 0 &&
          this.form.endtime &&
          value
        ) {
          return callback(new Error("*结束时间不能小于开始时间"));
        }
        callback();
      }
      callback();
    },
    // 当开始时间变化时,需要重新校验
    handelDateFrom(value) {
      if (
        new Date(this.form.endtime) - new Date(value) > 0 &&
        this.form.endtime &&
        value
      ) {
        this.$refs.form.validate();
      }
    },
    // 当结束时间变化时,需要重新校验
    handelDateTo(value) {
      if (
        new Date(value) - new Date(this.form.starttime) > 0 &&
        this.form.starttime &&
        value
      ) {
        this.$refs.form.validateField("endtime", async (valid) => {
          if (valid) {
            return false;
          }
        });
      }
    },
    //(校验操作类型)
    checkpickupType: function (rule, value, callback) {
      if (value === "") {
        return callback(new Error("操作类型不能为空"));
      }
      callback();
    },
    //点击查询
    queryBtn(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let type = {
            starttime: this.form.starttime || "",
            endtime: this.form.endtime,
            pageindex: this.pageindex,
            pagesize: this.pagesize,
            pickupType: this.form.pickupType,
          };
          console.log("查询信息是", type);
          let that = this;
          receive(type)
            .then(function (response) {
              console.log("收件response是", response);
              if (response.error === 0 && response.data) {
                that.totalcount = response.totalcount || 0;
                let rece = [];
                response.data.forEach((item) => {
                  if (item.pickupType === 2049) {
                    item.pickupType = "收件";
                  } else if (item.pickupType === 2051) {
                    item.pickupType = "寄件";
                  }
                  item.phone = "+" + item.countryCode + " " + item.phone;
                  //add
                  if (item.receiver !== null && item.receiver !== undefined) {
                    item.receiver.empPhone =
                      "+" +
                      item.receiver.empCountryCode +
                      " " +
                      item.receiver.empPhone;
                  }
                  //end
                  rece.push(item);
                });

                that.tableDataRecord = rece;
              } else {
                console.log(error);
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
    //点击导出
    exportBtn() {
      console.log("导出");
    },
  },
  created() {
    this.initialData();
  },
  computed: {
    ...mapState(["tableCellStyle"]),
  },
};
</script>
<style lang="scss" scoped>
.record-container {
  padding: 10px;
  background-color: #f0f2f5;
  height: calc(100vh - 50px);
  .record-containerBox {
    background: #fff;
    height: 100%;
    padding: 10px;
    // border: 1px solid blue;
    .top {
      // border: 1px solid red;
      background: #f0f2f5;
      height: 130px;
      padding: 8px;
      margin-bottom: 10px;
      .oneForm {
        background: #fff;
        padding: 0px 15px;
        overflow: auto;
      }
    }
    .bottom {
      // border: 1px solid rgb(34, 9, 13);
      height: calc(100% - 140px);
      background: #f0f2f5;
      padding: 8px;
      position: relative;
      .table {
        // border: 1px solid red;
        background: #fff;
        height: calc(100% - 60px);
        overflow: auto;
      }
      .page {
        // border: 1px solid blue;
        position: absolute;
        width: calc(100% - 16px);
        overflow: auto;
        bottom: 8px;
        background: #fff;
        height: 60px;
        text-align: center;
        padding-top: 15px;
      }
    }
  }
}
</style>

