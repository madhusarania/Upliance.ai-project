import React, { useMemo } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import { useAppContext } from "../context/AppContext";

const Counter: React.FC = () => {
  const { counterState, incrementCounter, decrementCounter, resetCounter } =
    useAppContext();

  const backgroundColor = useMemo(() => {
    const t = Math.min(counterState.count / 50, 1);
    const bezierValue = t * t * (3 - 2 * t);
    const hue = 220;
    const lightness = 85 - bezierValue * 55;
    return `hsl(${hue}, 80%, ${lightness}%)`;
  }, [counterState.count]);

  const backgroundSpring = useSpring({
    to: { backgroundColor },
    config: { tension: 120, friction: 14 },
  });

  const countSpring = useSpring({
    to: { number: counterState.count },
    from: { number: 0 },
    config: { tension: 180, friction: 12 },
  });

  return (
    <Card className="w-full h-full bg-white/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
      <animated.div
        style={{ ...backgroundSpring, padding: "1.5rem", borderRadius: "10px" }}
        className="transition-all duration-500"
      >
        <CardHeader className="flex justify-center pb-0">
          <h2 className="text-2xl font-bold">Counter</h2>
        </CardHeader>
        <CardBody className="flex flex-col items-center gap-6">
          <animated.div className="text-5xl font-bold text-white">
            {countSpring.number.to((n) => Math.floor(n))}
          </animated.div>
          <div className="flex gap-4">
            <Button
              color="primary"
              variant="flat"
              isIconOnly
              onPress={incrementCounter}
              className="h-12 w-12"
            >
              <Plus size={24} />
            </Button>
            <Button
              color="danger"
              variant="flat"
              onPress={resetCounter}
              className="h-12 px-6"
            >
              <RotateCcw size={20} className="mr-1" /> Reset
            </Button>
            <Button
              color="primary"
              variant="flat"
              isIconOnly
              onPress={decrementCounter}
              className="h-12 w-12"
            >
              <Minus size={24} />
            </Button>
          </div>
        </CardBody>
      </animated.div>
    </Card>
  );
};

export default Counter;
