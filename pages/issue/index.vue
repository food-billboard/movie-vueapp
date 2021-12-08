<template>
  <div class="page-issue">
    <van-form @submit="handleSubmit">
      <van-field name="poster" label="海报">
        <template #input>
          <chunk-upload
            ref="poster-uploader"
            :max-count="1"
            @change="onPosterChange"
          />
        </template>
      </van-field>
      <van-field name="video" label="视频">
        <template #input>
          <chunk-upload
            ref="video-uploader"
            :max-count="1"
            @change="onVideoChange"
          />
        </template>
      </van-field>
      <van-field
        v-model="name"
        name="name"
        label="电影名"
        placeholder="请输入电影名"
        :rules="[{ required: true, message: '请填写电影名' }]"
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <indexes-select visible data-type="classify" />
    <van-overlay :show="loading" @click="loading = false">
      <van-loading type="spinner" />
    </van-overlay>
  </div>
</template>
<script>
import ChunkUpload from '@/components/ChunkUpload'
import IndexesSelect from '@/components/IndexSelect'
import { withTry } from '@/utils'
export default {
  components: {
    IndexesSelect,
    ChunkUpload,
  },
  async asyncData({ app, route }) {
    const {
      query: { id },
    } = route
    let value = {}
    if (id) value = await app.$API_CUSTOMER.getIssueMovieData({ _id: id })
    return {
      ...value,
    }
  },
  data() {
    return {
      video: '',
      poster: '',
      name: '',
      district: [],
      director: [],
      actor: [],
      classify: [],
      screen_time: [],
      language: [],
      description: '',
      author_rate: 0,
      another_name: [],
      author_description: '',
      images: [],
      loading: false,
    }
  },
  mounted() {
    this.$refs['poster-uploader'].setValue(this.poster)
    this.$refs['video-uploader'].setValue(this.video)
  },
  methods: {
    async handleSubmit() {
      const {
        query: { id },
      } = this.$route
      const method = id
        ? this.$API_CUSTOMER.putMovieData
        : this.$API_CUSTOMER.postMovieData
      this.loading = true

      const [err] = await withTry(method)({
        _id: id,
        video: {
          src: this.video,
          poster: this.poster,
        },
        info: {
          name: this.name,
          district: this.district,
          director: this.director,
          actor: this.actor,
          classify: this.classify,
          screen_time: this.screen_time,
          language: this.language,
          description: this.description,
          author_rate: this.author_rate,
          another_name: this.another_name,
          author_description: this.author_description,
        },
        images: this.images,
      })
      this.loading = false
      if (err) {
        this.$toast('上传失败')
      } else {
        this.$toast({
          message: '上传成功',
          forbidClick: true,
          onClose: () => {
            this.$router.replace('/home')
          },
        })
      }
    },
    onPosterChange(value) {
      this.poster = value
    },
    onVideoChange(value) {
      this.video = value
    },
  },
}
</script>
<style lang="less" scoped>
.page-issue {
  width: 100%;
  min-height: 100vh;
}
</style>