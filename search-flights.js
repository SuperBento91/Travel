const data = JSON.parse(localStorage.getItem('detailData')); // Get data from local storage
console.log('data= ', data);
const inputArrays = JSON.parse(localStorage.getItem('inputArrays'));
console.log(inputArrays)
//set data
function getInputFromIndex() {
    $('#flyingFrom-input').val(inputArrays[0])
    $('#flyingTo-input').val(inputArrays[1])
    $('#departing-input').val(inputArrays[2])
    $('#returning-input').val(inputArrays[3])
    $('#adults-input').val(inputArrays[4])
    $('#children-input').val(inputArrays[5])
}
getInputFromIndex()

//loop via data list to generate the display
let i = 0;
if(data.length > 0 && data.length > i){
    $("#start_body").append("<div class=\"row\">");
    do {
        if(i % 3 == 0){
            console.log(data[i].itineraries[0].segments[0].carrierCode)
            $("#start_body").append(""
                        +    "<div class=\"col-sm-4\">"
                        +        "<div class=\"thumb4\">"
                        +            "<div class=\"thumbnail clearfix\">"
                        +                "<figure>"
                        +                   "<img style=\"width:262px;height:171px\" onerror=\"this.src='images/7C.svg'\" src=\"images/" + data[i].itineraries[0].segments[0].carrierCode + ".svg"+"\" alt=\"SVG\" class=\"img-responsive\">"
                        +                "</figure>"
                        +                "<div class=\"caption\">"
                        +                    "<div class=\"txt1\">" + inputArrays[0] + " - " + inputArrays[1] + "</div>"
                        +                    "<div class=\"txt3 clearfix\">"
                        +                        "<div class=\"left_side\">"
                        +                            "<div class=\"price\">$" + data[i].price.grandTotal + "</div>"
                        +                            "<div class=\"nums\">avg/person</div>"
                        +                        "</div>"
                        +                        "<div class=\"right_side\"><a href=\"booking-flights.html?id=" + i + "\""
                        +                                                "class=\"btn-default btn1\">Details</a>"
                        +                        "</div>"
                        +                    "</div>"
                        +                "</div>"
                        +            "</div>"
                        +        "</div>"
                        +    "</div>"
                + "</div>"
                // + "<div class=\"hl1\"></div>"
            )
        } else if (i % 3 == 2) {
            $("#start_body").append(""
                        +    "<div class=\"col-sm-4\">"
                        +        "<div class=\"thumb4\">"
                        +            "<div class=\"thumbnail clearfix\">"
                        +                "<figure>"
                        +                   "<img style=\"width:262px;height:171px\" onerror=\"this.src='images/7C.svg'\" src=\"images/" + data[i].itineraries[0].segments[0].carrierCode + ".svg"+"\" alt=\"SVG\" class=\"img-responsive\">"
                        +                "</figure>"
                        +                "<div class=\"caption\">"
                        +                    "<div class=\"txt1\">" + inputArrays[0] + " - " + inputArrays[1] + "</div>"
                        +                    "<div class=\"txt3 clearfix\">"
                        +                        "<div class=\"left_side\">"
                        +                            "<div class=\"price\">$" + data[i].price.grandTotal + "</div>"
                        +                            "<div class=\"nums\">avg/person</div>"
                        +                        "</div>"
                        +                        "<div class=\"right_side\"><a href=\"booking-flights.html?id=" + i + "\""
                        +                                                "class=\"btn-default btn1\">Details</a>"
                        +                        "</div>"
                        +                    "</div>"
                        +                "</div>"
                        +            "</div>"
                        +        "</div>"
                        +    "</div>"
                + "</div>"
                + "<div class=\"hl1\"></div>"
                + "<div class=\"row\">"
            )
        } else {
            console.log(data[i].itineraries[0].segments[0].carrierCode)
            $("#start_body").append(""
                        +    "<div class=\"col-sm-4\">"
                        +        "<div class=\"thumb4\">"
                        +            "<div class=\"thumbnail clearfix\">"
                        +                "<figure>"
                        +                   "<img style=\"width:262px;height:171px\" onerror=\"this.src='images/7C.svg'\" src=\"images/" + data[i].itineraries[0].segments[0].carrierCode + ".svg"+"\" alt=\"SVG\" class=\"img-responsive\">"
                        +                "</figure>"
                        +                "<div class=\"caption\">"
                        +                    "<div class=\"txt1\">" + inputArrays[0] + " - " + inputArrays[1] + "</div>"
                        +                    "<div class=\"txt3 clearfix\">"
                        +                        "<div class=\"left_side\">"
                        +                            "<div class=\"price\">$" + data[i].price.grandTotal + "</div>"
                        +                            "<div class=\"nums\">avg/person</div>"
                        +                        "</div>"
                        +                        "<div class=\"right_side\"><a href=\"booking-flights.html?id=" + i + "\""
                        +                                                "class=\"btn-default btn1\">Details</a>"
                        +                        "</div>"
                        +                    "</div>"
                        +                "</div>"
                        +            "</div>"
                        +        "</div>"
                        +    "</div>"
                + "</div>")
        }
        i++;
    } while (i < data.length)
} else {
    alert('There is no result for your search, please try again')
}