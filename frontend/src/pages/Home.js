import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import { NewTweet } from '../components/NewTweet';
import '../styles/Main.css';
import { TweetList } from '../components/TweetList';
// import Web3 from "web3"
import Accounts from '../components/Accounts';
import { AddressContext } from '../context/AddressContext';



export const Home = () => {
    const { getAddress } = useContext(AddressContext)
    const contractAddress = getAddress()
    console.log(contractAddress)

    // useEffect(() => {

    //     let a = new Web3(window.ethereum)// eslint-disable-line

    //     setWeb3(a)
    //     getAccount(a)
    // }, [])
    // async function getAccount(web3) {
    //     web3.eth.getAccounts().then((rec) => {
    //         setAccount(rec[0])

    //     })

    // }


    // const [account, setAccount] = useState("")
    // const [web3, setWeb3] = useState("")
    // // getAccount(web3)
    // console.log(account)
    return (
        <>
            <div className="home">
                <Accounts />
            </div>
            <NewTweet />
            <div className="tweets">
                <TweetList />
            </div>
        </>
    )
}
