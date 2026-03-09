import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function GoogleSuccess() {

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {

    const token = params.get("token");
    const userParam = params.get("user");

    if (!token || !userParam) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(decodeURIComponent(userParam));

    login({
      token: token,
      user: user
    });

    navigate("/");

  }, []);

  return <h2 style={{textAlign:"center"}}>Logging in with Google...</h2>;

}

export default GoogleSuccess;