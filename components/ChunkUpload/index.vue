<template>
  <van-uploader 
    v-model="value"
    :accept="accept"
    :preview-size="previewSize"
    :before-read="beforeRead" 
    :multiple="multiple"
    :disabled="disabled"
    :readonly="readonly"
    :max-size="maxSize"
    :max-count="maxCount"
    :upload-icon="uploadIcon"
    result-type="file"
  />
</template>
<script>
import { upload } from './upload'
export default {
  props: {
    accept: {
      type: String,
      default: "image/*"
    },
    previewSize: {
      type: Number || String,
      default: 80
    },
    multiple: {
      type: Boolean,
      default: false 
    },
    disabled: {
      type: Boolean,
      default: false 
    },
    readonly: {
      type: Boolean,
      default: false 
    },
    maxSize: {
      type: Number || String || Function,
      default: 1024 * 1024 * 100 
    },
    maxCount: Number,
    uploadIcon: {
      type: String,
      default: "photograph"
    }
  },
  data() {
    return {
      uploadInstance: null,
      value: []
    };
  },
  created() {
    if(this.$ChunkUpload) this.uploadInstance = new this.$ChunkUpload()
  },
  methods: {
    beforeRead(file) {
      upload.call(this, this.uploadInstance, file, (newTargetFile) => {
        const index = this.value.findIndex(item => item.file === file)
        if(~index) {
          const prevValue = this.value 
          const prev = prevValue[index]
          prevValue.splice(index, 1, {
            ...prev,
            ...newTargetFile
          })
        }
      })
      return true 
    },
  },
};
</script>
