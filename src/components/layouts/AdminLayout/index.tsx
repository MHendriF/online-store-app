import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
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
];

export default function AdminLayout(props: Proptypes) {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem}></Sidebar>
      {children}
    </div>
  );
}
