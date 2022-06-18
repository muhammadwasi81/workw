const ResponseResult = ({type, errorMessage = null, data = null}) => ({type, errorMessage, data})
export const ResponseType = Object.freeze({
    SUCCESS: 1,
    ERROR: 2
})
export const ResponseResultError = (errorMessage) => ResponseResult({type: ResponseType.ERROR, errorMessage})
export const ResponseResultSuccess = (data) => ResponseResult({type: ResponseType.SUCCESS, data})