import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

// SearchFeature은 LandingPage.js에서 사용, 넘겨주기 위해 props사용
function SearchFeature(props) {
    
    const [SearchTerm, setSearchTerm] = useState("") // 검색 창에 글자를 한 개씩 입력할 때마다 SearchTerm이 달라짐

    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value) // SearchTerm을 부모컴포넌트인 LandingPage.js에 전달하기 위한 코드. updateSearchTerm 참고
    }

    return (
        <div>
            <Search
                placeholder="검색어를 입력하세요"
                onChange={searchHandler}
                style={{ width: 200 }}
                value={SearchTerm}
            />
        </div>
    )
}

export default SearchFeature