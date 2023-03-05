import type { NextPage } from "next";
import { useState } from "react";
import { DropdownItemProps, FormDropdown } from "../components/FormDropdown";

export const items = [
  {
    name: "Select a period",
    value: "-",
  },
  {
    name: "Hourly",
    value: "hourly",
  },
  {
    name: "Weekly",
    value: "weekly",
  },
];

const Home: NextPage = () => {
  const [value, setValue] = useState<DropdownItemProps | undefined>(items[0]);

  return (
    <div className="px-10 py-10">
      <FormDropdown
        className="max-w-[400px] m-auto"
        label="Salary Period"
        id="about"
        items={items}
        value={value}
        // search={true}
        disabled={false}
        onChange={setValue}
      />
    </div>
  );
};

export default Home;
