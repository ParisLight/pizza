<template>
  <slot name="header"></slot>
  <main class="main">
    <slot></slot>
  </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>