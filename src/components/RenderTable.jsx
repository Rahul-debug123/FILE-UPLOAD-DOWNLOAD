import React from 'react';
import Table from 'react-bootstrap/Table';
import { myBucket, S3_BUCKET } from '../s3';
import DownloadFile from './DownloadHandler';
import DeleteFile from './DeleteHandler';

function RenderTable({ props, refresh }) {
    return (
        <Table striped>
            <thead>
                <tr>
                    {
                        props.header.map((ele) => {
                            return (<th>{ele}</th>)
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((file, ind) => {
                        return (<tr>
                            <td>{ind + 1}</td>
                            <td>{getFileName(file)}</td>
                            <td>{getLastModified(file)}</td>
                            <td>{getFileSiize(file)}</td>
                            <td><DownloadFile fileName={file.Key} /></td>
                            <td><DeleteFile fileName={file.Key} refresh={refresh} /></td>
                        </tr>)
                    })
                }
            </tbody>
        </Table>
    )

}

const getFileName = (rowData) => {
    return (rowData.Key.split("/")[1]);
}

const getLastModified = (rowData) => {
    return (
        rowData.LastModified.getDate() +
        "/" + (rowData.LastModified.getMonth() + 1) +
        "/" + rowData.LastModified.getFullYear() +
        " " + rowData.LastModified.getHours() +
        ":" + rowData.LastModified.getMinutes() +
        ":" + rowData.LastModified.getSeconds())
}

const getFileSiize = (rowData) => {
    return (Math.round(rowData.Size / 1024 * 10) / 10) + " KB"
}

export default RenderTable;