import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '(Wed) 5-Jan',
    Hours: 3.9,
  },
  {
    name: '(Thu) 6-Jan',
    Hours: 3,
  },
  {
    name: '(Fri) 7-Jan',
    Hours: 2,
  },
  {
    name: '(Sat) 8-Jan',
    Hours: 2.7,
  },
  {
    name: '(Sun) 9-Jan',
    Hours: 1.9,
  },
  {
    name: '(Mon) 10-Jan',
    Hours: 2.3,
  },
  {
    name: '(Tue) 11-Jan',
    Hours: 3.4,
  },
];

const ReportChart = () => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 15,
          left: -30,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          angle='-10'
          fontSize='13px'
          tickMargin={7}
          interval={0}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey='Hours' fill='#A0AEC0' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
