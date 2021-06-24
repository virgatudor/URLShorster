const ShortURLRepository = require("../repository/ShortURLRepository");
const mongoose = require("mongoose");
const ShortURL = require("../models/ShortURL");

beforeAll(() => {
  const uri =
    "mongodb+srv://admin:swag1234@cluster0.f55kl.mongodb.net/URLShorsterTest?retryWrites=true&w=majority";
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log("Connected to URLShorsterTest");
});

afterAll(async () => {
  await ShortURL.deleteMany({}, function (err) {});
  console.log("URLShorsterTest records removed");
});

test("Test URL redirect with existing URL", async () => {
  let fakeRequest = {
    body: {
      originalURL: "https://www.ss.com",
      shortenedURL: "custom",
    },
  };

  let fakeParams = {
    params: {
      shortcode: "custom",
    },
  };

  await ShortURLRepository.saveShortURL(fakeRequest);
  let redirectResponseGood = await ShortURLRepository.findURLbyShortenedURL(
    fakeParams
  );
  expect(redirectResponseGood.response).toEqual("https://www.ss.com");
  expect(redirectResponseGood.responseCode).toEqual(308);
});

test("Test URL redirect with non-existing URL", async () => {
  let fakeParams = {
    params: {
      shortcode: "notcustom",
    },
  };
  let redirectResponseBad = await ShortURLRepository.findURLbyShortenedURL(
    fakeParams
  );
  expect(redirectResponseBad.response).toEqual("Record not found!");
  expect(redirectResponseBad.responseCode).toEqual(400);
});

test("Test if URL is found ", async () => {
  let exists = await ShortURLRepository.doesURLExist("custom");
  let doesNotExist = await ShortURLRepository.doesURLExist("notcustom");
  expect(exists).toEqual(true);
  expect(doesNotExist).toEqual(false);
});

test("Test if URL is not found", async () => {
  let doesNotExist = await ShortURLRepository.doesURLExist("notcustom");
  expect(doesNotExist).toEqual(false);
});

test("Test URL creation with good request", async () => {
  let fakeRequest = {
    body: {
      originalURL: "https://www.youtube.com",
      shortenedURL: "",
    },
  };

  let newURL = await ShortURLRepository.saveShortURL(fakeRequest);
  expect(newURL.responseCode).toEqual(201);
});

test("Test URL creation with no original URL", async () => {
  let fakeRequest = {
    body: {
      originalURL: "",
      shortenedURL: "",
    },
  };

  let newURL = await ShortURLRepository.saveShortURL(fakeRequest);
  expect(newURL.response).toEqual("No URL was submitted!");
});

test("Test URL creation with valid custom URL", async () => {
  let fakeRequest = {
    body: {
      originalURL: "https://www.facebook.com",
      shortenedURL: "1234good",
    },
  };

  let newURL = await ShortURLRepository.saveShortURL(fakeRequest);
  return expect(newURL.response).toEqual("1234good");
});

test("Test URL creation with already existing custom URL", async () => {
  let fakeRequest = {
    body: {
      originalURL: "https://www.facebook.com",
      shortenedURL: "1234good",
    },
  };

  let newURL = await ShortURLRepository.saveShortURL(fakeRequest);
  expect(newURL.response).toEqual("This custom URL already exists!");
});

test("Test URL stats with existing URL", async () => {
  let fakeRequest = {
    params: {
      shortenedURL: "1234good",
    },
  };

  let newURL = await ShortURLRepository.findURLStatsByShortenedURL(fakeRequest);
  expect(newURL.response).toEqual("Record found!");
});

test("Test URL stats with non-existing URL", async () => {
  let fakeRequest = {
    params: {
      shortenedURL: "1234bad",
    },
  };

  let newURL = await ShortURLRepository.findURLStatsByShortenedURL(fakeRequest);
  expect(newURL.response).toEqual("Record not found!");
});

test("Test URL stats with non-existing URL", async () => {
  let fakeRequest = {
    body: {
      originalURL: "https://www.youtube.com",
      shortenedURL: "customtest",
    },
  };

  let fakeParams = {
    params: {
      shortcode: "customtest",
    },
  };

  await ShortURLRepository.saveShortURL(fakeRequest);
  await ShortURLRepository.incrementAccessCounterAndLastAccessDate(
    fakeParams.params.shortcode
  );
  let updatedUrlRecord = await ShortURL.findOne({
    shortenedURL: fakeRequest.body.shortenedURL,
  });
  expect(updatedUrlRecord.accessCounter).toEqual(1);
});
