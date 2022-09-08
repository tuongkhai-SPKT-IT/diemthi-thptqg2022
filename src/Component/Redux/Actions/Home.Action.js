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
          const tempCSV = []
          const columnCSV = {
            sbd: [],
            math: [],
            literature: [],
            english: [],
            phy: [],
            chem: [],
            bio: [],
            his: [],
            geo: [],
            gdcd: [],
          }

          for (var i = 1; i < data.length; i++) {

            const condition = data[i][0].slice(0, 2)
            if (condition === '02') {
              tempCSV.push(data[i])
              columnCSV.sbd.push(data[i][0])
              columnCSV.math.push(data[i][1])
              columnCSV.literature.push(data[i][2])
              columnCSV.english.push(data[i][3])
              columnCSV.phy.push(data[i][4])
              columnCSV.chem.push(data[i][5])
              columnCSV.bio.push(data[i][6])
              columnCSV.his.push(data[i][7])
              columnCSV.geo.push(data[i][8])
              columnCSV.gdcd.push(data[i][9])
            }
          }
          const pages = tempCSV.length / 50; /// tổng số trang
          const firstShow = tempCSV.slice(0, 50) /// data show ra đầu tiên khi load web
          const temp = [] ///arr chứa số trang bottom paging 
          for (var d = 1; d <= pages + 1; d++) {
            temp.push(d)
          }

          initState.paging = temp;
          initState.curPage = 1;
          initState.dataShow = firstShow;
          initState.dataCSV = tempCSV;
          initState.headerTable = header;
          initState.columnCSV = columnCSV;
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
      dispatch({ type: types.Change_Page, currentPage, otherPage });
    }
    catch (err) {
      dispatch({ type: types.Change_Page_Failed, err: err });
    }
  };
};

export const filterData = (searchTerm) => {
  // comment = {username, user avatar, userId, cmt_content}

  return async (dispatch) => {
    try {
      dispatch({ type: types.Search_SBD, searchTerm });
    }
    catch (err) {
      dispatch({ type: types.Search_SBD_Failed, err: err });
    }
  };
};