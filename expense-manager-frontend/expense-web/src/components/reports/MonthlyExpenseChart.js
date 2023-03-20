import React from "react";

import { Typography, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';



const MonthlyExpenseChart = (props) => {
    return (
        <React.Fragment>
            <Typography variant="h4">Total Monthly Expenses</Typography>
            <Box height={400} width={800}>
                <ResponsiveContainer>
                    <LineChart
                        data={props.totals}
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }}
                        width={600} height={300}
                    >
                        <XAxis
                            dataKey="month"
                            stroke={'#707070'}
                        />
                        <YAxis
                            stroke={'#707070'}
                        >
                            <Label
                                angle={270}
                                position="left"
                                style={{
                                    textAnchor: 'middle',
                                }}
                            >
                                Expenses ($)
                            </Label>
                        </YAxis>

                        <Line
                            type="linear"
                            dataKey="amount"
                            stroke={"#1976d2"}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </React.Fragment>
    );
}

export default MonthlyExpenseChart;