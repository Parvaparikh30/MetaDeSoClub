import React, { useEffect } from "react";
// import {
//     Container,
//     Grid,
//     IconButton,
//     makeStyles,
//     Paper,
//     Typography,
// } from "@material-ui/core";



function Accounts() {
    const [accounts, setAccounts] = React.useState('');
    const [count, setCount] = React.useState(0);
    async function getAccount() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        return accounts[0];
    }

    useEffect(() => {
        getAccount().then((account) => {
            setAccounts(account);
            setCount(count + 1);
        });
    }, [accounts, count]);

    return (
        <div>
            <h1 >User - {accounts}</h1>
            {/* <Grid
                container
                className={classes.title}
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
            >
                <Typography variant="h6" >
                    Account: {accounts}

                </Typography>
            </Grid> */}

        </div>
    )
}

export default Accounts;

//  async function getAccount() {
//     const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//     });

//     return accounts[0];
// }