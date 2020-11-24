<template>
  <div  v-if="data" @dblclick="openExplorer(data)" class="directory-wrapper mx-10 mt-3">
    <img  src="~@/assets/images/base/folder.svg" alt="" />
    <p>{{ data.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Object,
    },
  },
  methods: {
    openExplorer(data){
      this.$store.dispatch("openExplorer", data)
    },
  }
};
</script>

<style lang="scss" scoped>
.directory-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
  img {
    width: 40px;
  }
  p {
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // transition: .3s ease-in-out;
    color: $white;
  }
  &:hover {
    p {
      width: 100%;
      overflow: initial;
      text-overflow: initial;
      white-space: initial;
    }
  }
}
</style>