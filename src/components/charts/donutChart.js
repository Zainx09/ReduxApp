import React from "react";
import { Pie } from '@ant-design/plots';

import { useSelector, useDispatch } from "react-redux";


const DonutChart=() => {

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
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: 'AntV\nG2Plot',
          },
        },
      };
  return(
    <Pie {...config} />
  )
}

export default DonutChart;