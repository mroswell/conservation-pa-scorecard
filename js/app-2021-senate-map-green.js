// let SHEET_ID = "17yxvdTk33zFh92z7CE4I2FBkKyLI4F-ePu3P0g1G4Ns";
let SHEET_ID = "17Y0YOQCicpd-PB91AYf4u0rsO5AFcAAl2jyEaFs3U2k";
let PAboundaryLayer;
let PADistricts = {};
let app = {};
let freeze = 0;
let $sidebar = $("#sidebar");
let clickedMemberNumber;

let vote_context =  {"priority_votes": [
    {
            "bill_number": "SB 533",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Regulatory Interference (State Agency/Regulatory Action During a Disaster Emergency)",
            "status": "Passed in the Senate (29-21), Awaiting action in the House",
            "bill_date": "2021-06-15",
            "movement": "Final Passage",
            "bill_description": "Halts regulatory processes during emergency declarations, preventing regulators from addressing pressing health and environmental needs."
        },
 {
            "bill_number": "SB 520",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Regulatory Interference (Legislative Approval of Economically Significant Regulations)",
            "status": "Passed in the Senate (27-21), Awaiting action in the House",
            "bill_date": "2021-05-26",
            "movement": "Final Passage",
            "bill_description": "Requires the General Assembly to pass a concurrent resolution to approve any final-form rulemaking deemed “economically significant.”"
        },
         {
            "bill_number": "SB 126",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Regulatory Interference (Automatic Three-Year Review of Economically Significant Regulations)",
            "status": "Passed in the Senate (27-21), Awaiting action in the House",
            "bill_date": "2021-05-26",
            "movement": "Final Passage",
            "bill_description": "Requires agencies to review “economically significant” regulations, giving greater consideration to the economic impact and concerns of the regulated community instead of how a regulation will improve our environment and health."
        },
        {
            "bill_number": "SB 28",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Regulatory Interference (Transparency in Permitting)",
            "status": "Passed in the Senate (28-20), Awaiting action in the House",
            "bill_date": "2021-05-26",
            "movement": "Final Passage",
            "bill_description": "Requires agencies to report permitting review performance to the General Assembly. Forces agencies to allow private companies to make permitting decisions without clear oversight."
        },
        {
            "bill_number": "SB 106",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Constitutional Amendments (Election Audits, Voter ID, Restricting power of the executive branch)",
            "status": "Passed into Pamphlet  Laws Resolution 1",
            "bill_date": "2022-07-11",
            "movement": "Final Passage",
            "bill_description": "Creates restrictive voter ID requirements, disrupts the balance of power between the branches of government by allowing the legislative branch to circumvent the executive branch and veto regulations, and limits the length of executive orders from the Governor."
        },
        {
            "bill_number": "SB 597",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Water Privatization",
            "status": "Passed in the Senate (27-33), Awaiting action in the House",
            "bill_date": "2022-06-07",
            "movement": "Final Passage",
            "bill_description": "Stifles the voices of ratepayers, especially those in low income communities and\ncommunities of color, by putting burdensome requirements on public water systems\nwith no financial support - leaving some public water systems open to privatization."
        },
        {
            "bill_number": "SB 275",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Energy Choice (Ban on banning gas in municipal buildings)",
            "status": "Passed in the Senate (35-15), Awaiting action in the House",
            "bill_date": "2021-10-27",
            "movement": "Final Passage",
            "bill_description": "Takes away communities' ability to incentivize the use of renewable energy or limit fossil fuel use in residential and commercial buildings."
        },
        {
            "bill_number": "SB 522",
            "match?": null,
            "include": null,
            "stance": "YES",
            "bill_subtitle": "Universal Lead Testing for Children",
            "status": "Passed in the Senate (49-0), Awaiting action in the House",
            "bill_date": "2022-06-13",
            "movement": "Final Passage",
            "bill_description": "Ensures testing for all children to more accurately identify childhood lead poisoning."
        },
        {
            "bill_number": "HB 2644",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Conventional Oil and Gas Well Plugging (Placing the financial burden of well plugging on the taxpayer)",
            "status": "Became law without Governor's signature",
            "bill_date": "2022-07-19",
            "movement": "Passed as Law",
            "bill_description": "Leaves taxpayers on the hook for billions of dollars needed to plug abandoned wells and ensures more wells are abandoned by locking in woefully inadequate bond amounts."
        },
        {
            "bill_number": "SCRRR1",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Regional Greenhouse Gas Initiative Senate Disapproval Resolution",
            "status": "Motion to overide the Governor's veto defeated (32-17)",
            "bill_date": "2022-04-04",
            "movement": "Vetoed by the Governor and Governor's veto protected",
            "bill_description": "A Senate resolution to override the Governor’s action to combat climate change and prevent Pennsylvania’s ability to join the Regional Greenhouse Gas Initiative."
        },
        {
            "bill_number": "SB 119",
            "match?": null,
            "include": null,
            "stance": "NO",
            "bill_subtitle": "Prevents Pennsylvania From Addressing Climate Change",
            "status": "Passed in the Senate (35-15), Awaiting action in the House",
            "bill_date": "2021-06-14",
            "movement": "Final Passage",
            "bill_description": "Halts climate action by requiring legislative approval for Pennsylvania to regulate carbon pollution or join RGGI."
        },
    ]
};

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

async function fetchMemberData() {
    const response = await fetch("/data/member_votes.json");
    const json = await response.json();
    return json;
}

async function init() {
    const result = await fetchMemberData();
    showInfo(result);
    // fetchSheet({
    //     spreadsheetId: SHEET_ID,
    //     sheetName: 'Senate Votes',
    //     apiKey: API_KEY,
    //     complete: showInfo
    // });

    // fetchSheet({
    //     spreadsheetId: SHEET_ID,
    //     sheetName: 'Senate Bill Descriptions',
    //     apiKey: API_KEY,
    //     complete: function(results) {
    //         var bills = results.data;
    //
    //         $.each(bills, function(i, bill) {
    //             if (bill['include']==='Yes') {
    //                 vote_context.priority_votes.push(bill)
    //             }
    //         });
            let key_votes = $("#senate-template-bottom").html();
            app.template = Handlebars.compile(key_votes);
            let html = app.template(vote_context);
            $("#priorityVotes").append(html);

    //
    //     }
    //
    // });
}
window.addEventListener("DOMContentLoaded", init);

function showInfo(results) {
    let data = results.data;
    let scoreColor;
    let lifetimeScoreColor;

    $.each(data, function(i, member) {
        scoreColor = getColor(parseInt(member.score_num));
        console.log(scoreColor);
        member['scoreColor'] = scoreColor;
        console.log("i", i+1)
        console.log("member",member);
        console.log("memberi",member[i+1])

        lifetimeScoreColor = getColor(parseInt(member.lifetime_score));
        console.log(lifetimeScoreColor)
        member['lifetimeScoreColor'] = lifetimeScoreColor;
        if (member.District) {
            PADistricts[member.District] = member;
       }
    });

    console.log("after",data);

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

    let district = getQueryVariable("district");
    if (district) {
        distsplit = district.split('-');
        distnum = distsplit[distsplit.length - 1];
        PAboundaryLayer.eachLayer(layer => {
            if (layer.feature.properties.NAME === distnum) {
                layer.fireEvent('click');
            }
        });
    }
}

let geoStyle = function(data) {
    let legisId = data.properties.NAME;
    console.log("legid",legisId)
    console.log(PADistricts)
    console.log(PADistricts[legisId])
    let scoreColor = getColor(parseInt(PADistricts[legisId].score_num));

    return {
        fillColor: scoreColor,
        weight: 1,
        opacity: 0.9,
        color: "#fefefe",
        dashArray: "0",
        fillOpacity: 0.7,
        className: "SD-"+legisId //add class to path
    };
};

function displayData(val) {
    return val;
}

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
    queryString.push('district', "SD-"+legisId);
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

    if (typeof isLocal != "undefined") {
        isLocal = getQueryVariable("_ijt");
        isLocalFullParam = "?_ijt="+ isLocal;
    } else {
        isLocalFullParam="";
    }
    window.history.pushState({}, document.title, window.location.pathname + isLocalFullParam );
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
        evt.preventDefault();
        clearInfobox();
        freeze = 0;
        if (typeof isLocal != "undefined") {
            isLocal = getQueryVariable("_ijt");
            isLocalFullParam = "?_ijt=" + isLocal;
        } else {
            isLocalFullParam = "";
        }
        window.history.pushState({}, document.title, window.location.pathname + isLocalFullParam);

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
    map.flyTo([40, -75.2], 9.75, {
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

/*!
 query-string
 Parse and stringify URL query strings
 https://github.com/sindresorhus/query-string
 by Sindre Sorhus
 MIT License
 */
(function () {
    'use strict';
    var queryString = {};

    queryString.parse = function (str) {
        if (typeof str !== 'string') {
            return {};
        }

        str = str.trim().replace(/^\?/, '');

        if (!str) {
            return {};
        }

        return str.trim().split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            var key = parts[0];
            var val = parts[1];

            key = decodeURIComponent(key);
            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});
    };

    queryString.stringify = function (obj) {
        return obj ? Object.keys(obj).map(function (key) {
            var val = obj[key];

            if (Array.isArray(val)) {
                return val.map(function (val2) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                }).join('&');
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }).join('&') : '';
    };

    queryString.push = function (key, new_value) {
        var params = queryString.parse(location.search);
        if(new_value == null){
            delete params[key];
        } else {
            params[key] = new_value;
        }
        var new_params_string = queryString.stringify(params);
        history.pushState({}, "", window.location.pathname + '?' + new_params_string);
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = queryString;
    } else {
        window.queryString = queryString;
    }
})();

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}


