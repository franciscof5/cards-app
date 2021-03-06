/*   =========  Reducer ========
  Reducers vão especificar como a store vai mudar, conforme os "disparos" das actions
*/
import { ON, OFF, TOGGLE } from './actionTypes';

const initialState = {
  isOnline: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ON:
      return {
        ...state,
        isOnline: true,
      };

    case OFF:
      return {
        ...state,
        isOnline: false,
      };

    case TOGGLE:
      return {
        ...state,
        isOnline: !state.isOnline,
      };

    default:
      return state;
  }
};
