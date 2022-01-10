<template>
  <div class="mailDetailBox">
    <el-drawer :visible.sync="maildrawerVisible" :with-header="false">
      <div class="header">
        {{ $t("record.mailName1") + data.name }}
      </div>
      <div class="body">
        <el-timeline class="timeline">
          <el-timeline-item>
            <el-descriptions
              :title="$t('mailDetailDialog.mailTitle')"
              :column="1"
              border
              label-class-name="my-label"
              content-class-name="my-content"
            >
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("mailDetailDialog.mailnotify") }}
                </template>
                {{ $t("dashboard.renotifystateCode." + data.notifystate) }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("mailDetailDialog.mailemail") }}
                </template>
                {{ data.email }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("mailDetailDialog.maillocation") }}
                </template>
                {{ showLocation(data.branchID) }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("mailDetailDialog.mailoperation") }}
                </template>
                {{ data.operName }}
              </el-descriptions-item>
            </el-descriptions>
          </el-timeline-item>
          <el-timeline-item>
            <div>
              <span class="title">
                {{ $t("mailDetailDialog.mailotherInfo") }}
              </span>
              <div style="margin-top: 20px">
                {{ $t("mailDetailDialog.nomailInfo") }}
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "MailDetails",
  props: ["data"],
  data() {
    return {
      maildrawerVisible: false,
    };
  },
  methods: {
    visible() {
      this.maildrawerVisible = true;
    },
  },
  computed: {
    ...mapGetters(["showLocation"]),
  },
};
</script>
<style lang="scss">
.mailDetailBox {
  .header {
    border-bottom: 1px solid #dcdfe6;
    line-height: 50px;
    margin: 10px 15px;
  }
  .body {
    .timeline {
      padding: 15px;
      .my-label {
        width: 40%;
      }
      .my-content {
        width: 60%;
      }
      .title {
        font-size: 16px;
        color: #301133;
        font-weight: 700;
      }
    }
  }
}
</style>
