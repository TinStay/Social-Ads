export const updateAdInfo = (oldObject, updatedProps) =>{
    return{
        ...oldObject,
            adInfo: {
                ...oldObject.adInfo,
                ...updatedProps
            }
    };
};