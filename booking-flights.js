// Get data from local storage
const data = JSON.parse(localStorage.getItem('detailData')); // Get data from local storage
const inputArrays = JSON.parse(localStorage.getItem('inputArrays'));
const detailAirport = JSON.parse(localStorage.getItem('detailAirport'));
console.log('data= ', data);
console.log('data= ', inputArrays);
// Get the current URL
var currentURL = window.location.href;
var index = currentURL.substring(currentURL.length - 1);
var goObject = {};
var returnObject = {};
// Log the URL to the console
console.log(index);
var obj = {}
var id = '#body1';
if (index != undefined) {
    obj = data[index]
    localStorage.setItem('obj', index);
}
console.log('object= ', obj)
/**
 * check Object Empty
 * @param {*} obj 
 * @returns 
 */
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
/**
 * set Input
 */
function setInput() {
    $('.hch').text(inputArrays[0] + ' To ' + inputArrays[1] + ' (Round-trip)')
    $('#title-h3').text(inputArrays[0] + ' To ' + inputArrays[1])
    $('#flyingFrom-input').val(inputArrays[0])
    $('#flyingTo-input').val(inputArrays[1])
    $('#departing-input').val(inputArrays[2])
    $('#returning-input').val(inputArrays[3])
    $('#adults-input').val(inputArrays[4])
    $('#children-input').val(inputArrays[5])
    if (!isObjectEmpty(obj)) {
        let segments = obj.itineraries[0].segments;
        let totalTime = '';
        let goTime = '';
        let returnTime = '';
        let goCabin = '';
        let goBags = '';
        let goAircraft = '';
        //TODO: Call APi to get airport
        let fromAirport = detailAirport[0];
        let toAirport = detailAirport[1];
        $('.address').text(fromAirport + ' / ' + toAirport);
        $('#total-span').text('$ ' + obj.price.grandTotal)
        for (let i = 0; i < segments.length; i++) {
            if (i == 1) {
                id = '#body2';
                fromAirport = detailAirport[1];
                toAirport = detailAirport[0];
            }
            goTime = getDateTimePicker(segments[i].departure.at).toLocaleTimeString()
                + ' -> ' + getDateTimePicker(segments[i].arrival.at).toLocaleTimeString()
                + ' / '
                + formatTimeFromPT(segments[i].duration);
            goAircraft = segments[i].aircraft.code
            goCabin = obj.travelerPricings[0].fareDetailsBySegment[i].cabin;
            let includedCheckedBags = obj.travelerPricings[0].fareDetailsBySegment[i].includedCheckedBags.quantity;
            if (includedCheckedBags != undefined) {
                let temp = (parseInt(includedCheckedBags) <= 1) ? ' piece' : ' pieces';
                goBags = includedCheckedBags + temp;
            } else {
                goBags = obj.travelerPricings[0].fareDetailsBySegment[i].includedCheckedBags.weight + ' '
                    + obj.travelerPricings[0].fareDetailsBySegment[i].includedCheckedBags.weightUnit;
            }
            totalTime = getDateTimePicker(segments[0].departure.at).toLocaleTimeString() + ' -> ' + getDateTimePicker(segments[i].arrival.at).toLocaleTimeString()
            //add content
            addContent(id, getDateTimePicker(segments[i].departure.at).toLocaleDateString(),
                totalTime, goTime, returnTime, goCabin, goBags, goAircraft, fromAirport, toAirport)
        }
    }
}
function getDateTimePicker(date) {
    return new Date(date);
}

/**
 * format Time From duration
 * @param {*} duration 
 * @returns 
 */
function formatTimeFromPT(duration) {
    let match = duration.match(/PT(\d+)H(\d+)M/);
    if (!duration.includes('H') && duration.includes('M')) {
        match = duration.match(/PT(\d+)M/);
        return `${parseInt(match[1])}m`
    } else if (duration.includes('H') && !duration.includes('M')) {
        match = duration.match(/PT(\d+)H/);
        return `${parseInt(match[1])}h`
    }
    return `${parseInt(match[1])}h ${parseInt(match[2])}m`
}

/**
 * add Contents
 * @param {*} id 
 * @param {*} day 
 * @param {*} totalTime 
 * @param {*} goTime 
 * @param {*} returnTime 
 * @param {*} cabin 
 * @param {*} bags 
 * @param {*} aircraft 
 * @param {*} fromAirport 
 * @param {*} toAirport 
 */
function addContent(id, day, totalTime, goTime, returnTime, cabin, bags, aircraft, fromAirport, toAirport) {
    $(id).append(
        `<h3>${day}</h3>
    <ul>
    
        <li>From: ${fromAirport}</li>
        <li>To: ${toAirport}</li>
    
    </ul>
    <h5>${totalTime}</h5>
    <hr>
    <h4>Details:</h4>
    <h5>${goTime}</h5>
    <ul>
        <li>From ${fromAirport}</li>
        <li>To ${toAirport}</li>
        <li>Aircraft: ${aircraft}</li>
        <li>${cabin}</li>
    </ul>
    <h5>${returnTime}</h5>
    <p>
        BAG FEES: Baggage fees when purchased at the airport
       </p>
    <ul>
        <li>Carry on: No fee</li>
        <li>1st checked bag: No fee up to ${bags}</li>
    </ul>
    <hr>`
    )
}
setInput();