import { calc } from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ReportChart = ({ data, isReportByWeek }) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 15,
          left: -25,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray='0' />
        <XAxis
          dataKey={isReportByWeek ? 'date' : 'month'}
          angle={isReportByWeek ? -12 : 0}
          fontSize='calc(8px + 0.28vw)'
          fontWeight='bold'
          tickMargin={8}
          interval={0}
        />
        <YAxis
          type='number'
          fontSize='calc(9px + 0.5vw)'
          domain={['auto', (dataMax) => Math.ceil(dataMax)]}
        />
        <Tooltip />
        <Bar dataKey='totalTime' name='Hours' fill='#A0AEC0' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
