import React, { useEffect, useState } from 'react'
//import { FaCode } from "react-icons/fa";
import axios from 'axios'; // request를 보내기 위해 사용
import { useNavigate } from 'react-router-dom';
import {Col, Card, Row, Carousel } from 'antd';
import Icon from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { restaurantTypes, price } from './Sections/Datas';

// indent fixed 01/04

function LandingPage(props) {
    const navigate = useNavigate();

    
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0); 
    // skip과 limit은 더보기 버튼 구현을 위해 필요
    // Skip : 어디서부터 데이터를 가져오는지에 대한 위치(전에거는 스킵하고, 그 다음부터 데이터를 가져오겠다),
    // 처음에는 0부터 시작, Limit이 8이라면, 다음 번에는 2nd Skip = 0 + 8
    const [Limit, setLimit] = useState(8);
    // Limit : 처음 데이터를 가져올 때와 더보기 버튼을 눌러서 가져올 때 얼마나 많은 데이터를 한 번에 가져오는지 결정하는 메소드
    // 현재는 Limit을 통해, 더보기를 누르기 전에는 8개의 상품만 보이도록 설정
    const [PostSize, setPostSize] = useState(0); // PostSize는 서버쪽에서 받아오는 전체 게시글의 갯수다. (배열로 넘어와짐)
    const [Filters, setFilters] = useState({ // handleFilters에서 사용할 필터 2개
        restaurantTypes: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")


    useEffect(() => {
        // 여기서 작성한 body는 getProducts함수의 argument로 전달되고, 백엔드의 product.js에서 받아서 사용
        let body = {
            skip: Skip, // skip은 0으로 초기화되었으므로 맨 처음 0으로 세팅
            limit: Limit // limit은 8로 초기화되었으므로 맨 처음 8로 세팅
        }

        getProducts(body)

    }, [])

    // 상품을 백엔드에서 가져오는 역할을 하는 함수
    const getProducts = (body) => {
        axios.post('/api/product/products', body) // endpointer 설정, 백엔드의 routes/product.js와 연관
            .then(response => {
                if (response.data.success) { // 백엔드(product.js)에서 데이터 가져오는데 성공한 경우
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize) 
                    // (아래 코드에서) PostSize를 Limit과 비교하여 더보기 버튼의 모습을 보여줄지 말지 정해준다.
                    // ex) 더 보여줄 상품 없으면 더보기 버튼 안보여줌
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }



    // 더보기 버튼 구현을 위한 함수
    const loadMoreHandler = () => {
        // 더보기를 눌렀을 때, 그 다음 물품을 가져와야 하므로, skip을 재조정
        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getProducts(body)
        setSkip(skip)
    }

    // Products에는 현재 여러 개의 product가 들어가있는 상태. 하나하나 컨트롤하기 위해 map 사용
    const renderCards = Products.map((product, index) => {
        // 한 row는 24사이즈이므로, 화면이 가장 클 때에는 4개의 이미지가 들어가도록 6, 화면이 약간 작을 때에는 3개의 이미지가 들어가도록 8, 가장 작을 떄에는 1개의 이미지가 들어가도록 24
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                // card에는 image 정보를 담는다, ImageSlider는 utils/ImageSlider.js에서 구현
                // href를 통해 상품의 _id에 맞게 endpointer를 지정하고, 상품의 상세 페이지를 볼 수 있는 URL을 만들어 줌
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`￦${product.price}`}
                />
            </Card>
        </Col>
    })

    // 체크박스를 통해 음식의 종류로 필터링된 결과물을 보여주기 위한 함수
    const showFilteredResults = (filters) => {

        let body = {
            skip: 0, // 체크박스를 해제하면 다시 처음부터 보여줘야 하므로 0
            limit: Limit,
            filters: filters
        }

        getProducts(body) // 백엔드에서 상품 가져오기
        setSkip(0) // skip을 다시 0으로 세팅

    }

    // 체크박스를 통해 가격으로 필터링된 결과물을 보여주기 위한 함수
    const handlePrice = (value) => {
        const data = price;
        let array = [];

        // data[key]는 0번째 데이터, 1번째 데이터, 2번째 데이터... (Datas.js의 {} 안의 모든 항목들)
        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) { // 데이터에 있는 _id와 선택한 애가 같다면 데이터의 array 값이 리턴되도록 함
                array = data[key].array;
            }
        }
        return array;
    }

    // 두 개의 Collapse를 모두 컨트롤하기 위한 함수, filter는 체크박스에서 체크된 것들의 _id가 담겨져있음
    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters // category 안에는 체크박스에서 체크된 restauranttype이나 price 배열이 있을 것

        console.log('filters', filters)

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters) // setFilters를 하지 않으면 필터링 적용이 안됨
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0, // 검색시 DB에 있는 맛집들 중 처음부터 긁어와야 하므로 0
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)  // skip을 0으로 세팅
        setSearchTerm(newSearchTerm) // SearchFeature.js에서 event.currentTarget.value를 newSearchTerm으로 받아서 useState 적용
        getProducts(body) // body 값에 맞게 백엔드에서 가져오기

    }



    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2> 식당 리스트  </h2>
            </div>

            {/* Filter */}

            <Row gutter={[16, 16]}>
                {/* 화면이 줄어들면 Collapse가 하나씩 따로 보이고, 화면이 커지면 Collapse가 두 개로 보이도록 함 */}
                <Col lg={12} xs={24}>
                    {/* CheckBox : Sections/CheckBox.js 참고*/}
                    <Checkbox list={restaurantTypes} handleFilters={filters => handleFilters(filters, "restaurantTypes")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox : Sections/RadioBox.js 참고*/}
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>





            {/* Search */}

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}> {/* 검색창을 우측 정렬하는 부분 */}
                {/* SearchFeature은 SearchFeature.js에서 구현, SearchFeature에서 SearchTerm을 업데이트하기 위한 코드 */}
                <SearchFeature                    
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/* Cards */}

            {/* gutter는 이미지 사이의 여백 기능 */ }
            <Row gutter={[16, 16]} >
                {renderCards}
            </Row>

            <br />

            {/* PostSize는 product.js에서 productInfo.length를 의미, Limit 이상이라는 것은 더이상 DB에서 불러올 데이터가 없음을 의미 -> 더보기버튼이 더이상 보이지 않음 */}
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                    { /* 더보기 버튼 구현, 클릭 시 loadMoreHandler 작동*/ }
                </div>
            }

        </div>
    )
}

export default LandingPage