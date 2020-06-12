export const updateAdInfo = (oldObject, updatedProps) =>{
    return{
        ...oldObject,
            adInfo: {
                ...oldObject.adInfo,
                ...updatedProps
            }
    };
};

export const updateAudienceInfo = (oldObject, updatedProps) =>{
    return{
        ...oldObject,
            audience: {
                ...oldObject.audience,
                ...updatedProps
            }
    };
};