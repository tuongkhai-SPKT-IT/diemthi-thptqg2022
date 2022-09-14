import * as types from "../Constants.ActionType";
import file from '../../diem_thi_thpt_2022.csv'
import Papa from 'papaparse';
import { ERR_404 } from "../Constants.Errors_code";
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
      console.log(searchTerm.length)
      let temp = []
      if (searchTerm.length === 8) {
        const index = columnCSV.sbd.findIndex((e) => e === searchTerm)
        console.log(searchTerm, index)
        if (index >= 0)
          temp = dataCSV[index]
        else
          return { ...state, err_code: ERR_404 };
      }
      if (searchTerm.length < 8) {
        if (searchTerm.length <= 0) temp = dataCSV.slice(0, 50)
        else {
          const test = []
          dataCSV.map(e => {
            // console.log(e[0].includes(searchTerm));
            if (e[0].includes(searchTerm)) {
              console.log('hello')
              test.push(e)
            }
          })
          console.log(test)
          temp = [...test];
          console.log(temp, test)
        }
      }
      if (temp.length === 0) {
        return { ...state, err_code: ERR_404 };
      }
      return { ...state, dataShow: temp }
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
