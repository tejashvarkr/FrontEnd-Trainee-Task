interface DonutChartProps {
  data: {
    value: number;
    color: string;
    label: string;
  }[];
  centerValue?: string;
  centerLabel?: string;
  size?: number;
}

export function DonutChart({
  data,
  centerValue,
  centerLabel,
  size = 120,
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulatedPercentage = 0;

  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={strokeWidth}
        />
        {data.map((item, index) => {
          const percentage = item.value / total;
          const strokeDasharray = `${
            percentage * circumference
          } ${circumference}`;
          const strokeDashoffset = -accumulatedPercentage * circumference;
          accumulatedPercentage += percentage;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {(centerValue || centerLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && (
            <div className="text-2xl font-bold text-gray-900">
              {centerValue}
            </div>
          )}
          {centerLabel && (
            <div className="text-xs text-gray-500 text-center">
              {centerLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
