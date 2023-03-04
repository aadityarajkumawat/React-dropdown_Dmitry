import { ClockIcon, CloudIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { FormDropdown } from "../components/FormDropdown";

const Home: NextPage = () => {
  return (
    <div className="px-10 py-10">
      <FormDropdown
        className="max-w-[400px] m-auto"
        label="Salary Period"
        id="about"
        items={[
          {
            name: "Hourly",
            value: "hourly",
            rightText: "per hour",
            icon: <ClockIcon />,
          },
          {
            name: "Weekly",
            value: "weekly",
            rightText: "per hour",
            icon: <CloudIcon />,
          },
        ]}
        value={{
          name: "Weekly",
          value: "weekly",
        }}
        disabled={false}
        keyboardTriggeredPalette={true}
        onChange={() => {}}
      />
    </div>
  );
};

export default Home;
