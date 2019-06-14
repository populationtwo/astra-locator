/* GET 'home' page */
const homeList = (req,res)=>{
	res.render('location-list', {title: 'Home'});
};

/* GET 'Location info' page */
const locationInfo = (req,res)=>{
	res.render('location-info', {title: 'Location Info'});
};

/* GET 'Add review' page */
const addReview = (req,res)=>{
	res.render('location-review-form', {title: 'Add Review'});
};

module.exports = {
	homeList,
	locationInfo,
	addReview
};
