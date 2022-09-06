import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { firstShowData } from "../Redux/Actions/Home.Action";

export default function TableShowPoint() {
    const homeState = useSelector((state) => state.HomePage);

    const dispatch = useDispatch()
    useEffect(() => {
        // if (Object.keys(hom  eState).length === 0)
        dispatch(firstShowData())
    }, [])

    if (Object.keys(homeState).length > 0)
        return (
            <div>
                <h2 >Điểm thi THPTQG năm {"2022"}</h2>
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
                            return <tr key={"row" + index}>
                                {item.map((it, i) => {
                                    return <th key={"collumn" + i}
                                    //blue: sbd
                                    //yellow : duoi trung bình
                                    //green: tren trung bình
                                        style={{ color: i > 0 ? (it > 5) ? "green" : "red" : "blue" }} scope="col"
                                        className="table-collumn">
                                        {it} {i > 0 && it !== '' ?
                                            <i className={`fas ${(it > 5) ? "green fa-caret-up" :
                                                it > 1 ? "red fa-caret-down" : "fa-exclamation-triangle red"}`}></i> : <></>}
                                    </th>
                                })}
                            </tr>
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

