declare module 'react-router-dom' {
  import type { ComponentType } from 'react';

  export const BrowserRouter: ComponentType<{ children?: React.ReactNode }>;
  export const Routes: ComponentType<{ children?: React.ReactNode }>;
  export const Route: ComponentType<{
    path?: string;
    element?: React.ReactNode;
    index?: boolean;
    children?: React.ReactNode;
  }>;
  export const Link: ComponentType<{
    to: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    [key: string]: unknown;
  }>;
  export const NavLink: ComponentType<{
    to: string;
    children?: React.ReactNode;
    className?: string | ((props: { isActive: boolean }) => string);
    [key: string]: unknown;
  }>;
  export const Navigate: ComponentType<{ to: string; replace?: boolean }>;
  export const Outlet: ComponentType<object>;
  export function useNavigate(): (to: string | number) => void;
}
