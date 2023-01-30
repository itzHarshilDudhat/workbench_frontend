import { Card } from "antd";
import React from "react";
import LoadingScreen from "../../screens/LoadingScreen";

const Dashboard = () => {
  return (
    <Card>
      <div style={{ height: "80vh" }}>
        <LoadingScreen />
      </div>
    </Card>
  );
};

export default Dashboard;
