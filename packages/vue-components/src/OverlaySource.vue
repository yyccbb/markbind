<template>
  <component :is="tagName" v-bind="$attrs">
    <slot></slot>
    <portal v-if="enablePortal" :to="to">
      <component
        :is="tagName"
        v-bind="$attrs"
        :class="[$attrs.class || '', 'mb-mobile-nav']"
        :style="$attrs.style"
      >
        <slot></slot>
      </component>
    </portal>
  </component>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Portal } from 'portal-vue';

export default {
  name: 'OverlaySource',
  components: {
    Portal,
  },
  props: {
    to: {
      type: String,
      default: undefined,
    },
    tagName: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      enablePortal: false, // don't render this for SSR needlessly
    };
  },
  mounted() {
    this.enablePortal = true;
  },
};
</script>

<style scoped>
    .mb-mobile-nav {
        display: block !important;
        margin: 0 !important;
        border: none !important;
        padding: 10px !important;
        width: 100% !important;
        max-width: 100% !important;
    }
</style>
