<template>
  <el-button
    :size="size"
    type="primary"
    icon="el-icon-download"
    circle
    @click="download()"
  ></el-button>
</template>

<script>
import { download } from '@/api/resource'

export default {
  name: 'DownloadButton',
  props: {
    resourceID: Number,
    size: String
  },
  methods: {
    download() {
      const { user } = this.$store.state
      if (!user) {
        this.$message.warning('请先登录')
        this.$router.push({
          path: '/login',
          query: { redirect: this.$route.fullPath }
        })
      } else {
        if (user.userType === 0) {
          this.$message.warning('无下载权限')
        } else {
          download(this.resourceID).then((response) => {
            // const { code, data } = response.data
            // if (code === 200) {
            //   window.location.href = data
            // }
            console.log(response)
            if (!response) return
            const blob = new Blob([response.data], { type: response.data.type }) // 构造一个blob对象来处理数据，并设置文件类型

            if (window.navigator.msSaveOrOpenBlob) { // 兼容IE10
              navigator.msSaveBlob(blob, this.filename)
            } else {
              const href = URL.createObjectURL(blob) // 创建新的URL表示指定的blob对象
              const a = document.createElement('a') // 创建a标签
              a.style.display = 'none'
              a.href = href // 指定下载链接
              // a.download = '文件名' // 指定下载文件名
              a.click() // 触发下载
              URL.revokeObjectURL(a.href) // 释放URL对象
            }
          })
        }
      }
      // if (user.userType < 1) {
      //
      //   return
      // }
      // console.log(user.userType)
      // download(this.resourceID)
    }
  }
}
</script>

<style scoped></style>
