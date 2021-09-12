const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;
var PF = require('pathfinding');

var admin = require("firebase-admin");

var serviceAccount = require("./retale-9fd28-firebase-adminsdk-9w0fq-535869787f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://retale-9fd28-default-rtdb.firebaseio.com"
});

var database = admin.database();
// var AStarFinder = require('./pathfinding');

express()
    .use(express.static(path.join(__dirname, "build")))
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .post("/createGrid", function () {

        var grid = Array.from(Array(20), () => new Array(20));

        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid.length; j++) {
                grid[i][j] = '0';
            }
        }

        for (var i = 6; i < 14; i++) {
            grid[i][5] = '1';
            grid[i][9] = '1';
            grid[i][13] = '1';
            grid[i][17] = '1';
        }

        var items_for_pickup = [[0, 0], [1, 3], [1, 10], [14, 8], [6, 5], [0, 19]];

        let array = Array(20).fill().map(() => Array(20).fill(0));
        for (var i = 6; i < 14; i++) {
            array[i][5] = '1';
            array[i][9] = '1';
            array[i][13] = '1';
            array[i][17] = '1';
        }

        for (var i = 0; i < 20; i++) {
            console.log(array[i].toString());
        }
    })
    .post("/createPath", function (req, res) {

        var grid = Array.from(Array(20), () => new Array(20));

        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid.length; j++) {
                grid[i][j] = '0';
            }
        }

        for (var i = 6; i < 14; i++) {
            grid[i][5] = '1';
            grid[i][9] = '1';
            grid[i][13] = '1';
            grid[i][17] = '1';
        }

        var items_for_pickup = [[0, 0], [1, 3], [1, 10], [14, 8], [6, 5], [0, 19]];

        let array = Array(20).fill().map(() => Array(20).fill(0));
        for (var i = 6; i < 14; i++) {
            array[i][5] = '1';
            array[i][9] = '1';
            array[i][13] = '1';
            array[i][17] = '1';
        }

        for (var i = 0; i < 20; i++) {
            console.log(array[i].toString());
        }

        var grid = new PF.Grid(array);

        major_path = AStarHittingAllPoints(items_for_pickup, grid.clone());

        res.send(major_path);
    })
    .post("/createStore", async function (req, res){
        console.log(req.body)
        await database.ref("stores").push({
            name: req.body.name,
            location: req.body.location,
            adminUser: req.body.adminuserid,
            floorPlan: req.body.floorplan,
            items: {
                "apple": "3,2",
                "pear":"1,2"
            }
        });

        res.sendStatus(200);
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

function distance_formula(startPoint, endPoint) {
    return Math.hypot((endPoint[0] - startPoint[0]), (endPoint[1] - startPoint[1]));
}

function bubbleSortByDist(arr) {

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {

            if (distance_formula(arr[0], arr[j]) > distance_formula(arr[0], arr[j + 1])) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }

    return (arr);
}

function AStarHittingAllPoints(items_for_pickup, grid) {
    var finder;
    var path;
    var finalPath = [];
    end_node = items_for_pickup.pop();
    start_node = items_for_pickup.splice(0, 1)[0];
    items_for_pickup = bubbleSortByDist(items_for_pickup);
    items_for_pickup.splice(0, 0, start_node);
    items_for_pickup.splice(items_for_pickup.length, 0, end_node);

    console.log(items_for_pickup);

    for (var i = 0; i < items_for_pickup.length - 1; i++) {
        start_node = items_for_pickup[i]
        end_node = items_for_pickup[i + 1]
        finder = new PF.AStarFinder({
            allowDiagonal: false,
            heuristic: function (position_list) {
                return ((position_list.length * 10) + (PF.Heuristic.manhattan));
            }
        });

        console.log("Start: " + start_node);
        console.log("End: " + end_node);

        path = finder.findPath(start_node[0], start_node[1], end_node[0], end_node[1], grid.clone());

        if (i != 0) {
            path.splice(0,1)
        }

        finalPath = finalPath.concat(path);
    }

    var b = finalPath.filter(function (item, pos, arr) {
        // Always keep the 0th element as there is nothing before it
        // Then check if each element is different than the one before it
        return pos === 0 || item !== arr[pos - 1];
    });

    return b;
}

function convertItemsToLocations(items) {

}

function upcToItemName (upc) {

}

