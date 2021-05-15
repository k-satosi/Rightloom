<template>
  <div class="photo">
    <b-img thumbnail fluid v-bind="mainProps" :src="item.path"/>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      path: '',
    },
  },
  data() {
    return {
      mainProps: {
        width: "320",
      },
    };
  }
};
</script>
