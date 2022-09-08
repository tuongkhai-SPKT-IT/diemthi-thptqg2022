import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterData, firstShowData } from "../Redux/Actions/Home.Action";

export default function TableShowPoint() {
    const homeState = useSelector((state) => state.HomePage);
    const typingTimeOutRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        // if (Object.keys(hom  eState).length === 0)
        dispatch(firstShowData())
    }, [])

    const handleFilterChange = (newFilter) => {
        dispatch(filterData(newFilter))
    }
    const searchSBD = (e) => {
        const value = e.target.value
        setSearchTerm(value);
        if (!handleFilterChange) return;
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }
        typingTimeOutRef.current = setTimeout(() => {
            handleFilterChange(value)
        }, 450);

    }
    // console.log()
    if (Object.keys(homeState).length > 0)
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: "row" }}>
                    <h2 style={{ padding: "20px", display: 'flex', flex: 1 }}>Điểm thi THPTQG năm {"2022"}</h2>
                    <div className="search-block">
                        <form className="search">
                            <div className="search__wrapper">
                                <input
                                    type="number"
                                    autoComplete="off"
                                    onChange={(e) => searchSBD(e)}
                                    value={searchTerm}
                                    id='search-focus'
                                    placeholder="Search for SBD" className="search__field" />
                                <button type="submit" className="fa fa-search search__icon"></button>
                            </div>
                        </form>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            {homeState.headerTable.map((item, index) => {
                                return <th className="table-collumn" key={"header" + index} scope="col">{item}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {homeState.dataShow.map((item, index) => {
                            if (searchTerm.length < 8)
                                return <tr key={"row" + index}>
                                    {
                                        item.map((it, i) => {
                                            return <th key={"collumn" + i}
                                                //blue: sbd
                                                //yellow : duoi trung bình
                                                //green: tren trung bình
                                                style={{ color: i > 0 ? (it >= 5) ? "green" : (it > 1 && it < 5) ? "yellow" : "red" : "blue" }} scope="col"
                                                className="table-collumn">
                                                {it} {i > 0 && it !== '' ?
                                                    <i className={`fas ${(it >= 5) ? "green fa-caret-up" :
                                                        it > 1 ? "yellow fa-caret-down" : "fa-exclamation-triangle red"}`}></i> : <></>}
                                            </th>
                                        })}
                                </tr>
                            else {
                                console.log(1)
                                return <th key={"collumn" + index}
                                    //blue: sbd
                                    //yellow : duoi trung bình
                                    //green: tren trung bình
                                    style={{ color: index > 0 ? (item >= 5) ? "green" : (item > 1 && item < 5) ? "yellow" : "red" : "blue" }} scope="col"
                                    className="table-collumn">
                                    {item} {index > 0 && item !== '' ?
                                        <i className={`fas ${(item >= 5) ? "green fa-caret-up" :
                                            item > 1 ? "yellow fa-caret-down" : "fa-exclamation-triangle red"}`}></i> : <></>}
                                </th>

                            }
                        })}
                    </tbody>
                </table>
            </div>
        );

    return <div style={{ position: "absolute", left: "50%", top: "calc(50% - 100px)" }}>
        <div className="square-loading">
        </div>
    </div>
}

