import React from 'react';
import AWS from 'aws-sdk';
import { myBucket, S3_BUCKET } from '../s3';
import Button from 'react-bootstrap/Button';


const DownloadFile = ({ fileName }) => {
  const handleDownload = async () => {
    try {
      const params = { Bucket: S3_BUCKET, Key: fileName };
      const url = await myBucket.getSignedUrlPromise('getObject', params);
      window.open(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="link" onClick={handleDownload}>Download</Button>
  );
};

export default DownloadFile;