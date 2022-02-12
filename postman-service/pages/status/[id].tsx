import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ProgressBar } from "../../components/ProgressBar";
import { EMAIL_URL } from "../../libs/urls";

const getStatus = async ( statusId: string ) => {
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

const Status = () => {
    const router = useRouter();
    const {
        query: { id },
    } = router;
    const [progress, useProgress] = useState();
    const [error, useError] = useState();
    useEffect(() => {
        if (id && typeof id === 'string') {
            getStatus(id)
                .then( ({ data }) => useProgress(data) )
                .catch( err => useError(err));
        }
    }, [id]);

    if (error) return <div>Failed to load status</div>
    if (!progress) return <div>Loading...</div>
    const {emailsCount, sentCount, status} = progress;
    
    return (
        <Grid
            container
            spacing={10}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
            >
            <ProgressBar
                emailsCount={emailsCount}
                sentCount={sentCount}
                status={status}
            />
        </Grid> 
    )
}

export default Status;