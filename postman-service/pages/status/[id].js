import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ProgressBar } from "../../components/ProgressBar";
import { EMAIL_URL } from "../../libs/urls";

const getStatus = async ( statusId ) => {
    const response = await fetch(`${EMAIL_URL}/${statusId}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    return await response.json();
}

export default function Status() {
    const router = useRouter();
    const {
        query: { id },
    } = router;
    const [progress, useProgress] = useState();
    const [error, useError] = useState();
    useEffect(() => {
        if (id) {
            getStatus(id)
                .then( ({ data: { emailsCount } }) => useProgress(emailsCount) )
                .catch( err => useError(err));
        }
    }, [id]);

    if (error) return <div>Failed to load status</div>
    if (!progress) return <div>Loading...</div>

    console.log("Progress: ", progress);
    console.log("Error: ", error);
    
    return (
        <Grid
            container
            spacing={10}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
            >
            <ProgressBar progress={progress}/>
        </Grid> 
    )
}