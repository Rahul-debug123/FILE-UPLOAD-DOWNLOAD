# How to run the project

1) Clone this repo
  `git clone URL`
2) Enter configuration values in `src/firebase.js`.
For more details follow the documentation [https://firebase.google.com/](https://firebase.google.com/).
3) Enter the bucket name, region, accessKeyId and secretAccessKey in `src/s3.jsx`.
4) Install the dependencies
   `npm install`
5) Run the program
    `npm start`

# About this Project
This project contains the cloud storage features, which uses AWS S3 bucket to store them. It uses gmail authentiication to authenticate users and allow them to store their files, download and delete them.
