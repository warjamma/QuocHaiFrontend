
// ref: https://umijs.org/config/

export default {
  treeShaking: true,
  routes: [
    {
      path: '/dashboard',
      component: '../layouts/DashboardLayout/index',
      routes: [
        {
          path: '/dashboard',
          component: '../pages/Dashboard/index'
        },
      ],
    },
    {
      path: '/register',
      component: '../layouts/AuthenticateLayout/index',
      routes: [
        {
          path: '/register',
          component: '../pages/Register/index',
        },
      ],
    },
    {
      path: '/login',
      component: '../layouts/AuthenticateLayout/index',
      routes: [
        {
          path: '/login',
          component: '../pages/Login/index',
        },
      ],
    },
    // {
    //   path: '/',
    //   component: '../layouts/UserLayout/index',
    //   routes: [
    //     {
    //       path: '/',
    //       component: '../pages/Dashboard/index',
    //     },
    //   ],
    // },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'frontend',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  define: {
    "APP_ENV": "APP_ENV"
  },
}
