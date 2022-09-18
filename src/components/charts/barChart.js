import React from "react";
import { Bar } from '@ant-design/plots';

import { useSelector, useDispatch } from "react-redux";


const BarChart=() => {

    const vote = useSelector(state => state.voting);
    const data = [
        {
          type: 'Pakistan',
          value: vote.pak,
        },
        {
            type: 'Australia',
            value: vote.aus,
        },
        {
            type: 'England',
            value: vote.eng,
        },
        {
            type: 'India',
            value: vote.ind,
        },
        {
            type: 'South Africa',
            value: vote.south,
        },
        {
            type: 'NewZealand',
            value: vote.new,
        },
    ];
      
    const config = {
        data,
        xField: 'value',
        yField: 'type',
        seriesField: 'type',
        legend: {
          position: 'top-left',
        },
    };


  return(
    <Bar {...config} style={{width:'50%'}}/>
  )
}

export default BarChart;