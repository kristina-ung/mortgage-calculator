import React, { useState } from "react";
import "./calculator.scss";
import calculatorImage from './illustration-empty.svg';

function Calculator() {

  const [amount, setAmount] = useState('');
  const [termYears, setTermYears] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [mortgageType, setMortgageType] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const fields = {
      amount,
      interestRate,
      termYears,
      mortgageType
    };

    const newErrors = {};

    Object.keys(fields).forEach(field => {
      if (!fields[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMortgage = () => {
    if (!validateForm()) return;

    const P = parseFloat(amount);
    const annualRate = parseFloat(interestRate) / 100;
    const r = annualRate / 12;
    const n = parseInt(termYears) * 12;

    let payment;

    if (mortgageType === 'repayment') {
      if (r === 0) { // Handle zero interest rate
        payment = P / n;
      } else {
        const factor = Math.pow(1 + r, n);
        payment = (P * r * factor) / (factor - 1);
      }
    } else if (mortgageType === 'interestOnly') {
      payment = P * r;
    }

    setMonthlyPayment(payment.toFixed(2));

    // Calculate total repayment over the term
    const total = payment * n;
    setTotalRepayment(total.toFixed(2));
  };

  const resetCalculator = () => {
    setAmount('');
    setInterestRate('');
    setTermYears('');
    setMortgageType('');
    setMonthlyPayment(null);
    setTotalRepayment(null);
    setErrors({});
  };

  return (
    <>
      <div className="calculator">
        <div className="calculator__form">

          <div className="calculator__top">
            <h2>Mortgage Calculator</h2>
            <button type="reset" onClick={resetCalculator} className="calculator__reset">Clear All</button>
          </div>

          <form className="form" onSubmit={(e) => { e.preventDefault(); calculateMortgage(); }}>
            <div className="form__item">
              <label for="amount" className="field__label">Mortgage Amount</label>
              <div 
                className={`form__input-container ${errors.amount ? 'form__error-container' : ''}`}
              >
                <span>$</span>
                <input
                  className="field__input" 
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.amount && <p className="form__error-message">{errors.amount}</p>}
            </div>

            <div className="form__group">
              <div className="form__item">
                <label for="term" className="field__label">Mortgage Term</label>

                <div
                  className={`form__input-container ${errors.termYears ? 'form__error-container' : ''}`}
                >
                  <input
                    className="field__input" 
                    id="term"
                    type="number"
                    min="1"
                    value={termYears}
                    onChange={(e) => setTermYears(e.target.value)}
                  />
                  <span>Years</span>
                </div>
                {errors.termYears && <p className="form__error-message">{errors.termYears}</p>}
              </div>

              <div className="form__item">
                <label for="interest-rate" className="field__label">Interest Rate</label>

                <div
                  className={`form__input-container ${errors.interestRate ? 'form__error-container' : ''}`}
                >
                  <input
                    className="field__input" 
                    id="interest-rate" 
                    type="number"
                    step="0.01"
                    min="0"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    
                  />
                  <span>%</span>
                </div>
                {errors.interestRate && <p className="form__error-message">{errors.interestRate}</p>}
              </div>
            </div>

            <div className="form__item">
              <fieldset>
                <legend>Mortgage Type</legend>
                <div>
                  <div className="form__option">
                    <input
                      type="radio"
                      id="repayment" 
                      value="repayment"
                      checked={mortgageType === 'repayment'}
                      onChange={(e) => setMortgageType(e.target.value)}
                    />
                    <label for="repayment">Repayment</label>
                  </div>

                  <div className="form__option">
                    <input
                      type="radio"
                      id="interest-only"
                      value="interestOnly"
                      checked={mortgageType === 'interestOnly'}
                      onChange={(e) => setMortgageType(e.target.value)}
                    />
                    <label for="interest-only">Interest Only</label>
                  </div>
                </div>
                {errors.mortgageType && <p className="form__error-message">{errors.mortgageType}</p>}
              </fieldset>
            </div>

            <button type="submit" className="button button--icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#133041" d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z" /></svg>
              Calculate Repayments
            </button>

          </form>
        </div>

        <div className="calculator__results">
          <div className="calculator__content">

            {monthlyPayment !== null ? (
              <div className="calculator__results-content">
                <h2>Your results</h2>

                <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>

                <div className="calculator__payments">
                  <div>
                    <h3>Your monthly repayments</h3>
                    <span className="calculator__monthly-payment">${monthlyPayment}</span>
                  </div>

                  <div>
                    <h3>Total you'll repay over the term</h3>
                    <span className="calculator__total-repayment">${totalRepayment}</span>
                  </div>
                </div>
              </div>
              ) : (
              <>
                <img src={calculatorImage} alt="" width="192" height="192" />

                <h2>Results shown here</h2>
                <p>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
              </>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calculator;