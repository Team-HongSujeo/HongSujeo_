import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { TextArea } = Input;


const RestaurantTypes = [
    { key: 1, value: "한식" },
    { key: 2, value: "양식" },
    { key: 3, value: "중식" },
    { key: 4, value: "일식" },
    { key: 5, value: "퓨전" },
    { key: 6, value: "제과" },
    { key: 7, value: "디저트" }
]

function UploadProductPage(props) {
    const navigate = useNavigate();

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [RestaurantType, setRestaurantType] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const typeChangeHandler = (event) => {
        setRestaurantType(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        

        if (!Title || !Description || !Price || !RestaurantType || Images.length === 0) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }


        //서버에 채운 값들을 request로 보낸다.

        const body = {
            //로그인 된 사람의 ID 
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            restaurantTypes: RestaurantType
        }

        Axios.post('/api/product', body)
            .then(response => {
                if (response.data.success) {
                    alert('식당 정보 업로드에 성공 했습니다.')
                    navigate('/')
                } else {
                    alert('식당 정보 업로드에 실패 했습니다.')
                }
            })
            .catch((error) => {
                if (error.response) {
                  console.log(error.response);
                  console.log("server responded");
                } else if (error.request) {
                  console.log("network error");
                } else {
                  console.log(error);
                }
            });    
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> 식당 정보 업로드</h2>
            </div>
            <Form onSubmitCapture={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격(￦)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={typeChangeHandler} value={RestaurantType}>
                    {RestaurantTypes.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button htmlType="submit">
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage