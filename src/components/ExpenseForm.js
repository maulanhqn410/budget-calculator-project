import React from "react";
import { MdSend } from "react-icons/md";
const ExpenseForm = ({charge, amount, handleCharge, handleAmount,handleSubmit, edit}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-center">
          <div className="form-group">
            <label htmlFor="charge">charge</label>
            <input
              id="charge"
              name="charge"
              placeholder="e.g. rent"
              type="text"
              className="form-control"
              value={charge}
              onChange={handleCharge}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">amount</label>
            <input
              id="amount"
              name="amount"
              placeholder="e.g. rent"
              type="number"
              className="form-control"
              value={amount}
              onChange={handleAmount}
            />
          </div>
        </div>
        <button className="btn" type="submit">
          {edit ? "edit": "submit" } <MdSend className="btn-icon" />
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
