export default (state, action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'ADD_TWEET':
            const newTweet = {
                user: {
                    name: 'MetaDeSo Club',
                    image: 'https://ipfs.io/ipfs/QmZGQA92ri1jfzSu61JRaNQXYg1bLuM7p8YT83DzFA2KLH?filename=Chainlink_Knight.png',
                    handle: '@metaDeSoClub',
                },
                tweet: {
                    content: action.payload,
                    image: "",
                    time: '10m',
                    comments: '100',
                    retweets: '320',
                    likes: '1k'
                }
            };
            return {
                ...state,
                tweets: [...state.tweets, newTweet]
            }
        default:
            return state
    }
}