import { MdHome, MdPerson } from "react-icons/md";
import Posts from "./pages/posts";
import UsersTable from "./pages/table.page";

const category = [
  {
    name: "Asosiy",
    icon: <MdHome />,
    link: "/",
    component: <Posts />,
  },
  {
    name: "Barcha Bemorlar",
    icon: <MdPerson />,
    link: "/users",
    component: <UsersTable />,
  },
];

export default category;
