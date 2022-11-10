//jshint: esversion:6

exports.getDate = function (){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    //let currentDay = today.getDay(); 
    return today.toLocaleDateString('en-US', options)
}

exports.getDay = function (){
    let today = new Date();
    let options = {
        weekday: "long",
    }
    //let currentDay = today.getDay(); 
    return today.toLocaleDateString('en-US', options);
}