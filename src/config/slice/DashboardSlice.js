import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { catchResponse } from "../../assets/helper/Helper";
import { Api } from "../Api";
import { DataService } from "../DataService";
const initialState = {
  collapsed: false,
  isMobile: true,
  user: null,
  loading: false,
  allClient: null,
  client: null,
  clientModal: false,
  modalType: "Add",
  allGoods: null,
  goods: null,
  goodModal: false,
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setIsCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllClient: (state, action) => {
      state.allClient = action.payload;
    },
    setAllGoods: (state, action) => {
      state.allGoods = action.payload;
    },
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setGoods: (state, action) => {
      state.goods = action.payload;
    },
    setClientModal: (state, action) => {
      state.clientModal = action.payload;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
    setGoodModal: (state, action) => {
      state.goodModal = action.payload;
    },
  },
});

export const {
  setIsCollapsed,
  setIsMobile,
  setLoading,
  setUser,
  setClient,
  setAllClient,
  setClientModal,
  setModalType,
  setGoods,
  setAllGoods,
  setGoodModal,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;

export const getAllClient = () => {
  return (dispatch) => {
    try {
      dispatch(setLoading(true));
      DataService.get(Api.User.AllClient)
        .then((response) => {
          let data = response.data.data;
          dispatch(setAllClient(data));
          dispatch(setLoading(false));
        })
        .catch((error) => {
          catchResponse(error);
          dispatch(setLoading(false));
        });
    } catch (error) {
      catchResponse(error);
      dispatch(setLoading(false));
    }
  };
};

export const editClient = (data, clientId) => {
  return (dispatch) => {
    try {
      dispatch(setLoading(true));
      let urlencoded = new URLSearchParams();
      if (data.name) urlencoded.append("name", data.name);
      if (data.paymentCycle)
        urlencoded.append("paymentCycle", data.paymentCycle);
      if (data.totalPendingPayment)
        urlencoded.append("totalPendingPayment", data.totalPendingPayment);
      if (data.totalPaymentGot)
        urlencoded.append("totalPaymentGot", data.totalPaymentGot);
      urlencoded.append("clientId", clientId);

      DataService.put(Api.User.UpdateClient, urlencoded)
        .then((response) => {
          let data = response.data;
          dispatch(setLoading(false));
          dispatch(setClientModal(false));
          toast(data.message);
          dispatch(setClient(null));
        })
        .catch((error) => {
          catchResponse(error);
          dispatch(setLoading(false));
        });
    } catch (error) {
      catchResponse(error);
      dispatch(setLoading(false));
    }
  };
};

export const addClient = (data) => {
  return (dispatch) => {
    try {
      dispatch(setLoading(true));
      let urlencoded = new URLSearchParams();
      if (data.name) urlencoded.append("name", data.name);
      if (data.paymentCycle)
        urlencoded.append("paymentCycle", data.paymentCycle);
      if (data.totalPendingPayment)
        urlencoded.append("totalPendingPayment", data.totalPendingPayment);
      if (data.totalPaymentGot)
        urlencoded.append("totalPaymentGot", data.totalPaymentGot);
      DataService.post(Api.User.AddClient, urlencoded)
        .then((response) => {
          let data = response.data;
          dispatch(setLoading(false));
          dispatch(setClientModal(false));
          toast(data.message);
          dispatch(setClient(null));
        })
        .catch((error) => {
          catchResponse(error);
          dispatch(setLoading(false));
        });
    } catch (error) {
      catchResponse(error);
      dispatch(setLoading(false));
    }
  };
};

export const deleteClient = (clientId) => {
  return (dispatch) => {
    try {
      dispatch(setLoading(true));
      let urlencoded = new URLSearchParams();
      urlencoded.append("clientId", clientId);
      DataService.put(Api.User.DeleteClient, urlencoded)
        .then((response) => {
          let data = response.data;
          toast(data.message);
          dispatch(setClient(null));
          dispatch(getAllClient());
          dispatch(setLoading(false));
        })
        .catch((error) => {
          catchResponse(error);
          dispatch(setLoading(false));
        });
    } catch (error) {
      catchResponse(error);
      dispatch(setLoading(false));
    }
  };
};

export const getAllGoods = () => {
  return (dispatch) => {
    DataService.get(Api.User.AllGoods)
      .then((res) => {
        let data = res.data;
        dispatch(setAllGoods(data.data));
      })
      .catch((error) => {
        catchResponse(error);
      });
  };
};

export const editGoods = (data, goodsId) => {
  return (dispatch) => {
    let formData = new FormData();
    formData.append("goodsId", goodsId);
    if (data.goodImg) formData.append("goodImg", data.goodImg);
    if (data.billImg) formData.append("billImg", data.billImg);
    if (data.clientId) formData.append("clientId", data.clientId._id);
    if (data.name) formData.append("name", data.name);
    if (data.takenDate) formData.append("takenDate", data.takenDate);
    if (data.deadLine) formData.append("deadLine", data.deadLine);
    if (data.status) formData.append("status", data.status);
    if (data.quantity) formData.append("quantity", data.quantity);
    if (data.price) formData.append("price", data.price);
    if (data.cost) formData.append("cost", data.cost);

    DataService.put(Api.User.UpdateGood, formData)
      .then((response) => {
        let res = response.data;
        toast(res.message);
        dispatch(setGoods(null));
        dispatch(setGoodModal(false));
      })
      .catch((error) => {
        catchResponse(error);
      });
  };
};

export const addGoods = (data) => {
  return (dispatch) => {
    let formData = new FormData();
    if (data.goodImg) formData.append("goodImg", data.goodImg);
    if (data.billImg) formData.append("billImg", data.billImg);
    formData.append("clientId", "63d4bd4634c3ac9e2f54ab7e");
    if (data.name) formData.append("name", data.name);
    if (data.takenDate) formData.append("takenDate", data.takenDate);
    if (data.deadLine) formData.append("deadLine", data.deadLine);
    if (data.status) formData.append("status", data.status);
    if (data.quantity) formData.append("quantity", data.quantity);
    if (data.price) formData.append("price", data.price);
    if (data.cost) formData.append("cost", data.cost);

    DataService.post(Api.User.AddGoods, formData)
      .then((response) => {
        let res = response.data;
        toast(res.message);
        dispatch(setGoodModal(false));
      })
      .catch((error) => {
        catchResponse(error);
      });
  };
};
