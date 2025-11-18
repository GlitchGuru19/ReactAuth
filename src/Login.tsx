import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "./App";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  setUserName: (name: string) => void;
};

export default function Login({ setUserName }: LoginProps) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: any) =>
      apiFetch("/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      if (!data.token) return alert("Login failed.");

      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      setUserName(data.user.name);

      navigate("/todo");
    },
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    const form = new FormData(e.target);

    mutation.mutate({
      email: form.get("email"),
      password: form.get("password"),
    });
  }

  return (
    <div className="container">
      <h3>Login</h3>

      <form onSubmit={handleSubmit} className="card">
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button>Login</button>
      </form>
    </div>
  );
}
