import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, cfg]) => cfg.theme || cfg.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

// --- Tooltip Types ---
export type TooltipPayloadItem = {
  name?: string;
  value?: any;
  dataKey?: string;
  color?: string;
  fill?: string;
  payload?: Record<string, any>;
};

// --- Tooltip ---
const ChartTooltip = RechartsPrimitive.Tooltip;

type ChartTooltipContentProps = Omit<React.ComponentProps<typeof RechartsPrimitive.Tooltip>, "payload"> & {
  payload?: TooltipPayloadItem[];
  hideLabel?: boolean;
  hideIndicator?: boolean;
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
  labelFormatter?: (value: any, payload?: TooltipPayloadItem[]) => React.ReactNode;
  formatter?: (value: any, name: string, item: TooltipPayloadItem, index: number, payload?: any) => React.ReactNode;
  labelClassName?: string;
  color?: string;
  label?: string;
};

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    if (!active || !payload?.length) return null;

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null;
      const [item] = payload;
      const value = item.value ?? item.name ?? "value";
      if (labelFormatter) return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [payload, hideLabel, labelFormatter, labelClassName]);

    return (
      <div
        ref={ref}
        className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}
      >
        {tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const indicatorColor = color || item.payload?.fill || item.color;
            return (
              <div
                key={item.dataKey ?? index}
                className={cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center")}
              >
                {!hideIndicator && (
                  <div
                    className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                      "h-2.5 w-2.5": indicator === "dot",
                    })}
                    style={{ "--color-bg": indicatorColor, "--color-border": indicatorColor } as React.CSSProperties}
                  />
                )}
                <span>{item.name ?? item.dataKey}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";

// --- Legend ---
const ChartLegend = RechartsPrimitive.Legend;

type ChartLegendContentProps = Omit<React.ComponentProps<"div">, "payload"> & {
  payload?: TooltipPayloadItem[];
  verticalAlign?: "top" | "bottom" | "middle";
  hideIcon?: boolean;
  nameKey?: string;
};

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    if (!payload?.length) return null;

    return (
      <div ref={ref} className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
        {payload.map((item, index) => (
          <div key={item.dataKey ?? index} className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground">
            {!hideIcon && <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegend";

// --- Export ---
export type { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
