export function validateURLs(isCustomURLOn, customURL, originalURL) {
  const alphaNumericRegex = new RegExp("^[a-zA-Z0-9_]*$");
  const validURLRegex = new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})");
  const invalidOriginalURL = "The URL is not valid!";
  const onlyAlphaNumerics = "The custom URL should contain only alphanumeric characters!";
  const invalidLength = "The length of the custom URL should be equal or greater to 4!";
  let validationErrorList = {
    isValid : true,
    errorList : []
  };
  if (!validURLRegex.test(originalURL)) {
    validationErrorList.isValid = false;
    validationErrorList.errorList.push(invalidOriginalURL);
  }

  if (isCustomURLOn && !alphaNumericRegex.test(customURL)) {
    validationErrorList.isValid = false;
    validationErrorList.errorList.push(onlyAlphaNumerics);
  }

  if (isCustomURLOn && customURL.length < 4) {
    validationErrorList.isValid = false;
    validationErrorList.errorList.push(invalidLength);
  }

  return validationErrorList;
}
