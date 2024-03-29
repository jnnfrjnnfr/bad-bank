function Deposit() {
  const ctx = React.useContext(UserContext);

  function handle() {
      ctx.users.push({name: data.name, deposit: data.deposit});
      return true;
  }

  return (
      <Card
        bgcolor="info"
        header="Deposit"
        deposit={handle}
        submitButtonDeposit="Deposit Successful!"
      />
  )
}