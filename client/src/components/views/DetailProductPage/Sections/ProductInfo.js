import React from 'react'
import { Button, Descriptions } from 'antd';
//import { useDispatch } from 'react-redux';

function ProductInfo(props) {
    //const dispatch = useDispatch();


    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.
        //dispatch(addToCart(props.detail._id))

    }

    return (
        <div>
            <Descriptions title="식당 정보">
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />



        </div>
    )
}

export default ProductInfo