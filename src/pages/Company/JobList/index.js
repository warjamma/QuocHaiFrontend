import { Table, Tag, Button } from 'antd';
import styles from './styles.scss';

export default function() {
  const columns = [
    {
      title: 'Job name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Created Date',
      dataIndex: 'time',
      key: 'time',
      width: 120,
    },
    {
      title: 'Vacancy',
      dataIndex: 'vacancy',
      key: 'vacancy',
      width: 90,
      align: 'center'
    },
    {
      title: 'Job level',
      dataIndex: 'job_level',
      key: 'job_level',
      width: 300,
      render: tags => (
        <span>
          {tags.map(tag => {
            return (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Job role',
      key: 'job role',
      dataIndex: 'job_role',
      width: 300,
      render: tags => (
        <span>
          {tags.map(tag => {
            return (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Salary (USD)',
      dataIndex: 'salary',
      key: 'salary',
      width: 140,
      align: 'center',
      render: salary => (
        <span>
          <Tag color="red">{salary}</Tag>
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: status => (
        <span>
          <Tag color="warning">{status}</Tag>
        </span>
      )
    },
    {
      title: 'Candidate',
      dataIndex: 'candidate',
      key: 'candidate',
      width: 100,
      align: 'center'
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (text, record) => (
        <span>
          <Button>Edit</Button>
        </span>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'Backend Developer',
      time: '18/03/2020',
      vacancy: 32,
      job_level: ['Administration', 'Backend', 'Devops'],
      job_role: ['Administration', 'Backend', 'Devops'],
      salary: '1000$ - 1500$',
      status: 'Pending',
      candidate: '03'
    },
    {
      key: '2',
      name: 'Full-stack Developer',
      time: '18/03/2020',
      vacancy: 42,
      job_level: ['Administration', 'Backend', 'Devops'],
      job_role: ['Front-end', 'Designer'],
      salary: '1000$ - 1500$',
      status: 'Pending',
      candidate: '03'
    },
    {
      key: '3',
      name: 'React Native Developer',
      time: '18/03/2020',
      vacancy: 32,
      job_level: ['Administration', 'Backend', 'Devops'],
      job_role: ['Front-end', 'Designer'],
      salary: '1000$ - 1500$',
      status: 'Pending',
      candidate: '03'
    },
    {
      key: '3',
      name: 'React Native Developer',
      time: '18/03/2020',
      vacancy: 32,
      job_level: ['Administration', 'Backend', 'Devops'],
      job_role: ['Front-end', 'Designer'],
      salary: '1000$ - 1500$',
      status: 'Pending',
      candidate: '03'
    },
    {
      key: '3',
      name: 'React Native Developer',
      time: '18/03/2020',
      vacancy: 32,
      job_level: ['Administration', 'Backend', 'Devops'],
      job_role: ['Front-end', 'Designer'],
      salary: '1000$ - 1500$',
      status: 'Pending',
      candidate: '03'
    },
  ];
  
  return (
    <div className={styles.jobListContainer}>
      <h1>Danh sách công việc</h1>
      <div className={styles.jobListTable}>
        <Table bordered columns={columns} dataSource={data} scroll={window.innerWidth < 1500 && { x: '1500px' }}/>
      </div>
    </div>
  );
}
