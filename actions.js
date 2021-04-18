/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
export function videoAdded(){
    return {
        type: "videoAdded",
        description: "My Video",
    }
}

export function videoDeleted(){
    return {
        type: "videoDeleted",
        description: "Deleted",
    }
}