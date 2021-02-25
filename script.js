"use strict";

// TAX VARIABLES

const taxInputBox = document.querySelector("#tax-input");
const taxGoButton = document.querySelector(".tax-input-button");
const taxOutputBox = document.querySelector("#tax-output");
const taxBackButton = document.querySelector(".tax-back-button");
const taxYearlyButton = document.querySelector("#tax-timeframe-yearly");
const taxMonthlyButton = document.querySelector("#tax-timeframe-monthly");
const taxWeeklyButton = document.querySelector("#tax-timeframe-weekly");
const taxSalary = document.querySelector("#tax-salary");
const taxTimeframe = document.querySelector("#tax-timeframe");
const taxGrossResult = document.querySelector("#tax-gross");
const taxIncomeTaxResult = document.querySelector("#tax-income-tax");
const taxNIResult = document.querySelector("#tax-n-i");
const taxNetResult = document.querySelector("#tax-net");
let taxGrossIncome;
let afterIncomeTax;
let taxNetIncome;



// INTEREST VARIABLES

const interestInputBox = document.querySelector("#interest-input");
const interestGoButton = document.querySelector(".interest-input-button");
const interestOutputBox = document.querySelector("#interest-output");
const interestBackButton = document.querySelector(".interest-back-button");
const interestCompoundButton = document.querySelector("#interest-choice-compound");
const interestSimpleButton = document.querySelector("#interest-choice-simple");
const interestExtra = document.querySelector("#interest-extra");
const interestInitialInput = document.querySelector("#interest-initial");
const interestRateLabel = document.querySelector("#interest-rate-label");
const interestRateInput = document.querySelector("#interest-rate");
const interestCompoundInput = document.querySelector("#interest-compound-interval");
const interestDurationInput = document.querySelector("#interest-duration");
let interestInitial;
let interestRate;
let interestValue;
let interestTotal;
let interestDuration;
let interestFactor;
let interestSimpleStatus = false;



// BUDGET VARIABLES

const budgetInputBox = document.querySelector("#budget-input");
const budgetGoButton = document.querySelector(".budget-input-button");
const budgetOutputBox = document.querySelector("#budget-output");
const budgetBackButton = document.querySelector(".budget-back-button");



// ORIGINAL STATE

const original = function() {
  taxInputBox.classList.remove("hide");
  interestInputBox.classList.remove("hide");
  budgetInputBox.classList.remove("hide");
  taxOutputBox.classList.add("hide");
  interestOutputBox.classList.add("hide");
  budgetOutputBox.classList.add("hide");
  interestCompoundButton.style.backgroundColor = "#fc7703";
  interestSimpleStatus = false;
};

original();



// TAX BUTTON CLICKS

taxGoButton.addEventListener("click", function() {
  taxGrossIncome = 0;
  if (taxTimeframe.value === "week") {
    taxGrossIncome += 52*taxSalary.value.replace(",", "").replace("£", "");
  } else if (taxTimeframe.value === "month") {
    taxGrossIncome += 12*taxSalary.value.replace(",", "").replace("£", "");
  } else {
    taxGrossIncome = Number(taxSalary.value.replace(",", "").replace("£", ""));
  }
  taxGrossResult.textContent = Math.round(taxGrossIncome);
  afterIncomeTax = taxGrossIncome;
  if (taxGrossIncome >= 150000) {
    afterIncomeTax -= (0.45*(taxGrossIncome-150000));
    afterIncomeTax -= 40000;
    afterIncomeTax -= 7500;
  } else if (taxGrossIncome >= 50001 && taxGrossIncome < 150000) {
    afterIncomeTax -= (0.4*(taxGrossIncome-50001));
    afterIncomeTax -= 7500;
  } else if (taxGrossIncome >= 12501) {
    afterIncomeTax -= (0.2*(taxGrossIncome-12501));
  } else {
    afterIncomeTax = taxGrossIncome;
  }
  taxIncomeTaxResult.textContent = Math.round(taxGrossIncome-afterIncomeTax);
  if (taxGrossIncome/52 > 962) {
    taxNetIncome = afterIncomeTax - (52*(((taxGrossIncome/52-962)*0.02)+779*0.12));
  } else if (taxGrossIncome/52 <= 962 && taxGrossIncome/52 >= 183) {
    taxNetIncome = afterIncomeTax - (52*(taxGrossIncome/52-183)*0.12);
  } else {
    taxNetIncome = afterIncomeTax;
  }
  taxNIResult.textContent = Math.round(afterIncomeTax-taxNetIncome);
  taxNetResult.textContent = Math.round(taxNetIncome);
  taxYearlyButton.style.backgroundColor = "#f5f120";
  taxMonthlyButton.style.backgroundColor = "#ffffff";
  taxWeeklyButton.style.backgroundColor = "#ffffff";
  taxInputBox.classList.add("hide");
  taxOutputBox.classList.remove("hide");
});

taxYearlyButton.addEventListener("click", function() {
  taxGrossResult.textContent = Math.round(taxGrossIncome);
  taxIncomeTaxResult.textContent = Math.round(taxGrossIncome-afterIncomeTax);
  taxNIResult.textContent = Math.round(afterIncomeTax-taxNetIncome);
  taxNetResult.textContent = Math.round(taxNetIncome);
  taxYearlyButton.style.backgroundColor = "#f5f120";
  taxMonthlyButton.style.backgroundColor = "#ffffff";
  taxWeeklyButton.style.backgroundColor = "#ffffff";
});

taxMonthlyButton.addEventListener("click", function() {
  taxGrossResult.textContent = Math.round(taxGrossIncome/12);
  taxIncomeTaxResult.textContent = Math.round((taxGrossIncome-afterIncomeTax)/12);
  taxNIResult.textContent = Math.round((afterIncomeTax-taxNetIncome)/12);
  taxNetResult.textContent = Math.round(taxNetIncome/12);
  taxYearlyButton.style.backgroundColor = "#ffffff";
  taxMonthlyButton.style.backgroundColor = "#f5f120";
  taxWeeklyButton.style.backgroundColor = "#ffffff";
});

taxWeeklyButton.addEventListener("click", function() {
  taxGrossResult.textContent = Math.round(taxGrossIncome/52);
  taxIncomeTaxResult.textContent = Math.round((taxGrossIncome-afterIncomeTax)/52);
  taxNIResult.textContent = Math.round((afterIncomeTax-taxNetIncome)/52);
  taxNetResult.textContent = Math.round(taxNetIncome/52);
  taxYearlyButton.style.backgroundColor = "#ffffff";
  taxMonthlyButton.style.backgroundColor = "#ffffff";
  taxWeeklyButton.style.backgroundColor = "#f5f120";
});

taxBackButton.addEventListener("click", function() {
  taxOutputBox.classList.add("hide");
  taxInputBox.classList.remove("hide");
});



// INTEREST BUTTON CLICKS

interestCompoundButton.addEventListener("click", function() {
  interestCompoundButton.style.backgroundColor = "#fc7703";
  interestSimpleButton.style.backgroundColor = "#ffffff";
  interestExtra.classList.remove("hide");
  interestRateLabel.textContent = "Interest rate (AER):";
  interestSimpleStatus = false;
});

interestSimpleButton.addEventListener("click", function() {
  interestSimpleButton.style.backgroundColor = "#fc7703";
  interestCompoundButton.style.backgroundColor = "#ffffff";
  interestExtra.classList.add("hide");
  interestRateLabel.textContent = "Interest rate:";
  interestSimpleStatus = true;
});

interestGoButton.addEventListener("click", function() {
  interestInitial = Number(interestInitialInput.value.replace(",", "").replace("£", ""));
  interestRate = Number(interestRateInput.value.replace("%", ""));

  if (interestSimpleStatus) {
    interestTotal = (1 + interestRate/100)*interestInitial;
    interestValue = interestTotal-interestInitial;

    document.querySelector("#interest-starting").textContent = interestInitial.toFixed(2);
    document.querySelector("#interest-amount").textContent = interestValue.toFixed(2);
    document.querySelector("#interest-ending").textContent = interestTotal.toFixed(2);
    document.querySelector(".percentage-sentence").classList.add("hide");

  } else {
    interestValue = 0;
    interestDuration = interestDurationInput.value/12;
    interestFactor = 1 + (interestRate/100);

    if (interestCompoundInput.value === "year") {
      interestTotal = interestInitial * Math.pow(interestFactor, interestDuration);
    } else if (interestCompoundInput.value === "quarter") {
      interestTotal = interestInitial * Math.pow((interestFactor-1)/4+1, interestDuration*4);
    } else if (interestCompoundInput.value === "month") {
      interestTotal = interestInitial * Math.pow((interestFactor-1)/12+1, interestDuration*12);
    } else if (interestCompoundInput.value === "week") {
      interestTotal = interestInitial * Math.pow((interestFactor-1)/52+1, interestDuration*52);
    } else if (interestCompoundInput.value === "day") {
      interestTotal = interestInitial * Math.pow((interestFactor-1)/365+1, interestDuration*365);
    }

    interestValue = interestTotal - interestInitial;
    document.querySelector("#interest-starting").textContent = interestInitial.toFixed(2);
    document.querySelector("#interest-amount").textContent = interestValue.toFixed(2);
    document.querySelector("#interest-ending").textContent = interestTotal.toFixed(2);
    document.querySelector("#interest-rise").textContent = ((interestValue/interestInitial)*100).toFixed(1);
    document.querySelector(".percentage-sentence").classList.remove("hide");
  }

  interestInputBox.classList.add("hide");
  interestOutputBox.classList.remove("hide");
});

interestBackButton.addEventListener("click", function() {
  interestOutputBox.classList.add("hide");
  interestInputBox.classList.remove("hide");
});



// BUDGET BUTTON CLICKS

budgetGoButton.addEventListener("click", function() {
  budgetInputBox.classList.add("hide");
  budgetOutputBox.classList.remove("hide");
});

budgetBackButton.addEventListener("click", function() {
  budgetOutputBox.classList.add("hide");
  budgetInputBox.classList.remove("hide");
});
