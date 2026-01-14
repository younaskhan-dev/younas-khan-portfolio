"use client"; // required for hooks like usePathname

import Link, { LinkProps } from "next/link";
import { forwardRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "className"> {
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, className, activeClassName, href, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
