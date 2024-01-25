import { calculateInvestmentResults } from "../util/investment";
import Result from "./Result";

export default function ResultTable({ data }) {
  console.log("resultTable");
  let totalInterest = 0;
  const results = calculateInvestmentResults(data);

  const handleTotalInterest = (newValue) => {
    totalInterest = totalInterest + newValue;
    return totalInterest;
  };

  return (
    <table id='result'>
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <Result
            key={index}
            result={result}
            onTotalInterest={handleTotalInterest}
          />
        ))}
      </tbody>
    </table>
  );
}
