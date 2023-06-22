import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { myBucket, S3_BUCKET } from '../s3';
import { UserAuth } from '../context/AuthContext.jsx';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import RenderTable from '../components/RenderTable';


const listfiles = (folder, setLoading, setData, setErrorMessage) => {
  setLoading(true);
  setErrorMessage('')
  const params = {
    Bucket: S3_BUCKET,
    Prefix: folder
  };

  myBucket.listObjects(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      setLoading(false);
      if (err && err.message != null) {
        console.log(err);
        setErrorMessage(err.message)
      }
    }
    else {
      console.log(data.Contents);
      setData(data.Contents);
      setLoading(false);
    }
  })
}

const Download = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    if (errorMessage) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [errorMessage]);

  const { user } = UserAuth();
  const folder = user.uid + "/";

  function refresh() { listfiles(folder, setLoading, setData, setErrorMessage) }

  useEffect(() => { refresh()}, []);

  return (
    <div>
      <h1 className='text-center'>Download</h1>
      <button onClick={() => { refresh() }}> Refresh</button>
      <RenderTable refresh={refresh} props={{
        'header': ["#", "fileName", "Last Modified", "Size", "Download", "Delete"],
        'data': data
      }} />
      {
        loading ? (
          <div>
            <Spinner animation="grow" show={loading} />
            <Spinner animation="grow" show={loading} />
            <Spinner animation="grow" show={loading} />
          </div>) : (<></>)
      }
      <Alert variant={"danger"} show={isError}>{errorMessage}</Alert>
    </div>
  )
}

export default Download;