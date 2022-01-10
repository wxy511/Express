<template>
  <div id="dashboard-container">
    <div class="dashboard-containerBox">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsBox">
        <el-tab-pane name="first" id="paneone">
          <span slot="label" class="tabs-title">
            {{ $t("dashboard.paneFirstTitle") }}
          </span>
          <div class="one">
            <div class="oneleft">
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="100px"
                :label-position="labelPosition"
                class="oneForm"
              >
                <el-form-item
                  :label="$t('dashboard.ExpressType')"
                  prop="companyID"
                >
                  <el-select
                    v-model="form.companyID"
                    :placeholder="$t('dashboard.placeholderSele')"
                    @change="getItem"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in companyNameListenable"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                      <!-- <span>{{ language == "en" ? item.en : item.cn }}</span> -->
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  :label="$t('dashboard.couriernumber')"
                  prop="courierCode"
                >
                  <el-input
                    :placeholder="$t('dashboard.placeholderinputCode')"
                    v-model="form.courierCode"
                    style="width: 100%"
                  ></el-input
                ></el-form-item>
                <el-form-item
                  :label="$t('dashboard.Numberofpackages')"
                  prop="details"
                >
                  <el-select
                    style="width: 100%"
                    v-model="form.details"
                    :placeholder="$t('dashboard.placeholderSeleTypeM')"
                  >
                    <el-option
                      v-for="(item, index) in bgNumberArr"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('dashboard.receName')" prop="name">
                  <el-autocomplete
                    id="reName"
                    v-model="form.name"
                    :fetch-suggestions="querySearchAsync"
                    @select="handleSelect"
                    style="width: 100%"
                    :placeholder="$t('dashboard.placereceinputNameM')"
                  ></el-autocomplete>
                </el-form-item>
                <el-form-item label="" style="padding-top: 20px">
                  <el-button
                    type="primary"
                    @click="cReceive('form')"
                    style="width: 100%"
                  >
                    <span>{{ $t("dashboard.confirmRece") }}</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="oneright">
              <el-table
                ref="retable"
                class="table"
                :data="tableData"
                :header-cell-style="{ background: '#f0f2f5' }"
                v-loading="loading"
                :cell-style="tableCellStyle"
                height="calc(100% - 60px)"
              >
                <el-table-column
                  type="index"
                  :index="indexMethod"
                  :resizable="false"
                  width="50"
                >
                </el-table-column>
                <el-table-column
                  prop="timeLocal"
                  :label="$t('dashboard.receTime')"
                  width="180"
                >
                </el-table-column>

                <el-table-column
                  prop="companyID"
                  :label="$t('dashboard.expressCompany')"
                >
                  <template slot-scope="scope">
                    <span>{{ showName(scope.row.companyID) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="courierCode"
                  :label="$t('dashboard.courierNumber')"
                >
                </el-table-column>

                <el-table-column
                  prop="notifystate"
                  :label="$t('dashboard.notifystate')"
                >
                  <template slot-scope="scope">
                    <span>{{
                      $t("dashboard.renotifystateCode." + scope.row.notifystate)
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="name"
                  :label="$t('dashboard.receName')"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="email"
                  :label="$t('dashboard.receEmail')"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  :label="$t('dashboard.recePhone')"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="operName"
                  :label="$t('dashboard.receOperName')"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="branchID"
                  :label="$t('dashboard.recePickupLocation')"
                  width="150"
                >
                  <template slot-scope="scope">
                    <span>{{ showLocation(scope.row.branchID) }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                class="page"
                background
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
        </el-tab-pane>
        <el-tab-pane name="second" id="panetwo">
          <span slot="label" class="tabs-title">
            {{ $t("dashboard.paneSecondTitle") }}
          </span>
          <div class="two">
            <div class="twoleft">
              <el-form
                ref="formMail"
                :model="formMail"
                label-width="100px"
                :label-position="labelPosition"
                class="twoForm"
                :rules="rules"
              >
                <el-form-item
                  :label="$t('dashboard.ExpressTypeM')"
                  prop="companyID"
                >
                  <el-select
                    style="width: 100%"
                    v-model="formMail.companyID"
                    :placeholder="$t('dashboard.placeholderSeleM')"
                    @change="getMailItem"
                  >
                    <el-option
                      v-for="item in companyNameListenable"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  :label="$t('dashboard.couriernumberM')"
                  prop="courierCode"
                >
                  <el-input
                    :placeholder="$t('dashboard.placeholderinputCodeM')"
                    v-model="formMail.courierCode"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('dashboard.NumberofpackagesM')"
                  prop="details"
                >
                  <el-select
                    style="width: 100%"
                    v-model="formMail.details"
                    :placeholder="$t('dashboard.placeholderSeleTypeM')"
                  >
                    <el-option
                      v-for="(item, index) in bgNumberArrJI"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('dashboard.receNameM')" prop="name">
                  <el-autocomplete
                    id="mailName"
                    v-model="formMail.name"
                    style="width: 100%"
                    :fetch-suggestions="querySearchAsyncMail"
                    :placeholder="$t('dashboard.placereceNameM')"
                    @select="handleSelectMail"
                  ></el-autocomplete>
                </el-form-item>
                <el-form-item label="" style="padding-top: 20px">
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="confirmMailBtn('formMail')"
                  >
                    <span>{{ $t("dashboard.confirmReceM") }}</span></el-button
                  ></el-form-item
                >
              </el-form>
            </div>
            <div class="tworight">
              <el-table
                ref="mailtable"
                :data="tableDatamail"
                class="twoTable"
                height="calc(100% - 60px)"
                :header-cell-style="{ background: '#f0f2f5' }"
                v-loading="loadingMail"
                :cell-style="tableCellStyle"
              >
                <el-table-column
                  type="index"
                  :index="indexMethodMail"
                  :resizable="false"
                  width="50"
                  :label="$t('dashboard.indexlabel')"
                >
                </el-table-column>
                <el-table-column
                  prop="timeLocal"
                  :label="$t('dashboard.receTimeM')"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="companyID"
                  :label="$t('dashboard.expressCompanyM')"
                >
                  <template slot-scope="scope">
                    <span>{{ showName(scope.row.companyID) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="courierCode"
                  :label="$t('dashboard.courierNumberM')"
                >
                </el-table-column>
                <el-table-column
                  prop="notifystate"
                  :label="$t('dashboard.notifystateM')"
                >
                  <template slot-scope="scope">
                    <span>{{
                      $t("dashboard.renotifystateCode." + scope.row.notifystate)
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="150"
                  :label="$t('dashboard.receNameM')"
                >
                </el-table-column>
                <el-table-column
                  prop="email"
                  :label="$t('dashboard.receEmailM')"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  width="180"
                  :label="$t('dashboard.recePhoneM')"
                >
                </el-table-column>
                <el-table-column
                  prop="operName"
                  width="80"
                  :label="$t('dashboard.receOperNameM')"
                >
                </el-table-column>
                <el-table-column
                  prop="branchID"
                  :label="$t('dashboard.recePickupLocationM')"
                  width="150"
                >
                  <template slot-scope="scope">
                    <span>{{ showLocation(scope.row.branchID) }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                class="twoPage"
                @size-change="handleSizeChangeMail"
                @current-change="handleCurrentChangeMail"
                :total="totalcountMail"
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 15, 20, 30, 40, 50]"
                :page-size="pagesizeMail"
                :current-page="pageindexMail"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="third" id="panethree">
          <span slot="label" class="tabs-title">
            {{ $t("dashboard.paneThirdTitle") }}
          </span>
          <div class="three">
            <div class="threeleft">
              <el-form
                :rules="rules"
                ref="formTakepart"
                :model="formTakepart"
                label-width="100px"
                :label-position="labelPosition"
                class="threeForm"
              >
                <fieldset class="fieldsetOne">
                  <legend>
                    <div>{{ $t("dashboard.Conditionquery") }}</div>
                  </legend>
                  <el-form-item
                    :label="$t('dashboard.recepeoleName')"
                    prop="keyword"
                  >
                    <el-input
                      v-model="formTakepart.keyword"
                      style="width: 100%"
                      @input="getqueryInfo()"
                    ></el-input>
                  </el-form-item>
                </fieldset>
                <fieldset class="fieldsetTwo">
                  <legend>
                    <div>{{ $t("dashboard.Pickupinformation") }}</div>
                  </legend>
                  <el-form-item
                    :label="$t('dashboard.takepeoleCardNumber')"
                    prop="badgeID"
                  >
                    <el-input
                      id="badgeIDInput"
                      v-model="formTakepart.badgeID"
                      style="width: 100%"
                      @input="getbadgeID()"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="receName"
                    :label="$t('dashboard.takepeoleName')"
                  >
                    <el-autocomplete
                      id="takeInputInfo"
                      :placeholder="$t('dashboard.placereceNameT')"
                      v-model="formTakepart.receName"
                      :fetch-suggestions="querySearchAsyncTake"
                      @select="handleSelectTake"
                      style="width: 100%"
                    ></el-autocomplete>
                  </el-form-item>
                </fieldset>
                <el-form-item
                  label=""
                  style="padding: 20px 20px 0px; text-align: center"
                >
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="confirmTakeBtn('formTakepart')"
                  >
                    <span>{{ $t("dashboard.confirmReceT") }}</span></el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div class="threeright">
              <el-table
                v-loading="loadingTake"
                :data="tableDatatakepart"
                ref="tableDatatakepart"
                height="calc(100% - 60px)"
                class="threeTable"
                :header-cell-style="{
                  background: '#f0f2f5',
                }"
                @selection-change="handleSelectionChange"
                :row-key="getRowKeys"
                :cell-style="tableCellStyle"
                @row-click="clickRowTake"
              >
                <!-- fixed   选择 加到el-table上:header-cell-class-name="cellclass" -->
                <el-table-column
                  type="index"
                  :index="indexMethodTake"
                  :resizable="false"
                  width="50"
                  :label="$t('dashboard.indexlabel')"
                >
                </el-table-column>
                <el-table-column
                  type="selection"
                  width="50"
                  :reserve-selection="true"
                >
                </el-table-column>
                <el-table-column
                  prop="timeLocal"
                  width="180"
                  :label="$t('dashboard.receTimeT')"
                >
                </el-table-column>
                <el-table-column
                  prop="companyID"
                  :label="$t('dashboard.expressCompanyT')"
                >
                  <template slot-scope="scope">
                    <span>{{ showName(scope.row.companyID) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="courierCode"
                  :label="$t('dashboard.courierNumberT')"
                >
                </el-table-column>
                <el-table-column
                  prop="notifystate"
                  :label="$t('dashboard.notifystateT')"
                >
                  <template slot-scope="scope">
                    <span>{{
                      $t("dashboard.renotifystateCode." + scope.row.notifystate)
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="150"
                  :label="$t('dashboard.recepeopleNameTab')"
                >
                </el-table-column>
                <el-table-column
                  prop="email"
                  :label="$t('dashboard.receEmailT')"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  width="180"
                  :label="$t('dashboard.recePhoneT')"
                >
                </el-table-column>
                <el-table-column
                  prop="operName"
                  width="80"
                  :label="$t('dashboard.receOperNameT')"
                >
                </el-table-column>
                <el-table-column
                  prop="branchID"
                  width="150"
                  :label="$t('dashboard.recePickupLocationT')"
                >
                  <template slot-scope="scope">
                    <span>{{ showLocation(scope.row.branchID) }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                class="threePage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalcountTakePart"
                @size-change="handleSizeChangeTake"
                @current-change="handleCurrentChangeTake"
                :page-sizes="[10, 15, 20, 30, 40, 50]"
                :page-size="pagesizeTake"
                :current-page="pageindexTake"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 选择地点弹窗 -->
      <el-dialog
        :title="$t('dashboard.dialogTitle')"
        :visible.sync="locationDialog"
        width="500px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <el-form
          ref="locationform"
          :model="locationform"
          :label-position="labelPosition"
          :rules="rules"
        >
          <el-form-item
            :label="$t('dashboard.dialogregion')"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-select
              :placeholder="$t('dashboard.dialogplace')"
              style="width: 100%"
              v-model="locationform.code"
              value-key="code"
            >
              <el-option
                v-for="item in locationArrShow"
                :key="item.code"
                :label="item.label"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="confirmbtn('locationform')">{{
            $t("dashboard.dialogconfirm")
          }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript">
import {
  receive,
  fuzzyQuery,
  confirmRece,
  confirmMail,
  confirmTake,
  getEmpBadgeID,
} from "@/api/user.js";

import { getNowFormatDateMiao, getYearFormatDateMiao } from "@/utils/index";
import { str_gblen } from "@/utils/GlobalFunction.js";

import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      labelPosition: "top",
      activeName: "first",
      operID: "",
      operName: "",
      branchID: "",
      pickupLocation: "",
      rules: {
        companyID: [{ validator: this.checkCtype, trigger: "change" }],
        courierCode: [{ validator: this.checkCcode, trigger: "blur" }],
        details: [{ validator: this.checkData, trigger: "change" }],
        name: [{ validator: this.checkName, trigger: "blur" }],
        receName: [{ validator: this.checkreceName, trigger: "blur" }],
        region: [{ validator: this.checkregion, trigger: "change" }],
      },
      locationDialog: false,
      labelPosition: "top",
      formLabelWidth: "120px",
      locationform: {
        code: "",
      },
      //收件
      pageindex: 1,
      pagesize: 30,
      totalcount: 0,
      loading: false,
      bgNumberArr: [
        "x1",
        "x2",
        "x3",
        "x4",
        "x5",
        "x6",
        "x7",
        "x8",
        "x9",
        "x10",
      ],
      tableData: [],
      form: {
        companyName: "",
        courierCode: "",
        details: "",
        name: "",
        phone: "",
        countryCode: "",
        companyID: "",
        cardholderid: "",
        email: "",
      },
      //寄件
      pageindexMail: 1,
      pagesizeMail: 30,
      totalcountMail: 0,
      loadingMail: false,
      bgNumberArrJI: [
        "x1",
        "x2",
        "x3",
        "x4",
        "x5",
        "x6",
        "x7",
        "x8",
        "x9",
        "x10",
      ],
      tableDatamail: [],
      formMail: {
        companyName: "",
        courierCode: "",
        details: "",
        name: "",
        //add
        companyID: "",
        timeLocal: "",
        phone: "",
        cardholderid: "",
        countryCode: "",
        //end
      },
      //取件
      pageindexTake: 1,
      pagesizeTake: 30,
      totalcountTakePart: 0,
      loadingTake: false,
      multipleSelection: [],
      tableDatatakepart: [],
      formTakeClone: {},
      formTakepart: {
        keyword: "",
        // name: "",
        badgeID: "", //员工卡号
        receName: "",
        //add
        recePhone: "",
        receCardholderID: "", //员工号
        receCountryCode: "",
        //end
      },
    };
  },
  methods: {
    ...mapActions(["getcompanyNameList", "getpickupLocation"]),
    //初始化数据
    initialData() {
      //得到用户信息
      this.operID = this.$store.state.user.userid;
      this.operName = this.$store.state.user.name;
      //得到快递公司
      this.getcompanyNameList();
      //得到快递位置
      this.locationInfo();
    },
    //得到快递位置
    locationInfo() {
      this.getpickupLocation();
      let code = localStorage.getItem("commandTitle");
      if (!code) {
        this.locationDialog = true;
      } else {
        this.$store.state.locationArrShow.forEach((item) => {
          if (item["code"] === code) {
            this.branchID = item["code"];
            this.pickupLocation =
              this.$store.state.app.language === "zh-CN"
                ? item["cn"]
                : item["en"];
          }
        });
      }
    },
    confirmbtn(locationform) {
      this.$refs[locationform].validate((valid) => {
        if (valid) {
          let item = this.locationform.region;
          console.log("信息", item);
          this.$store.dispatch("location/setTitle", item);
          this.locationDialog = false;
        }
      });
    },
    //验证规则
    checkCtype: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.typetips")));
      }
      callback();
    },
    checkCcode: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.codetips")));
      } else {
        let reg = /^[0-9a-zA-Z]+$/;
        if (!reg.test(value)) {
          return callback(new Error(this.$t("tips.coderulestips")));
        }
      }
      callback();
    },
    checkData: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.numbertips")));
      }
      callback();
    },
    checkName: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.nametips")));
      }
      callback();
    },
    checkreceName: function (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("tips.takenametips")));
      }
      callback();
    },
    checkregion: function (rule, value, callback) {
      if (JSON.stringify(value) === "{}") {
        return callback(new Error(this.$t("tips.locatips")));
      }
      callback();
    },

    cellclass(row) {
      if (row.columnIndex === 1) {
        return "DisabledSelection";
      }
    },
    //切换时加载最新的table数据
    handleClick(tab, event) {
      this.queryRecord(tab.name);
    },
    //tabpane 切换时调用最新的方法
    queryRecord(name) {
      if (name === "first") {
        this.NewDataFIfunction();
      }
      if (name === "second") {
        this.NewDataSEfunction();
      }
      if (name === "third") {
        this.NewDataTHfunction();
      }
    },
    //收件时最新的table表信息
    NewDataFIfunction() {
      let type = {
        pickupType: 2049,
        pageindex: this.pageindex,
        pagesize: this.pagesize,
      };
      let that = this;
      that.loading = true;
      receive(type)
        .then(function (response) {
          // console.log("www", response);
          if (response.error === 0 && response.data) {
            that.totalcount = response.totalcount || 0;
            let rece = [];
            response.data.forEach((item) => {
              item.phone = "+" + item.countryCode + " " + item.phone;
              rece.push(item);
            });
            that.tableData = rece;
            that.loading = false;
          } else {
            that.tableData = [];
            that.loading = false;
          }
        })
        .catch(function (error) {
          console.log(error);
          that.loading = false;
        });
      that.$nextTick(() => {
        that.$refs.retable.doLayout();
      });
    },
    //寄件时最新的table表信息
    NewDataSEfunction() {
      let type = {
        pickupType: 2051,
        pageindex: this.pageindexMail,
        pagesize: this.pagesizeMail,
      };
      let that = this;
      that.loadingMail = true;
      receive(type)
        .then(function (response) {
          if (response.error === 0 && response.data) {
            that.totalcountMail = response.totalcount || 0;
            let rece = [];
            response.data.forEach(function (item) {
              item.phone = "+" + item.countryCode + " " + item.phone;
              rece.push(item);
            });
            that.tableDatamail = rece;
            that.loadingMail = false;
          } else {
            that.tableDatamail = [];
            that.loadingMail = false;
          }
        })
        .catch(function (error) {
          console.log(error);
          that.loadingMail = false;
        });
      that.$nextTick(() => {
        that.$refs.mailtable.doLayout();
      });
    },
    //取件时（只查询等待取件）最新的table表信息
    NewDataTHfunction() {
      const LastYearDateTake = getYearFormatDateMiao();
      const CurrentDateTake = getNowFormatDateMiao();
      let type = {
        pickupType: 2049,
        onlywaitforpickup: 1,
        pageindex: this.pageindexTake,
        pagesize: this.pagesizeTake,
        starttime: LastYearDateTake,
        endtime: CurrentDateTake,
        keyword: this.formTakepart.keyword,
      };
      let that = this;
      that.loadingTake = true;
      receive(type)
        .then(function (response) {
          // console.log("qq", response);
          if (response.error === 0 && response.data) {
            that.totalcountTakePart = response.totalcount || 0;
            let rece = [];
            response.data.forEach((item) => {
              if (item.phone) {
                item.phone = "+" + item.countryCode + " " + item.phone;
              } else {
                item.phone = "";
              }
              rece.push(item);
            });
            that.tableDatatakepart = rece;
            that.loadingTake = false;
          } else {
            that.tableDatatakepart = [];
            that.totalcountTakePart = 0;
            that.loadingTake = false;
          }
        })
        .catch(function (error) {
          console.log(error);
          that.loadingTake = false;
        });
      that.$nextTick(() => {
        that.$refs.tableDatatakepart.doLayout();
      });
    },
    //收件开始
    //得到快递公司ID，name
    async getItem(value) {
      // console.log(value);
      const response = await this.getcompanyNameList();
      // console.log(response);
      if (response.error === 0 && response.ele) {
        let select = value;
        response.ele.forEach((item) => {
          if (item.id === select) {
            this.form.companyID = item.id;
            this.form.companyName = item.label;
          }
        });
      } else {
        console.log(error);
      }
    },
    //模糊搜索
    querySearchAsync(queryString, cb) {
      let nameInfo = this.form.name;
      let strlength = 3;
      if (str_gblen(nameInfo) >= strlength) {
        //开始模糊搜索
        let info = {
          Ename: nameInfo,
        };
        let that = this;
        fuzzyQuery(info)
          .then(function (response) {
            // console.log(response);
            let demoArr = [];
            if (response.error === 0 && response.emp) {
              response.emp.forEach(function (item) {
                let demoObj = {};
                demoObj.value = item.Ename;
                demoObj.Ecountrycode = item.Ecountrycode;
                demoObj.Edivision = item.Edivision;
                demoObj.Eid = item.Eid;
                demoObj.Enamepinyin = item.Enamepinyin;
                demoObj.Eopenid = item.Eopenid;
                demoObj.Ephone = item.Ephone;
                demoObj.Ereserved = item.Ereserved;
                demoObj.Etitle = item.Etitle;
                demoArr.push(demoObj);
              });
              cb(demoArr);
              // console.log(demoArr);
              demoArr.forEach((item) => {
                if (item.value !== nameInfo) {
                  that.form.cardholderid = "";
                  that.form.countryCode = "";
                  that.form.phone = "";
                } else if (item.value === nameInfo) {
                  that.form.cardholderid = item.Eid;
                  that.form.countryCode = item.Ecountrycode;
                  that.form.phone = item.Ephone;
                }
              });
            } else {
              cb([]);
              that.$message.error(that.$t("tips.notstafftips"));
              that.form.cardholderid = "";
              that.form.countryCode = "";
              that.form.phone = "";
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        cb([]);
        return;
      }
    },
    handleSelect(item) {
      let that = this;
      that.form.cardholderid = item.Eid;
      that.form.countryCode = item.Ecountrycode;
      that.form.phone = item.Ephone;
    },
    //确认收件
    cReceive(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let formdata = this.form;
          let formdatareceClone = JSON.parse(JSON.stringify(formdata));
          if (formdatareceClone.cardholderid === "") {
            this.$message.error(this.$t("tips.notstafftips"));
            document.getElementById("reName").focus();
          } else {
            const CurrentDate = getNowFormatDateMiao();
            let info = {
              companyName: formdatareceClone.companyName,
              courierCode: formdatareceClone.courierCode,
              name: formdatareceClone.name,
              details: formdatareceClone.details,

              companyID: formdatareceClone.companyID,
              branchID: this.branchID,
              pickupLocation: this.pickupLocation,
              timeLocal: CurrentDate,
              operID: this.operID,
              operName: this.operName,
              phone: formdatareceClone.phone,
              cardholderid: formdatareceClone.cardholderid,
              countryCode: formdatareceClone.countryCode,
              email: formdatareceClone.email,
            };
            let that = this;
            // console.log("提交收件时的info", info);
            confirmRece(info)
              .then(function (response) {
                // console.log(response);
                if (response.error === 0) {
                  //清空表单数据时，prop是必填的，如果不填，默认不清空
                  that.$nextTick(() => {
                    that.$refs["form"].resetFields();
                    that.form.companyID = formdatareceClone.companyID;
                    that.form.details = formdatareceClone.details;
                  });
                  //更新表格
                  that.NewDataFIfunction();
                  that.$message({
                    message: that.$t("tips.recetips"),
                    type: "success",
                  });
                } else {
                  console.log(response.desc);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        } else {
          return false;
        }
      });
    },
    //分页信息
    getPage() {
      this.NewDataFIfunction();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.pageindex = 1;
      this.getPage();
    },
    handleCurrentChange(val) {
      this.pageindex = val;
      this.getPage();
    },
    //分页索引接着上一页的索引
    indexMethod(index) {
      return (this.pageindex - 1) * this.pagesize + index + 1;
    },
    //收件结束
    //
    //
    //
    //寄件开始
    //得到快递公司ID，name
    async getMailItem(value) {
      const response = await this.getcompanyNameList();
      // console.log(response);
      if (response.error === 0 && response.ele) {
        let select = value;
        response.ele.forEach((item) => {
          if (item.id === select) {
            this.formMail.companyID = item.id;
            this.formMail.companyName = item.label;
          }
        });
      } else {
        console.log(error);
      }
    },
    //模糊搜素
    querySearchAsyncMail(queryString, cb) {
      let nameInfo = this.formMail.name;
      let strlength = 3;
      if (str_gblen(nameInfo) >= strlength) {
        //开始模糊搜索
        let keyword = {
          Ename: this.formMail.name,
        };
        let that = this;
        fuzzyQuery(keyword)
          .then(function (response) {
            if (response.error === 0 && response.emp) {
              let nameArr = [];
              response.emp.forEach(function (item) {
                let nameObj = {};
                nameObj.value = item.Ename;
                nameObj.Ephone = item.Ephone;
                nameObj.Ecountrycode = item.Ecountrycode;
                nameObj.Edivision = item.Edivision;
                nameObj.Eid = item.Eid;
                nameObj.Enamepinyin = item.Enamepinyin;
                nameObj.Eopenid = item.Eopenid;
                nameObj.Ereserved = item.Ereserved;
                nameObj.Etitle = item.Etitle;
                nameArr.push(nameObj);
              });
              cb(nameArr);
              nameArr.forEach((item) => {
                if (item.value !== nameInfo) {
                  that.formMail.cardholderid = "";
                  that.formMail.countryCode = "";
                  that.formMail.phone = "";
                } else if (item.value === nameInfo) {
                  that.formMail.cardholderid = item.Eid;
                  that.formMail.countryCode = item.Ecountrycode;
                  that.formMail.phone = item.Ephone;
                }
              });
            } else {
              cb([]);
              that.$message.error(that.$t("tips.notstafftips"));
              that.formMail.cardholderid = "";
              that.formMail.countryCode = "";
              that.formMail.phone = "";
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        cb([]);
        return;
      }
    },
    handleSelectMail(item) {
      // console.log(item);
      this.formMail.phone = item.Ephone;
      this.formMail.countryCode = item.Ecountrycode;
      this.formMail.cardholderid = item.Eid;
    },
    //确认寄件
    confirmMailBtn(formMail) {
      this.$refs[formMail].validate((valid) => {
        if (valid) {
          let formdata = this.formMail;
          let formMailClone = JSON.parse(JSON.stringify(formdata));
          // console.log("表单信息是", formMailClone);
          if (formMailClone.cardholderid === "") {
            this.$message.error(this.$t("tips.notstafftips"));
            document.getElementById("mailName").focus();
          } else {
            const CurrentDateMail = getNowFormatDateMiao();
            let info = {
              companyName: formMailClone.companyName,
              courierCode: formMailClone.courierCode,
              details: formMailClone.details,
              name: formMailClone.name,
              branchID: this.branchID,
              pickupLocation: this.pickupLocation,
              operID: this.operID,
              operName: this.operName,
              companyID: formMailClone.companyID,
              timeLocal: CurrentDateMail,
              phone: formMailClone.phone,
              cardholderid: formMailClone.cardholderid,
              countryCode: formMailClone.countryCode,
            };
            let that = this;
            confirmMail(info)
              .then(function (response) {
                if (response.error === 0) {
                  //清空表单数据
                  that.$nextTick(() => {
                    that.$refs["formMail"].resetFields();
                    that.formMail.companyID = formMailClone.companyID;
                    that.formMail.details = formMailClone.details;
                  });
                  //更新最新的表格数据
                  that.NewDataSEfunction();
                  that.$message({
                    message: that.$t("tips.mailtips"),
                    type: "success",
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        } else {
          return false;
        }
      });
    },
    //分页信息
    getPageMail() {
      this.NewDataSEfunction();
    },
    handleSizeChangeMail(val) {
      this.pagesizeMail = val;
      this.pageindexMail = 1;
      this.getPageMail();
    },
    handleCurrentChangeMail(val) {
      this.pageindexMail = val;
      this.getPageMail();
    },
    //分页索引接着上一页的索引
    indexMethodMail(index) {
      return (this.pageindexMail - 1) * this.pagesizeMail + index + 1;
    },
    //寄件结束
    //
    //
    //
    //取件开始
    //多选时每一行
    getRowKeys(row) {
      return row.id;
    },
    //分页信息
    getPageTake() {
      this.NewDataTHfunction();
    },
    handleSizeChangeTake(val) {
      this.pagesizeTake = val;
      this.pageindexTake = 1;
      this.getPageTake();
    },
    handleCurrentChangeTake(val) {
      this.pageindexTake = val;
      this.getPageTake();
    },
    //分页索引接着上一页的索引
    indexMethodTake(index) {
      return (this.pageindexTake - 1) * this.pagesizeTake + index + 1;
    },
    //进行查询
    getqueryInfo() {
      this.NewDataTHfunction();
    },
    //取件人卡号
    getbadgeID() {
      let idInfo = this.formTakepart.badgeID;
      let strLength = 1;
      if (idInfo.length >= strLength) {
        let info = {
          badgeid: this.formTakepart.badgeID,
        };
        let that = this;
        fuzzyQuery(info)
          .then(function (response) {
            // console.log("aaa", response);
            if (response.error === 0 && response.emp) {
              response.emp.forEach((item) => {
                that.formTakepart.receName = item.Ename;
              });
            } else {
              that.formTakepart.receName = "";
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    //取件人姓名模糊搜索
    querySearchAsyncTake(queryString, cb) {
      let nameInfo = this.formTakepart.receName;
      let strlength = 3;
      if (str_gblen(nameInfo) >= strlength) {
        //开始搜索
        let info = {
          Ename: nameInfo,
        };
        let that = this;
        fuzzyQuery(info)
          .then(function (response) {
            let nameArr = [];
            if (response.error === 0 && response.emp) {
              // console.log(response);
              response.emp.forEach((item) => {
                let nameObj = {};
                nameObj.value = item.Ename;
                nameObj.Ecountrycode = item.Ecountrycode;
                nameObj.Edivision = item.Edivision;
                nameObj.Eid = item.Eid;
                nameObj.Enamepinyin = item.Enamepinyin;
                nameObj.Eopenid = item.Eopenid;
                nameObj.Ephone = item.Ephone;
                nameObj.Ereserved = item.Ereserved;
                nameObj.Etitle = item.Etitle;
                nameArr.push(nameObj);
              });
              cb(nameArr);
              // console.log(nameArr);
              nameArr.forEach((item) => {
                if (item.value !== nameInfo) {
                  that.formTakepart.receCardholderID = "";
                  that.formTakepart.receCountryCode = "";
                  that.formTakepart.recePhone = "";
                } else if (item.value === nameInfo) {
                  that.formTakepart.receCardholderID = item.Eid;
                  that.formTakepart.receCountryCode = item.Ecountrycode;
                  that.formTakepart.recePhone = item.Ephone;
                }
              });
            } else {
              cb([]);
              that.$message.error(that.$t("tips.notstafftips"));
              that.formTakepart.badgeID = "";
              that.formTakepart.receCardholderID = "";
              that.formTakepart.receCountryCode = "";
              that.formTakepart.recePhone = "";
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        cb([]);
        return;
      }
    },
    handleSelectTake(item) {
      // console.log("我选中了", item);
      this.formTakepart.receCardholderID = item.Eid;
      this.formTakepart.receCountryCode = item.Ecountrycode;
      this.formTakepart.recePhone = item.Ephone;
      let info = {
        Eid: item.Eid,
      };
      let that = this;
      getEmpBadgeID(info)
        .then(function (response) {
          // console.log("11", response);
          if (response.error === 0 && response.badge) {
            response.badge.forEach((item) => {
              that.formTakepart.badgeID = item.Bid;
            });
          } else {
            that.formTakepart.badgeID = "";
            // that.$message({
            //   message: "卡号不存在",
            //   type: "warning",
            // });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //被勾选的table数组
    handleSelectionChange(val) {
      let that = this;
      that.multipleSelection = val;
    },
    //点击某一行就可以选中CheckBox，不用具体点对勾
    clickRowTake(row, column, event) {
      this.$refs.tableDatatakepart.toggleRowSelection(row);
    },
    //确认取件开始
    confirmTakeBtn(formTakepart) {
      this.$refs[formTakepart].validate((valid) => {
        if (valid) {
          let formdata = this.formTakepart;
          this.formTakeClone = JSON.parse(JSON.stringify(formdata));
          // console.log("表单信息", this.formTakeClone);
          if (this.formTakeClone.receCardholderID === "") {
            this.$message.error(this.$t("tips.notstafftips"));
            document.getElementById("takeInputInfo").focus();
          } else {
            //开始取件
            this.confirmTakeFunction();
          }
        }
      });
    },
    async confirmTakeFunction() {
      if (this.multipleSelection.length <= 0) {
        this.$message.error(this.$t("tips.pleaseselecttips"));
      } else {
        let multipleSelectionSame = [];
        let multipleSelectionDiff = [];
        // console.log("多选数组是", this.multipleSelection);
        this.multipleSelection.forEach((item) => {
          if (item.name === this.formTakeClone.receName) {
            multipleSelectionSame.push(item);
          } else {
            multipleSelectionDiff.push(item);
          }
        });
        if (multipleSelectionDiff.length > 0) {
          await new Promise((resolve, reject) => {
            let result = [];
            multipleSelectionDiff.forEach((item) => {
              result.push(item.name);
            });
            let resultNew = [...new Set(result)];
            this.$confirm(
              this.$t("tips.infotips") +
                resultNew +
                this.$t("tips.packagetips"),
              this.$t("tips.TIPtips"),
              {
                confirmButtonText: this.$t("tips.confirm"),
                cancelButtonText: this.$t("tips.cancel"),
                type: "warning",
              }
            )
              .then(() => {
                multipleSelectionDiff.forEach((item) => {
                  const CurrentDateTake = getNowFormatDateMiao();
                  let info = {
                    id: item.id,
                    badgeID: this.formTakeClone.badgeID,
                    receCardholderID: this.formTakeClone.receCardholderID,
                    receName: this.formTakeClone.receName,
                    timeLocal: CurrentDateTake,
                    operName: this.operName,
                    operID: this.operID,
                    receCountryCode: this.formTakeClone.receCountryCode,
                    recePhone: this.formTakeClone.recePhone,
                    receEmail: "",
                  };
                  let that = this;
                  confirmTake(info)
                    .then(function (response) {
                      if (response.error === 0) {
                        // console.log("不同的已被取走");
                        resolve(response);
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                      reject(error);
                    });
                });
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        }
        if (multipleSelectionSame.length > 0) {
          await new Promise((resolve, reject) => {
            multipleSelectionSame.forEach((item) => {
              const CurrentDateTake = getNowFormatDateMiao();
              let info = {
                id: item.id,
                badgeID: this.formTakeClone.badgeID,
                receCardholderID: this.formTakeClone.receCardholderID,
                receName: this.formTakeClone.receName,
                timeLocal: CurrentDateTake,
                operName: this.operName,
                operID: this.operID,
                receCountryCode: this.formTakeClone.receCountryCode,
                recePhone: this.formTakeClone.recePhone,
                receEmail: "",
              };
              let that = this;
              confirmTake(info)
                .then(function (response) {
                  // console.log("确认收件的", response);
                  if (response.error === 0) {
                    // console.log("相同的已被取走");
                    resolve(response);
                  } else if (response.error === 13) {
                    that.$message({
                      message: that.$t("tips.overtips"),
                      type: "warning",
                    });
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  reject(error);
                });
            });
          });
        }
        //手动清空勾选状态
        this.$refs.tableDatatakepart.clearSelection();
        //清空表单数据;
        this.formTakepart.keyword = "";
        this.formTakepart.badgeID = "";
        this.formTakepart.receName = "";
        this.formTakepart.receCardholderID = "";
        this.formTakepart.receCountryCode = "";
        this.formTakepart.recePhone = "";
        // for循环完了再统一刷新表格;
        this.NewDataTHfunction();
        this.$message({
          message: this.$t("tips.taketips"),
          type: "success",
        });
      }
    },
    //取件结束
  },
  computed: {
    ...mapState(["tableCellStyle"]),
    ...mapGetters([
      "companyNameListenable",
      "showName",
      "showLocation",
      "language",
      "commandTitle",
      "locationArrShow",
    ]),
  },
  watch: {
    language: function (val) {
      // console.log(val);
    },
    commandTitle: function (val) {
      // console.log("新值", val);
      this.locationInfo();
    },
  },
  created() {
    this.initialData();
  },
  mounted() {
    this.getPage();
  },
};
</script>

<style lang="scss" >
$status-left-width: 5px;
$drawer-left-width: 3px;
#dashboard-container {
  padding: 10px 10px 20px 10px;
  background-color: #f0f2f5;
  height: calc(100vh - 50px);
  // border: 1px solid blue;
  .dashboard-containerBox {
    background: #fff;
    height: 100%;
    padding: 10px;
    // border: 1px solid blue;
    .tabsBox {
      // border: 1px solid red;
      height: 100%;
      padding: 10px;
      #paneone {
        height: calc(100vh - 50px - 130px);
        .one {
          display: flex;
          width: 100%;
          height: 100%;
          // border: 1px solid red;
          .oneleft {
            width: 300px;
            height: 100%;
            background: #f0f2f5;
            padding: 4px;
            // border: 1px solid red;
            .oneForm {
              background: #fff;
              height: 100%;
              padding: 0px 15px;
              overflow: auto;
            }
          }
          .oneright {
            width: calc(100% - 300px);
            height: 100%;
            margin-left: 10px;
            // border: 1px solid blue;
            background: #f0f2f5;
            padding: 4px;
            overflow: auto;
            position: relative;
            .table {
              // border: 1px solid red;
              background: #fff;
              // height: calc(100% - 60px);
              overflow: auto;
            }
            .page {
              // border: 1px solid red;
              background: #fff;
              height: 60px;
              width: calc(100% - 8px);
              overflow: auto;
              position: absolute;
              text-align: center;
              bottom: 4px;
              padding-top: 15px;
            }
          }
        }
      }
      #panetwo {
        height: calc(100vh - 50px - 130px);
        .two {
          display: flex;
          width: 100%;
          height: 100%;
          // border: 1px solid red;
          .twoleft {
            width: 300px;
            height: 100%;
            background: #f0f2f5;
            padding: 4px;
            // border: 1px solid red;
            .twoForm {
              background: #fff;
              height: 100%;
              padding: 0px 15px;
              overflow: auto;
            }
          }
          .tworight {
            width: calc(100% - 300px);
            height: 100%;
            background: #f0f2f5;
            padding: 4px;
            margin-left: 10px;
            // border: 1px solid blue;
            overflow: auto;
            position: relative;
            .twoTable {
              // border: 1px solid red;
              background: #fff;
              // height: calc(100% - 60px);
              overflow: auto;
            }
            .twoPage {
              // border: 1px solid red;
              background: #fff;
              height: 60px;
              width: calc(100% - 8px);
              overflow: auto;
              position: absolute;
              text-align: center;
              bottom: 4px;
              padding-top: 15px;
            }
          }
        }
      }
      #panethree {
        // border: 1px solid rgb(182, 18, 18);
        height: calc(100vh - 50px - 130px);
        .three {
          display: flex;
          width: 100%;
          height: 100%;
          // border: 1px solid red;
          .threeleft {
            width: 300px;
            height: 100%;
            background: #f0f2f5;
            // padding: 8px;
            // border: 1px solid red;
            .threeForm {
              height: 100%;
              background: #fff;
              overflow: auto;
            }
            .fieldsetOne {
              border: 4px solid #f0f2f5;
              color: #909399;
              margin-bottom: 20px;
              // margin-top: 5px;
            }
            .fieldsetTwo {
              border: 4px solid #f0f2f5;
              color: #909399;
              margin-bottom: 20px;
            }
          }
          .threeright {
            width: calc(100% - 300px);
            height: 100%;
            background: #f0f2f5;
            padding: 4px;
            margin-left: 10px;
            // border: 1px solid blue;
            overflow: auto;
            position: relative;
            .threeTable {
              // border: 1px solid red;
              background: #fff;
              // height: calc(100% - 60px);
              overflow: auto;
            }
            .threePage {
              // border: 1px solid red;
              background: #fff;
              height: 60px;
              width: calc(100% - 8px);
              overflow: auto;
              position: absolute;
              text-align: center;
              bottom: 4px;
              padding-top: 15px;
            }
          }
        }
      }
      .tabs-title {
        font-size: 1.1rem;
      }
      //add
      .el-table ::v-deep .DisabledSelection .cell .el-checkbox__inner {
        display: none;
        position: relative;
      }
      .el-table ::v-deep .DisabledSelection .cell:before {
        content: "选择";
        position: absolute;
        font-size: 14px;
        color: #909399;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
          Microsoft YaHei, Arial, sans-serif;
      }
      //end
    }
  }
}
</style>