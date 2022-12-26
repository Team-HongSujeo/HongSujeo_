import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Comments from './Sections/Comments';
//import Favorite from './Sections/Favorite';

function DetailProductPage(props) {

  //const productId = props.match.params.productId
  const { productId } = useParams(); 
  const variable = {  productId: productId }

  const [Product, setProduct] = useState({})
  const [CommentLists, setCommentLists] = useState([])

  useEffect(() => {
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            setProduct(response.data[0])
        })
        .catch(err => alert(err))
    
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
  
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
  }

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{Product.title}</h1>
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
      </Row>

    </div>
  )
}

export default DetailProductPage