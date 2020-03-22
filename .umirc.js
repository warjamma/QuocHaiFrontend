
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
          component: '../pages/Company/Dashboard/index'
        },
        {
          path: '/dashboard/job-list',
          component: '../pages/Company/JobList/index'
        },
        {
          path: '/dashboard/refer-list',
          component: '../pages/Company/ReferList/index'
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
    {
      path: '/reset-password',
      component: '../layouts/AuthenticateLayout/index',
      routes: [
        {
          path: '/reset-password',
          component: '../pages/ResetPassword/index',
        },
      ],
    },
    {
      path: '/forget-password',
      component: '../layouts/AuthenticateLayout/index',
      routes: [
        {
          path: '/forget-password',
          component: '../pages/ForgetPassword/index',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/HomeLayout/index',
      routes: [
        {
          path: '/',
          component: '../pages/LandingPage/index',
        },
      ],
    },
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
