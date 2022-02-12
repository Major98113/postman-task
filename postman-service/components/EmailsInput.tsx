import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { isNumeric, isValueCorrectLimits } from "../libs/validator";
import { EMAIL_URL, STATUS_URL } from "../libs/urls";

const submitEmails = async ( data ) => {
    const response = await fetch(EMAIL_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        
        body: JSON.stringify({ data })
      });
    return await response.json();
}

export const EmailsInput = () => {
    const [ text, useText ] = useState('');
    const sendEmails = async () => {
        if (isNumeric(text) && isValueCorrectLimits(text)) {
            const response = await submitEmails(text);
            const { emailId } = response;
            return window.location.replace(`${STATUS_URL}/${emailId}`);
        }
        alert("Incorrect value");
    };
    return (
        <>
            <Grid>
                <TextField
                    id="outlined-basic"
                    label="Emails count"
                    variant="outlined"
                    value={text}
                    onChange={({target: {value}}) => useText(value)}
                />
            </Grid>
            <Button variant="contained" color="primary" onClick={sendEmails}>
                Send emails
            </Button>
        </>
    );
};