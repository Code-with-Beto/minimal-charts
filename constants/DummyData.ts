export interface TimeSeriesData {
  value: number;
  label: string;
}

export const yearlyData: TimeSeriesData[] = [
  { value: 45, label: 'Jan' },
  { value: 52, label: 'Feb' },
  { value: 61, label: 'Mar' },
  { value: 58, label: 'Apr' },
  { value: 63, label: 'May' },
  { value: 72, label: 'Jun' },
  { value: 80, label: 'Jul' },
  { value: 85, label: 'Aug' },
  { value: 78, label: 'Sep' },
  { value: 71, label: 'Oct' },
  { value: 68, label: 'Nov' },
  { value: 75, label: 'Dec' },
];

export const weeklyData: TimeSeriesData[] = [
  { value: 30, label: 'Mon' },
  { value: 45, label: 'Tue' },
  { value: 55, label: 'Wed' },
  { value: 50, label: 'Thu' },
  { value: 60, label: 'Fri' },
  { value: 75, label: 'Sat' },
  { value: 65, label: 'Sun' },
];

export const generateMonthlyData = (year: number, month: number): TimeSeriesData[] => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, index) => ({
    value: Math.floor(Math.random() * 50) + 30, // Random value between 30 and 80
    label: `${index + 1}`,
  }));  
};


const currentDate = new Date();
export const monthlyData = generateMonthlyData(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1
);