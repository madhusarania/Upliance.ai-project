import React from "react";
import { useSpring, animated } from "@react-spring/web";
import Counter from "../components/Counter";
import UserForm from "../components/UserForm";
import RichTextEditor from "../components/RichTextEditor";

const Home: React.FC = () => {
  const pageSpring = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div style={pageSpring} className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">React Assignment</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="h-full">
          <Counter />
        </div>
        <div className="h-full">
          <RichTextEditor />
        </div>
      </div>

      <div className="mb-6">
        <UserForm />
      </div>
    </animated.div>
  );
};

export default Home;
