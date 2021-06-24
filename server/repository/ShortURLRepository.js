const ShortURL = require("../models/ShortURL");
const URLCreator = require("../repository/URLCreator");
/*var redis = require("redis");
var client = redis.createClient();

client.on("connect", function () {
  console.log("Connected to Redis!");
});

client.on("error", function (err) {
  console.log("Something went wrong " + err);
});*/

const saveShortURL = async function (req) {
  let newURL = "";
  let saveResult = {
    responseCode: 500,
    response: "",
  };
  if (req.body.originalURL === "") {
    saveResult.responseCode = 400;
    saveResult.response = "No URL was submitted!";
    return saveResult;
  }
  let customURLAlreadyExists;
  if (!(req.body.shortenedURL === "")) {
    customURLAlreadyExists = await doesURLExist(req.body.shortenedURL);
    /*let redisRecord = ["customShortenedURLs", req.body.shortenedURL];
    let customURLExists = 0;
    await client.sismember(redisRecord, function (err, reply) {
      if (reply === 1) {
        console.log("Custom URL already exists!");
      } else {
        console.log("Custom URL does not exist!");
      }
      customURLExists = reply;
    });
    if (customURLExists == 0) {
      newURL = req.body.shortenedURL;
      client.sadd(redisRecord, function (err, reply) {
        if (reply === 1) {
          console.log("added");
        } else {
          console.log("not added");
        }
      });
    } else {
      saveResult.responseCode = 409;
      saveResult.response = "This custom URL already exists!";
      return saveResult;
    }

    let customURLAlreadyExists = await doesURLExist(req.body.shortenedURL);
    if(customURLAlreadyExists){
      saveResult.responseCode = 409;
      saveResult.response = "This custom URL already exists!";
      return saveResult;
    }*/
  }
  /*
    generate urls which are not custom using some kind of sequence

    LastSequence - 
    UnusedURLs  - shortURL
    UsedURLs - shortURL, isUsed
  */
  if (customURLAlreadyExists && !(req.body.shortenedURL === "")) {
    saveResult.responseCode = 409;
    saveResult.response = "This custom URL already exists!";
    return saveResult;
  } else if (!customURLAlreadyExists && !(req.body.shortenedURL === "")) {
    newURL = req.body.shortenedURL;
  }
  if (newURL === "") {
    do {
      newURL = URLCreator.generateURL();
      console.log("Da");
    } while (!doesURLExist(newURL));
  }

  let shortURL = new ShortURL({
    originalURL: req.body.originalURL,
    shortenedURL: newURL,
    creationDate: Date.now(),
    lastAccessDate: Date.now(),
    accessCounter: 0,
  });
  console.log("before save");
  /*
    u1 - short
    u2 - short
  */
  try {
    await shortURL.save();
    saveResult.responseCode = 201;
    saveResult.response = shortURL.shortenedURL;
  } catch (err) {
    saveResult.response = "An error occured!";
  }
  return saveResult;
};

const findURLbyShortenedURL = async function (req) {
  let findResult = {
    responseCode: 400,
    response: "",
  };
  try {
    let originalURL = await ShortURL.findOne({
      shortenedURL: req.params.shortcode
    });
    if (!originalURL) {
      findResult.responseCode = 400;
      findResult.response = "Record not found!";
    } else {
      findResult.responseCode = 308;
      findResult.response = originalURL.originalURL;
    }
  } catch (err) {
    findResult.response = "An error occured!";
  }
  return findResult;
};

const doesURLExist = async function (newURL) {
  let exists = false;

  try {
    let urlRecord = await ShortURL.findOne({
      shortenedURL: newURL,
    });
    if (urlRecord) {
      exists = true;
    }
  } catch (err) {
    console.log("An error occured!");
  }

  return exists;
};

const findURLStatsByShortenedURL = async function (req) {
  let urlStatsResult = {
    responseCode: 500,
    response: "",
  };

  try {
    let urlRecord = await ShortURL.findOne({
      shortenedURL: req.params.shortenedURL,
    });
    if (!urlRecord) {
      urlStatsResult.responseCode = 404;
      urlStatsResult.response = "Record not found!";
    } else {
      urlStatsResult.responseCode = 200;
      Object.assign(urlStatsResult, urlRecord);
      urlStatsResult.response = "Record found!";
    }
  } catch (err) {
    urlStatsResult.response = "An error occured!";
  }

  return urlStatsResult;
};

const incrementAccessCounterAndLastAccessDate = async function (shortenedURL) {
  try {
    let urlRecord = await ShortURL.findOne({
      shortenedURL: shortenedURL
    });
    const currentDate = Date.now();
    const filter = {
      accessCounter: urlRecord.accessCounter + 1,
      lastAccessDate: Date.now(),
    };
    await ShortURL.updateOne(filter, { shortenedURL: shortenedURL });
    urlRecord.accessCounter = urlRecord.accessCounter + 1;
    urlRecord.lastAccessDate = currentDate;
    await urlRecord.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveShortURL: saveShortURL,
  findURLbyShortenedURL: findURLbyShortenedURL,
  findURLStatsByShortenedURL: findURLStatsByShortenedURL,
  doesURLExist: doesURLExist,
  incrementAccessCounterAndLastAccessDate: incrementAccessCounterAndLastAccessDate
};
