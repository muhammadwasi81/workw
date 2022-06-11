export const ResponseType = Object.freeze({
    SUCCESS: 1,
    ERROR: 2
})

export const ResponseResult = ({type, errorMessage = null, data = null}) => ({type, errorMessage, data})
