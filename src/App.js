import FormInput from './components/FormInput';
import './App.scss';
import axios from 'axios';
import SearchTransactions from './components/SearchTransactions';
import { useState,useEffect } from 'react';
import ShowErrorMessage from './components/ShowErrorMessage';
import SpinnerLoading from './components/SpinnerLoading';
import Pagination from './components/Pagination';


function App() {
  const [transactions, setTransactions] = useState([]);
  const [enteredAddress, setEnteredAddress] = useState("")
  const [balance, setBalance] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [btnState, setBtnState] = useState("search");
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  useEffect(()=> {
  
    const fetchTransaction = async () => {
      setIsLoading(true)
     const API_KEY = process.env.REACT_APP_API_KEY;
     const transactionAPI = `https://api.etherscan.io/api?module=account&action=txlist&address=${enteredAddress}&startblock=0&endblock=99999999&page=1&sort=asc&apikey=${API_KEY}`
     const balanceAPI = `https://api.etherscan.io/api?module=account&action=balance&address=${enteredAddress}&tag=latest&apikey=${API_KEY}`
     
      try {
        const transactionResponse = await axios.get(transactionAPI)
        const balanceResponse = await axios.get(balanceAPI)
        axios.all([transactionResponse, balanceResponse])
             .then(
                  axios.spread((...responses) => {
                    const {result} = responses[0].data
                    const {data} = responses[1]  
                    if(data.result && enteredAddress){
                      setBalance(data.result);
                      setTransactions(result)
                    }
                  })
             )
             setIsLoading(false)
      } catch(error) {
        if(error.response) {
          // not in the 200 response range
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
      setIsLoading(false)
    }
    fetchTransaction()
  },[enteredAddress])

  const getAddress = (address)=> {
    const regObj = new RegExp("^(0x)?([A-Fa-f0-9]{40})$")
    if(regObj.test(address)) {
      setEnteredAddress(address) 
   } else {
    setErrorMessage('The wrong wallet address format');
      
        if(btnState === "search") {
          setBtnState("clear")
        } else if(btnState === "clear") {
          setBtnState("search")
          setErrorMessage("")
        }
   }
  } 
  
  //dealing with pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage; //5
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage; // 0
  const currentsTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderHelper = () => {
      if(errorMessage) {
       return <ShowErrorMessage message={errorMessage} />
      } else if(!errorMessage) {
               
                if(isLoading && currentsTransactions.length !== 0) {
                  return <SpinnerLoading />
                } 
                return <><SearchTransactions transactions={currentsTransactions} balance={balance}/><Pagination transactionsPerPage={transactionsPerPage} totalTransactions={transactions.length} paginate={paginate} /></> 
      } 
  }
  
  return (
    <div className="App">
       <FormInput OnGetAddress={getAddress} btnName={btnState} changeBtnName={setBtnState}/>
       {renderHelper()}
    </div>
  );
}

export default App;
