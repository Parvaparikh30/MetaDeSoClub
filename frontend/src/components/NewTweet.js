import React, { useState, useContext } from 'react'
import { SmallAvatar } from '../images/avatars'
import { AddImageIcon, AddGifIcon, AddPollIcon, AddEmojiIcon } from '../images/svg/svgs'
import { GlobalContext } from '../context/GlobalState';
import { create } from 'ipfs-http-client'
import submarine from '../submarine.svg'
import axios from "axios"
import * as FD from 'form-data'
import * as fs from "fs"

export const NewTweet = () => {

    const client = create('https://ipfs.infura.io:5001/api/v0')

    const profImageurl = 'https://ipfs.io/ipfs/QmZGQA92ri1jfzSu61JRaNQXYg1bLuM7p8YT83DzFA2KLH?filename=Chainlink_Knight.png';

    const [content, setContent] = useState('');
    const { addTweet } = useContext(GlobalContext);
    // console.log(GlobalContext.getTweet(1))
    const handleNewTweet = () => {
        addTweet(content)

    };
    const [url, setUrl] = useState("")
    const [ipfs, setIpfs] = useState("")
    const [ipfsTweet, setIpfsTweet] = useState({

        id: 1,
        user: {
            name: 'User 1 ',
            image: 'https://ipfs.io/ipfs/QmZGQA92ri1jfzSu61JRaNQXYg1bLuM7p8YT83DzFA2KLH?filename=Chainlink_Knight.png',
            handle: '@User1'
        },
        tweet: {
            content: '',
            image: '',

        }

    })
    async function handleImageChange(e) {
        const file = e.target.files[0]


        try {
            const imageUploaded = await client.add(file)
            const fileUrl = `https://ipfs.infura.io/ipfs/${imageUploaded.path}`
            setUrl(fileUrl)
            setIpfsTweet({
                ...ipfsTweet, tweet: {
                    content: content,
                    image: fileUrl
                }
            })
        }
        catch (error) {
            console.log(error)
        }

    }

    // setIpfsTweet({
    //     ...ipfsTweet, tweet: {
    //         content: "ABC",
    //         image: "pqr"
    //     }
    // })

    if (url) {
        console.log(url)


        console.log(ipfsTweet)



    }

    return (
        <div className="new-tweet">
            <div className="left">
                <SmallAvatar width="48" image={profImageurl} />
            </div>
            <div className="right">
                <div className="flex-align-center">

                    <span className="w-100">
                        <input className="w-100" placeholder="What's happening?" type="text" onChange={(event) => setContent(event.target.value)} /></span>
                </div>
                <div className="new-tweet-options">
                    <div className="add-icons" >
                        <label for="fileUpload" style={{ cursor: "pointer" }}><AddImageIcon /></label>
                        <input type='file' style={{ display: "none" }} id='fileUpload' onChange={handleImageChange} />
                        <label for="gifUpload" style={{ cursor: "pointer" }}>
                            <AddGifIcon /></label>
                        <input type='file' style={{ display: "none" }} id='gifUpload' />

                        <AddPollIcon />
                        <AddEmojiIcon />
                        <a href='https://app.submarine.me/' target="_blank"> <img src={submarine} width='40px' height='40px' padding-bottom="10px" style={{ cursor: "pointer" }}></img></a>
                    </div>
                    <div className="tweet" onClick={handleNewTweet}>
                        <div className="btn tweet-btn text-center">Tweet</div>
                    </div>
                </div>
            </div>

        </div>
    )

}
