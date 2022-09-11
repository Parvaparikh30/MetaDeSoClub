import React from 'react'
import { FollowSuggestionCard } from './FollowSuggestionCard';
import '../../styles/FollowList.css';

export const FollowSuggestionsList = () => {
    const whoToFollowList = [
        {
            name: 'Huawei',
            handle: '@Huawei',
            image: 'https://pbs.twimg.com/profile_images/1246467440977932292/Wmlicr4o_bigger.jpg'
        },
        {
            name: 'Pinarayi Vijayan',
            handle: '@vijayanpinarayi',
            image: 'https://pbs.twimg.com/profile_images/1179639807506407424/l9apSa2h_bigger.jpg'
        },
        {
            name: 'Economic Times',
            handle: '@EconomicTimes',
            image: 'data:image/png;base64,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'
        }, {
            name: 'Netflix India',
            handle: '@NetflixIndia',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgyCHArvYDJNnbgOTdOHOVkrMPvHsdtWyB7Q&usqp=CAU'
        }
    ]
    return (

        <>
            <div className="flex-space-between">
                <h1 className="m-0">Who To Follow</h1>

            </div>
            <div className="follow-cards">
                {whoToFollowList.map(whoToFollow => (<FollowSuggestionCard whoToFollow={whoToFollow} />))}

            </div>
        </>

    )
}
