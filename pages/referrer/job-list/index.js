import { Table, Tag, Button } from 'antd';
import './styles.scss'

export default function() {
  const columns = [
    {
      title: 'Company',
      dataIndex: 'name',
      key: 'name',
      render: text => {
        return (
          <div className="item-company">
            <div className="logo" />
            <div>
              <div>Role: {text.role}</div>
              <div>Vacancy: {text.vacancy}</div>
              <div>Specilist-level: 
                {text.specilistLevel.map(tag => {
                  return (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  );
                })}
              </div>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Reward',
      dataIndex: 'reward',
      key: 'reward',
      align: 'center',
      width: 170,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      align: 'center',
      width: 170,
    },
    {
      title: 'Processing',
      dataIndex: 'processing',
      key: 'processing',
      align: 'center',
      width: 150,
    },
    {
      title: 'My referred',
      dataIndex: 'referred',
      key: 'referred',
      align: 'center',
      width: 150,
    },
  ];
  
  const data = [
    {
      key: '1',
      name: {
        logo: '',
        name: 'Rockship company',
        role: 'Back-end developer',
        vacancy: '02',
        specilistLevel: ['Senior', 'Junior', 'Fresher']
      },
      job_level: ['Administration', 'Backend', 'Devops'],
      reward: '100$',
      salary: '1000$ - 1500$',
      processing: '05',
      referred: '03'
    }
  ];
  
  return (
    <div className="jobListContainer">
      <h1>Danh sách công việc</h1>
      <div className="jobListTable">
        <Table bordered columns={columns} dataSource={data} />
      </div>
    </div>
  );
}
