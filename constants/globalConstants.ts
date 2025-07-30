export const isEmptyString = (value: string) => value.toString().trim() !== ''

export const einValidator = /^\d{9}$/
export const emailValidator = /^(?![.-])[\w.-]+(?<![.-])@([\w-]+\.)+[a-zA-Z]{2,12}$/
// export const emailValidator = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,12}$/;
export const websiteValidator = /^(?:www\.)[\w.-]+\.[a-zA-Z]{2,}(?:\/[\w.-]*)*\/?$/
export const resetPasswordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])?[A-Za-z\d#?!@$%^&*-]{8,}$/;