

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
    yAxis: [
        {
            label: 'Doanh thu (triệu đồng)',
        },
    ],
    width: 540,
    height: 320,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)',
        },
        [`.${axisClasses.tickLabel}`]: { fontSize: '20px' },
    },
};
const dataset = [
    {
        revenue: 2.4,
        day: 'Thứ hai',
    },
    {
        revenue: 5.9,
        day: 'Thứ ba',
    },
    {
        revenue: 6.1,
        day: 'Thứ tư',
    },
    {
        revenue: 7,
        day: 'Thứ năm',
    },
    {
        revenue: 2.7,
        day: 'Thứ sáu',
    },
    {
        revenue: 10.5,
        day: 'Thứ bảy',
    },
    {
        revenue: 6,
        day: 'Chủ nhật',
    },
];

const valueFormatter = (value) => `${value} triệu đồng`;

function RevenueChart() {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'day',
                    categoryGapRatio: 0.4,
                },
            ]}
            series={[
                {
                    dataKey: 'revenue',
                    valueFormatter,
                    color: '#51829B',
                },
            ]}
            {...chartSetting}
        />
    );
}

export default RevenueChart;
