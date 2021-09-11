var PF = require('pathfinding');
// var AStarFinder = require('./pathfinding');

function distance_formula(startPoint, endPoint)
{
    return Math.hypot((endPoint[0] - startPoint[0]), (endPoint[1] - startPoint[1]));
}

function bubbleSortByDist(arr){
     
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < ( arr.length - i -1 ); j++){
            
            if (distance_formula(arr[j][0], arr[j][1]) > distance_formula(arr[j+1][0], arr[j+1][1])) 
            {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j+1] = temp
            }
        }
    }
    // Print the sorted array
    return(arr);
   }

function AStarHittingAllPoints(items_for_pickup, grid)
{
    var finder;
    var path;
    var finalPath = [];

    items_for_pickup = bubbleSortByDist(items_for_pickup);

    start_node = items_for_pickup[0]
    end_node = items_for_pickup[1]
    for (var i = 1; i < items_for_pickup.length - 1; i++) {
        finder = new PF.AStarFinder({
            allowDiagonal: false,
            heuristic: function(position_list) {
                return ((position_list.length * 10) + (PF.Heuristic.manhattan));
            }
        });

        console.log("Start: " + start_node);
        console.log("End: " + end_node);

        path = finder.findPath(start_node[0], start_node[1], end_node[0], end_node[1], grid.clone());
        console.log(path);
        finalPath = finalPath.concat(path);
        start_node = items_for_pickup[i]
        end_node = items_for_pickup[i+1]
    }


    var a = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4, 5, 5, 5];

    var b = finalPath.filter(function(item, pos, arr){
    // Always keep the 0th element as there is nothing before it
    // Then check if each element is different than the one before it
    return pos === 0 || item !== arr[pos-1];
    });
    
    return b;
}

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

var items_for_pickup = [[0,0], [1,3], [1,10], [14,8], [6,5], [0,19]];

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

console.log(major_path);

// var start_node = [0,0]
// for (var i = 0; i < items_for_pickup.length; i++) {
//     path = finder.findPath(start_node[0], start_node[1], items_for_pickup[i][0], items_for_pickup[i][1], grid.clone());
//     console.log(path);
//     start_node = items_for_pickup[i];
// }

