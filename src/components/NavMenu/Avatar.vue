<template>
  <div>
    <div class="avatar" @mouseenter="showCard" @mouseleave="hideCard">
      <el-avatar
        :src="userInfo !== '' ? userInfo['avatar'] : ''"
        class="img"
        size="medium"
        icon="el-icon-user-solid"
      ></el-avatar>
      <transition name="el-fade-in-linear">
        <el-card
          v-show="cardVisible"
          :body-style="{ padding: 0 }"
          class="submenu-card"
        >
          <div slot="header" class="clearfix">
            <el-avatar
              :src="userInfo !== '' ? userInfo['avatar'] : ''"
              icon="el-icon-user-solid"
            ></el-avatar>
            <div class="username">{{ this.$store.state.user['username'] }}</div>
            <div class="email">{{ this.$store.state.user['userEmail'] }}</div>
          </div>
          <div class="submenus">
            <div
              v-for="submenu in submenus"
              :key="submenu.index"
              class="submenu"
              @click="jumpTo(submenu.index)"
            >
              <i :class="submenu.icon" class="icon"></i>
              <span v-html="submenu.label"></span>
            </div>
          </div>
        </el-card>
      </transition>
    </div>
  </div>
</template>

<script>
import { logout } from '@/api/auth'
export default {
  name: 'Avatar',
  data() {
    return {
      submenus: [
        {
          label: '资源包',
          index: '/package',
          icon: 'el-icon-folder-opened'
        },
        { label: '个人中心', index: '/account', icon: 'el-icon-user' },
        // { label: '历史记录', index: '/history', icon: 'el-icon-time' },
        { label: '退出', index: 'logout', icon: 'el-icon-switch-button' }
      ],
      cardVisible: false,
      userInfo: this.$store.state.user
    }
  },
  methods: {
    showCard() {
      this.cardVisible = true
    },
    hideCard() {
      this.cardVisible = false
    },
    jumpTo(index) {
      if (index === 'logout') {
        this.$confirm('确认登出吗', '登出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            logout().then((response) => {
              if (response.data.code === 200) {
                this.$message({
                  message: response.data.message,
                  type: 'success',
                  duration: 1500
                })
                this.$store.commit('logout')
                this.$router.go(0)
              } else {
                this.$message.error(response.data.message)
              }
            })
          })
          .catch(() => {})
      } else {
        this.$router.push(index).catch(() => {
          this.$router.go(0)
        })
      }
    }
  }
}
</script>

<style scoped>
.avatar {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 9;
}

.img,
.submenu {
  cursor: pointer;
}

.submenu-card {
  width: 200px;
  position: absolute;
  top: 50px;
  right: 0;
  text-align: center;
}

.username {
  font-size: 1.5rem;
}

.email {
  color: #5f6368;
}

.submenus {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
}

.submenu:last-child {
  position: relative;
  margin-top: 20px;
}

.submenu:last-child::after {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  border-top: 1px solid #ebeef5;
}

.submenu {
  height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 20px;
}

.submenu .icon {
  color: #979797;
}

.submenu:hover {
  background-color: #f4f4f4;
}
</style>
