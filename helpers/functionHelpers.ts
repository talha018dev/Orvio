import { axiosRequest } from "@/utils/axios-utils";
import moment from "moment";

export function capitalizeFirstLetter(string: string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1)
}

export const convertMBtoByte = (sizeInMb: number) => {
  return (sizeInMb * 1024 * 1024) + 1000
}

export const uploadImageAndDocument = async (file: { blob: Blob, name: string }): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file.blob, file.name);

  try {
    const response = await axiosRequest({
      url: `/upload/documents`,
      method: 'patch',
      data: formData,
      contentType: 'multipart/form-data'
    })
    return response?.Location;
  } catch (err) {
    throw new Error("Failed to upload file");
  }
};

// export async function delayOneSecond() {
//   await new Promise((resolve) => setTimeout(resolve, 1000))
// }

export function beautifyNumber(num: number) {
  let numStr = checkIsFixed(num?.toString());
  let parts = numStr?.split(".");
  if (parts?.length) {
    let wholeNumber = parts[0];
    let decimal = parts.length > 1 ? `.${parts[1]}` : "";
    let digits = wholeNumber.split("");
    let count = 0;
    for (let i = digits.length - 1; i >= 0; i--) {
      count++;
      if (count % 3 === 0 && i !== 0) {
        digits.splice(i, 0, ",");
      }
    }
    let result = digits.join("") + decimal;
    return result;
  }
  return null;
}
export const checkIsFixed = (value: any) => {
  if (
    value === undefined ||
    value === "" ||
    value == isNaN ||
    value === null ||
    !value ||
    value == 0
  ) {
    return "0.00";
  }
  return parseFloat(value)?.toFixed(2);
};

// Jan 30, 2025
export const formatDate = (date: any) => {
  return moment(date).format('MMM DD, YYYY')
}

// Jan 30
export const formatDate2 = (date: any) => {
  return date ? moment(date).format('MMM DD') : ''
}
export const convertIntoTwoDecimals = (value: any) => {
  if (value === undefined || value === '' || value == isNaN || value === null || !value || value == 0) {
    return '0.00'
  }
  const convertedValue = value < 0 ? value * -1 : value
  return parseFloat(convertedValue)?.toFixed(2)
}

export function formatUSPhoneNumber(phoneNumber: any) {
  phoneNumber = phoneNumber?.replace(/\D/g, "")

  if (phoneNumber.length !== 10) {
    const updatedPhone = phoneNumber?.substring(1)
    return `${updatedPhone.slice(0, 3)} ${updatedPhone.slice(
      3,
      6
    )} ${updatedPhone.slice(6)}`
  } else {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
      3,
      6
    )} ${phoneNumber.slice(6)}`
  }
}

export const mapToJSON = (map: Map<any, any>) => JSON.stringify(Array.from(map.entries()))
export const jsonToMap = (json: string) => new Map(JSON.parse(json))