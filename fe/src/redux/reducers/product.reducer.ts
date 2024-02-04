import { TAction } from "../../types/action.type";
import { ProductConstant } from "../actions/constants";

const initialState = {
    products: [],
    totalPage : 0,
    loading: true,
    activePage : 0,
};

function productReducer(state = initialState, action: TAction) {
    switch (action.type) {
        case ProductConstant.GETPRODUCT:
            return {
                ...state,
                products: action.products,
                totalPage : action.totalPage,
                loading : action.loading,
                activePage : action.activePage
            };
        default:
            return state; 
    }
}

export default productReducer;
