import * as types from "../Constants.ActionType";
import file from '../../diem_thi_thpt_2022.csv'
import Papa from 'papaparse';
var initState = {};

// function debugDataset(dataset) {
//   initState = dataset
// }
// console.log(initState)
const HomeReducer = (state = initState, action) => {
  // .slice(current * 50, next * 50)

  switch (action.type) {
    case types.Change_To_Next_Page: {
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
    case types.Change_To_Prev_Page: {
      const { err } = action;
      return { ...state, err_code: err };
    }
    case types.First_Load_CSV: {
      const { data } = action;
      return { ...data }
    }
    default:
      return state;
  }
};
export default HomeReducer;
