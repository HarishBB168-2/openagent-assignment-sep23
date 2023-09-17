import Sidebar from "./Sidebar";

type DashboardProps = {
  id: string;
};

const Dashboard = ({ id }: DashboardProps) => {
  return <Sidebar id={id} />;
};

export default Dashboard;
