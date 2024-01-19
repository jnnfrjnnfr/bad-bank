function Withdraw() {
  const ctx = React.useContext(UserContext);

  function handle () {
      ctx.users.push({name: data.name, withdraw: data.withdraw});
      return true;
  }

  return (
      <Card
        bgcolor="info"
        header="Withdraw"
        withdraw={handle}
        submitButtonWithdraw="Withdrawal Successful!"
      />
  )
}
