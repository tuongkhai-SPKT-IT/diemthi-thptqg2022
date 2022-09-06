import * as types from "../Constants.ActionType";
import file from '../../diem_thi_thpt_2022.csv'
import Papa from 'papaparse';

export const firstShowData = () => {
  // comment = {username, user avatar, userId, cmt_content}

  return async (dispatch) => {
    try {
      Papa.parse(file, {
        download: true,
        complete: function (input) {
          var initState = {}
          const data = input.data;
          const header = data[0];
          const tempShow = []
          for (var i = 1; i < data.length; i++) {
            const condition = data[i][0].slice(0, 2)
            if (condition === '02')
              tempShow.push(data[i])
          }
          const pages = tempShow.length / 50;
          const firstShow = tempShow.slice(0, 50)
          const temp = []
          for (var d = 1; d <= pages + 1; d++) {
            temp.push(d)
          }

          initState.paging = temp;
          initState.curPage = 1;
          initState.dataShow = firstShow;
          initState.dataCSV = tempShow;
          initState.headerTable = header;
          // initState = {}
          dispatch({ type: types.First_Load_CSV, data: initState });
        }
      });
    } catch (err) {
      dispatch({ type: types.First_Load_CSV_Failed, err: err });
    }
  };
};
export const pagingClick = (currentPage, otherPage) => {
  // comment = {username, user avatar, userId, cmt_content}

  return async (dispatch) => {
    try {

      // initState = {}
      dispatch({ type: types.Change_To_Next_Page, currentPage, otherPage });
    }
    catch (err) {
      dispatch({ type: types.First_Load_CSV_Failed, err: err });
    }
  };
};
