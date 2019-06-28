const request = require("request");
const apiOptions = {
  server: "http://localhost:3000"
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://calm-ravine-8466.herokuapp.com";
}

const formatDistance = distance => {
  let thisDistance = 0;
  let unit = "m";
  if (distance && !isNaN(distance)) {
    if (distance > 1000) {
      thisDistance = parseFloat(distance / 1000).toFixed(1);
      unit = "km";
    } else {
      thisDistance = Math.floor(distance);
    }
    return thisDistance + unit;
  }
};

const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }
  res.render("locations-list", {
    title: "Locator - find a place to work with wifi",
    pageHeader: {
      title: "Locator",
      strapLine: "Find places to work with wifi near you!"
    },
    sidebar:
      "Looking for wifi and a seat? Locator helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Locator help you find the place you're looking for.",
    locations: responseBody,
    message
    // locations: [
    //   {
    //     name: "Starcups",
    //     address: "125 High Street, Reading, RG6 1PS",
    //     rating: 3,
    //     facilities: ["Hot drinks", "Food", "Premium wifi"],
    //     distance: "100m"
    //   },
    //   {
    //     name: "Cafe Hero",
    //     address: "125 High Street, Reading, RG6 1PS",
    //     rating: 4,
    //     facilities: ["Hot drinks", "Food", "Premium wifi"],
    //     distance: "200m"
    //   },
    //   {
    //     name: "Burger Queen",
    //     address: "125 High Street, Reading, RG6 1PS",
    //     rating: 2,
    //     facilities: ["Food", "Premium wifi"],
    //     distance: "250m"
    //   }
    // ]
  });
};

/* GET 'home' page */
const homeList = (req, res) => {
  const path = "/api/locations";
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
    qs: {
      lng: -0.7992599,
      lat: 51.378091,
      maxDistance: 20
    }
  };
  request(requestOptions, (err, { statusCode }, body) => {
    let data = [];
    if (statusCode === 200 && body.length) {
      data = body.map(item => {
        item.distance = formatDistance(item.distance);
        return item;
      });
    }

    renderHomepage(req, res, data);
  });
};

/* GET 'Location info' page */
const renderDetailPage = (req, res, location) => {
  res.render("location-info", {
    title: location.name,
    pageHeader: {
      title: location.name
    },
    sidebar: {
      context:
        "is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
      callToAction:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    },
    location
  });
};

const locationInfo = (req, res) => {
  const path = `/api/locations/${req.params.locationid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {}
  };
  request(requestOptions, (err, response, body) => {
    const data = body;
    data.coords = {
      lng: body.coords[0],
      lat: body.coords[1]
    };
    renderDetailPage(req, res, data);
  });
};

/* GET 'Add review' page */
const addReview = (req, res) => {
  res.render("location-review-form", {
    title: "Review Starcups on Locator",
    pageHeader: { title: "Review Starcups" }
  });
};

module.exports = {
	homeList,
	locationInfo,
	addReview
};
