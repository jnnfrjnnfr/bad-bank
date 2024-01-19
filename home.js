function Home(){
  return (
    <Card
      bgcolor="info"
      txtcolor="light"
      header="Bad Bank"
      title="Welcome to the Bad Bank"
      text="We don't promise to keep anything safe."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
