"use client";
import { useState } from "react";
import { auth } from "@/utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOTP = async () => {
    setLoading(true);
    setError("");

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      }

      const appVerifier = window.recaptchaVerifier;
      await signInWithPhoneNumber(auth, phone, appVerifier);
      alert("OTP Sent! Proceed to enter your code.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <h1 className="text-2xl font-bold text-gray-900">Enter Your Phone Number</h1>
      <p className="text-gray-500 text-sm mt-1">We will send you an OTP to verify your account.</p>

      <div className="w-full max-w-md mt-6">
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+1 234 567 890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div id="recaptcha-container"></div>
        <Button text="Next" onClick={sendOTP} disabled={!phone || loading} />
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
