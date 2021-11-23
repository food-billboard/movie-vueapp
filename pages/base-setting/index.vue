<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
    />

    <van-field
      name="avatar"
      label="头像"
    >
      <template #input>
        <chunk-upload 
          ref="avatar-uploader"
          :max-count="1"
          @change="onUploadChange"
        />
      </template>
    </van-field>
    <div style="margin: 16px;">
      <loading-button round block type="info" native-type="submit">提交</loading-button>
    </div>
  </van-form>
</template>
<script>
import LoadingButton from '@/components/LoadingButton'
import ChunkUpload from '@/components/ChunkUpload'
export default {
  components: {
    ChunkUpload,
    LoadingButton
  },
  asyncData({ app }) {
    const data = app.store.state.user.userInfo || {}
    return {
      username: data.username || "",
      avatar: [
        data.avatar 
      ]
    }
  },
  data() {
    return {
      username: ""
    }
  },
  mounted() {
    this.$refs["avatar-uploader"].setValue(this.avatar)
  },
  methods: {
    onUploadChange(value) {
      this.avatar = value 
    },
    async onSubmit() {
      const data = this.$store.state.user.userInfo || {}
      if(!this.username) {
        this.$toast("用户名格式错误")
        return 
      }
      try {
        if(this.avatar.length && data.avatar !== this.avatar[0]._id) await this.$API_CUSTOMER.putAvatar({ _id: this.avatar[0]._id })
        if(data.username !== this.username) await this.$API_CUSTOMER.putUsername({ name: this.username })
        this.$toast({
          message: "修改成功",
          overlay: true,
          forbidClick: true,
          onClose: () => {
            this.$router.go(-1)
          }
        })
      }catch(err) {
        this.$toast("修改出错")
      }
    }
  }
}
</script>