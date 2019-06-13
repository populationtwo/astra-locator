/* GET 'home' page */
const homeList = (req,res)=>{
	res.render('index', {title: 'Home'});
};

/* GET 'Location info' page */
const locationInfo = (req,res)=>{
	res.render('index', {title: 'Location Info'});
};

/* GET 'Add review' page */
const addReview = (req,res)=>{
	res.render('index', {title: 'Add Review'});
};

module.exports = {
	homeList,
	locationInfo,
	addReview
};
