import React from "react";
import { useSpring, animated } from "@react-spring/web";
import Dashboard from "../components/Dashboard";

const DashboardPage: React.FC = () => {
  const pageSpring = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div style={pageSpring} className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <Dashboard />
    </animated.div>
  );
};

export default DashboardPage;
