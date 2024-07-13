import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Card";
import AddExpenseModal from "../components/Modal/addExpense";
import AddIncomeModal from "../components/Modal/addIncome";
import { db } from "../firebase/Firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Firebase";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import TransactionTable from "../components/TransactionTable";
import NoTransactions from "../components/NoTransaction";
import Chart from "../components/Charts";

const DashBoard = () => {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);
      CalculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("Transaction Array", transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  useEffect(() => {
    CalculateBalance();
  }, [transactions]);

  const CalculateBalance = () => {
    let TotalIncome = 0;
    let TotalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        TotalIncome += transaction.amount;
      } else {
        TotalExpense += transaction.amount;
      }
    });
    setIncome(TotalIncome);
    setExpense(TotalExpense);
    setTotalBalance(TotalIncome - TotalExpense);
  };

  const resetBalance = () => {
    setTotalBalance(0);
    setIncome(0);
    setExpense(0);
    setTransactions([]);
  };

  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Cards
            totalBalance={totalBalance}
            income={income}
            expense={expense}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            resetBalance={resetBalance}
          />
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
        </>
      )}
      {transactions.length !== 0 ? (
        <Chart sortedTransactions={sortedTransactions} />
      ) : (
        <NoTransactions />
      )}

      <TransactionTable
        transactions={transactions}
        addTransaction={addTransaction}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
};

export default DashBoard;
