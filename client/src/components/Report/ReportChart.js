import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ReportChart = ({ data }) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 15,
          left: -20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray='0' />
        <XAxis
          dataKey='date'
          angle='-10'
          fontSize='13px'
          tickMargin={7}
          interval={0}
        />
        <YAxis type='number' domain={['auto', (dataMax) => Math.ceil(dataMax) ]} />
        <Tooltip />
        <Bar dataKey='totalTime' name='Hours' fill='#A0AEC0' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
