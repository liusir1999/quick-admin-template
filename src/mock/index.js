import Mock from 'mockjs'

Mock.mock('/api/login', 'post', {
  code: 200,
  result: 'ASdskasjdashib',
})

Mock.mock('/api/getUserInfo', 'post', {
  code: 200,
  result: {
    userInfo: {
      username: 'LiuSir',
      id: 'xaxsaxaxa',
    },
    menuList: [
      {
        name: 'dashboard',
        path: '/dashboard',
        redirect: '/dashboard/console',
        component: 'Layout',
        children: [
          {
            name: 'console',
            path: 'console',
            component: 'dashboard/console',
          },
          {
            name: 'workplace',
            path: 'workplace',
            component: 'dashboard/workplace',
          },
        ],
      },
    ],
  },
})

Mock.setup({
  timeout: 1000,
})
