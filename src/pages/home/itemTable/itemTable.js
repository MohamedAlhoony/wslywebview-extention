import React from 'react'
import { ListGroup } from 'react-bootstrap'
const ItemTable = ({ itemDetails }) => {
    return (
        <ListGroup className={'my-2'} as="ol">
            <h4 className="mb-3" style={{ color: '#0d6efd' }}>
                {itemDetails?.itemLink ? (
                    <a href={itemDetails?.itemLink}>{itemDetails?.ItemName}</a>
                ) : (
                    itemDetails?.ItemName
                )}
            </h4>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div>
                    <div className="fw-bold">الوصف</div>
                    {itemDetails?.Describtion ?? 'لايوجد'}
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div>
                    <div className="fw-bold">السعر</div>
                    {`${itemDetails?.Price} دينار ليبي` ?? 'لايوجد'}
                </div>
            </ListGroup.Item>
        </ListGroup>
        // <Table bordered>
        //     <thead>
        //         <tr>
        //             <th>
        // {itemDetails?.itemLink ? (
        //     <a href={itemDetails?.itemLink}>
        //         {itemDetails?.ItemName}
        //     </a>
        // ) : (
        //     itemDetails?.ItemName
        // )}
        //             </th>
        //             <th>الوصف</th>
        //             <th>السعر</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr>
        //             <td></td>
        //             <td style={{ minWidth: '10rem' }}>
        //                 {itemDetails?.Describtion ?? 'لايوجد'}
        //             </td>
        //             <td>{`${itemDetails?.Price} دينار ليبي` ?? 'لايوجد'}</td>
        //         </tr>
        //     </tbody>
        // </Table>
    )
}

export default ItemTable
