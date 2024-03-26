import React, { useState, useEffect } from "react";
// const [, MKTAddress] = require('../deploy');



const { buyNFT, sellNFT, getAccount} = require("../lib/ethers").init(window.ethereum);


const BuyButton = ({ isVisible, buy, tokenId }) => {
    return isVisible && <button className="btn btn-sm btn-outline-warning" onClick={() => buy(tokenId)}>BUY</button>
}
const SellButton = ({ isVisible, sell, tokenId }) => {
    return isVisible && <button className="btn btn-sm btn-outline-warning" onClick={() => sell(tokenId)}>SELL</button>
}

const PendingButton = ({ isPending }) => {
    return isPending && <button style={{ opacity: 0.8 }} className="btn btn-sm btn-outline-info" disabled>Processing ... </button>
}
const Card = (props) => {
    const [isPending, loading] = useState(false)
    const [currentAccount, setAccount] = useState(null);
    const { tokenId, tokenURI, name, owner, price, isActive, isListed } = props;

    const buyToken = async () => {
        loading(true);
        try {
            await buyNFT(tokenId);
            loading(false);
            alert("you have successfully bought the token");
            window.location.reload();
        } catch (error) {
            console.error(error);
            loading(false);
        }
    };

    const sellToken = async () => {
        loading(true);
        try {
            await sellNFT(tokenId);
            loading(false);
            alert("you have successfully sold the token");
            window.location.reload();
        } catch (error) {
            console.error(error);
            loading(false);
        }
    };

    useEffect(() => {
        getAccount().then(setAccount);
    }, []);

    return(
        <div key={tokenURI}  className="card mb-4 mx-5" style={{width: "18rem"}}>
        <div className="img" style={{ backgroundImage: `url(${tokenURI}`, backgroundSize: "cover"}}></div>
        
        <div className="card-body" style={{ paddingBottom: 0 }}>
          <h5  className="mb-4">{name}</h5>
        
         <div className="d-flex justify-content-between align-content-center">
            <p>{price} ETH</p>
        
            <div>
                <PendingButton isPending={isPending} />
            
                 {/* <BuyButton  
                    {...props} 
                    buy={() => {}} 
                    isVisible={isListed && !isPending && isActive === 0 && owner === MKTAddress } 
                 /> */}
                <BuyButton  
                    {...props} 
                    buy={buyToken} 
                    isVisible={isListed && !isPending && isActive === 0} 
                 /> 
                <SellButton 
                    {...props}
                    sell={sellNFT} 
                    isVisible={owner === currentAccount && !isPending && !isListed && isActive === 1}  
                />

            </div>
         </div>
        
         
        </div>
      </div>)
}
export default Card