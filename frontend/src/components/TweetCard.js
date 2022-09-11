import React, { Component, useState } from 'react';
import '../styles/TweetCard.css';
import { SmallAvatar } from '../images/avatars'
import { TweetCommentIcon, TweetRetweetIcon, TweetLikeIcon, TweetSendIcon } from '../images/svg/svgs';
import { Link } from 'react-router-dom';

export default class TweetCard extends Component {
    tweet = this.props.tweet;

    profImageurl = 'https://ipfs.io/ipfs/QmZGQA92ri1jfzSu61JRaNQXYg1bLuM7p8YT83DzFA2KLH?filename=Chainlink_Knight.png';

    handleRouting = (e) => {
        // e.preventDefault();
        // debugger
        // this.props.history.push('data')
    }
    render() {
        return (

            <div className="tweet-card">
                <div className="left">

                    <SmallAvatar width="48" image={this.tweet.user.image} />
                </div>
                <div className="right">
                    <div className="tweet-card-head">
                        <span className="tweet-card-name" >{this.tweet.user.name}</span>

                        <span className="tweet-card-handle" >{this.tweet.user.handle}</span>

                        <span className="tweet-card-time"> - {this.tweet.tweet.time}</span>
                    </div>
                    <div className="tweet-card-body">
                        <div className="tweet-card-content">
                            <a href={this.tweet.tweet.content} onclick="return false;" target="_blank" ><p className="m-0">{this.tweet.tweet.content}</p></a>
                        </div>
                        <div className="tweet-card-image">
                            <img src={this.tweet.tweet.image} alt="" />
                        </div>
                        <div className="tweet-card-footer">
                            <span className="flex-align-center"><TweetCommentIcon /> <span className="tweet-cars-icon">{this.tweet.tweet.comments}</span></span>
                            <span className="flex-align-center"><TweetRetweetIcon /><span className="tweet-cars-icon">{this.tweet.tweet.retweets}</span></span>
                            <span className="flex-align-center"><TweetLikeIcon /><span className="tweet-cars-icon">{this.tweet.tweet.likes}</span></span>
                            <span className="flex-align-center"><TweetSendIcon /></span>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
