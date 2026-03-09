import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <h1>Explore The World 🌍</h1>
        <p>Find your perfect destination and travel smart.</p>

        <button
          className="primary-btn"
          onClick={() => navigate("/packages")}
        >
          Explore Packages
        </button>
      </div>
    </div>
  );
}

export default Home;