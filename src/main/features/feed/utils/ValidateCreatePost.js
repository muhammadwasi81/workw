const ValidationResult = (valid, message = "") => ({valid, message})

function isValidTitle(title) {
    if (title.trim() === "")
        return ValidationResult(false, "Title can't be empty")
    return ValidationResult(true)
}

function areValidAttachments(attachments) {
    if (!attachments.length)
        return ValidationResult(false, "Attachments can't be empty")
    return ValidationResult(true)
}

function isValidPollOptionValue(value) {
    if (value.trim() === "")
        return ValidationResult(false, "Option can't be empty")
    return ValidationResult(true)
}

function ValidateDefaultPost({title, attachments}) {
    const validTitle = isValidTitle(title)
    const validAttachments = areValidAttachments(attachments)
    const validationResult = {validTitle, validAttachments}
    return {
        valid: [validTitle, validAttachments].some((v) => v.valid),
        validationResult
    }
}

function ValidatePollPost({pollTitle, poll: {options}}) {
    const validTitle = isValidTitle(pollTitle)
    const validateOptions = {}
    options.forEach((option, index) => validateOptions['option_' + index] = isValidPollOptionValue(option.value))

    const validationResult = {validTitle, ...validateOptions}
    return {
        valid: Object.values(validationResult).every((v) => v.valid),
        validationResult
    }
}
export function replaceURL(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
      return '<a href="' + url + '">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }

const ValidateCreatePost = {ValidateDefaultPost, ValidatePollPost}
export default ValidateCreatePost