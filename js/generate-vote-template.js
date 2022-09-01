let app = {};

async function fetchMemberData() {
    const response = await fetch("/data/house_bill_descriptions_21-22.json");
    const json = await response.json();
    return json;
}

async function init() {
    const priority_bills = await fetchMemberData();
    displayVotes(priority_bills);
}


window.addEventListener("DOMContentLoaded", init);

// $(document).ready(function() {
//
//     let key_votes = $("#generate-senate-template").html();
//
// });

function displayVotes(priority_bills) {
    console.log("PB",priority_bills);
    let key_votes = $("#generate-senate-template").html();
    console.log(key_votes)
    app.votesTemplate = Handlebars.compile(key_votes);
    console.log(app.votesTemplate)
    console.log(priority_bills)
    let bills_html = app.votesTemplate(priority_bills.data);
    console.log(bills_html)
    $("#priorityVotes").append(bills_html)
}



function clearInfobox() {
    $sidebar.html(" ");
    $sidebar.append(app.welcome);
    let $heading = $(".entry-default-text h4");
    $heading.html("Map Help");
}
//==========


// async function init() {
//     const result = await fetchMemberData();
//     let key_votes = $("#senate-template-bottom").html();
//     app.template = Handlebars.compile(key_votes);
//     let html = app.template(vote_context);
//     $("#priorityVotes").append(html);
// }

window.addEventListener("DOMContentLoaded", init);