import React, { Component, useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { get, debounce } from 'lodash';
const ChartNode = (props) => {
  const { data2 } = props;
  console.log('datachart',data2);
  const data = {
    data: [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ]
  };
 
  return (
    <div className="container-full">
      <div className="row">
        <div className="col-sm-12" style={{ fontSize: 30, fontWeight: "bold", textTransform:"uppercase" }}>
          MANAGER NODE {data2.nodeID}
      </div>
        <div className="col-sm-12" style={{ fontSize: 12, fontWeight: "bold", textTransform:"uppercase" }}>Brightness</div>
        <div className="homepagelogin col-sm-12" style={{ marginTop: '50px' }}>
          <ResponsiveContainer className="chart" height={300}>
            <LineChart
              width={600}
              height={300}
              data={data2.bbrightness}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="timeGet" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="col-sm-12" style={{ fontSize: 12, fontWeight: "bold", textTransform:"uppercase" }}>humidity</div>
        <div className="homepagelogin col-sm-12" style={{ marginTop: '50px' }} activeDot={{ r: 8 }} >
          <ResponsiveContainer className="chart" height={300}>
            <LineChart
              width={600}
              height={300}
              data={data2.hhumidity}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="timeGet" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default (ChartNode);
