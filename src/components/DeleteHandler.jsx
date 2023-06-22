import React from 'react';
import AWS from 'aws-sdk';
import { myBucket, S3_BUCKET } from '../s3';
import Button from 'react-bootstrap/Button';


const DeleteFile = ({ fileName, refresh }) => {
  const handleDelete = async () => {
    try {
      var params = {
        Bucket: S3_BUCKET,
        Key: fileName
      };
      myBucket.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else { refresh() };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="outline-warning" onClick={handleDelete}>❌</Button>
  );
};

export default DeleteFile;