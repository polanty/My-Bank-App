"use client";
//import { signInUserUsingEmailandPassword } from "../Firebase/Firebase";
import { useSignupMutation, useSigninMutation } from "../RTK_Query/authApi";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Navbar } from "react-bootstrap";
import Image from "next/image";
import { initialstateInterface } from "../reduxSlices/userslice";
import { RootState } from "../store/store";
import { login, setLoading } from "../reduxSlices/userslice";
import { Spinner } from "react-bootstrap";

type AuthFormData = {
  displayName: string;
  email: string;
  password: string;
};

export default function AuthPage() {
  const dispatch = useDispatch();

  const { currentUser, loading } = useSelector(
    (state: RootState): initialstateInterface => state.user
  );

  const [signup, { isLoading: signupLoading, error: signupError }] =
    useSignupMutation();

  const [signin, { isLoading: signinLoading, error: signinError }] =
    useSigninMutation(); // ✅ Correct mutation

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

    dispatch(setLoading(true));

    try {
      if (isSignUp) {
        // 🔒 Sign-up logic
        const user = await signup(formData).unwrap();

        dispatch(login(user)); // save user to redux

        console.log("User signed up:", user);
      } else {
        // 🔑 Sign-in logic
        const user = await signin(formData).unwrap();

        dispatch(login(user));

        console.log("Signed In,", user);
      }
    } catch (err) {
      setAuthError(err?.message || "Authentication failed");
      console.error("Signup error:", err);
      dispatch(setLoading(false));
    }
  };

  if (currentUser !== null) {
    return (
      <div className="text-center space-y-4" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Signing you in...</span>
        </Spinner>

        <h1> We are Siging you In</h1>
      </div>
    );
  }

  return (
    <main>
      {/* className="flex items-center justify-center min-h-screen bg-gray-100 p-4" */}
      <div className="bg-root">
        <Container>
          <div className="flex justify-between">
            <Navbar.Brand href="/" className="flex items-center gap-2 p-2">
              <Image
                src="/Logo_white.png"
                alt="Ego Bank Logo"
                width={70}
                height={70}
                priority
              />
            </Navbar.Brand>
            <div className="border border-white text-sm text-white font-bold p-2">
              <p>You're logging into a secure site</p>
              <p className="small-text">
                How can I tell that this site is secure?
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isSignUp ? "Create an Account" : "Sign In to Your Account"}
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email} //formData.email
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password} //formData.password
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {authError && <p className="text-red-600 text-sm">{authError}</p>}

            <button
              type="submit"
              disabled={signinLoading || signupLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {signinLoading || signupLoading
                ? "Submitting..."
                : isSignUp
                ? "Sign Up"
                : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 font-medium hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </Container>
    </main>
  );
}
