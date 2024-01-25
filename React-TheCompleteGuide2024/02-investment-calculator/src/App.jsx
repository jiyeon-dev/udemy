import { useState } from "react";
import ResultTable from "./components/ResultTable";
import UserInputGroup from "./components/UserInputGroup";

const INITIAL_INVESTMENT = {
  initialInvestment: 15000,
  annualInvestment: 900,
  expectedReturn: 5.5,
  duration: 12,
};

function App() {
  const [investment, setInvestment] = useState(INITIAL_INVESTMENT);

  const handleInvestmentChange = (e) => {
    const { name, value } = e.target;
    setInvestment((prevInvestment) => ({
      ...prevInvestment,
      [name]: parseFloat(value),
    }));
  };

  return (
    <>
      <UserInputGroup
        data={investment}
        onInvestmentChange={handleInvestmentChange}
      />
      <ResultTable data={investment} />
    </>
  );
}

export default App;
