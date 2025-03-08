"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
interface Props {
  open: number;
  inProgress: number;
  Closed: number;
}

const IssuesChart = ({ open, inProgress, Closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "inProgress", value: inProgress },
    { label: "Closed", value: Closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={"50"}
            style={{ fill: " var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssuesChart;
