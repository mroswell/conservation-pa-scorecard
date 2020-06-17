//let public_spreadsheet_url = "1q2r9zczACPL6XArWEAVBbSgEUd9u8v3upp6-1L84_OI";
let public_spreadsheet_id = "17yxvdTk33zFh92z7CE4I2FBkKyLI4F-ePu3P0g1G4Ns";
let boundaryLayer;
let PAboundaryLayer;
let PADistricts = {};
let app = {};
let freeze = 0;
let $sidebar = $("#sidebar");
let clickedMemberNumber;

let vote_context =  {
    "priority_votes": [
        {
            "billnumber": "S598",
            "billname": "Upholds Paris Climate Accord",
            "billdescription": "Requires New Jersey to join the U.S. Climate Alliance to uphold the Paris Climate Accord, lower greenhouse gas emissions, and address the threats posed by climate change in accordance with the goals established by the alliance. This action is in response to President withdrawal from the Paris Accord.",
            "outcome": "Passed by the Senate (26-12), Passed by the Assembly (49-23), Signed by the Governor P.L. 2018, c. 3",
            "stance": "Support"
        },
    ]
};

let map = L.map("map", {
    scrollWheelZoom: false,
    zoomSnap: 0.25,
    minZoom: 6
}).setView([40.09, -77.6728], 7);

// var map = L.map('map', {scrollWheelZoom: true}).setView([45.3, -69],7);


function init() {
    Tabletop.init({
        key: public_spreadsheet_id,
        callback: showInfo,
        // simpleSheet: true,
        parseNumbers: true
    });
}

let geoStyle = function(data) {
    // let legisId = data.properties.legis_id;
    let legisId = parseInt(data.properties.NAME);
    console.log(typeof(legisId));
    console.log("legisId", legisId);
    console.log("PADistricts", PADistricts);
    console.log("Districts", PADistricts[legisId]);
    console.log(PADistricts.keys);
    for (key in PADistricts) {
        console.log(typeof key);
    }
    console.log(typeof(PADistricts[legisId]));
    //let scoreNum= parseInt(PADistricts[legisId].Score);
   // console.log("scoreNum",scoreNum);
    //let scoreColor = getColor(parseInt(PADistricts[legisId].Score));
    let scoreColor = "#ffc589";

    return {
        fillColor: scoreColor,
        weight: 2,
        opacity: 0.9,
        color: "#fefefe",
        dashArray: "0",
        fillOpacity: 0.7
    };
};

window.addEventListener("DOMContentLoaded", init);

$(document).ready(function() {
    let key_votes = $("#senate-template-bottom").html();
    app.template = Handlebars.compile(key_votes);

    let sourcebox = $("#senate-template-infobox").html();
    app.infoboxTemplate = Handlebars.compile(sourcebox);

    let map_help = $("#welcome-map-help").html();
    app.welcome = Handlebars.compile(map_help);
    $sidebar.append(app.welcome);

    let html = app.template(vote_context);
    $("#priorityVotes").append(html);


});
function showInfo(sheet_data, tabletop) {
    let scoreColor;
    let lifetimeScoreColor;
    $.each(tabletop.sheets("PA Senate").all(), function(i, member) {
        console.log("member", member);
        scoreColor = getColor(parseInt(member.Score));
        member['scoreColor'] = scoreColor;
        console.log('scoreColor', scoreColor);
        lifetimeScoreColor = getColor(parseInt(member.LifetimeScore));
        member['lifetimeScoreColor'] = lifetimeScoreColor;
        if (member.District) {
            PADistricts[member.District] = member;
            console.log("yahoo!", PADistricts[member.District]);
       }
    });
    loadGeo();
}

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
    //
    // boundaryLayer = L.geoJson(nj_legislative_boundary_map, {
    //     onEachFeature: onEachFeature,
    //     style: data => geoStyle(data)
    // }).addTo(map);
}
let myStyle = {
    "fillColor": "#ffffff",
    "color": "#ff7800",
    "weight": 2,
    "opacity": 0.65
};
   PAboundaryLayer = L.geoJson(pa_state_senate_boundary_map, {
       onEachFeature: onEachFeature,
       style: data => geoStyle(data)
   }).addTo(map);

function getColor(score) {
    return score === "NIO" ? '#fefefe' :
        score > 80 ? '#82BC00' : //' '#4EAB07' :
            score > 60 ? '#82e0c3' :
                score > 40 ? '#FEF200' :
                    score > 20 ? '#FCA300' :
                        'rgb(255,0,0)';
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
    boundaryLayer.resetStyle(layer);
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

$(document).on("click", ".close", function(event) {
    event.preventDefault();
    clearInfobox();
    freeze = 0;
});

function clearInfobox() {
    $sidebar.html(" ");
    $sidebar.append(app.welcome);
    let $heading = $(".entry-default-text h4");
    $heading.html("Map Help");
}
