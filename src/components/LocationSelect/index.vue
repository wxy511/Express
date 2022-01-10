<template>
  <div>
    <el-dropdown @command="handleCommand">
      <div>
        <span class="text"> {{ commandTitle }} </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in locationArrShow"
          :key="item.code"
          :command="item.code"
          >{{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    initialData() {},
    handleCommand(value) {
      this.$store.dispatch("location/setTitle", value);
    },
  },
  computed: {
    ...mapGetters(["commandTitle", "locationArrShow"]),
  },
};
</script>
<style scoped>
.text {
  font-size: 1rem;
}
</style>
