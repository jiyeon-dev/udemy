import UserInput from "./UserInput";

export default function UserInputGroup({ data, onInvestmentChange }) {
  return (
    <>
      <div id='user-input'>
        <div className='input-group'>
          <UserInput
            title='initial investment'
            name='initialInvestment'
            data={data.initialInvestment}
            onInvestmentChange={onInvestmentChange}
          />
          <UserInput
            title='annual investment'
            name='annualInvestment'
            data={data.annualInvestment}
            onInvestmentChange={onInvestmentChange}
          />
        </div>

        <div className='input-group'>
          <UserInput
            title='expected return'
            name='expectedReturn'
            data={data.expectedReturn}
            onInvestmentChange={onInvestmentChange}
          />
          <UserInput
            title='duration'
            name='duration'
            data={data.duration}
            onInvestmentChange={onInvestmentChange}
          />
        </div>
      </div>
    </>
  );
}
