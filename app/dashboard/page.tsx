import AddNewForm from "./_components/AddNewForm";
import InterViewsList from "./_components/InterViewsList";

const Dashboard = () => {
  return (
    <div className="p-10 ">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and start your AI mockup Interviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5 cursor-pointer">
        <AddNewForm />
      </div>
      <InterViewsList />
    </div>
  );
};

export default Dashboard;
