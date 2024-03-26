import React, { useRef, useState, useMemo  } from 'react';
import Components from "."
import {uploadFileToIPFS} from "../lib/ipfs";
const { Preview, Form } = Components;

const { mintNFT, listNFT } = require("../lib/ethers").init(window.ethereum);

const Modal = () => {
  const inputRef = useRef()
  const [isPending, loading] = useState(false)
  const [message, setMessage] = useState("Minting Ticket ....")
  const [value, setValue] = useState({ name: null, file: null, path: null})
  
  const onTxConfirmed = () => {
    loading(false);
    alert(`new ticket successfully minted.`);
    inputRef.current.value = "";
    setValue({ name: null, file: null, path: null});
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (value.name && value.file) {
        //upload to IPFS
        uploadFileToIPFS(value,async res => {
          loading(true);
          const tokenURI = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
          const {tokenId} = await mintNFT(tokenURI);
          setMessage("creating Ticket...");
          await listNFT(tokenId, value.name, tokenURI);
          console.log(`successfully minted tokenID: ${tokenId}`);
          onTxConfirmed();
        })
    }
  }
  const handleOnChange = e => {
    if (e.target.name === 'file') {
      return setValue({...value, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])})
    }

    setValue({...value, [e.target.name]: e.target.value});

  }

  const isDisabled = useMemo(() => {
    return !value.file || !value.name
  }, [value])

  return(
  <div className="modal" tabindex="-1" id="modal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create Ticket</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body d-flex">
          <Preview {...value} />
          <Form 
            ref={inputRef} 
            onChange={handleOnChange} 
            onSubmit={handleOnSubmit} 
            isDisabled={isDisabled} 
            message={message}
            isPending={isPending}
            />
        </div>
      </div>
    </div>
</div>)
}
export default Modal;