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
    return {validTitle, validAttachments}
}

function ValidatePollPost({pollTitle, attachments, poll: {options}}) {
    const validTitle = isValidTitle(pollTitle)
    const validAttachments = areValidAttachments(attachments)
    const validOptions = options.map(option => isValidPollOptionValue(option.value))
    return {validTitle, validAttachments, validOptions}
}

const ValidateCreatePost = {ValidateDefaultPost, ValidatePollPost, isValidTitle, areValidAttachments}
export default ValidateCreatePost