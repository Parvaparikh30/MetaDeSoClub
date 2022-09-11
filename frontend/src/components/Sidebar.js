import React from 'react';
import { useContext, useState } from 'react';
import { Logo, HomeIcon, ExploreIcon, NotificationIcon, MessageIcon, BookmarkIcon, ListsIcon, MoreIcon } from '../images/svg/svgs';
import { SmallAvatar } from '../images/avatars';
import submarine from '../submarine.svg'
import Web3 from "web3"
import { AddressContext } from '../context/AddressContext';
import { getAccount } from './getAccount';
import { nft_abi, nft_address } from './config';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { CCContext } from '../context/CC';




export const Sidebar = () => {
    const routerHistory = useHistory();

    const { getAddress } = useContext(AddressContext)
    const { getCreator } = useContext(CCContext)

    const contractAddress = getAddress()
    const creatorAddress = getCreator()
    const [count, setCount] = useState(0)
    const [accounts, setAccounts] = useState('');
    getAccount().then((account) => {
        setAccounts(account);
        setCount(count + 1)
    })

    const profImageurl = 'https://ipfs.io/ipfs/QmZGQA92ri1jfzSu61JRaNQXYg1bLuM7p8YT83DzFA2KLH?filename=Chainlink_Knight.png';
    function handleClick() {

    }
    async function handleFollow() {
        const web3 = new Web3(window.ethereum)
        const nft_instance = new web3.eth.Contract(nft_abi, contractAddress)
        try {
            web3.eth.sendTransaction({
                from: accounts,
                to: creatorAddress,
                value: "100000000000000000",
                data: "0x",
                gasLimit: web3.utils.toHex(10000000),
                gasPrice: web3.utils.toHex(100e9),
            })
                .on('receipt', function (receipt) {
                    nft_instance.methods.safeMint(accounts).send({ from: accounts })
                        .on('receipt', function (receipt) {
                            const add = receipt.events.tokenIdValue.returnValues.tokenIdValue

                            toast.success(`NFT Minted, Token ID is  ${add}`, {
                                position: "bottom-center",
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });

                        })
                        .on('error', function (error) {
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
                        })
                })

        }
        catch (error) {
            console.log(error)
            alert("Please Send 0.1 ETH to Follow User")
        }



    }
    function handleRouteSignUp(e) {
        routerHistory.push('/signup');


    }
    function handleHome(e) {
        routerHistory.push('/home');


    }
    function handleWhitelist(e) {
        routerHistory.push('/kyc');

    }

    return (
        <div>
            <div className="side-nav-header">
                {/* <Logo /> */}
                <a href='https://app.submarine.me/' target="_blank"> <img src={submarine} width='60px' height='60px' padding-bottom="10px" style={{ cursor: "pointer" }}></img></a>


            </div>
            <div className="side-nav-items">

                <ul className="p-0">
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder" onClick={handleClick}>
                            <ExploreIcon />
                            <a style={{ cursor: "pointer" }} onClick={handleWhitelist}><span className="side-nav-text">KYC</span></a>
                        </div>
                    </li>
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <ListsIcon />
                            <a style={{ cursor: "pointer" }} onClick={handleRouteSignUp}><span className="side-nav-text" >Sign Up</span></a>
                        </div>
                    </li>
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <HomeIcon />
                            <a style={{ cursor: "pointer" }} onClick={handleHome}> <span className="side-nav-text">Home</span></a>
                        </div>
                    </li>

                    {/* <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <NotificationIcon />
                            <span className="side-nav-text">Notification</span>
                        </div>
                    </li> */}
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <MessageIcon />
                            <span className="side-nav-text">Messages</span>
                        </div>
                    </li>
                    {/* <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <BookmarkIcon />
                            <span className="side-nav-text">Bookmarks</span>
                        </div>
                    </li> */}

                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">

                            <SmallAvatar width="22" image={profImageurl} />
                            <span className="side-nav-text">Profile</span>
                        </div>
                    </li>
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <MoreIcon />
                            <span className="side-nav-text">More</span>
                        </div>
                    </li>

                </ul>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <br />
                <br />
                <br />
                <br /><br />
                <br />
                <div className="btn tweet-btn text-center" onClick={handleFollow}>Follow</div>
            </div>

        </div>
    )
}
