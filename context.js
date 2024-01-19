const Route         = ReactRouterDOM.Route;
const Link          = ReactRouterDOM.Link;
const HashRouter    = ReactRouterDOM.HashRouter;
const UserContext   = React.createContext(null);

//Assign a user ID to the currentUserIndex variable
let currentUserIndex = 0;
function assignUserID(userID) {
    currentUserIndex = userID-1;
    return currentUserIndex;
};
//Card component and state variables
function Card(props) {
    const [show, setShow]          = React.useState(true);
    const [status, setStatus]      = React.useState('');
    const [name, setName]          = React.useState('');
    const [email, setEmail]        = React.useState('');
    const [password, setPassword]  = React.useState('');
    const [deposit, setDeposit]    = React.useState('');
    const [withdraw, setWithdraw]  = React.useState('');
    
    const ctx = React.useContext(UserContext);
    let users = [...ctx.users];
    
    let balance = users[currentUserIndex].balance;
    let userName = users[currentUserIndex].name;
    console.log(`Balance of ${userName} is ${balance}`);
  
  //Take field as input and performs validation checks for each field
    function validate(field) {
  //Checks for name input
    if (field === name) {
        if (name.length <= 0) {
            alert("You must provide a name.");
            return false;
        }
  }
  //Checks for valid email address
    if (field === email) {
            if (email.includes('@') === true) return true;
                else {
                alert("Enter a valid email address.");
                return false;
        }
  }
  //Checks password length
    if (field === password) {
        if (password.length < 8) {
        alert("Your password must be at least 8 characters.");
        return false;
        }
      }
  //Checks for positive numerical values
    if (field === deposit) {
        if (deposit <= 0) {
            alert("Transaction cannot be completed. Please enter an amount greater than 0.");
            return false;
        }
    }
  //Checks for positive numerical values
    if (field === withdraw) {
      if (withdraw <= 0) {
          alert("Transaction cannot be completed. Please enter an amount greater than 0.");
          return false;
      }
  }
    return true;
  }


    function validateLogin() {
        return password.length < 8 && name.length > 1;
    }
    
    function handleCreate() {
        console.log(name, email, password);
        if (!validate(name,     'name'))     return;
        if (!validate(email,    'email'))    return;
        if (!validate(password, 'password')) return;
        ctx.users.push({id: users.length+1, name, email, password, balance: 100});
        setShow(false);
    }
    
    function clearForm() {
        setName('');
        setEmail('');
        setPassword('');
        setDeposit('');
        setWithdraw('');
        setShow(true);
    }

    function handleDeposit() {
        console.log(name, `Deposit amount: ${deposit}`);
        if (!validate(name,       'name'))       return;
        if (!validate(deposit,    'deposit'))    return;
        if (name === users[currentUserIndex].name) {
          ctx.users.push({deposit});
          users[currentUserIndex].balance += Number(deposit);
          setShow(false);
          return;
        } else {
            alert(`User not logged in. Transaction cannot be completed.`);
            clearForm();
            setShow(true);
        }
    }

    function handleWithdraw() {
        if (!validate(name,    'name'))       return;
        if (!validate(withdraw,  'withdrawal'))    return;
        if (name === users[currentUserIndex].name){
            if ((Number(withdraw)) <= balance) {
                console.log(name, `Withdrawl amount: ${withdraw}`);
                users[currentUserIndex].balance -= Number(withdraw);
                setShow(false);
            } else {
                alert("Transaction cannot be completed. The requested amount exceeds the available funds.");
                return;
            }
        } else {
            alert(`User not logged in. Transaction cannot be completed.`);
            clearForm();
        }
        
    }

    function handleLogin() {
        if (!validate(name,     'name'))     return;
        if (!validate(password, 'password')) return;
        for (let i = 0; i <= users.length - 1; i++){
            if (i === (users.length -1) && users[i].name !== name) {
                alert("Login information incorrect. Please create an account or try signing in again.");
                setShow(true);
                clearForm();
                return;
            }
            if (name !== users[i].name){
                continue;
            }
            if (name === users[i].name && password !== users[i].password) {
                alert("Incorrect password. Try again.");
                setShow(true);
                setPassword('');
                return;
            }
            if (name === users[i].name && password === users[i].password){
                let userID = users[i].id;
                alert(`Current User is ${users[i].name} with id: ${userID}`);
                setShow(false);
                console.log(name, password, userID);
                assignUserID(userID);
                return;
            }
        }
    }

    function classes() {
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card mb-3' + bg + txt;
    }

    return (
        <div className={classes()} style={{maxWidth: "20rem"}}>
            <div className="card-header">{props.header}</div>
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                
                {props.handle && show ? (
                   <>
                   Account Name:<br/>
                   <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                   Email Address:<br/>
                   <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                   Password:<br/>
                   <input type="password" className="form-control" id="password" placeholder="Enter Password (8+ characters)" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                   <button type="submit" disabled={!password} className="btn btn-light" onClick={handleCreate} >Create Account</button>
                   </>
                ) : (
                props.submitButton && (
                   <>
                    <div className="card text-white text-center bg-success mb-3">
                       <h5>Account Creation Successful!</h5>
                    </div>
                    <button type="submit" className="btn btn-light" onClick={clearForm} >{props.submitButton}</button>
                   </>
                )
                )}
                {props.status && (<div id="'createStatus">{props.status}</div>)}
                {props.deposit && show ? (
                  <>
                  Balance for {userName}'s Account:           {balance} <br/><br/>
                  Account Name:<br/>
                  <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
    
                  Deposit Amount:<br/>
                  <input type="number" className="form-control" id="withdraw" placeholder="Enter Deposit Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>
    
                  <button type="submit" className="btn btn-light" onClick={handleDeposit} >Deposit</button>
                  </>
                ) : (props.submitButtonDeposit && (
                    <>
                    <div className="card text-white text-center bg-success mb-3">
                      <h5>Successful Deposit!</h5>
                    </div>
                    <button type="submit" className="btn btn-light" onClick={clearForm} >Make another transaction?</button>
                    </>
                  )
                )}
                {props.withdraw && show ? (
                  <>
                  Balance for {userName}'s Account:           {balance} <br/><br/>
                  Account Name:<br/>
                  <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                  
                  Withdraw Amount:<br/>
                  <input type="number" className="form-control" id="withdraw" placeholder="Enter Withdrawl Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)} /><br/>
      
                  <button type="submit" className="btn btn-light" onClick={handleWithdraw} >Withdraw</button>
                  </>
                ) : (props.submitButtonWithdraw && (
                    <>
                    <div className="card text-white text-center bg-success mb-3">
                      <h5>Successful Withdrawal!</h5>
                    </div>
                    <button type="submit" className="btn btn-light" onClick={clearForm} >Make another transaction?</button>
                    </>
                    )
                )}
                {props.login && show ? (
                  <>
                  Enter Account Name:<br/>
                  <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)}/><br/> 
                  Enter Password:<br/>
                  <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                  <button type="submit" disabled={!name || !password || validateLogin()} className="btn btn-light" onClick={handleLogin} >Sign In</button>
                  </>
                ) : (props.submitButtonLogin && (
                  <>
                  <div className="card text-white text-center bg-success mb-3">
                    <h5>Login Successful!</h5>
                  </div>
                  <button type="submit" className="btn btn-light" onClick={clearForm} >Go to Account</button>
                  </>
                  )
                )}
                {props.allData && (
                <>
                  Name: {props.allData[0]}<br/>
                  Email: {props.allData[1]}<br/>
                  Password: {props.allData[2]}<br/>
                  Balance: {props.allData[3]}<br/>
                </>)}
            </div>
        </div>
    )
}
