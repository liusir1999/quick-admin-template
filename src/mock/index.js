import Mock from 'mockjs'

Mock.mock('/api/user/login', 'post', {
  code: 200,
  result: 'ASdskasjdashib',
})

Mock.mock('/api/user/getUserInfo', 'post', {
  code: 200,
  result: {
    userInfo: {
      username: 'LiuSir',
      id: 'xaxsaxaxa',
    },
    menuList: [
      {
        name: '/',
        redirect: '/dashboard',
      },
      {
        name: 'dashboard',
        path: '/dashboard',
        redirect: '/dashboard/console',
        component: 'Layout',
        meta: {
          title: '看板',
          icon: 'DashboardFilled',
        },
        children: [
          {
            name: 'console',
            path: 'console',
            meta: {
              title: '控制台',
            },
            component: 'dashboard/console',
          },
          {
            name: 'workplace',
            path: 'workplace',
            meta: {
              title: '工作台',
            },
            component: 'dashboard/workplace',
          },
        ],
      },
      {
        name: 'system',
        path: '/system',
        component: 'Layout',
        redirect: '/system/menu',
        meta: {
          title: '系统设置',
          icon: 'SettingOutlined',
        },
        children: [
          {
            name: 'menu',
            path: 'menu',
            component: 'system/menu',
            meta: {
              title: '菜单权限设置',
            },
          },
        ],
      },
    ],
  },
})

Mock.setup({
  timeout: 1000,
})
