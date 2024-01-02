import http from "../../helpers/http";

export const createOrder = (
	dataLocation,
	dataDate,
	dataShowtime,
	dataMovie,
) => {
	return async (dispatch) => {
		const params = new URLSearchParams();
		params.append("dataShowtime", dataShowtime);
		params.append("dataMovie", dataMovie);
		params.append("dataDate", dataDate);
		params.append("dataLocation", dataLocation);
		const data = { dataLocation, dataDate, dataShowtime, dataMovie };
		try {
			dispatch({
				type: "SET_CREATE_ORDER_MESSAGE",
				payload: "",
			});
			dispatch({
				type: "CREATE_ORDER",
				payload: data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: "SET_CREATE_ORDER_MESSAGE",
				payload: message,
			});
		}
	};
};

export const createSeat = (data = []) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "SET_GET_SEAT_MESSAGE",
				payload: "",
			});
			dispatch({
				type: "GET_SEAT",
				payload: data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: "SET_GET_SEAT_MESSAGE",
				payload: message,
			});
		}
	};
};

export const getVNPay = (amount) => {
	return async (dispatch) => {
		const response = await http().post(`order/create_payment_url`, {
            orderType: 'topup',
            amount: amount,
            orderDescription: 'gogo',
            bankCode: 'NCB',
            language: 'vn'
        });
		dispatch({
			type: "GET_VNPay",
			payload: response.data.vnpUrl,
		});
		dispatch({
			type: "TOGGLE_VNPay_LOADING",
		});
	};
};