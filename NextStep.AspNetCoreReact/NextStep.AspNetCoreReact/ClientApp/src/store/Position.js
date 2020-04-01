const initialState = {
    positions: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestPositions: () => async (dispatch, getState) => {

        const url = 'api/Position/Positions';
        const response = await fetch(url);
        const positions = await response.json();
        dispatch({ type: 'FETCH_POSITIONS', positions });
    },
    savePosition: position => async (dispatch, getState) => {

        const url = 'api/Position/SavePosition';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(position)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_POSITION', position });
    },
    deletePosition: id => async (dispatch, getState) => {
        const url = 'api/Position/DeletePosition/' + id;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_POSITION', id });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_POSITIONS': {
            return {
                ...state,
                positions: action.positions,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_POSITION': {
            return {
                ...state,
                positions: Object.assign({}, action.position),
                forceReload: true
            }
        }
        case 'DELETE_POSITION': {
            return {
                ...state,
                id: action.id,
                forceReload: true
            }
        }
        default:
            return state;
    }
};
