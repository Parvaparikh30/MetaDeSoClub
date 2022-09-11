import React, { useState } from "react";
import '../styles/Main.css';
import Web3 from 'web3'
import { publicKey, privateKey, factory_address, factory_abi, nft_abi } from './config'
import { getAccount } from "../components/getAccount";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddressContext } from "../context/AddressContext";
import { useContext } from "react";
import { useHistory } from 'react-router';
import { CCContext } from "../context/CC";
import '../App.css'



export function Login() {
    const routerHistory = useHistory();


    const [name, setName] = useState('');
    const [sym, setSym] = useState('');
    const [url, seturl] = useState('');
    const [count, setCount] = useState(0)
    const [accounts, setAccounts] = useState('');
    const { addAddress } = useContext(AddressContext)
    const { addCreator } = useContext(CCContext)
    getAccount().then((account) => {
        setAccounts(account);
        setCount(count + 1)
    })




    function handleContract(e) {
        setName(e.target.value)
    }
    function handleSymbol(e) {
        setSym(e.target.value)


    }
    function handleURL(e) {
        seturl(e.target.value)


    }
    async function handleSign(e) {
        addAddress("abc")

        const web3 = new Web3(window.ethereum)

        const factory_instance = new web3.eth.Contract(factory_abi, factory_address)
        console.log(factory_instance)
        console.log(name, url, sym)


        try {
            addCreator(accounts)
            const result = await factory_instance.methods.createContract(name, sym, url).send({ from: accounts })
            const add = result.events.contractCreation.returnValues.contractAddress
            const nft_instance = new web3.eth.Contract(nft_abi, add)
            console.log(add)
            addAddress(add)
            toast.success(`User NFT contract Address = ${add}`, {
                position: "bottom-center",
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });

            setTimeout(async () => {
                const MintResult = await nft_instance.methods.safeMint(accounts).send({ from: accounts })
                console.log(MintResult)
                routerHistory.push('/home');
            }, 7000)

        }
        catch (error) {
            console.log(error)
            toast.error('Error', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
        // factory_instance.methods.createContract(name, sym, url).send({ from: publicKey })

        //     .on('receipt', function (receipt) {
        //         console.log(receipt.events.contractCreation.returnValues.contractAddress)
        //         const add = receipt.events.contractCreation.returnValues.contractAddress
        //         addAddress(add)
        //         toast.success(`User NFT contract Address = ${add}`, {
        //             position: "bottom-center",
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     })
        //     .on('error', function (error) {
        //         console.log(error)
        //         toast.error('Error', {
        //             position: "bottom-center",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     })
        // routerHistory.push('/home');


    }

    return (
        <div className="container"  >
            <form className="login-form">
                <h1 style={{ fontSize: "5rem" }}>Sign Up </h1>
                <input type='text' className="input" onChange={handleContract} placeholder="NFT Contract Name" size="35" style={{ height: "30px", fontSize: "3rem" }} />
                <input className="input" placeholder="Symbol" onChange={handleSymbol} size="35" style={{ height: "30px", fontSize: "3rem" }} type='text' />
                <input className="input" placeholder="Metadata URL" onChange={handleURL} size="35" style={{ height: "30px", fontSize: "3rem" }} type='text' />

                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    rtl={false}

                    style={{ fontSize: '2rem' }}


                />

                {/* <div className="container">
                <div style={{ transform: `translate(${this.state.form === 'login' ? 0 : 250}px, 0px)` }} className="form-div">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input placeholder="Email" type="text" />
                        <input placeholder="Password" type="password" />
                        {this.state.form === 'login' ? '' : <input placeholder="Re-typed password" type="password" />}
                        <button className="button-primary">Submit</button>
                    </form>
                </div>
                <div style={{ transform: `translate(${this.state.form === 'login' ? 0 : -250}px, 0px)` }} className="button-div">
                    <p>{this.state.form === 'login' ? 'Do not have an account?' : 'Already a member?'}</p>
                    <button onClick={() => { this.setState({ form: this.toggle[this.state.form] }) }}>{this.toggle[this.state.form]}</button>
                </div>
            </div> */}
                <br />
                <br />
                <br />
                <div className="btn tweet-btn text-center" onClick={handleSign} style={{ width: "100px" }}>Sign Up</div>
            </form>
        </div >


    );
}


const contractAddress = () => {

}
export default contractAddress