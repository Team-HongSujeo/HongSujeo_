// Carousel은 한 카테고리 안에 여러 이미지를 슬라이드하며 볼 수 있게 하는 기능. 그러한 기능을 관리하는 페이지

import React from 'react'
import { Carousel } from 'antd'; 

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay >
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://localhost:5000/${image}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider