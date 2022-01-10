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
              title="收件详细信息"
              :column="1"
              border
              label-class-name="my-label"
              content-class-name="my-content"
            >
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  通知状态
                </template>
                {{ $t("dashboard.renotifystateCode." + data.notifystate) }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  收件人E-mail
                </template>
                {{ data.email }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  收件位置
                </template>
                {{ showLocation(data.branchID) }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  操作员
                </template>
                {{ data.operName }}
              </el-descriptions-item>
            </el-descriptions>
          </el-timeline-item>
          <el-timeline-item>
            <el-descriptions
              title="取件信息"
              :column="1"
              border
              label-class-name="my-label"
              content-class-name="my-content"
            >
              <template>
                <el-descriptions-item label="取件时间">
                  {{ !data.receiver ? " " : data.receiver.timeLocal }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    通知状态
                  </template>
                  <!-- {{ data.notifystate }} -->
                  {{ !data.receiver ? "" : data.notifystate }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    取件人姓名
                  </template>
                  <!-- {{ data.receiver.empName }} -->
                  {{ !data.receiver ? "" : data.receiver.empName }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    取件人手机
                  </template>
                  <!-- {{ data.receiver.empPhone }} -->
                  {{ !data.receiver ? "" : data.receiver.empPhone }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    取件人卡号
                  </template>
                  <!-- {{ data.receiver.badgeID }} -->
                  {{ !data.receiver ? "" : data.receiver.badgeID }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    取件人员工号
                  </template>
                  <!-- {{ data.receiver.empID }} -->
                  {{ !data.receiver ? "" : data.receiver.empID }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    取件操作员
                  </template>
                  <!-- {{ data.receiver.operName }} -->
                  {{ !data.receiver ? "" : data.receiver.operName }}
                </el-descriptions-item>
              </template>
            </el-descriptions>
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
        /* border: 1px solid red !important; */
        width: 40%;
      }
      .my-content {
        /* border: 1px solid blue !important; */
        width: 60%;
      }
    }
  }
}
</style>
