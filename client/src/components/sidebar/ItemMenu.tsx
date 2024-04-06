import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import Icon from "@/lib/icon";

export type TItemMenu = {
  path: string;
  namePath: string;
  icon: any;
};
const ItemMenu: FC<TItemMenu> = (props) => {
  const pathname = usePathname();
  return (
    <Link
      href={props.path}
      className={`${pathname === props.path ? "text-gray-500" : "text-slate-400"} flex items-center gap-2`}
    >
      <Icon name={props.icon} />
      {props.namePath}
    </Link>
  );
};

export default ItemMenu;
