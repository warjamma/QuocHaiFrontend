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
  //   name: 'Công việc',
  //   url: '/job-list'
  // },
  // {
  //   name: 'Đã giới thiệu',
  //   url: '/referrer/my-referred'
  // },
  // {
  //   name: 'Thông tin cá nhân',
  //   url: '/referrer/profile'
  // },
  {
    name: 'Thanh Quang',
    url: '/customer/profile'
  }
];
