<template>
  <div class="rece-container">
    <div class="containerBox">
      <div class="formBox">
        <el-form
          ref="receform"
          :label-position="labelPosition"
          label-width="80px"
          :model="receform"
          class="receForm"
          :rules="rules"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('record.starttime')" prop="starttime">
                <el-date-picker
                  v-model="receform.starttime"
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
                  v-model="receform.endtime"
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
                <el-button type="primary" @click="queryBtn('receform')">
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
          ref="recetableData"
          :data="recetableData"
          class="recetable"
          :cell-style="tableCellStyle"
          v-loading="loading"
          :header-cell-style="{ background: '#f9fbfe' }"
          height="calc(100% - 60px)"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            :resizable="false"
            width="50"
          >
          </el-table-column>
          <el-table-column prop="name" :label="$t('record.receName')">
          </el-table-column>
          <el-table-column
            prop="details"
            :label="$t('record.Numberofpackages')"
          >
          </el-table-column>
          <el-table-column
            prop="companyID"
            :label="$t('record.ExpressCompany')"
          >
            <template slot-scope="scope">
              <span>{{ showName(scope.row.companyID) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="courierCode"
            :label="$t('record.couriernumber')"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            :label="$t('record.Rphone')"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="timeLocal"
            :label="$t('record.recetime')"
            width="180"
          >
          </el-table-column>
          <el-table-column :label="$t('record.detail')" width="">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-document"
                size="mini"
                @click="detailbtn(scope.row)"
              ></el-button>
            </template>
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
      <rece-details ref="ReceDetails" :data="drawerInfo"> </rece-details>
    </div>
  </div>
</template>
<script>
import { getNowFormatDate } from "@/utils/index";
import { mapGetters, mapState, mapActions } from "vuex";
import { receive } from "@/api/user.js";
import ReceDetails from "@/components/receDetails";
export default {
  name: "receRecord",
  components: {
    ReceDetails,
  },
  data() {
    return {
      rules: {
        starttime: [{ validator: this.checkstarttime, trigger: "blur" }],
        endtime: [{ validator: this.checkendtime, trigger: "blur" }],
      },
      labelPosition: "top",
      receform: {
        starttime: getNowFormatDate() + " 00:00:00",
        endtime: getNowFormatDate() + " 23:59:59",
        pickupType: 2049,
      },
      recetableData: [],
      loading: false,
      totalcount: 0,
      pagesize: 30,
      pageindex: 1,
      drawerVisible: false,
      drawerInfo: {},
    };
  },
  methods: {
    ...mapActions(["getcompanyNameList", "getpickupLocation"]),
    initialData() {
      //得到快递公司
      this.getcompanyNameList();
      //得到快递位置
      this.getpickupLocation();
      this.recequeryFunction();
    },
    // (校验开始日期)
    checkstarttime: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.starttimetips")));
      } else {
        if (
          new Date(this.receform.endtime) - new Date(value) <= 0 &&
          this.receform.endtime &&
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
          new Date(value) - new Date(this.receform.starttime) <= 0 &&
          this.receform.endtime &&
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
        new Date(this.receform.endtime) - new Date(value) > 0 &&
        this.receform.endtime &&
        value
      ) {
        this.$refs.receform.validate();
      }
    },
    // 当结束时间变化时,需要重新校验
    handelDateTo(value) {
      if (
        new Date(value) - new Date(this.receform.starttime) > 0 &&
        this.receform.starttime &&
        value
      ) {
        this.$refs.receform.validateField("endtime", async (valid) => {
          if (valid) {
            return false;
          }
        });
      }
    },
    recequeryFunction() {
      let type = {
        starttime: this.receform.starttime,
        endtime: this.receform.endtime,
        pageindex: this.pageindex,
        pagesize: this.pagesize,
        pickupType: 2049,
      };
      let that = this;
      that.loading = true;
      // console.log("表单信息", type);
      receive(type)
        .then(function (response) {
          if (response.error === 0 && response.data) {
            // console.log("收件response", response);
            that.totalcount = response.totalcount || 0;
            let rece = [];
            response.data.forEach((item) => {
              item.phone = "+" + item.countryCode + " " + item.phone;
              if (
                item.receiver &&
                item.receiver !== null &&
                item.receiver !== undefined
              ) {
                item.receiver.empPhone =
                  "+" +
                  item.receiver.empCountryCode +
                  " " +
                  item.receiver.empPhone;
              }
              rece.push(item);
            });
            that.recetableData = rece;
            that.loading = false;
          } else {
            that.recetableData = [];
            that.loading = false;
            console.log(error);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.loading = false;
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.pageindex = 1;
      this.recequeryFunction();
    },
    handleCurrentChange(val) {
      this.pageindex = val;
      this.recequeryFunction();
    },
    indexMethod(index) {
      return (this.pageindex - 1) * this.pagesize + index + 1;
    },
    queryBtn(receform) {
      this.$refs[receform].validate((valid) => {
        if (valid) {
          this.recequeryFunction();
        } else {
          return false;
        }
      });
    },
    detailbtn(row) {
      //   console.log("这行的信息", row);
      this.drawerInfo = row;
      this.drawerVisible = true;
      this.$refs["ReceDetails"].visible();
    },
  },
  computed: {
    ...mapState(["tableCellStyle"]),
    ...mapGetters(["showName", "showLocation"]),
  },
  created() {
    this.initialData();
  },
};
</script>
<style lang="scss" scoped>
.rece-container {
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
      .receForm {
        padding: 0px 15px;
        overflow: auto;
      }
    }
    .tableBox {
      background: #fff;
      height: calc(100% - 120px);
      border-radius: 10px;
      position: relative;
      .recetable {
        // border: 1px solid red;
        // height: calc(100% - 60px);
        border-radius: 10px;
        overflow: auto;
      }
      .page {
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