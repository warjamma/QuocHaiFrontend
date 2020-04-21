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
    ]
  }
]

export const adminSideBar = [
  {
    name: 'Bảng điều khiển',
    url: '/superadmin/overview'
  },
  {
    name: 'Danh sách công việc',
    url: '/superadmin/job-list'
  },
]

export const referrerSideBar = [
  // {
  //   name: 'Bảng điều khiển',
  //   url: '/referrer'
  // },
  {
    name: 'Công việc',
    url: '/referrer/job-list'
  },
  {
    name: 'Đã giới thiệu',
    url: '/referrer/my-referred'
  },
  {
    name: 'Thông tin cá nhân',
    url: '/referrer/profile'
  },
]
