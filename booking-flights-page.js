var inputArrays = JSON.parse(localStorage.getItem('inputArrays'));
const data = JSON.parse(localStorage.getItem('detailData')); // Get data from local storage
const index = localStorage.getItem('obj');
const objPrice = data[index].price.grandTotal;
console.log("Input Arrays: " + inputArrays);
// #passengerInfo
var adtQty = 0;
var chdQty = 0;
var from = '';
var to = '';
var dateFrom = '';
var dateTo = '';
if(inputArrays != null){
    adtQty = inputArrays[4];
    chdQty = inputArrays[5];
    from = inputArrays[0];
    to = inputArrays[1];
    dateFrom = inputArrays[2];
    dateTo = inputArrays[3];
    console.log("ADT: " + adtQty + " CHD: " + chdQty)
    $(".hch2").text(from + " to " + to + " on " + dateFrom);
    $(".flight-from").text(from);
    $(".flight-to").text(to);
    $(".date-from").text(dateFrom);
    if("Dd/Mm/Yy" == dateTo){
        $("#date-to").text("N/A");
    } else {
        $("#date-to").text(dateTo);
    }
    $(".adt-price").text("$" + objPrice + " / adult");
    if(chdQty > 0){
        $(".chd-price").removeClass("hidden");
        $("#chd-price").text("$" + parseFloat(objPrice)*0.85 + " / child");
    }
    var grandPrice = parseFloat(objPrice) * (parseFloat(adtQty) + parseFloat(chdQty)*0.85);
    $(".grand-price").text("$" + grandPrice);
}
if(adtQty > 0){
    for(i = 1; i <= adtQty; i++){
        $("#passengerInfo").append(""
            +                "<div><p>Adult " + i + "</p></div>"
            +                "<div class=\"input2_wrapper\">"
            +                    "<label class=\"col-md-5\" style=\"padding-left:0;padding-top:12px;\">First Name</label>"
            +                     "<div class=\"col-md-7\" style=\"padding-right:0;padding-left:0;\">"
            +                       "<input type=\"text\" class=\"form-control adt-firstname-" + i + "\" value=\"\" spellcheck=\"false\">"
            +                    "</div>"
            +                "</div>"
            +                "<div class=\"clearfix\"></div>"
            +                "<div class=\"input2_wrapper\">"
            +                    "<label class=\"col-md-5\" style=\"padding-left:0;padding-top:12px;\">Last Name</label>"
            +                     "<div class=\"col-md-7\" style=\"padding-right:0;padding-left:0;\">"
            +                       "<input type=\"text\" class=\"form-control adt-lastname-" + i + "\" value=\"\" spellcheck=\"false\">"
            +                    "</div>"
            +                "</div>"
            +                "<div class=\"clearfix\"></div>"
            +                "<div class=\"input1_wrapper\">"
            +                "<label class=\"col-md-5\" style=\"padding-left:0;padding-top:12px;\">Date of birth</label>"
            +                "<div class=\"col-md-7\" style=\"padding-right:0;padding-left:0;\">"
            +                    "<input id=\"dob_adt_" + i + "\" type=\"text\" class=\"input datepicker form-control adt-dob-" + i + "\" value=\"\">"
            +                "</div>"
            +                "</div>"
            +                "<div class=\"clearfix\"></div>"
            +                "<div class=\"margin-top\"></div>"
        );
    }
}

if(chdQty > 0){
    for(i = 1; i <= chdQty; i++){
        $("#passengerInfo").append(""
            +                "<div><p>Child " + i + "</p></div>"
            +                "<div class=\"input2_wrapper\">"
            +                    "<label class=\"col-md-5\" style=\"padding-left:0;padding-top:12px;\">First Name</label>"
            +                     "<div class=\"col-md-7\" style=\"padding-right:0;padding-left:0;\">"
            +                       "<input type=\"text\" class=\"form-control chd-firstname-" + i + "\" value=\"\" spellcheck=\"false\">"
            +                    "</div>"
            +                "</div>"
            +                "<div class=\"clearfix\"></div>"
            +                "<div class=\"input2_wrapper\">"
            +                    "<label class=\"col-md-5\" style=\"padding-left:0;padding-top:12px;\">Last Name</label>"
            +                     "<div class=\"col-md-7\" style=\"padding-right:0;padding-left:0;\">"
            +                       "<input type=\"text\" class=\"form-control chd-lastname-" + i + "\" value=\"\" spellcheck=\"false\">"
            +                    "</div>"
            +                "</div>"
            +                "<div class=\"clearfix\"></div>"
            +                "<div class=\"input1_wrapper\">"
            +                "<label class=\"col-md-5\" style=\"padding-left:0;padding-top:12px;\">Date of birth</label>"
            +                "<div class=\"col-md-7\" style=\"padding-right:0;padding-left:0;\">"
            +                    "<input id=\"dob_chd_" + i + "\" type=\"text\" class=\"input datepicker form-control chd-dob-" + i + "\" value=\"\">"
            +                "</div>"
            +                "</div>"
            +                "<div class=\"clearfix\"></div>"
            +                "<div class=\"margin-top\"></div>"
        );
    }
}

function bookNowCheck() {
    // href="booking-success.html"
    if (!$('#checkbox').is(":checked"))
    {
        alert("Please agree to the booking conditions");
        $('#checkbox').focus();
        return;
    } 

    if($(".contact-fullname").val().length < 2 || !validateName($(".contact-fullname").val())){
        alert("Please check Contact Person");
        $(".contact-fullname").focus();
        return;
    }

    if(!validateEmail($(".contact-email").val())){
        alert("Please check the email");
        $(".contact-email").focus();
        return;
    };

    if($(".contact-phone").val().length < 9 || $(".contact-phone").val().length > 11){
        alert("Please check Contact Phone");
        $(".contact-phone").focus();
        return;
    }

    if(validPassenger()){
        const url = 'booking-success.html?'; // Add data to URL
        $('.loader').show();
        $('#main').addClass('inactive');
        setTimeout(() => {
        window.location = url; // Navigate to next page
        }, 3000);    
    };
}

function validPhone(){
    var phoneNumber = $(".contact-phone").val() + "";
    var phone = phoneNumber.replace(/\D/g, '');
    $(".contact-phone").val(phone);
    //$(".contact-phone").val(phoneNumber.replace( /\[\d\]/g, ''));
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateName(name) {
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(name);
}

function validPassenger(){
    var result = true;
    for(i = 1; i <= adtQty; i++){
        var classArr = [".adt-firstname-" + i, ".adt-lastname-" + i, ".adt-dob-" + i];

        if($(classArr[0]).val().length < 2 || !validateName($(classArr[0]).val())){
            alert("Please check again: Adult " + i  + " First Name");
            $(classArr[0]).focus();
            result =  false;
            break;
        }

        if($(classArr[1]).val().length < 2 || !validateName($(classArr[1]).val())){
            alert("Please check again: Adult " + i  + " Last Name");
            $(classArr[1]).focus();
            result =  false;
            break;
        }

        if($(classArr[2]).val() == ""){
            alert("Please check again: Adult " + i  + " Date of birth");
            $(classArr[2]).focus();
            result =  false;
            break;
        }
    }
    //If passed check with Adult, continue to check for children
    if(result){
        for(i = 1; i <= chdQty; i++){
            var classArr = [".chd-firstname-" + i, ".chd-lastname-" + i, ".chd-dob-" + i];
    
            if($(classArr[0]).val().length < 2 || !validateName($(classArr[0]).val())){
                alert("Please check again: Child " + i  + " First Name");
                $(classArr[0]).focus();
                result =  false;
                break;
            }
    
            if($(classArr[1]).val().length < 2 || !validateName($(classArr[1]).val())){
                alert("Please check again: Child " + i  + " Last Name");
                $(classArr[1]).focus();
                result =  false;
                break;
            }
    
            if($(classArr[2]).val() == ""){
                alert("Please check again: Child " + i  + " Date of birth");
                $(classArr[2]).focus();
                result =  false;
                break;
            }
        }
    }
    return result;
}