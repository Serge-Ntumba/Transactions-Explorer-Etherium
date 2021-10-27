import React from 'react'
import Card from './UI/Card'
import "./SearchTransactions.scss";

const Web3 = require('web3');

const SearchTransactions = ({transactions, balance}) => {

    const transformBalance = (balance) => {
        const convertedBalance = Web3.utils.fromWei(balance, 'ether')
         return parseFloat(convertedBalance).toFixed(1);
    }

   const transformAddress = (address)=> {
       return `${address.slice(0,8)}...${address.slice(-8)}`
   }

    return (
        <>
        {transactions.map((transaction) => {
               return <Card key={transaction.hash}> 
                          <div className="wrapper">
                             <div className="item1" ><p><small>Transaction Hash</small></p> <span></span><p> {transaction.blockNumber} Block </p> </div> 
                             <div className="item2"> <a  href={`https://etherscan.io/tx/${transaction.hash}`} target="_blank"  rel="noopener noreferrer" >{transaction.hash} </a>  </div>
                             <div className="item3">
                                <div className="from-container">
                                      <div className="from-title">From</div>
                                      <div className="from-content"><a href={`https://etherscan.io/address/${transaction.from}`} target="_blank"  rel="noopener noreferrer" >{transformAddress(transaction.from)}</a></div>
                                </div>
                                <div className="to-container">
                                      <div className="to-title">To</div>
                                      <div className="to-content"> <a href={`https://etherscan.io/address/${transaction.to}`} target="_blank"  rel="noopener noreferrer" >{transformAddress(transaction.to)}</a></div>
                                </div>
                                <div className="balance" >{transformBalance(balance)}ETH</div>
                            </div>
                           </div>
                     </Card> 
            })}
        </>
    )
}

export default SearchTransactions;