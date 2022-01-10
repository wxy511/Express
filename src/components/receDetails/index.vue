<template>
  <div class="receDetailBox">
    <el-drawer :visible.sync="drawerVisible" :with-header="false">
      <div class="header">
        {{ $t("record.receName1") + data.name }}
      </div>
      <div class="body">
        <el-timeline class="timeline">
          <el-timeline-item>
            <el-descriptions
              :title="$t('receDetailDialog.receTitle')"
              :column="1"
              border
              label-class-name="my-label"
              content-class-name="my-content"
            >
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.recenotify") }}
                </template>
                {{ $t("dashboard.renotifystateCode." + data.notifystate) }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.receemail") }}
                </template>
                {{ data.email }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.receLocation") }}
                </template>
                {{ showLocation(data.branchID) }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.receoperation") }}
                </template>
                {{ data.operName }}
              </el-descriptions-item>
            </el-descriptions>
          </el-timeline-item>
          <el-timeline-item>
            <el-descriptions
              :title="$t('receDetailDialog.takeInfo')"
              :column="1"
              border
              label-class-name="my-label"
              content-class-name="my-content"
              v-if="data.receiver"
            >
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.taketime") }}
                </template>
                {{ data.receiver.timeLocal }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.takeName") }}
                </template>
                {{ data.receiver.empName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.takephone") }}
                </template>
                {{ data.receiver.empPhone }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.takecard") }}
                </template>
                {{ data.receiver.badgeID }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.takeemcard") }}
                </template>
                {{ data.receiver.empID }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  {{ $t("receDetailDialog.takeoperation") }}
                </template>
                {{ data.receiver.operName }}
              </el-descriptions-item>
            </el-descriptions>
            <div v-if="!data.receiver">
              <span class="title"> {{ $t("receDetailDialog.takeInfo") }}</span>
              <div style="margin-top: 20px">
                {{ $t("receDetailDialog.notakeInfo") }}
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
  name: "ReceDetails",
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      drawerVisible: false,
      // receiver: "0",
    };
  },
  methods: {
    visible() {
      this.drawerVisible = true;
    },
  },
  computed: {
    ...mapGetters(["showLocation"]),
  },
};
</script>
<style lang="scss" >
.receDetailBox {
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
