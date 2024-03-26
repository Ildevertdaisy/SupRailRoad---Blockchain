 
import React, { useMemo } from 'react';
import Modal from "./Modal";

const Navbar = ({ account, balance: contractBalance, itemsSold }) => {

const connected = useMemo(() => {
  return  !!account?.admin ? "🟢 Connected" : "🔴 Not connected"
}, [account])

const admin = useMemo(() => {
  return  account?.admin || "No Account available"
}, [account])
const balance = useMemo(() => {
  return  account?.balance || "No Funds available"
}, [account])
return(
  <>
  <Modal />
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/#">SupRailroad</a>
      <ul className='contract-info list-inline mt-3 p-2'>
        <li className="list-inline-item"> <span className='bold'>Items sold</span> : {itemsSold} /</li>
        <li className="list-inline-item"> <span className='bold'>Balance</span> : {contractBalance} ETH</li>
      </ul>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {connected}
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="/#">account: {admin}</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/#">balance: {balance} ETH</a></li>
            </ul>
          </li>
        </ul>
       
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</>
)
}
export default Navbar;