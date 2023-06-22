import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert';
import { myBucket, S3_BUCKET } from '../s3';
import { UserAuth } from '../context/AuthContext.jsx';
import { MDBFile } from 'mdb-react-ui-kit';

const Upload = () => {

    const { user } = UserAuth();
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        if (errorMessage) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [errorMessage]);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        setProgress(0);
        setErrorMessage();
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: user.uid + "/" + file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err && err.message != null) {
                    console.log(err);
                    setErrorMessage(err.message)
                }
            })
    }


    return (

        <div>
            <h1 className='text-center'>Upload</h1>
            <br />
            <div > Upload Progress {progress}%</div>
            <ProgressBar variant="success" now={progress} />
            <br />
            <MDBFile label='Select File:' onChange={handleFileInput} />
            <br />
            <button onClick={() => {
                if (selectedFile != null) {
                    uploadFile(selectedFile)
                } else {
                    setErrorMessage("Please select some files!");
                }
            }}> Upload to S3</button>
            <br /><br />
            <Alert variant={"danger"} show={isError}>{errorMessage}</Alert>
        </div>
    )
}

export default Upload;