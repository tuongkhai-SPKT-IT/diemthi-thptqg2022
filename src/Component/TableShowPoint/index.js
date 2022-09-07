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
    const keys = [
        { keyCode: 'AltLeft', isTriggered: false },
        { keyCode: 'ControlLeft', isTriggered: false },
    ];

    window.addEventListener('keydown', (e) => {
        keys.forEach((obj) => {
            if (obj.keyCode === e.code) {
                obj.isTriggered = true;
            }
        });
        const searchFocus = document.getElementById('search-focus');
        const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

        if (shortcutTriggered) {
            searchFocus.focus();
        }
    });

    window.addEventListener('keyup', (e) => {
        keys.forEach((obj) => {
            if (obj.keyCode === e.code) {
                obj.isTriggered = false;
            }
        });
    });
    if (Object.keys(homeState).length > 0)
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: "row" }}>
                    <h2 style={{ padding: "20px", display: 'flex', flex: 1 }}>Điểm thi THPTQG năm {"2022"}</h2>
                    <div className="search-block">
                        <form className="search">
                            <div className="search__wrapper">
                                <input id='search-focus' type="text" name="" placeholder="Search for..." className="search__field" />
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
                            return <tr key={"row" + index}>
                                {item.map((it, i) => {
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

