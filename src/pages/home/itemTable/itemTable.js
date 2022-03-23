import React from 'react'
import { Table } from 'react-bootstrap'
const ItemTable = ({ itemDetails }) => {
    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>اسم المنتج</th>
                    <th>السعر</th>
                    <th>الوصف</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {itemDetails?.itemLink ? (
                            <a href={itemDetails?.itemLink}>
                                {itemDetails?.ItemName}
                            </a>
                        ) : (
                            itemDetails?.ItemName
                        )}
                    </td>
                    <td>{`${itemDetails?.Price} دينار ليبي` ?? 'لايوجد'}</td>
                    <td>{itemDetails?.Describtion ?? 'لايوجد'}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default ItemTable
