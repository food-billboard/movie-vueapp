<template>
  <div class="page-issue">
    <van-form @submit="handleSubmit">
      <van-field 
        name="poster" 
        label="海报"
        :rules="[{ validator: uploadValidator.bind(this, 1, poster), message: '请选择海报' }]"
      >
        <template #input>
          <chunk-upload
            ref="poster-uploader"
            :max-count="1"
            @change="onPosterChange"
          />
        </template>
      </van-field>
      <van-field 
        name="video" 
        label="视频"
        :rules="[{ validator: uploadValidator.bind(this, 1, video), message: '请选择视频' }]"
      >
        <template #input>
          <chunk-upload
            ref="video-uploader"
            :max-count="1"
            accept="video/*"
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
      <tag-select 
        v-model="district" 
        indexes-type="district" 
        name="district"
        label="地区"
      />
      <tag-select 
        v-model="director" 
        indexes-type="director" 
        name="director"
        label="导演"
      />
      <tag-select 
        v-model="actor" 
        indexes-type="actor" 
        name="actor"
        label="演员"
      />
      <tag-select 
        v-model="classify" 
        indexes-type="classify" 
        name="classify"
        label="分类"
      />
      <tag-select 
        v-model="language" 
        indexes-type="language" 
        name="language"
        label="语言"
        :multiple="false"
      />
      <van-field
        readonly
        clickable
        name="screen_time"
        :value="screenTimeShow"
        label="上映时间"
        placeholder="点击选择时间"
        :rules="[{ required: true, message: '请选择上映时间' }]"
        @click="screen_timePicker = true"
      />
      <van-field
        v-model="description"
        name="description"
        label="电影描述"
        placeholder="电影描述"
        rows="2"
        autosize
        type="textarea"
        :maxlength="300"
        :rules="[{ required: true, message: '请填写电影描述' }]"
      />
      <van-field
        v-model="author_description"
        name="author_description"
        label="个人电影描述"
        placeholder="个人电影描述"
        rows="2"
        autosize
        type="textarea"
        :maxlength="300"
      />
      <van-field 
        name="author_rate" 
        label="评分"
      >
        <template #input>
          <van-rate v-model="author_rate" count="10" />
        </template>
      </van-field>
      <alias-select 
        v-model="another_name" 
      />
      <van-field 
        name="images" 
        label="视频截图"
        :rules="[{ validator: uploadValidator.bind(this, 6, images), message: '请选择截图' }]"
      >
        <template #input>
          <chunk-upload
            ref="images-uploader"
            :multiple="true"
            @change="onImagesChange"
          />
        </template>
      </van-field>
      <div>
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-popup v-model="screen_timePicker" position="bottom">
      <van-datetime-picker
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="handleScreenConfirm"
        @cancel="screen_timePicker = false"
      />
    </van-popup>
    <van-overlay :show="loading" @click="loading = false">
      <over-loading :loading="true">
        提交中...
      </over-loading>
    </van-overlay>
  </div>
</template>
<script>
import DayJs from 'dayjs'
import AliasSelect from './components/alias.vue'
import TagSelect from './components/tag.vue'
import ChunkUpload from '@/components/ChunkUpload'
import OverLoading from '@/components/Loading'
import { withTry } from '@/utils'
export default {
  components: {
    ChunkUpload,
    TagSelect,
    AliasSelect,
    OverLoading
  },
  async asyncData({ app, route }) {
    const {
      query: { id },
    } = route
    let value = {}
    if (id) {
      const { video={}, poster, images, info, ...nextValue } = await app.$API_CUSTOMER.getIssueMovieData({ _id: id })
      value = {
        ...nextValue,
        actor: info.actor,
        director: info.director,
        district: info.district,
        language: info.language,
        classify: info.classify,
        description: info.description,
        another_name: info.another_name,
        screen_time: info.screen_time,
        video: [
          {
            _id: video._id,
            url: poster.src
          }
        ],
        poster: [
          {
            _id: poster._id,
            url: poster.src
          }
        ],
        images: images.map(item => ({
          _id: item._id,
          url: item.src 
        }))
      }
    }
    return {
      ...value,
    }
  },
  data() {
    return {
      video: [],
      poster: [],
      name: '',
      district: [],
      director: [],
      actor: [],
      classify: [],
      screen_time: "",
      language: [],
      description: '',
      author_rate: 10,
      another_name: [],
      author_description: '',
      images: [],
      loading: false,
      // datepicker
      screen_timePicker: false,
      minDate: new Date(1888, 0, 1),
      maxDate: new Date(),
    }
  },
  computed: {
    screenTimeShow() {
      return this.formatDate(this.screen_time)
    }  
  },
  mounted() {
    this.$refs['poster-uploader'].setValue(this.poster)
    this.$refs['video-uploader'].setValue(this.video)
    this.$refs["images-uploader"].setValue(this.images)
  },
  methods: {
    formatDate(date) {
      if(!date) return ""
      return DayJs(date).format("YYYY-MM-DD")
    },
    async handleSubmit() {

      if(this.images.length < 6) {
        return this.$toast("至少需要6张截图")
      }

      const {
        query: { id },
      } = this.$route
      const method = id
        ? this.$API_CUSTOMER.putMovieData
        : this.$API_CUSTOMER.postMovieData
      this.loading = true

      const params = {
        _id: id,
        video: {
          src: (this.video[0] || {})._id,
          poster: (this.poster[0] || {})._id,
        },
        info: {
          name: this.name,
          district: this.district,
          director: this.director,
          actor: this.actor,
          classify: this.classify,
          screen_time: this.formatDate(this.screen_time),
          language: this.language,
          description: this.description,
          author_rate: this.author_rate,
          another_name: this.another_name,
          author_description: this.author_description,
        },
        images: this.images.map(item => item._id),
      }

      const [err] = await withTry(method)(params)
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
    onImagesChange(value) {
      this.images = value 
    },
    handleScreenConfirm(value) {
      this.screen_time = value
      this.screen_timePicker = false 
    },
    uploadValidator(count, value) {
      return Array.isArray(value) && value.length >= count 
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