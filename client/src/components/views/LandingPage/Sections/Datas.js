const restaurantTypes = [
    {
        "_id": 1,
        "name": "한식"
    },
    {
        "_id": 2,
        "name": "양식"
    },
    {
        "_id": 3,
        "name": "중식"
    },
    {
        "_id": 4,
        "name": "일식"
    },
    {
        "_id": 5,
        "name": "퓨전"
    },
    {
        "_id": 6,
        "name": "제과"
    },
    {
        "_id": 7,
        "name": "디저트"
    }

]

// const RestaurantTypes = [
//     { key: 1, value: "한식" },
//     { key: 2, value: "양식" },
//     { key: 3, value: "중식" },
//     { key: 4, value: "일식" },
//     { key: 5, value: "퓨전" },
//     { key: 6, value: "제과" },
//     { key: 7, value: "디저트" }

// "name": "￦200 to ￦249",
//         "array": [200, 249]

const price = [
    {
        "_id": 0,
        "name": "전체",
        "array": []
    },
    {
        "_id": 1,
        "name": "만원미만",
        "array": [0, 9999]
    },
    {
        "_id": 2,
        "name": "1만원대",
        "array": [10000, 19999]
    },
    {
        "_id": 3,
        "name": "2만원대",
        "array": [20000, 29999]
    },
    {
        "_id": 4,
        "name": "3만원대",
        "array": [30000, 39999]
    },
    {
        "_id": 5,
        "name": "4만원이상",
        "array": [40000, 1500000]
    }
]




export {
    restaurantTypes,
    price
}