<template>
  <span
    :class="trigger === 'click' ? 'trigger-click' : 'trigger'"
    data-mb-component-type="tooltip"
    tabindex="0"
  >
    <portal v-if="targetEl.id" :to="'tooltip:' + targetEl.id">
      <slot name="content"></slot>
    </portal><!-- do not delete this comment, it is for the stray space issue (#2419)
 --><v-tooltip
      v-if="isMounted"
      :auto-hide="!isInput"
      :triggers="triggers"
      :popper-triggers="triggers"
      :hide-triggers="triggers"
      :placement="placement"
      :delay="0"
      shift-cross-axis
    >
      <template #popper>
        <slot name="content"></slot>
      </template><!-- do not delete this comment, it is for the stray space issue (#2419)
   --><span v-if="!isInput" @click.stop>
        <slot></slot>
      </span>
      <slot v-else></slot>
    </v-tooltip>
  </span>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Portal } from 'portal-vue';

export default {
  name: 'Tooltip',
  components: {
    Portal,
  },
  props: {
    trigger: {
      type: String,
      default: 'hover focus',
    },
    placement: {
      type: String,
      default: 'top',
    },
  },
  data() {
    return {
      targetEl: {},
      isMounted: false,
    };
  },
  computed: {
    triggers() {
      return this.trigger.split(' ');
    },
    isInput() {
      // <input> tags need to be handled separately as they need to retain focus on inputs
      if (!this.$slots.default) return false;
      return this.$slots.default().some(vnode => vnode.type === 'input');
    },
  },
  mounted() {
    this.targetEl = this.$el;
    this.isMounted = true;
  },
};
</script>

<style>
    /* stylelint-disable selector-class-pattern */
    .v-popper--theme-tooltip .v-popper__inner {
        /* following bootstrap */
        background: rgb(0 0 0 / 90%);
        padding: 4px 8px;
        font-size: 0.875rem;
        max-width: 200px;
        text-align: center;
    }
    /* stylelint-enable selector-class-pattern */
</style>
