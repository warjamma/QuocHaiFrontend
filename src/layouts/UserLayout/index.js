import styles from './index.scss';

function UserLayout(props) {
  return (
    <div>
      <h1>UserLayout</h1>
      {props.children}
    </div>
  );
}

export default UserLayout;
