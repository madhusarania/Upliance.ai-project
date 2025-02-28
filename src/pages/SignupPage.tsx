import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
  Divider,
} from "@nextui-org/react";
import { UserPlus, Mail, Lock, AlertTriangle, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, googleSignIn, error, setError } = useAuth();
  const navigate = useNavigate();

  const formSpring = useSpring({
    to: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 120, friction: 14 },
  });

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password, name);
      navigate("/");
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await googleSignIn();
      navigate("/");
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <animated.div style={formSpring} className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center pb-0 pt-6">
            <UserPlus size={40} className="text-primary mb-2" />
            <h1 className="text-2xl font-bold">Create Account</h1>
          </CardHeader>
          <CardBody className="px-6 py-4">
            {error && (
              <div className="mb-4 p-3 bg-danger-50 text-danger rounded-lg flex items-center gap-2">
                <AlertTriangle size={18} />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleEmailSignUp} className="flex flex-col gap-4">
              <Input
                label="Name"
                placeholder="Enter your name"
                startContent={<User size={18} className="text-gray-400" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="bordered"
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                startContent={<Mail size={18} className="text-gray-400" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="bordered"
              />
              <Input
                label="Password"
                placeholder="Create a password"
                type="password"
                startContent={<Lock size={18} className="text-gray-400" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="bordered"
              />
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                startContent={<Lock size={18} className="text-gray-400" />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="bordered"
              />

              <Button
                type="submit"
                color="primary"
                className="mt-2"
                startContent={<UserPlus size={18} />}
                isLoading={isLoading}
                fullWidth
              >
                Sign Up
              </Button>
            </form>

            <div className="my-4 flex items-center">
              <Divider className="flex-1" />
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <Divider className="flex-1" />
            </div>

            <Button
              color="default"
              variant="bordered"
              startContent={<FcGoogle size={18} />}
              onPress={handleGoogleSignIn}
              isLoading={isLoading}
              fullWidth
            >
              Continue with Google
            </Button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link as={RouterLink} to="/login" color="primary">
                  Sign In
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </animated.div>
    </div>
  );
};

export default SignupPage;
