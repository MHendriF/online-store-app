import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type PropTypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-box",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bxs-group",
  },
];

export default function AdminLayout(props: PropTypes) {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem}></Sidebar>
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
}
