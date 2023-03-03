import {
  BookOpenIcon,
  ColorSwatchIcon,
  EyeIcon,
} from "@heroicons/react/outline";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormDropdown } from "../components/FormDropdown";

const commands = [
  {
    name: "Create new issue...",
    shortcut: "C",
    group: "Issue",
    icon: <BookOpenIcon />,
  },
  {
    name: "Create issue in fullscreen...",
    shortcut: "V",
    group: "Issue",
    icon: <BookOpenIcon />,
  },
  {
    name: "Create new label...",
    shortcut: "",
    group: "Issue",
  },
  {
    name: "Create new project...",
    shortcut: "",
    group: "Project",
  },
  {
    name: "Create new view...",
    shortcut: "",
    group: "Views",
  },
  { name: "Leave team", shortcut: "", group: "Team" },
  {
    name: "Subscribe to team notifications",
    shortcut: "",
    group: "Team",
  },
  {
    name: "Create new team...",
    shortcut: "",
    group: "Team",
  },
  {
    name: "Copy team URL to clipboard",
    shortcut: "",
    group: "Team",
  },
  {
    name: "Create a new template...",
    shortcut: "",
    group: "Templates",
  },
  {
    name: "Open issue...",
    shortcut: "O then I",
    group: "Navigation",
  },
  {
    name: "Open last viewed issue",
    shortcut: "",
    group: "Navigation",
  },
];

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
          },
          {
            name: "Weekly",
            value: "weekly",
          },
        ]}
        value={{
          name: "Weekly",
          value: "weekly",
        }}
        search={true}
        commands={commands}
        disabled={false}
        onChange={() => {}}
      />
    </div>
  );
};

export default Home;
