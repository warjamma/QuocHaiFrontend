import './index.scss'

function Home(props) {
  return (
    <div>
      <header>
        RockSearch
      </header>
      <main>
        {props.children}
      </main>
      <footer>
        <div
        >
          Powered by <img src={require("../../assets/images/logo.png")} alt="ZEIT Logo" />
        </div>
      </footer>
    </div>
  );
}

export default Home;
