/* eslint-disable prettier/prettier */
export default function reducer(state = [], action){
    switch (action.type) {
        case 'videoAdded':
            return [...state, {description: action.description}];
        case 'videoDeleted':
            return [...state, {description: action.description}];
            default:
                return state;
    }
}
