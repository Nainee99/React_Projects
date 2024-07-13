import React from "react";
import "./style.css";
import { Card, Row } from "antd";
import Button from "../Button/index";

const Cards = ({
  showExpenseModal,
  showIncomeModal,
  income,
  expense,
  totalBalance,
  resetBalance,
}) => {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card">
          <h2>Current Balance</h2>
          <p> Rs {totalBalance}</p>
          <Button text=" Reset Balance" blue={true} onClick={resetBalance} />
        </Card>

        <Card className="my-card">
          <h2>Total Income</h2>
          <p> Rs {income}</p>
          <Button text=" Add Income" blue={true} onClick={showIncomeModal} />
        </Card>

        <Card className="my-card">
          <h2>Total Expenses</h2>
          <p>Rs {expense}</p>
          <Button text=" Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
