import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.example.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      toast.success("Login successful");
      console.log("Login successful:", data);
      // Handle successful login
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Login failed");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl rounded-xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-200">Enter your details below</p>
        </div>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          action="#"
          method="POST"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="current-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
