export type MetalType = 'Gold' | 'Silver' | 'Platinum' | 'Copper';

export type TimePeriod = 'Week' | 'Month' | 'SixMonths' | 'Year';

export interface MetalPrice {
    metal: MetalType;
    currentPrice: number;
    previousPrice: number;
    changeAmount: number;
    changePercent: number;
    lastUpdated: string;
}

export interface PricePoint {
    date: string;
    price: number;
}

export interface PriceHistory {
    metal: MetalType;
    period: TimePeriod;
    data: PricePoint[];
    generatedAt: string;
}

export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        tension: number;
    }[];
}

export interface MetalOption {
    value: MetalType;
    label: string;
    icon?: string;
}

export interface PeriodOption {
    value: TimePeriod;
    label: string;
    description: string;
}