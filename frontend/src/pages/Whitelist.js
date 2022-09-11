import React, { useState } from "react";
import '../styles/Main.css';
import Web3 from 'web3'
import { publicKey, privateKey, nft_address, nft_abi } from './config'
import { getAccount } from "../components/getAccount";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddressContext } from "../context/AddressContext";
import { useContext } from "react";
import { useHistory } from 'react-router';
import '../App.css'


export function Whitelist() {
    const [count, setCount] = useState(0)
    // const routerHistory = useHistory();

    const [accounts, setAccounts] = useState('');
    const { addAddress } = useContext(AddressContext)
    getAccount().then((account) => {
        setAccounts(account);
        setCount(count + 1)
    })

    async function handleWhitelist(e) {
        const web3 = new Web3("wss://eth-rinkeby.alchemyapi.io/v2/QGns5o-q793AyEn2ejoukgYFa77RM5HH")
        web3.eth.accounts.wallet.add({
            privateKey: privateKey,
            address: publicKey
        });
        const nft_instance = new web3.eth.Contract(nft_abi, nft_address, {
            from: publicKey,
            gasLimit: web3.utils.toHex(10000000),
            gasPrice: web3.utils.toHex(100e9),
        })
        try {
            await nft_instance.methods.safeMint(accounts).send({ from: publicKey })

            toast.success(`Your are whitelisted`, {
                position: "bottom-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            // setTimeout(() => {
            //     routerHistory.push('/signup');
            // }, 7000)

        }
        catch (error) {
            console.log(error)
            toast.error('Error', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }


    }


    return (
        <div className="container"  >
            <form className="login-form">
                <h1 style={{ fontSize: "5rem" }}>Whitelist </h1>
                <h1>User   -   {accounts}</h1>
                <input type='text' className="input" placeholder="Your Name" size="35" style={{ height: "30px", fontSize: "3rem" }} />
                <input className="input" placeholder="Social Security Number" size="35" style={{ height: "30px", fontSize: "3rem" }} type='text' />
                {/* <input className="input" placeholder="Metadata URL" onChange={handleURL} size="35" style={{ height: "30px", fontSize: "3rem" }} type='text' /> */}

                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    style={{ fontSize: '2rem' }}

                />
                <br />
                <br />
                <br />
                <div className="btn tweet-btn text-center" onClick={handleWhitelist} style={{ width: "100px" }}>Whitelist</div>
            </form>
        </div >

    )
}