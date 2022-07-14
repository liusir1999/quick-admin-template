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
      {
        name: 'errorPage',
        path: '/errorPage',
        component: 'Layout',
        meta: {
          title: '错误界面',
          icon: 'SettingOutlined',
        },
        children: [
          {
            name: '403',
            path: '403',
            meta: {
              title: '403',
            },
            component: 'exception/403',
          },
          {
            name: '404',
            path: '404',
            meta: {
              title: '404',
            },
            component: 'exception/404',
          },
          {
            name: '500',
            path: '500',
            meta: {
              title: '500',
            },
            component: 'exception/500',
          },
        ],
      },
      {
        name: 'article',
        path: '/article',
        component: 'Layout',
        meta: {
          title: '文章管理',
          icon: 'SettingOutlined',
        },
        children: [
          {
            name: 'articleList',
            path: 'list',
            meta: {
              title: '总览列表',
            },
            component: 'test/index',
          },
          {
            name: 'articleAdd',
            path: 'add',
            meta: {
              title: '添加',
            },
            component: 'test/index',
          },
          {
            name: 'articleEdit',
            path: 'edit',
            meta: {
              title: '编辑',
            },
            component: 'test/index',
          },
        ],
      },
      {
        name: 'Test',
        path: '/test',
        meta: {
          title: '测试组件',
          icon: 'SettingOutlined',
        },
        component: 'Layout',
        children: [
          {
            name: 'testDialog',
            path: 'index',
            meta: {
              title: 'Dialog组件',
            },
            component: 'test/index',
          },
        ],
      },
    ],
  },
})

Mock.setup({
  timeout: 1000,
})
