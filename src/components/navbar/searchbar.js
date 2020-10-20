qgimport React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

export default function SearchBar(props) {
    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        // props.refreshFunction(event.currentTarget.value)

    }

    return (
        <div>
            <Search
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Search By Typing..."
            />
        </div>
    )
//     return(
//     <form className="form-main">
//         value
//         <input placeholder="Search" type="text" className="search-form" />
//         <button className="search-btn"><i className="fas fa-search"></i></button>
//     </form>
//   )
}

