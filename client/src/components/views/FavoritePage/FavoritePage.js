// 내가 누른 즐겨찾기를 모아놓은 페이지
// ProductImage.js에서 썸네일만 가져오는 방식 채택

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './favorite.css';
import Axios from 'axios';
import { Popover } from 'antd'; // 즐겨찾기한 식당 위에 마우스를 갖다대면 사진이 보이도록 하는 기능
import { RiBookmark3Fill } from "react-icons/ri";


function FavoritePage() {

    const [Favorites, setFavorites] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {

        fetchFavoredRestaurant()
       
    }, [])


    const fetchFavoredRestaurant = () => {
        Axios.post('/api/favorite/getFavoredRestaurant', { userFrom: user._id}) // response에는 좋아요를 누른 식당들의 정보가 favorites에 array형식으로 담겨있음
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites)
                } else {
                    alert('영화 정보를 가져오는데 실패 했습니다.')
                }
            })
    }



    const onClickDelete = (productId, userFrom) => {

        const variables = {
            productId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredRestaurant()
                } else {
                    alert("리스트에서 지우는데 실패했습니다.")
                }
            })


    }


    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                식당 이미지
                {/* {favorite.moviePost ?

                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"

                } */}
            </div>
        )


        return <tr key={index}>
            {/* Popover를 통해 즐겨찾기한 식당 위에 마우스를 갖다대면 사진이 보이도록 함 */}
            <Popover content={content} title={`${favorite.productTitle}`} >
                <td>{favorite.productTitle}</td>
            </Popover>
            
            {/* 여기에 식당 태그 정보 보여주기 */}
            <td>{favorite.restaurantType}</td>
            <td><button onClick={() => onClickDelete(favorite.productId, favorite.userFrom)}>제거</button></td>
        </tr>
    })



    return (
        // 페이지에 적용될 UI 설정
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> 즐겨찾기 목록 </h2>
            <hr />

            {/* table, td, th에 대한 css 적용은 favorite.css파일에서 만들음 */}
            <table>
                <thead>
                    <tr>
                        <th>식당 이름</th>
                        <th>식당 태그</th>
                        <td>즐겨찾기 제거</td>
                    </tr>
                </thead>
                <tbody>


                    {renderCards}


                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage