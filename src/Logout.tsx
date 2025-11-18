import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type LogoutProps = {
  setUserName: (name: string) => void;
};

export default function Logout({ setUserName }: LogoutProps) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUserName("");
    navigate("/login");
  }, []);

  return null;
}
