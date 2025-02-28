import React from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useAppContext } from "../context/AppContext";
import { useSpring, animated } from "@react-spring/web";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  const { userData, counterState } = useAppContext();

  const dashboardSpring = useSpring({
    to: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 120, friction: 14 },
  });

  const counterData = {
    labels: ["Current Count"],
    datasets: [
      {
        label: "Counter Value",
        data: [counterState.count],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const userChartData = {
    labels: userData.map((user) => user.name),
    datasets: [
      {
        label: "User Profiles",
        data: userData.map(() => 1),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <animated.div style={dashboardSpring}>
      <Card className="w-full">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Counter Visualization
              </h3>
              <div className="h-64">
                <Bar
                  data={counterData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">User Profiles</h3>
              <div className="h-64">
                {userData.length > 0 ? (
                  <Doughnut
                    data={userChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No user data available
                  </div>
                )}
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          <div>
            <h3 className="text-lg font-semibold mb-2">User Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-primary-50">
                <CardBody className="text-center py-4">
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold">{userData.length}</p>
                </CardBody>
              </Card>
              <Card className="bg-success-50">
                <CardBody className="text-center py-4">
                  <p className="text-sm text-gray-500">Counter Value</p>
                  <p className="text-2xl font-bold">{counterState.count}</p>
                </CardBody>
              </Card>
              <Card className="bg-warning-50">
                <CardBody className="text-center py-4">
                  <p className="text-sm text-gray-500">Avg. Name Length</p>
                  <p className="text-2xl font-bold">
                    {userData.length > 0
                      ? Math.round(
                          userData.reduce(
                            (acc, user) => acc + user.name.length,
                            0
                          ) / userData.length
                        )
                      : 0}
                  </p>
                </CardBody>
              </Card>
              <Card className="bg-danger-50">
                <CardBody className="text-center py-4">
                  <p className="text-sm text-gray-500">Last Added</p>
                  <p className="text-xl font-bold truncate">
                    {userData.length > 0
                      ? userData[userData.length - 1].name
                      : "None"}
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </CardBody>
      </Card>
    </animated.div>
  );
};

export default Dashboard;
