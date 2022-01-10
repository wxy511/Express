 <template>
  <div class="locationConf-container">
    <div class="locationBox">
      <div class="left">
        <div style="background: #fff; height: 100%">
          <el-tree
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
            default-expand-all
          ></el-tree>
        </div>
      </div>
      <div class="right">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          :label-position="labelPosition"
        >
          <div class="one">
            <div style="background: #fff; padding: 0 15px">
              <el-form-item label="位置编码" prop="locaCode">
                <el-input v-model.trim="form.locaCode"></el-input>
              </el-form-item>
              <el-form-item label="位置名称" prop="locaName">
                <el-input v-model.trim="form.locaName"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="btns">
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="addbtn()"
                    v-show="this.btnNumber === 0"
                    >添加</el-button
                  >
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="editbtn()"
                    v-show="this.btnNumber === 0"
                    >修改</el-button
                  >
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="deletebtn()"
                    v-show="this.btnNumber === 0"
                    >删除</el-button
                  >
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="confirmbtn('form')"
                    v-show="this.btnNumber === 1"
                    >确定</el-button
                  >
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="cancelbtn('form')"
                    v-show="this.btnNumber === 1"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="elimibtn()"
                    v-show="this.btnNumber === 1"
                    >清除</el-button
                  >
                </div>
              </el-form-item>
            </div>
          </div>
          <fieldset class="fieldset">
            <legend>配置当前位置</legend>
            <el-form-item>
              <el-button type="primary" style="width: 100%; margin-top: 20px"
                >设为当前位置</el-button
              >
            </el-form-item>
          </fieldset>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "locationConf",
  data() {
    return {
      labelPosition: "top",
      btnNumber: 0,
      form: {},
      data: [
        {
          label: "位置名称",
          children: [
            {
              label: "SH",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //点击快递公司item
    handleNodeClick(data) {
      console.log("我点击的是", data);
    },
    //添加
    addbtn() {
      this.btnNumber = 1;
    },
    //修改
    editbtn() {},
    //删除
    deletebtn() {},
    //确定
    confirmbtn() {},
    //取消
    cancelbtn() {
      this.btnNumber = 0;
    },
    //清除
    elimibtn() {},
  },
};
</script>
<style lang="scss" scoped>
.locationConf-container {
  padding: 10px 5px 10px 5px;
  min-height: calc(100vh - 50px);
  background-color: #f0f2f5;
  .locationBox {
    // border: 1px solid red;
    background: #fff !important;
    padding: 16px;
    display: flex;
    .left {
      // border: 1px solid red;
      width: 20%;
      background: #f0f2f5;
      padding: 8px;
    }
    .right {
      // border: 1px solid blue;
      width: 30%;
      background: #fff;
      margin-left: 10px;
      .one {
        border: 8px solid #f0f2f5;
        color: #909399;
        margin-bottom: 10px;
        .btns {
          display: flex;
          justify-content: space-between;
        }
      }
      .fieldset {
        border: 8px solid #f0f2f5;
        color: #909399;
      }

      // .fieldset {
      // border: 8px solid #f0f2f5;
      // color: #909399;
      //   margin-bottom: 20px;
      // }
    }
  }
}
</style>
