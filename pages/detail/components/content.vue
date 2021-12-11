<template>
  <div class="page-detail-content">
    <div class="page-detail-content-title">
      <div class="page-detail-content-title-main van-ellipsis">
        {{ value.name }}
      </div>
      <div class="page-detail-content-title-action">
        <span>收藏</span>
        <color-icon
          :name="storeName"
          :color="storeColor"
          @click="handleStore"
        />
      </div>
    </div>
    <van-rate :value="rate" count="10" @change="handleRate" />

    <div class="page-detail-content-normal-title-block">楼主评分:</div>
    <div class="page-detail-content-normal-data-block">
      <van-rate
        :value="value.author_rate"
        count="10"
        readonly
        @change="handleRate"
      />
    </div>

    <div class="page-detail-content-normal-title">主演:</div>
    <div class="page-detail-content-normal-data">
      {{ actorData.join(' ') }}
    </div>
    <br />

    <div class="page-detail-content-normal-title">导演:</div>
    <div class="page-detail-content-normal-data">
      {{ directorData.join(' ') }}
    </div>
    <br />

    <div class="page-detail-content-normal-title">分类:</div>
    <div class="page-detail-content-normal-data">
      {{ classifyData.join(' ') }}
    </div>
    <br />

    <div class="page-detail-content-normal-title">上映时间:</div>
    <div class="page-detail-content-normal-data">
      {{ value.info.screen_time }}
    </div>
    <br />

    <div class="page-detail-content-normal-title">语言:</div>
    <div class="page-detail-content-normal-data">
      {{ languageData.join(' ') }}
    </div>
    <br />

    <div class="page-detail-content-normal-title">人气:</div>
    <div class="page-detail-content-normal-data">
      {{ value.hot || 0 }}
    </div>
    <br />

    <div class="page-detail-content-normal-title">浏览:</div>
    <div class="page-detail-content-normal-data">
      {{ value.glance || 0 }}看过
    </div>
    <br />

    <div class="page-detail-content-normal-title">作者:</div>
    <div class="page-detail-content-normal-data" @click="handleGetUser">
      {{ value.author.username || 0 }}
    </div>
    <br />

    <div class="page-detail-content-normal-title-block">简介:</div>
    <div
      :class="[
        'page-detail-content-normal-data-block',
        'page-detail-content-description',
        {
          'van-multi-ellipsis--l3': normalDescription,
        },
      ]"
      @click="handleExpend('normalDescription')"
    >
      {{ value.info.description }}
    </div>

    <div class="page-detail-content-normal-title-block">楼主认为:</div>
    <div
      :class="[
        'page-detail-content-normal-data-block',
        'page-detail-content-description',
        {
          'van-multi-ellipsis--l3': selfDescription,
        },
      ]"
      @click="handleExpend('selfDescription')"
    >
      {{ value.author_description.repeat(20) }}
    </div>
  </div>
</template>
<script>
import layoutMixins from '@/mixins/layout'
export default {
  mixins: [layoutMixins],
  props: {
    value: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      rate: parseInt(this.value.rate),
      normalDescription: true,
      selfDescription: true 
    }
  },
  computed: {
    isStore() {
      return this.value.store
    },
    storeName() {
      return this.isStore ? 'like' : 'like-O'
    },
    storeColor() {
      return this.isStore ? this.generateStyleColor('primary') : undefined
    },
    actorData() {
      return this.value.info.actor.map((item) => item.name)
    },
    directorData() {
      return this.value.info.director.map((item) => item.name)
    },
    classifyData() {
      return this.value.info.classify.map((item) => item.name)
    },
    districtData() {
      return this.value.info.district.map((item) => item.name)
    },
    languageData() {
      return this.value.info.language.map((item) => item.name)
    },
  },
  methods: {
    async handleStore() {
      await this.$confirm2Login(this, {
        done: async () => {
          const method = this.isStore
            ? this.$API_CUSTOMER.cancelStoreMovie
            : this.$API_CUSTOMER.storeMovie
          await method({ _id: this.value._id })
        },
      })
    },
    async handleRate(value) {
      this.rate = value 
      await this.$confirm2Login(this, {
        done: async () => {
          const method = this.$API_CUSTOMER.putMovieRate
          await method({ _id: this.value._id, value: this.rate || 0 })
        },
      })
    },
    handleGetUser() {
      const { _id } = this.value.author || {}
      this.$router.push({
        path: '/user',
        query: {
          id: _id,
        },
      })
    },
    handleExpend(key) {
      this[key] = !this[key]
    }
  },
}
</script>
<style lang="less" scoped>
.page-detail-content {
  width: 100%;
  padding: 0 @normal-padding;
  box-sizing: border-box;

  &-title {
    display: flex;
    align-items: center;
    &-main {
      flex: 1;
      margin-right: 1em;
    }
    &-action {
      display: flex;
      align-items: center;
      & > span {
        margin-right: .2em;
      }
    }
  }

  &-normal-title,
  &-normal-data {
    display: inline-block;
    font-size: @sub-title-font-size;
  }
  &-normal-title {
    opacity: 1;
  }
  &-normal-data {
    text-indent: 0.2em;
    font-weight: 500;
  }
  &-normal-title-block {
    display: block;
    font-size: @sub-title-font-size;
    &:extend(.page-detail-content-normal-title);
  }
  &-normal-data-block {
    display: block;
    font-size: @sub-title-font-size;
    &:extend(.page-detail-content-normal-data);
  }
  &-description {
    padding: @normal-padding / 4;
    text-indent: 2em;
    display: -webkit-box;
  }
}
</style>