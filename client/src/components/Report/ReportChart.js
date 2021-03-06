import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ReportChart = ({ data, isReportByWeek, chartMargin }) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: chartMargin,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray='0' />
        <XAxis
          dataKey={isReportByWeek ? 'date' : 'month'}
          fontSize='calc(8px + 0.4vw)'
          fontWeight='bold'
          tickMargin={8}
          interval={0}
        />
        <YAxis
          type='number'
          fontSize='calc(9px + 0.5vw)'
          fontWeight='bold'
          domain={[0, (dataMax) => Math.ceil(dataMax + 0.5)]}
        />
        <Tooltip />
        <Bar dataKey='totalTime' name='Hours' fill='#A0AEC0' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
