// client의 Favorite.js파일과 관련됨 
// 즐겨찾기 추가/삭제(DetailProductPage.js, Sections/Facorite.js), 즐겨찾기 목록(FavoritePage.js)

const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');
const { auth } = require("../middleware/auth");

// client의 Favorite.js에서 설정한 endpointer와 맞추기
// express framework에서 제공하는 router 기능을 사용하고 있으므로,
// 여기에서는 /favoriteNumber 부분만 적어줘도 OK, 대신 index.js에서 그 앞부분에 해당하는 endpointer를 써줄 것!
router.post('/favoriteNumber', (req, res) => {

    //mongoDB에서   favorite 숫자를 가져오기 
    Favorite.find({ "productId": req.body.productId })
        // exec: 쿼리 실행, info에는 몇 명이 좋아요를 눌렀는지에 대한 정보가 담김
        // mongoose find()의 리턴값은 query(유사 프로미스)인데 exec를 사용하면 온전한 프로미스를 반환값으로 얻을 수 있다
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // 그다음에 프론트에 다시 숫자 정보 보내주기  
            res.status(200).json({ success: true, favoriteNumber: info.length })
        })

})



router.post('/favorited', (req, res) => {

    // 내가 이 영화를  Favorite 리스트에 넣었는지에 대한 정보를  DB에서 가져오기 
    // 로그인된 사용자가 이 상품에 대해 좋아요를 눌렀는지 확인하기위해 userFrom을 가져오는 것
    Favorite.find({ "productId": req.body.productId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            
            if (err) return res.status(400).send(err)
            // 그다음에   프론트에  다시   숫자 정보를 보내주기  

            let result = false;

            // info가 비어있다면 ( [] 상태 ) -> 내가 아직 Favorite 리스트에 상품을 넣지 않은 것임
            // info가 비어있지 않다면 이미 즐겨찾기에 추가되어있다는 뜻이므로 result=true 로 설정함 
            if (info.length !== 0) {
                result = true 
            }

            res.status(200).json({ success: true, favorited: result })
        })
})



router.post('/removeFromFavorite', (req, res) => {
    // Favorite DB에 있는 정보를 지운다
    Favorite.findOneAndDelete({ movieId: req.body.productId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })

})




router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body)
    // 프론트 쪽의 Favorite.js에서 보낸 req.body에는 variables가 들어있음

    favorite.save((err, doc) => { // save를 통해 req.body에 있는 모든 정보들(variables)이 favorite 인스턴스에 모두 들어감
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})




router.post('/getFavoredRestaurant', (req, res) => {
    // 로그인된 사용자의 즐겨찾기 목록 조회
    Favorite.find({ 'userFrom': req.body.userFrom })
        // 좋아요를 누른 식당들의 정보가 favorites에 array형식으로 담겨서 프론트에 res로 보내짐
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })

})

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ productId: req.body.productId, userFrom: req.body.userFrom })
        .exec((err, result) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true })
        })

})



module.exports = router;