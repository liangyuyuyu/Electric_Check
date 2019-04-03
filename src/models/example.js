
export default {

  namespace: 'lyy',

  state: {
    multipleState: true,
    tabBarChoice: 1 ,
    noticeBarState: true,  // 默认通知栏是显现的
    infoWindowState: true, // 用户点击地图上的图标时，显示或者隐藏信息窗口
    point: {lng: 121.611425, lat: 31.184133},
    markerCurrentAddress: "上海瑞谷拜特软件技术有限公司"
  },

  subscriptions: {
  },

  effects: {
    *changeMultipleState({ data }, { put }) {  // 改变
      yield put({ type: 'changeMultipleStateReducer', multipleState: data.multipleState });
    },
    *changeTabBarChoice({ data }, { put }) {  // 最底部导航栏切换改变
      yield put({ type: 'changeTabBarChoiceReducer', tabBarChoice: data.tabBarChoice });
    },
    *changeNoticeBarState({data}, { put }) {  // 用户点击关闭通知栏
      yield put({ type: 'changeNoticeBarStateReducer', noticeBarState:data.noticeBarState });
    },
    *changeInfoWindowState({data}, { put }) {  // 用户点击地图上的图标时，显示或者隐藏信息窗口
      yield put({ type: 'changeInfoWindowStateReducer', infoWindowState:data.infoWindowState });
    },
    *changeCurrentPointState({data}, { put }) {  // 改变state中的point
      yield put({ type: 'changeCurrentPointStateReducer', point:data.point });
    },
    *changeMarkerCurrentAddressState({data}, { put }) {  // 拖动Marker放下时，改变当前marker的地址
      yield put({ type: 'changeMarkerCurrentAddressStateReducer', markerCurrentAddress:data.markerCurrentAddress });
    },
  },

  reducers: {
    changeMultipleStateReducer(state,{multipleState}){
      return { ...state, multipleState: !multipleState};
    },
    changeTabBarChoiceReducer(state,{tabBarChoice}){
      return { ...state, tabBarChoice: tabBarChoice};
    },
    changeNoticeBarStateReducer(state,{noticeBarState}){ // // 用户点击关闭通知栏
      return { ...state, noticeBarState: !noticeBarState};
    },
    changeInfoWindowStateReducer(state,{infoWindowState}){ // 用户点击地图上的图标时，显示或者隐藏信息窗口
      return { ...state, infoWindowState: !infoWindowState};
    },
    changeCurrentPointStateReducer(state,{point}){ // 改变state中的point
      return { ...state, point: point};
    },
    changeMarkerCurrentAddressStateReducer(state,{markerCurrentAddress}){ // // 拖动Marker放下时，改变当前marker的地址
      return { ...state, markerCurrentAddress: markerCurrentAddress};
    }
  }
};
