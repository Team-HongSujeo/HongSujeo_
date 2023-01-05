// 등록한 상품(식당)의 상세정보를 볼 수 있는 페이지

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Comments from './Sections/Comments';
import Favorite from './Sections/Favorite';

function DetailProductPage(props) {

  // before:  const productId = props.match.params.productId  
    /* useParams는 리액트에서 제공하는 Hook으로 동적으로 라우팅을 생성하기 위해 사용
    URL에 포함되어있는 Key, Value 형식의 객체를 반환해주는 역할
    Route 부분에서 Key를 지정해주고, 해당하는 Key에 적합한 Value를 넣어 URL을 변경시키면, useParams를 통해 Key, Value 객체를 반환받아 확인할 수 있음
    반환받은 Value를 통해 게시글을 불러오거나, 검색목록을 변경시키는 등 다양한 기능으로 확장시켜 사용할 수 있음. */
  const { productId } = useParams(); 
  const variable = {  productId: productId };
  const user = useSelector(state => state.user);

  const [Product, setProduct] = useState([]); // 상품 설정
  const [CommentLists, setCommentLists] = useState([]); // 댓글 설정

  useEffect(() => {
    // DB에서 상품을 가져오기 위한 request, 이 부분을 백엔드에 넘겨줌, 하나의 상품만 가져오기 때문에 type=single
    // axios.get이 실행된 결과는 return부분의 Product(props)에 들어가게 됨
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            setProduct(response.data[0])
        })
        .catch(err => alert(err))
    
    // DB에서 모든 Comment 정보들을 가져오기, 백엔드의 routes/comment.js 파일과 연관
    axios.post('/api/comment/getComments', variable)
        .then(response => {
          if (response.data.success) {
              console.log('response.data.comments',response.data.comments)
              setCommentLists(response.data.comments)
          } else {
              alert('Failed to get comment Info')
          }
        })
  }, [])
  
  // 새로운 댓글을 추가하면, 기존의 댓글에 더불어 함께 추가된 댓글이 보이도록 하기 위함 (concat)
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
  }

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
    {/* rem은 글씨 사이즈, 루트엘리먼트의 폰트 사이즈를 기준으로 동작 */}
    {/* px(픽셀), rem, em의 차이
      https://dwbutter.com/entry/CSS-%EC%86%8D%EC%84%B1-%EB%8B%A8%EC%9C%84-px-rem-em-%EC%82%AC%EC%9A%A9%EC%98%88%EC%8B%9C-%EA%B3%84%EC%82%B0-%EA%B8%B0%EC%A4%80 */}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{Product.title}</h1>
      </div>
      
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorite  Product={Product} productId={productId} userFrom={user._id} />
      </div>

      <br />

      <Row gutter={[16, 16]} >
          <Col lg={12} sm={24}>
              {/* ProductImage */}
              <ProductImage detail={Product} />
          </Col>
          <Col lg={12} sm={24}>
              {/* ProductInfo */}
              <ProductInfo detail={Product} />
          </Col>
          <Comments CommentLists={CommentLists} postId={productId} refreshFunction={updateComment} />
          {/* Comments.js에서 props로 postId를 넘겨주기 위해, CommentLists=~~~의 코드를 작성 */}
          {/* refreshFunction은 결국 updateComment 함수를 실행하는 것 */}
      </Row>

    </div>
  )
}

export default DetailProductPage