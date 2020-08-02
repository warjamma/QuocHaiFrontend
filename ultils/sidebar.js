export const companySideBar = [  
  {
    name: 'Danh sách công việc',
    url: '/company/job-list'
  },
  {
    name: 'Danh sách ứng viên',
    url: '/company/candidate-list'
  },
  {
    name: 'Công ty',
    subMenu: [
      {
        name: 'Thông tin công ty',
        url: '/company/profile'
      },
      {
        name: 'Nhân viên',
        url: '/company/employers'
      },
      {
        name: 'Số lượt đăng tuyển',
        url: '/company/post-job'
      },
    ]
  }
];

export const adminSideBar = [
  {
    name: 'Quản lý công việc',
    url: '/superadmin/job-list'
  },
  {
    name: 'Danh sách ứng viên',
    url: '/superadmin/candidates_list'
  },
  {
    name: 'Danh sách công việc',
    url: '/job-list'
  },
  {
    name: 'Đã giới thiệu',
    url: '/superadmin/my-referred'
  },
  {
    name: 'Quản lý đăng tuyển',
    url: '/superadmin/company-list'
  },
];


export const referrerSideBar = [
  // {
  //   name: 'Bảng tin',
  //   url: '/home'
  // },
  // {
  //   name: 'Tin nhắn',
  //   url: '/home'
  // },
  {
    name: 'Search google',
    url: '/search/search-google'
  },
  // {
  //   name: 'Search news',
  //   url: '/search/search-news'
  // },
  {
    name: 'Du lịch',
    url: '/home'
  },
  {
    name: 'Ăn uống',
    url: '/home'
  },
  {
    name: 'Mua sắm',
    url: '/home'
  },
  {
    name: 'Dồ xe độ',
    url: '/home'
  },
  {
    name: 'Thực phẩm',
    url: '/home'
  },
  {
    name: 'Thể thao',
    url: '/home'
  },
  {
    name: 'Xe tải',
    url: '/home'
  },
  {
    name: 'Dịch vụ',
    url: '/home'
  },
  {
    name: 'Netflix',
    url: '/home'
  },
  {
    name: 'Nông sản',
    url: '/home'
  },
];
