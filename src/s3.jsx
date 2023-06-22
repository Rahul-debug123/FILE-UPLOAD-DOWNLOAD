import React, { useState } from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET = "_____________";
const REGION = '_____________';


AWS.config.update({
    accessKeyId: '_____________',
    secretAccessKey: '_____________'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

export { myBucket, S3_BUCKET, REGION };