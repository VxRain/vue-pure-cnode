<template>
  <transition name="fade">
    <div v-if="condition" tabindex="0" aria-label="Loading" class="loadMask is-full-page is-active">
      <div class="mask-background"></div>
      <div class="mask-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          height="75"
          width="75"
          fill="#007bff"
        >
          <rect x="0" y="13" width="4" height="5">
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="10" y="13" width="4" height="5">
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="20" y="13" width="4" height="5">
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>
      <div class="loading-error" v-if="isTimeout">API接口响应超时</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Loading",
  props: ["condition"],
  data() {
    return {
      isTimeout: false
    };
  },
  methods: {
    checkTimeout() {
      let timer = setTimeout(() => {
        if (!this.condition) {
          this.isTimeout = true;
        }
      }, 8000);
    }
  },
  mounted() {
    this.checkTimeout();
  }
};
</script>

<style>
/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 遮罩样式 */
.loadMask {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}

.loadMask.is-active {
  display: flex;
}

.loadMask.is-full-page {
  z-index: 9999;
  position: fixed;
}

.loadMask .mask-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 1;
}

.loadMask .mask-icon {
  position: relative;
}
</style>