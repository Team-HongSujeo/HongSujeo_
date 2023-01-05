// 상위 컴포넌트는 DetailProductPage, 즐겨찾기 리스트를 만들기 위한 버튼을 관리

import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd';

function Favorite(props) {

    const productId = props.productId
    const userFrom = props.userFrom // user info. check models/favorite.js


    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    // variables가 post request의 argument로 들어감
    let variables = {
        userFrom: userFrom, // 즐겨찾기 누른 사용자 id
        productId: productId,
        productTitle: props.Product.title, // 식당명
        restaurantTypes: props.Product.restaurantTypes, // 식당 태그
    }

    // 얼마나 많은 사람이 이 식당을 Favorite 리스트에 넣었는지 그 숫자 정보를 얻기 위한 코드
    useEffect(() => {

        // 좋아요 수를 얻기 위한 endpointer 지정, server/routes/favorite.js에서 post request에 맞는 endpointer 지정
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                setFavoriteNumber(response.data.favoriteNumber)
                if (response.data.success) {
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })

        // 로그인된 사용자가 이 식당을 이미 Favorite 리스트에 넣었는지 아닌지에 대한 정보를 얻기 위한 코드
        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })



    }, [])

    // favorite 버튼을 눌렀을 때 실행되는 함수
    const onClickFavorite = () => {
        // 이미 Favorited 버튼을 누른 상황인 경우, 버튼을 누르면 즐겨찾기를 취소해야함
        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                    }
                })

        // 아직 Favorited 버튼을 누르지 않은 경우, 버튼을 누르면 즐겨찾기를 추가해야함
        } else { 
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)

                    } else {
                        alert('Favorite 리스트에 추가하는 걸 실패했습니다.')
                    }
                })
        }

    }



    return (
        <div> 
            {/* Favorited가 True인 경우, 이미 즐겨찾기를 누른 상태이므로 Not Favorite가 보이게 하고,
                False인 경우 아직 즐겨찾기 하지 않은 상태이므로 Add to Favorite가 보이게 함 */}
            {/* FavoriteNumber를 통해 좋아요 늘러진 수도 함께 표기 */}
            {/* 버튼 UI를 예쁘게 하기 위해 antd에서 가져온 Button */}           
            <Button size="large" shape="round" type="danger" onClick={onClickFavorite}>{Favorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}  {FavoriteNumber}  </Button>
            {/* <RiBookmark3Fill size="20" color="#f0ad4e" onClick={onClickFavorite} />{Favorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}  {FavoriteNumber}  */}
        </div>
    )
}

export default Favorite