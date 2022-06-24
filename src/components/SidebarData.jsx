import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as ImIcons from "react-icons/im";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdIcons.MdDashboard />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <ImIcons.ImUsers />,
    iconClosed: <BsIcons.BsChevronUp />,
    iconOpened: <IoIcons.IoIosArrowDown />,
    subNav: [
      {
        title: "View Users",
        path: "/admin/users/view_users",
        icon: <FaIcons.FaUserClock />,
      },
      {
        title: "Verify Users",
        path: "/admin/users/verify_users",
        icon: <FaIcons.FaUserCheck />,
      },
    ],
  },
  {
    title: "Posts",
    path: "/admin/posts",
    icon: <IoIcons.IoIosDocument />,
    // iconClosed: <BsIcons.BsChevronUp />,
    // iconOpened: <IoIcons.IoIosArrowDown />,
    // subNav: [
    //   {
    //     title: "",
    //     path: "",
    //     icon: null,
    //   },
    //   {
    //     title: "",
    //     path: "",
    //     icon: null,
    //   },
    // ],
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <IoIcons.IoMdSettings />,
  },
];
