"use client";

import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useSignupMutation, useSigninMutation } from "../RTK_Query/authApi";
import { RootState } from "../store/store";
import { login, setLoading } from "../reduxSlices/userslice";

type AuthFormData = {
  displayName: string;
  email: string;
  password: string;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Authentication failed";

export default function AuthPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [signup, { isLoading: signupLoading }] = useSignupMutation();
  const [signin, { isLoading: signinLoading }] = useSigninMutation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    displayName: "",
    email: "",
    password: "",
  });
  const [authError, setAuthError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    dispatch(setLoading(true));

    try {
      const user = isSignUp
        ? await signup(formData).unwrap()
        : await signin({
            email: formData.email,
            password: formData.password,
          }).unwrap();

      dispatch(login(user));
    } catch (err: unknown) {
      setAuthError(getErrorMessage(err));
      dispatch(setLoading(false));
    }
  };

  if (currentUser !== null) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[#f6f3ef] text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Signing you in...</span>
        </Spinner>
        <h1 className="text-2xl font-semibold text-stone-950">
          Opening your secure account
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ef]">
      <section className="bg-[#213f29] px-4 py-5 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Image
            src="/Logo_white.png"
            alt="Ego Bank Logo"
            width={68}
            height={68}
            priority
          />
          <div className="rounded-md border border-white/40 px-4 py-3 text-sm font-semibold">
            <p>You are logging into a secure site</p>
            <p className="mt-1 text-xs font-normal text-white/75">
              Check the address bar before entering your details.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d95600]">
            EGO Online Banking
          </p>
          <h1 className="mt-3 text-5xl font-semibold text-stone-950">
            Secure access for everyday banking.
          </h1>
          <p className="mt-4 max-w-xl text-stone-600">
            Sign in to view balances, send payments, control your card and
            download statements.
          </p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-stone-950">
            {isSignUp ? "Create an account" : "Sign in"}
          </h2>

          <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
            {isSignUp && (
              <label className="block">
                <span className="text-sm font-semibold text-stone-700">
                  Display name
                </span>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full rounded-md border border-stone-300 px-4 py-3 text-stone-950"
                />
              </label>
            )}

            <label className="block">
              <span className="text-sm font-semibold text-stone-700">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border border-stone-300 px-4 py-3 text-stone-950"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-stone-700">
                Password
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border border-stone-300 px-4 py-3 text-stone-950"
              />
            </label>

            {authError && (
              <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={signinLoading || signupLoading}
              className="w-full rounded-md bg-[#d95600] px-4 py-3 font-semibold text-white disabled:opacity-60"
            >
              {signinLoading || signupLoading
                ? "Submitting..."
                : isSignUp
                ? "Create account"
                : "Sign in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-stone-600">
            {isSignUp ? "Already have an account?" : "Do not have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-[#d95600]"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
