import React, { useState ,useEffect} from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
const uuid = require("uuid");

let initialExpenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [] ;


function App() {
  // state
  // all state
  const [expenses, setExpenses] = useState(initialExpenses);
  //single state charge
  const [charge, setCharge] = useState("");
  //single state charge
  const [amount, setAmount] = useState("");
  //single state alert
  const [alert, setAlert] = useState({ show: true });
  //single state edit
  const [edit, setEdit] = useState({ show: false, id: "" });
  useEffect(()=>{
    console.log("expenses")
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])
  // function
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(parseFloat(e.target.value));
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => setAlert({ type: false }), 3000);
  };
  //clear
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "clear all" });
  };
  // edit
  const handleEdit = id => {
    let data = [...expenses];
    let findData = data.find(item => item.id === id);
    let filterData = data.filter(item => item.id !== id);
    setExpenses([...filterData]);
    setEdit({ show: true, id: findData.id });
    setCharge(findData.charge);
    setAmount(findData.amount);
  };
  // delete handleDele
  const handleDelete = id => {
    let data = [...expenses];
    let filterData = data.filter(item => item.id !== id);
    setExpenses([...filterData]);
    handleAlert({ type: "danger", text: "delete item success" });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit.show) {
        const addData = { id: edit.id, charge, amount };
        let data = [...expenses];
        data.push(addData);
        handleAlert({ type: "success", text: "item added" });
        setExpenses(data);
        setCharge("");
        setAmount("");
        setEdit({ show: false, id: "" });
        console.log(data);
      } else {
        const addData = { id: uuid(), charge, amount };
        let data = [...expenses];
        data.push(addData);
        handleAlert({ type: "success", text: "item added" });
        setExpenses(data);
        setCharge("");
        setAmount("");
        console.log(data);
      }
    } else {
      handleAlert({
        type: "danger",
        text:
          "charge can't be empty value and amount value has to be bigger than zero"
      });
    }

    // if (edit.show) {
    //   if (charge !== "" && amount > 0){
    //     const addData = { id: edit.id, charge, amount };
    //     let data = [...expenses];
    //     data.push(addData);
    //     handleAlert({ type: "success", text: "item added" });
    //     setExpenses(data);
    //     setCharge("");
    //     setAmount("");
    //     setEdit({show: false, id: ""});
    //     console.log(data)
    //   }
    // } else {
    //   if (charge !== "" && amount > 0) {
    //     const addData = { id: uuid(), charge, amount };
    //     let data = [...expenses];
    //     data.push(addData);
    //     handleAlert({ type: "success", text: "item added" });
    //     setExpenses(data);
    //     setCharge("");
    //     setAmount("");
    //     console.log(data)
    //   } else {
    //     handleAlert({
    //       type: "danger",
    //       text:
    //         "charge can't be empty value and amount value has to be bigger than zero"
    //     });
    //   }
    // }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit.show}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
