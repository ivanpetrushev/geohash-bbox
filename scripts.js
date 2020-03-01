let debounceTimeoutMs = 500;
let desiredPrecision = 5;

$(document).ready(function () {
    var map = L.map('mapid');
    var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18,
        minZoom: 14
    }).addTo(map);

    map.on('load', debouncedFetchBb);
    map.on('zoom', debouncedFetchBb);
    map.on('move', debouncedFetchBb);
    map.setView([42.1466924, 24.7474795], 16);
});

let debounceTimer = null;

function debouncedFetchBb(event) {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(function () {
        realFetchBb(event);
    }, debounceTimeoutMs)
}

function realFetchBb(event) {
    let bb = event.target.getBounds();
    let llNW = bb.getNorthWest();
    let llNE = bb.getNorthEast();
    let llSW = bb.getSouthWest();
    let llSE = bb.getSouthEast();

    let hashPrecision = desiredPrecision + 1;
    let hashNW = encode(llNW.lat, llNW.lng, hashPrecision);
    let hashNE = encode(llNE.lat, llNE.lng, hashPrecision);
    let hashSW = encode(llSW.lat, llSW.lng, hashPrecision);
    let hashSE = encode(llSE.lat, llSE.lng, hashPrecision);
    console.log('hashes', hashNW, hashNE, hashSW, hashSE)

    let hashBoxes = bboxes(bb.getSouth(), bb.getWest(), bb.getNorth(), bb.getEast(), desiredPrecision);
    console.log('boxes', hashBoxes)
}

function getPrefix(array) {
    var A = array.concat().sort(),
        a1 = A[0], a2 = A[A.length - 1], L = a1.length, i = 0;
    while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
    return a1.substring(0, i);
}

function requestData(hash) {
    // TODO: to be implemented
    console.log('requesting data for', hash)
}