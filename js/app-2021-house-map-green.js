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
            "bill_number": "HB 1144",
            "stance": "NO",
            "bill_subtitle": "Conventional Oil and Gas Act",
            "status": "Passed in the House (113-88), Awaiting action in the Senate",
            "bill_date": "2021-05-25",
            "movement": "Final Passage",
            "bill_description": "Drastically weakens existing regulations for the conventional oil and gas industry, threatening water quality and public health."
        },
        {
            "bill_number": "HB 72",
            "stance": "NO",
            "bill_subtitle": "Reins Act",
            "status": "Passed in the House (108-93), Awaiting action in the Senate",
            "bill_date": "2021-05-04",
            "movement": "Final Passage",
            "bill_description": "Allows the General Assembly to halt the regulatory process and limit protections for the environment and human health by doing nothing. If they fail to pass a concurrent resolution approving a regulation, the regulation dies."
        },
        {
            "bill_number": "HB 139",
            "stance": "NO",
            "bill_subtitle": "Reform Permit Transparency",
            "status": "Passed in the House (113-88), Awaiting action in the Senate",
            "bill_date": "2021-05-04",
            "movement": "Final Passage",
            "bill_description": "Forces agencies to allow third parties to review permits without clear oversight or regard for conflicts of interest. This would lead to increased and costly delays in the permitting process, thus keeping agencies like the Department of Environmental Protection from their duty of protecting our communities."
        },
        {
            "bill_number": "HB 288",
            "stance": "NO",
            "bill_subtitle": "Regulatory Compliance Advisor",
            "status": "Passed in the House (106-95), Awaiting action in the Senate",
            "bill_date": "2021-05-04",
            "movement": "Final Passage",
            "bill_description": "Creates a “regulatory compliance officer” to arbitrarily establish policies for waiving fines or penalties for industry violations. Prevents enforcement of environmental regulations and shields polluters from being held accountable."
        },
        {
            "bill_number": "HB 950",
            "stance": "NO",
            "bill_subtitle": "Upending the Regulatory Review Act",
            "status": "Passed in the House",
            "bill_date": "2021-05-04",
            "movement": "Final Passage",
            "bill_description": "Disrupts and politicizes the regulatory process that protects environmental and public health by allowing the General Assembly to disapprove existing regulations via concurrent resolution."
        },
        {
            "bill_number": "HB 939",
            "stance": "NO",
            "bill_subtitle": "Independent Office of the Repealer",
            "status": "Passed in the House (111-90), Awaiting action in the Senate",
            "bill_date": "2021-05-24",
            "movement": "Final Passage",
            "bill_description": "Requires agencies to repeal two existing regulations any time a new regulation is approved. It also establishes a redundant ‘Independent’ Office of the Repealer that is actually governed by a politically appointed committee."
        },
        {
            "bill_number": "HB 754",
            "stance": "NO",
            "bill_subtitle": "Bottled Water Inspection",
            "status": "Passed in the House (120-81), Awaiting action in the Senate",
            "bill_date": "2021-04-06",
            "movement": "Final Passage",
            "bill_description": "Amends the PA Safe Drinking Water Act to remove bottled water from being categorized as public drinking water systems, which would mean that water bottling companies would be exempt from the higher quality standards created by the Department of Environmental Protection to fill in gaps left by the FDA’s standard rules."
        },
        {
            "bill_number": "HB 755",
            "stance": "NO",
            "bill_subtitle": "Bottled Water Inspection",
            "status": "Passed in the House (120-81), Awaiting action in the Senate",
            "bill_date": "2021-04-06",
            "movement": "Final Passage",
            "bill_description": "Amends the Agriculture Code to move all oversight of the water bottling process under the jurisdiction of the Department of Agriculture, which would impose lower water quality standards than the Pennsylvania Department of Environmental Protection currently uses."
        },
        {
            "bill_number": "HB 1842",
            "stance": "NO",
            "bill_subtitle": "Clean Streams Legislation (Give polluters discretion over reporting spills)",
            "status": "Passed in the House (108-95), Awaiting action in the Senate",
            "bill_date": "2021-12-14T05:00:00.000Z",
            "movement": "Final Passage",
            "bill_description": "Weakens the Clean Streams Law by allowing polluters to decide which spills into our waterways should be reported to the Department of Environmental Protection. This means that some spills could go unreported if the polluter responsible deems them negligible."
        },
        {
            "bill_number": "HB 1947",
            "stance": "NO",
            "bill_subtitle": "Energy Choice (Ban on banning gas in municipal buildings)",
            "status": "Passed in the House, Awaiting action in the Senate",
            "bill_date": "2022-01-26T05:00:00.000Z",
            "movement": "Final Passage",
            "bill_description": "Takes away communities' ability to incentivize the use of renewable energy or limit fossil fuel use in residential and commercial buildings."
        },
        {
            "bill_number": "HB 604",
            "stance": "NO",
            "bill_subtitle": "DEP Permit Decision Making",
            "status": "Passed in the House (115-85), Awaiting action in the Senate",
            "bill_date": "2021-04-11",
            "movement": "Final Passage",
            "bill_description": "Establishes an arbitrary 45 day limit for the Department of Environmental Protection to respond to a permit application. If they fail to respond, the application is automatically approved regardless of whether or not the project could be harmful to the environment."
        },
        {
            "bill_number": "HB 637",
            "stance": "NO",
            "bill_subtitle": "Prevents Pennsylvania From Addressing Climate Change",
            "status": "Passed in the House (126-72), Awaiting action in the Senate",
            "bill_date": "2022-03-30",
            "movement": "Final Passage",
            "bill_description": "Halts climate action by requiring legislative approval for Pennsylvania to regulate carbon pollution or join the multi-state Regional Greenhouse Gas Initiative (RGGI)."
        },
        {
            "bill_number": "HB 2450",
            "stance": "NO",
            "bill_subtitle": "Delaware River Basin Commission Voting Reform",
            "status": "Passed in the House (116-84), Awaiting action in the Senate",
            "bill_date": "2022-04-11",
            "movement": "Final Passage",
            "bill_description": "Changes the current one vote per state on the Delaware River Basin Commission to base the number of votes on the land area each state has within the watershed in an attempt to secure enough votes to override the ban on fracking within the watershed."
        },
        {
            "bill_number": "HB 2451",
            "stance": "NO",
            "bill_subtitle": "Fracking in the Delaware River Basin",
            "status": "Passed in the House (110-90), Awaiting action in the Senate",
            "bill_date": "2022-04-11",
            "movement": "Final Passage",
            "bill_description": "Amends the Pennsylvania version of the Delaware River Basin Compact to overturn the ban on fracking within the watershed, which would threaten the health of the environment and communities along the Delaware River Basin."
        },
        {
            "bill_number": "HB 2461",
            "stance": "NO",
            "bill_subtitle": "Drilling in State Parks and Forests",
            "status": "Passed in the House (116-84), Awaiting action in the Senate",
            "bill_date": "2022-04-11",
            "movement": "Final Passage",
            "bill_description": "Allows more state parks and state forests to be leased for gas development even though 65% of existing gas leases in state forests have not been developed, in order to blame the Governor's moratorium on new leases for lack of energy independence on the US rather than our reliance on fossil fuels."
        },
        {
            "bill_number": "SB 106",
            "stance": "NO",
            "bill_subtitle": "Constitutional Amendments (Election Audits, Voter ID, Restricting power of the executive branch)",
            "status": "Passed into Pamphlet  Laws Resolution 1",
            "bill_date": "2022-07-11",
            "movement": "Final Passage",
            "bill_description": "Creates restrictive voter ID requirements, disrupts the balance of power between the branches of government by allowing the legislative branch to circumvent the executive branch and veto regulations, and limits the length of executive orders from the Governor."
        },
        {
            "bill_number": "HB 2644",
            "stance": "NO",
            "bill_subtitle": "Conventional Oil and Gas Well Plugging (Placing the financial burden of well plugging on the taxpayer)",
            "status": "Became law without Governor's signature",
            "bill_date": "2022-07-19",
            "movement": "Passed as Law",
            "bill_description": "Leaves taxpayers on the hook for billions of dollars needed to plug abandoned wells and ensures more wells are abandoned by locking in woefully inadequate bond amounts."
        },
        {
            "bill_number": "SB 275",
            "stance": "NO",
            "bill_subtitle": "Energy Choice (Ban on banning gas in municipal buildings)",
            "status": "Vetoed by the Governor",
            "bill_date": "2022-07-11",
            "movement": "Final Passage",
            "bill_description": "Takes away communities' ability to incentivize the use of renewable energy or limit fossil fuel use in residential and commercial buildings."
        },
        {
            "bill_number": "SCRRR1",
            "stance": "NO",
            "bill_subtitle": "Regional Greenhouse Gas Initiative Senate Disapproval Resolution",
            "status": "Vetoed by the Governor",
            "bill_date": "2022-01-10T05:00:00.000Z",
            "movement": "Final Passage",
            "bill_description": "A Senate resolution to override the Governor’s action to combat climate change and prevent Pennsylvania’s ability to join the Regional Greenhouse Gas Initiative."
        }
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
    const response = await fetch("/data/house_member_votes_21-22.json");
    const json = await response.json();
    return json;
}

async function init() {
    const result = await fetchMemberData();
    showInfo(result);
            let key_votes = $("#senate-template-bottom").html();
            app.template = Handlebars.compile(key_votes);
            let html = app.template(vote_context);
            $("#priorityVotes").append(html);
}

window.addEventListener("DOMContentLoaded", init);

function showInfo(results) {
    let data = results.data;
    let scoreColor;
    let lifetimeScoreColor;

    $.each(data, function(i, member) {
        scoreColor = getColor(parseInt(member.Score));
        member['scoreColor'] = scoreColor;
        lifetimeScoreColor = getColor(parseInt(member["Life"]));
        member['lifetimeScoreColor'] = lifetimeScoreColor;
        if (member.District) {
            PADistricts[member.District] = member;
        }
    });

    loadGeo();

    function loadGeo() {

           let tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
            {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/light-v10',
            accessToken: 'pk.eyJ1IjoibXJvc3dlbGwiLCJhIjoiY2twZDN6eTB0MWJ4eDJxcGd5OG0yN2xtNCJ9.tUHOVBolz3YsZRQJOQRETg'
        }).addTo(map);


        PAboundaryLayer = L.geoJson(pa_state_house_boundary_map, {
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
    let scoreColor = getColor(parseInt(PADistricts[legisId].Score));

    return {
        fillColor: scoreColor,
        weight: 1,
        opacity: 0.9,
        color: "#fefefe",
        dashArray: "0",
        fillOpacity: 0.7,
        className: "HD-"+legisId //add class to path
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
            score > 74 ? '#A8CA02' :
                score > 49 ? '#FEF200' :
                    score > 24 ? '#FDC300' :
                        score > 0 ? '#FC8400' :
                            '#F00604';
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
    queryString.push('district', "HD-"+legisId);
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


