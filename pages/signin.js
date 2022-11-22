import LayoutDefault from "../layouts/default";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Signin() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const changeInput = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const doLogin = async () => {
    console.log("hello");
  };

  useEffect(() => {}, [loading, setLoading]);

  return (
    <section className="SignIn flex-grow flex items-center justify-center">
      <div className="wrapper-narrow grid gap-y-6 pb-60">
        <div className="flex justify-center">
          <h1 className="font-bold">Account</h1>
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="input-field mt-12"
          id="email-signin"
          name="email"
          value={input.email}
          onChange={changeInput}
        />

        <div className="relative">
          <button className="absolute top-1/2 -translate-y-1/2 right-4">
            <i className="text-gray-400 fa-regular fa-eye-slash"></i>
          </button>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            id="password-signin"
            name="password"
            value={input.password}
            onChange={changeInput}
          />
        </div>
        <div className="flex justify-between">
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
            />
            <span>Keep me signed in</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-gray-500 underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button className="btn-black !h-14 !text-lg" onClick={doLogin}>
          {loading ? (
            <i className="fas fa-spinner-third fa-spin"></i>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </section>
  );
}

Signin.getLayout = function getLayout(page) {
  return <LayoutDefault>{page}</LayoutDefault>;
};
