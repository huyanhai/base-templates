<template>
  <div class="tw-flex tw-w-screen tw-h-screen tw-flex-col">
    <p class="tw-text-5xl tw-text-center tw-my-10 tw-text-cyan-900">
      {{ $t('base.hellow') }}
    </p>
    <div class="tw-flex tw-justify-center">
      <button
        v-for="item in langList"
        :key="item.code"
        class="tw-text-cyan-700 tw-mx-2"
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
