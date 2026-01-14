declare module "react-resizable-panels" {
  import * as React from "react";

  export type PanelGroupProps = {
    direction?: "horizontal" | "vertical";
    children: React.ReactNode;
    className?: string;
  };

  export type PanelProps = {
    children: React.ReactNode;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    className?: string;
  };

  export type PanelResizeHandleProps = {
    children?: React.ReactNode;
    className?: string;
  };

  export const PanelGroup: React.FC<PanelGroupProps>;
  export const Panel: React.FC<PanelProps>;
  export const PanelResizeHandle: React.FC<PanelResizeHandleProps>;
}
