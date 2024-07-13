import React from "react";
import { Line, Pie } from "@ant-design/charts";
import "./style.css";

const Chart = ({ sortedTransactions }) => {
  console.log("sortedTransactions:", sortedTransactions);

  const data = sortedTransactions.map((item) => {
    return {
      date: item.date,
      amount: item.amount,
    };
  });

  console.log("Line chart data:", data);

  const config = {
    data,
    xField: "date",
    yField: "amount",
    autoFit: false,
  };

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  console.log("Filtered spending data:", spendingData);

  let finalSpending = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = {
        tag: obj.tag,
        amount: obj.amount,
      };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  console.log("Final spending data:", finalSpending);

  const spendingConfig = {
    data: Object.values(finalSpending),
    width: 500,
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <>
      <div className="chart-wrapper">
        <div>
          <h3 className="title">Transaction History</h3>
          <Line {...config} />
        </div>
        <div>
          <h3 className="title">Expense History</h3>
          <Pie {...spendingConfig} />
        </div>
      </div>
    </>
  );
};

export default Chart;
