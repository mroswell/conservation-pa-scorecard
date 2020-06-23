let SHEET_ID = "17yxvdTk33zFh92z7CE4I2FBkKyLI4F-ePu3P0g1G4Ns";
let PAboundaryLayer;
let PADistricts = {};
let app = {};
let freeze = 0;
let $sidebar = $("#sidebar");
let clickedMemberNumber;

let vote_context =  {"priority_votes": []};

let map = L.map("map", {
    scrollWheelZoom: false,
    zoomSnap: 0.25,
    minZoom: 6
}).setView([40.09, -77.6728], 7);


// 1. Enable the Google Sheets API and check the quota for your project at
//    https://console.developers.google.com/apis/api/sheets
// 2. Get an API key. See
//    https://console.developers.google.com/apis/

let API_KEY = 'AIzaSyDKNPLWdP2gCYRyfTI4mvw20rVGx8QTHxE';

function fetchSheet({ spreadsheetId, sheetName, apiKey, complete }) {
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
    return fetch(url).then(response =>
        response.json().then(result => {
            let data = Papa.parse(Papa.unparse(result.values), { header: true });
            complete(data);
        })
    );
}

function init() {
    fetchSheet({
        spreadsheetId: SHEET_ID,
        sheetName: 'PA Senate',
        apiKey: API_KEY,
        complete: showInfo
    });

    fetchSheet({
        spreadsheetId: SHEET_ID,
        sheetName: 'Senate Bill Descriptions',
        apiKey: API_KEY,
        complete: function(results) {
            var bills = results.data;
            console.log(bills);
            console.log(vote_context.priority_votes);

            $.each(bills, function(i, bill) {
                if (bill['include']==='Yes') {
                    console.log("YES!");
                    vote_context.priority_votes.push(bill)
                }
            });
            console.log("vote_context", vote_context);
            let key_votes = $("#senate-template-bottom").html();
            app.template = Handlebars.compile(key_votes);
            // let html = app.template(vote_context);
            let html = app.template(vote_context);
            $("#priorityVotes").append(html);

        }
    });
}
window.addEventListener("DOMContentLoaded", init);

function showInfo(results) {
    let data = results.data;
    let scoreColor;
    let lifetimeScoreColor;

    $.each(data, function(i, member) {
        scoreColor = getColor(parseInt(member.Score));
        member['scoreColor'] = scoreColor;
        lifetimeScoreColor = getColor(parseInt(member["Lifetime Score"]));
        member['lifetimeScoreColor'] = lifetimeScoreColor;
        if (member.District) {
            PADistricts[member.District] = member;
       }
    });

    loadGeo();

function loadGeo() {
    let tileLayer = L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
            maxZoom: 18,
            minZoom: 7,
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox.light"
        }
    );
    tileLayer.addTo(map);

    PAboundaryLayer = L.geoJson(pa_state_senate_boundary_map, {
        onEachFeature: onEachFeature,
        style: data => geoStyle(data)
    }).addTo(map);
}
}

let geoStyle = function(data) {
    let legisId = data.properties.NAME;
    let scoreColor = getColor(parseInt(PADistricts[legisId].Score));

    return {
        fillColor: scoreColor,
        weight: 1,
        opacity: 0.9,
        color: "#fefefe",
        dashArray: "0",
        fillOpacity: 0.7
    };
};

$(document).ready(function() {
    let sourcebox = $("#senate-template-infobox").html();
    app.infoboxTemplate = Handlebars.compile(sourcebox);

    let map_help = $("#welcome-map-help").html();
    app.welcome = Handlebars.compile(map_help);
    $sidebar.append(app.welcome);
});

// get color depending on score value
function getColor(score) {
    return score === "Medical leave" ? '#fefefe' :
        score > 99 ? '#409B06' :
        // score > 99 ? '#4EAB07' :
        // score > 99 ? '#4EAB07' :
            // score > 74 ? '#82e0c3' :
            score > 74 ? '#A8CA02' :
            // score > 74 ? '#BED802' :
            // score > 74 ? '#BED802' :
                score > 49 ? '#FEF200' :
                    score > 24 ? '#FDC300' :
                        score > 0 ? '#FC8400' :
                            '#F00604';
                            // '#EE0705';
                            //'#DE0F0A';
}

function highlightFeature(e) {
    let layer = e.target;
    let legisId = parseInt(layer.feature.properties.NAME);
    let memberDetail = PADistricts[legisId];

    layer.setStyle({
        weight: 3,
        color: "#8e8e8e",
        dashArray: "",
        fillOpacity: .4
    });
    if (!freeze) {
        let html = app.infoboxTemplate(memberDetail);
        $sidebar.html(html);
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }
}

function resetHighlight(e) {
    let layer = e.target
    PAboundaryLayer.resetStyle(layer);
    // let districtNumber = PADistricts.feature.properties.legis_id;
}

function mapMemberDetailClick(e) {
    freeze = 1;
    let boundary = e.target;
    let legisId = parseInt(boundary.feature.properties.NAME);
    let member = memberDetailFunction(legisId);
}

function memberDetailFunction(legisId) {
    clickedMemberNumber = legisId;
    let districtDetail = PADistricts[legisId];

    let html = app.infoboxTemplate(districtDetail);
    $sidebar.html(html);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: mapMemberDetailClick
    });
}

map.attributionControl.addAttribution(
    'District Boundaries &copy; <a href="http://census.gov/">US Census Bureau</a>'
);

function clearInfobox() {
    $sidebar.html(" ");
    $sidebar.append(app.welcome);
    let $heading = $(".entry-default-text h4");
    $heading.html("Map Help");
}

$(document).on("click", ".close", function(event) {
    event.preventDefault();
    clearInfobox();
    freeze = 0;
});

// Enable Escape key to close popup
$(document).on('keydown',function(evt) {
    evt = evt || window.evt;
    let isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        console.log ('escape room');
        evt.preventDefault();
        clearInfobox();
        freeze = 0;
    }
});

document.getElementById("buttonState").addEventListener("click", function () {
    map.flyTo([40.09, -77.6728], 7, {
        animate: true,
        duration: 1 // in seconds
    });
});

document.getElementById("buttonPittsburgh").addEventListener("click", function () {
    map.flyTo([40.43, -79.98], 10, {
        animate: true,
        duration: 1.4 // in seconds
    });
});

document.getElementById("buttonPhiladelphia").addEventListener("click", function () {
    map.flyTo([40, -75.2], 10, {
        animate: true,
        duration: 1.4 // in seconds
    });
});
document.getElementById("buttonAllentown").addEventListener("click", function () {
    map.flyTo([41, -75.5], 9, {
        animate: true,
        duration: 1.4 // in seconds
    });
});
