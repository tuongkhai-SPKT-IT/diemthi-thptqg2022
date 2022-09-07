import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pagingClick } from '../Redux/Actions/Home.Action';
import ReactPaginate from 'react-paginate';
export default function BottomPaging() {
    const homeState = useSelector((state) => state.HomePage);
    const dispatch = useDispatch()
    if (!Object.keys(homeState).length > 0)
        return <></>
    const handlePageClick = (event) => {
        dispatch(pagingClick(event.selected, event.selected + 1))
        window.scrollTo(0, 0)
        console.log(
            `User requested page number ${event.selected + 1}`
        );
    };

    const nextclsName = `${homeState.curPage + 1 > homeState.paging.length ? "is-disabled" : " "}`
    const prevclsName = `${homeState.curPage === 1 ? "is-disabled" : ""}`
    return <ReactPaginate
        breakLabel="..."
        className='pagi'
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageClick}
        pageClassName="listStyleNone"
        breakClassName='listStyleNone'
        pageRangeDisplayed={5}
        pageCount={homeState.paging.length}
        activeClassName="blue-text"
        nextClassName={`pagi-item pagi-action pagi-next ${nextclsName}`}
        previousClassName={`pagi-item pagi-action pagi-prev ${prevclsName}`}
        nextLinkClassName={nextclsName}
        previousLinkClassName={prevclsName}
        renderOnZeroPageCount={null}
    />

}
