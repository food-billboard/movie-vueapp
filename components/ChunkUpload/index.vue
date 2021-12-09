<template>
  <van-uploader 
    v-model="stateValue"
    :accept="accept"
    :preview-size="previewSize"
    :multiple="multiple"
    :disabled="disabled"
    :readonly="readonly"
    :max-size="maxSize"
    :max-count="maxCount"
    :upload-icon="uploadIcon"
    :after-read="afterRead"
    result-type="file"
  />
</template>
<script>
import { upload, formatDefaultValue } from './upload'

export default {
  props: {
    defaultValue: {
      type: [ Array, Object, String ],
      default() {
        return []
      }
    },
    accept: {
      type: String,
      default: "image/*"
    },
    previewSize: {
      type: [Number, String],
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
      type: [Number, String , Function],
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
      stateValue: formatDefaultValue(this.defaultValue || [])
    };
  },
  watch: {
    stateValue() {
      this.$emit("change", this.stateValue)
    }
  },
  created() {
    if(this.$ChunkUpload) this.uploadInstance = new this.$ChunkUpload()
  },
  methods: {
    afterRead(wrapperFile) {
      const realFileList = Array.isArray(wrapperFile) ? wrapperFile : [wrapperFile]
      realFileList.forEach(wrapperFile => {
        const { file } = wrapperFile
        upload.call(this, this.uploadInstance, file, (newTargetFile) => {
          const index = this.stateValue.findIndex(item => item.file === file)
          if(~index) {
            const prevValue = this.stateValue 
            const prev = prevValue[index]
            prevValue.splice(index, 1, {
              ...prev,
              ...newTargetFile
            })
          }
        }, this.stateValue)
      })
    },
    setValue(value) {
      const realValue = formatDefaultValue(value)
      this.stateValue = realValue
    }
  },
};
</script>
