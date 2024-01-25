import { formatter } from "../util/investment";

export default function Result({ result, onTotalInterest }) {
  console.log("result row");
  const totalInterest = onTotalInterest(result.interest);

  return (
    <tr>
      <td>{result.year}</td>
      <td>{formatter.format(result.valueEndOfYear)}</td>
      <td>{formatter.format(result.interest)}</td>
      <td>{formatter.format(totalInterest)}</td>
      <td>{formatter.format(result.valueEndOfYear - totalInterest)}</td>
    </tr>
  );
}
