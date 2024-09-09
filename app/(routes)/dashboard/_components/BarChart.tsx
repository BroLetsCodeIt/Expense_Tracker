import React from 'react'

import  {BarChart , CartesianGrid , XAxis , YAxis , Tooltip , Legend , Bar, ResponsiveContainer } from 'recharts';

interface  budgetlistProps  {
  amount : number ,
  createdBy : string , 
  icon : string |null , 
  id : number , 
  name : string , 
  totalItems : number , 
  totalspend : number 
}
const BarChartComponent = ({budgetlist} : {budgetlist : budgetlistProps[]}) => {
 
  return (
    <ResponsiveContainer width={830} height={500}>

    <BarChart  data={budgetlist}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="totalspend" fill="#8884d8" stackId={'sd'}/>
  <Bar dataKey="amount" fill="#82ca9d"  stackId={'sd'}/>
</BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
