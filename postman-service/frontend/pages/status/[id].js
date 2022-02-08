import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ProgressBar } from "../components/ProgressBar";

export default function Status() {
    const router = useRouter();
    const {
        query: { id },
    } = router;
    const [progress, useProgress] = useState();
    const [error, useError] = useState();
    console.log("ID :", id);

    useEffect(() => {

    }, []);

    if (error) return <div>Failed to load status</div>
    if (!progress) return <div>Loading...</div>
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