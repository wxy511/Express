<template>
  <div class="mail-container">
    <div class="containerBox">
      <div class="formBox">
        <el-form
          ref="mailform"
          :label-position="labelPosition"
          label-width="80px"
          :model="mailform"
          class="mailform"
          :rules="rules"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('record.starttime')" prop="starttime">
                <el-date-picker
                  v-model="mailform.starttime"
                  type="datetime"
                  style="width: 90%"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  default-time="00:00:00"
                  @change="handelDateFrom"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('record.endtime')" prop="endtime">
                <el-date-picker
                  v-model="mailform.endtime"
                  type="datetime"
                  style="width: 90%"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  default-time="23:59:59"
                  @change="handelDateTo"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="margin-top: 50px">
              <el-form-item>
                <el-button type="primary" @click="queryBtn('mailform')">
                  <span>{{ $t("record.querybtn") }}</span>
                </el-button>
                <el-button
                  type="primary"
                  @click="exportBtn()"
                  style="margin-left: 30px"
                >
                  <span>{{ $t("record.exportbtn") }}</span>
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableBox">
        <el-table
          ref="mailtableData"
          :data="mailtableData"
          class="mailtable"
          :cell-style="tableCellStyle"
          v-loading="mailloading"
          :header-cell-style="{ background: '#f9fbfe' }"
          height="calc(100% - 60px)"
        >
          <el-table-column
            type="index"
            :index="mailindexMethod"
            :resizable="false"
            width="50"
          >
          </el-table-column>
          <el-table-column prop="name" :label="$t('record.mailName')">
          </el-table-column>
          <el-table-column prop="details" :label="$t('record.mailpackages')">
          </el-table-column>
          <el-table-column prop="companyID" :label="$t('record.mailCompany')">
            <template slot-scope="scope">
              <span>{{ showName(scope.row.companyID) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="courierCode" :label="$t('record.mailnumber')">
          </el-table-column>
          <el-table-column
            prop="phone"
            :label="$t('record.mailphone')"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="timeLocal"
            :label="$t('record.mailtime')"
            width="180"
          >
          </el-table-column>
          <el-table-column :label="$t('record.maildetail')" width="">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-document"
                size="mini"
                @click="maildetailbtn(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="operName"
            :label="$t('record.mailoperator')"
            width="80"
          >
          </el-table-column>

          <el-table-column
            prop="email"
            :label="$t('record.mail-email')"
            width=""
          >
          </el-table-column>

          <el-table-column
            prop="branchID"
            :label="$t('record.maillocation')"
            width=""
          >
            <template slot-scope="scope">
              <span>{{ showLocation(scope.row.branchID) }}</span>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          background
          class="mailpage"
          @size-change="mailhandleSizeChange"
          @current-change="mailhandleCurrentChange"
          :page-sizes="[10, 15, 20, 30, 40, 50]"
          :current-page="mailpageindex"
          :page-size="mailpagesize"
          :total="mailtotalcount"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
      <mail-details ref="MailDetails" :data="maildrawerInfo"></mail-details>
    </div>
  </div>
</template>
<script>
import { getNowFormatDate } from "@/utils/index";
import { receive } from "@/api/user.js";
import { mapGetters, mapState, mapActions } from "vuex";
import MailDetails from "@/components/mailDetails";
export default {
  name: "mailRecord",
  components: {
    MailDetails,
  },
  data() {
    return {
      //验证规则
      rules: {
        starttime: [{ validator: this.checkstarttime, trigger: "blur" }],
        endtime: [{ validator: this.checkendtime, trigger: "blur" }],
      },
      labelPosition: "top",
      mailform: {
        starttime: getNowFormatDate() + " 00:00:00",
        endtime: getNowFormatDate() + " 23:59:59",
        pickupType: 2051,
      },
      mailtableData: [],
      mailloading: false,
      mailtotalcount: 0,
      mailpagesize: 30,
      mailpageindex: 1,
      maildrawerInfo: false,
      maildrawerInfo: {},
    };
  },
  methods: {
    ...mapActions(["getcompanyNameList", "getpickupLocation"]),
    //初始化数据
    initialData() {
      //得到快递公司
      this.getcompanyNameList();
      //得到快递位置
      this.getpickupLocation();
      this.mailqueryFunction();
    },
    // (校验开始日期)
    checkstarttime: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.starttimetips")));
      } else {
        if (
          new Date(this.mailform.endtime) - new Date(value) <= 0 &&
          this.mailform.endtime &&
          value
        ) {
          return callback(new Error(this.$t("tips.starttimeiftips")));
        }
        callback();
      }
      callback();
    },
    // (校验截止日期)
    checkendtime: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.endtimetips")));
      } else {
        if (
          new Date(value) - new Date(this.mailform.starttime) <= 0 &&
          this.mailform.endtime &&
          value
        ) {
          return callback(new Error(this.$t("tips.endtimeiftips")));
        }
        callback();
      }
      callback();
    },
    // 当开始时间变化时,需要重新校验
    handelDateFrom(value) {
      if (
        new Date(this.mailform.endtime) - new Date(value) > 0 &&
        this.mailform.endtime &&
        value
      ) {
        this.$refs.mailform.validate();
      }
    },
    // 当结束时间变化时,需要重新校验
    handelDateTo(value) {
      if (
        new Date(value) - new Date(this.mailform.starttime) > 0 &&
        this.mailform.starttime &&
        value
      ) {
        this.$refs.mailform.validateField("endtime", async (valid) => {
          if (valid) {
            return false;
          }
        });
      }
    },
    //分页信息
    mailhandleSizeChange(val) {
      this.mailpagesize = val;
      this.mailpageindex = 1;
      this.mailqueryFunction();
    },
    mailhandleCurrentChange(val) {
      this.mailpageindex = val;
      this.mailqueryFunction();
    },
    mailindexMethod(index) {
      return (this.mailpageindex - 1) * this.mailpagesize + index + 1;
    },
    //寄件查询信息
    mailqueryFunction() {
      let type = {
        starttime: this.mailform.starttime,
        endtime: this.mailform.endtime,
        pageindex: this.mailpageindex,
        pagesize: this.mailpagesize,
        pickupType: 2051,
      };
      let that = this;
      that.mailloading = true;
      // console.log("表单信息2", type);
      receive(type)
        .then(function (response) {
          if (response.error === 0 && response.data) {
            // console.log("寄件的response", response);
            that.mailtotalcount = response.totalcount || 0;
            let rece = [];
            response.data.forEach((item) => {
              item.phone = "+" + item.countryCode + " " + item.phone;
              rece.push(item);
            });
            that.mailtableData = rece;
            that.mailloading = false;
          } else {
            that.mailtableData = [];
            that.mailloading = false;
          }
        })
        .catch(function (error) {
          console.log(error);
          that.mailloading = false;
        });
    },
    queryBtn(mailform) {
      this.$refs[mailform].validate((valid) => {
        if (valid) {
          this.mailqueryFunction();
        } else {
          return false;
        }
      });
    },
    //寄件详情按钮
    maildetailbtn(row) {
      // console.log("详细信息2");
      this.maildrawerInfo = row;
      this.maildrawerVisible = true;
      this.$refs["MailDetails"].visible();
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
    ...mapGetters(["showName", "showLocation"]),
  },
};
</script>
<style lang="scss" scoped>
.mail-container {
  padding: 10px 10px 20px 10px;
  background-color: #f0f2f5;
  height: calc(100vh - 50px);
  .containerBox {
    // border: 1px solid red;
    height: 100%;
    border-radius: 10px;
    .formBox {
      // border: 1px solid blue;
      height: 110px;
      background: #fff;
      margin-bottom: 10px;
      border-radius: 10px;
      .mailform {
        padding: 0px 15px;
        overflow: auto;
      }
    }
    .tableBox {
      background: #fff;
      height: calc(100% - 120px);
      border-radius: 10px;
      position: relative;
      .mailtable {
        // border: 1px solid red;
        // height: calc(100% - 60px);
        border-radius: 10px;
        overflow: auto;
      }
      .mailpage {
        // border: 1px solid blue;
        height: 60px;
        position: absolute;
        width: 100%;
        bottom: 0;
        text-align: center;
        padding: 15px 0px;
      }
    }
  }
}
</style>