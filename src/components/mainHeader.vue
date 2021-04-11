<template>
      <div>
            <div class="main-header">
                  <div @click="go" class="left-home"></div>
            </div>
      </div>
</template>

<script>
export default {
      components: {},
      data() {
            return {}
      },
      methods: {
            go() {
                  if (location.pathname.includes("/article/")) {
                        this.$router.push("/article")
                  } else {
                        this.$router.push("/")
                  }
            }
      },
      mounted() {}
}
</script>
<style lang="less" scoped>
@Height: 46px;
.position {
      height: @Height;
      width: 100%;
      opacity: 0;
}
.main-header {
      height: @Height;
      line-height: @Height;
      position: fixed;
      top: 0;
      z-index: 1;
      width: 100%;
      background-color: #fff;
      // box-shadow: 0 0px 2px rgba(0, 0, 0, .12);
      .left-home {
            border-radius: 50%;
            font-size: 20px;
            color: rgb(94, 73, 73);
            margin-left: 20px;
            display: inline-block;
            height: 100%;
            width: 30px;
            cursor: pointer;
            background: url("/image/img/Feya.png") no-repeat center/contain;
      }
}
</style>
