// import { jquery } from './js/jquery'
const BASE_AUTHORIZE_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token'
const BASE_SEARCH_URL = 'https://test.api.amadeus.com/v2/shopping/flight-offers'
const GRANT_TYPE = 'client_credentials'
const CLIENT_ID = 'fUZdqVBjniAO7PovAtc2AS74AImne10z'
const CLIENT_SECRET = 'rzBoNVsYwcKaRDGn'
var inputArrays = []
const airport = {
    'HAN': 'Noi Bai International Airport (HAN)',
    'SGN': 'Tan Son Nhat International Airport (SGN)',
    'DAD': 'Danang International Airport (DAD)',
    'ICN': 'Incheon International Airport (ICN)',
    'YYZ': 'Toronto Pearson International Airport (YYZ)',
    'CDG': 'Paris Charles de Gaulle Airport (CDG)',
    'NRT': 'New Tokyo International Airport (NRT)',
    'TPE': 'Taiwan Taoyuan International Airport (TPE)',
    'SZX': 'Shenzhen Bao an International Airport (SZX)',
    'PEK': 'Beijing Capital International Airport (PEK)',
}
function mappingAirport(flyingFrom, flyingTo) {
    let arrays = [];
    for (const key in airport) {
        if (key == flyingFrom) {
            arrays.push(airport[key])
        }
        if (key == flyingTo) {
            arrays.push(airport[key])
        }
    }
    return arrays;
}

const CONTENT_TYPE = 'application/x-www-form-urlencoded'
/////////////////////////////////////////
$("#startDate").datepicker({ minDate: 0 });
$("#endDate").datepicker({ minDate: 0 });
var btnform1submit = $('.btn-form1-submit')
var btn3 = $('.btn3')
///
btnform1submit.on("click", function () {
    try {
        $('.loader').show();
        $('#main').addClass('inactive');
        getAccessToken()
        //move to page result detail
        console.log($("#child-select").val());
    } catch (error) {
        console.log(error)
        $('#main').removeClass('inactive');
    }
});


function formatDate(params) {
    let arrays = params.split('/');
    return arrays[2] + "-" + arrays[0] + '-' + arrays[1]
}

function getAccessToken() {
    try {
        $.ajax({
            url: BASE_AUTHORIZE_URL,
            type: "POST",
            data: {
                'grant_type': GRANT_TYPE,
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET
            },
            contentType: CONTENT_TYPE,
            success:
                function (data) {
                    console.log('access_token= ', data.access_token);
                    searchFlight(data.access_token)
                },
            error:
                function () {
                    handleErrors()
                    console.error('Error fetching data from API');
                }
        });
    } catch (error) {
        console.log(error)
    }
}

/**
 * handle Errors
 */
function handleErrors() {
    $('#main').removeClass('inactive');
    $('.loader').hide();
    alert('Error')
}

function getBodySearchFlight(fromCity, toCity, startDate) {
    var body = {
        "currencyCode": "USD",
        "originDestinations": [
            {
                "id": "1",
                "originLocationCode": fromCity,
                "destinationLocationCode": toCity,
                "departureDateTimeRange": {
                    "date": startDate
                }
            }
        ],
        "travelers": [
            {
                "id": "1",
                "travelerType": "ADULT"
            }
        ],
        "sources": [
            "GDS"
        ],
        "searchCriteria": {
            "maxFlightOffers": 9,
            "flightFilters": {
                "cabinRestrictions": [
                    {
                        "cabin": "ECONOMY",
                        "coverage": "MOST_SEGMENTS",
                        "originDestinationIds": [
                            "1"
                        ]
                    }
                ]
            }
        }
    }
    return body
}

function getInput() {
    inputArrays.push($('#fromCity option:selected').text())
    inputArrays.push($('#toCity option:selected').text())
    inputArrays.push($('#startDate').val())
    inputArrays.push($('#endDate').val())
    inputArrays.push($('#adult-select option:selected').text())
    inputArrays.push($('#child-select option:selected').text())
}

function searchFlight(data) {
    try {
        getInput()
        var body = getBodySearchFlight($('#fromCity').val(), $('#toCity').val(), formatDate($('#startDate').val()))
        console.log('body= ', body)
        $.ajax({
            url: BASE_SEARCH_URL,
            type: "POST",
            headers: {
                'Authorization': 'Bearer ' + data
            },
            data: JSON.stringify(body),
            contentType: 'application/json',
            success:
                function (data) {
                    console.log(data);
                    localStorage.setItem('detailAirport', JSON.stringify(mappingAirport($('#fromCity').val(), $('#toCity').val())));
                    localStorage.setItem('detailData', JSON.stringify(data.data));
                    localStorage.setItem('inputArrays', JSON.stringify(inputArrays));
                    const url = 'search-flights.html?'; // Add data to URL
                    window.location = url; // Navigate to second page
                    // window.location.href = 'search-flights.html';
                },
            error:
                function () {
                    handleErrors()
                    console.error('Error fetching data from API');
                }
        });
    } catch (error) {
        console.log(error)
    }
}