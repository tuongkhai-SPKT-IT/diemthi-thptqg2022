import * as types from "../Constants.ActionType";
import file from '../../diem_thi_thpt_2022.csv'
import Papa from 'papaparse';
var initState = {};

const HomeReducer = (state = initState, action) => {
  // .slice(current * 50, next * 50)

  switch (action.type) {
    ///case have data 
    case types.Change_Page: {
      const { currentPage, otherPage } = action;
      const { dataCSV } = state
      let truePage;
      let temp = []

      if (currentPage < otherPage) {
        temp = dataCSV.slice(currentPage * 50, otherPage * 50)
        truePage = otherPage
      }
      else {
        temp = dataCSV.slice(otherPage * 50, currentPage * 50)
        truePage = currentPage
      }
      return { ...state, curPage: otherPage <= 0 ? 1 : truePage, dataShow: temp }
      // return { ...state, err_code: "", srcData: data };
    }

    case types.First_Load_CSV: {
      const { data } = action;
      return { ...data }
    }
    case types.Search_SBD: {
      const { searchTerm } = action;
      const { columnCSV, dataCSV } = state

      let temp = []
      if (searchTerm.length > 8) {
        return { ...state, dataShow: [] }
      }
      if (searchTerm.length === 8) {
        const index = columnCSV.sbd.findIndex((e) => e === searchTerm)
        temp = dataCSV[index]
      }
      if (searchTerm.length === 0) temp = dataCSV.slice(0, 50)

      // console.log(temp)

      return { ...state, dataShow: temp }
      // return { ...state, err_code: "", srcData: data };
    }
    ///case failed
    case types.Change_Page_Failed: {
      const { err } = action;
      return { ...state, err_code: err };
    }
    case types.First_Load_CSV_Failed: {
      const { err } = action;
      return { ...state, err_code: err };
    }
    default:
      return state;
  }
};
export default HomeReducer;
