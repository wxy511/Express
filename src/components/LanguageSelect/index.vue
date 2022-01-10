<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon class-name="international-icon" icon-class="icd-earth" />
      <span class="text"> {{ $t("language." + language) }} </span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh-CN'" command="zh-CN">
        简体中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import i18n from "@/languages";
export default {
  computed: {
    language() {
      return this.$store.getters.language;
    },
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("app/setLanguage", lang);
      document.title = i18n.t("Title");
    },
  },
};
</script>
<style scoped>
.text {
  font-size: 1rem;
}
</style>
