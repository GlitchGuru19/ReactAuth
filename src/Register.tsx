import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "./App";

export default function Register() {
  const mutation = useMutation({
    mutationFn: (data: any) =>
      apiFetch("/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => alert("Registered! Now login."),
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    const form = new FormData(e.target);

    mutation.mutate({
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
    });
  }

  return (
    <div className="container">
      <h3>Create Account</h3>

      <form onSubmit={handleSubmit} className="card">
        <input name="name" placeholder="Full Name" required />
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button>Register</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
