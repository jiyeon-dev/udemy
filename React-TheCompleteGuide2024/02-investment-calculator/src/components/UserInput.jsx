export default function UserInput({ title, name, data, onInvestmentChange }) {
  return (
    <div>
      <label>{title}</label>
      <input
        type='number'
        name={name}
        value={data}
        onChange={onInvestmentChange}
      ></input>
    </div>
  );
}
