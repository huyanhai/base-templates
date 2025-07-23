<template>
  <div class="flex w-screen h-screen flex-col">
    <p class="text-5xl text-center my-10 text-cyan-900">
      {{ $t('base.hellow') }}
    </p>
    <div class="flex justify-center">
      <button
        v-for="item in langList"
        :key="item.code"
        class="text-cyan-700 mx-2"
        @click="setLang(item.code)"
      >
        {{ item.text }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { setAppLang } from '@/locales';

const setLang = (lang: string) => {
  setAppLang(lang);
};

const langList = ref([
  {
    text: '中文',
    code: 'zh'
  },
  {
    text: '英文',
    code: 'en'
  },
  {
    text: '日文',
    code: 'ja'
  }
]);
</script>

<style lang="scss"></style>
