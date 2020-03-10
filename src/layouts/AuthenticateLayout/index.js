import styles from './index.scss';

function AuthenticateLayout(props) {
  return (
    <div className={styles.authenticatePage}>
      {props.children}
    </div>
  );
}

export default AuthenticateLayout;
