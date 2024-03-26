import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import tokens from "./tokens";


const {connectWallet, fetchAll, getMktBalance, getItemsSold} = require("./lib/ethers").init(window.ethereum);

const Navigation = ({ links, isActive, updateActive }) => {
    return(
    <div className="d-flex flex-column">
        <button type="button" className="align-self-end btn btn-dark mt-3 mx-5" data-bs-toggle="modal" data-bs-target="#modal">Add a ticket+</button>
        <div className="d-flex justify-content-center mt-3">
            <ul className="nav">
                {links.map((link, index) => {
                    const active = isActive === index ? 'active' : '';
                    return(
                    <li key={link} className="nav-item" onClick={() => updateActive(index)}>
                        <a className={`nav-link ${active}`} aria-current="page" href="/#">{link}</a>
                    </li>)
                })}
            </ul>
        </div>
    </div>
    )
}

const Pending = ({ isVisible }) => isVisible ? <p className="mt-4 text-center"> Fetching the NFTs ....</p> : null

const Market = ({ isVisible, isActive, items }) => {
    if (isVisible && !items.length) { return(<p className="mt-4 text-center">No items to show </p>)}
    return(
        isVisible ? 
        <div className="container-fluid d-flex justify-content-center mt-5">
            <div className="d-flex justify-content-start flex-wrap text-center">
                {items.map(nft => {
                    return <Card isActive={isActive} key={`${nft.tokenId}-${nft.tokenURI}`} {...nft} />;
                })}
            </div>
        </div> : null
    )
}
   
export default function Marketplace() {
    const links = ["All Tickets", "My Tickets"];
    const [account, setAccount] = useState(null)
    const [mktBalance, setBalance] = useState(null)
    const [itemsSold, setItemsSold] = useState(null)
    const [items, setItems] = useState([])
    const [isPending, loading] = useState(true)
    const [active, setActive] = useState(0)
 
    const updateActive = (index) => {
        setActive(index)
    }
    const getNFTs = async () => {
        const items = await fetchAll();
        setItems(items);
        loading(false);  
    }
   
    const filtered = useMemo(() => {
        return active === 0 ? items : items?.filter(item => item.owner === account?.admin)
    }, [items, active, account])

    useEffect(() => {
       connectWallet()
            .then(getMktBalance)
            .then(getItemsSold)
            .then(({itemsSold, contractBalance, account}) => {
                setAccount(account);
                setBalance(contractBalance);
                setItemsSold(itemsSold);
                getNFTs();
            })

    }, []);
    
    
    return (
      <>
        <Navbar account={account} balance={mktBalance} itemsSold={itemsSold} />
        <Navigation links={links} updateActive={updateActive} isActive={active}/>
        <Market isVisible={!isPending} items={filtered} isActive={active} />        
      </>
    );
}       