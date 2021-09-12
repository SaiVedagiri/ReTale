const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;
var PF = require('pathfinding');
const dotenv = require("dotenv")
var admin = require("firebase-admin");
var AWS = require("aws-sdk");

dotenv.config()

var serviceAccount = require("./retale-9fd28-firebase-adminsdk-9w0fq-535869787f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://retale-9fd28-default-rtdb.firebaseio.com"
});

var database = admin.database();
AWS.config.update({
    region: process.env.AWSDYNAMOREGION,
    endpoint: process.env.AWSDYNAMOENDPOINT,
    accessKeyId: process.env.AWSACCESSKEYID,
    secretAccessKey: process.env.AWSSECRETACCESSKEY,
  });
  
  var docClient = new AWS.DynamoDB.DocumentClient();

express()
    .use(express.static(path.join(__dirname, "build")))
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "build", "index.html"));
      })
      .post("/googleSignIn", async function (req, res) {
        let profile = req.body;
        let email = profile.email;
        let name = profile.name;
        let imageURL = profile.imageurl;
        let myVal = await searchUserEmail(email);
        if (!myVal) {
          await addUser(email, imageURL, name, "null");
        }
        let myVal2 = await searchUserEmail(email);
        while (myVal2 == undefined) {
          myVal2 = await searchUserEmail(email);
        }
        let userKey = myVal2.userID;
        const returnVal = {
          userkey: userKey,
          imageurl: imageURL,
        };
        res.send(returnVal);
      })
      .post("/getMap", async function(req, res) {
        let userKey = req.body.userkey;
        await database.ref("users/" + userKey).once("value", function(snapshot) {
          let userData = snapshot.val();
          if(!userData) {
            res.send({
              error: "No user data"
            });
          }
          let rows = userData.rows;
          let columns = userData.columns;
          let matrix = userData.matrix;
          res.send({
            rows: rows,
            columns: columns,
            matrix: matrix
          });
        });
      })
      .post("/setSize", async function(req, res) {
        let userKey = req.body.userkey;
        if(!userKey) {
          res.send({
            error: "No user data"
          });
        }
        let rows = req.body.rows;
        let columns = req.body.columns;
        await database.ref("users/" + userKey).update({
          rows: rows,
          columns: columns
        });
        res.sendStatus(200);
      })
      .post("/setMatrix", async function(req, res) {
        let userKey = req.body.userkey;
        let matrix = req.body.matrix;
        await database.ref("users/" + userKey).update({
          matrix: matrix
        });
        res.sendStatus(200);
      })
      .post("/login", async function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let returnVal;
        let myVal = await searchUserEmail(email);
        if (!myVal) {
          returnVal = {
            data: "Incorrect email address.",
          };
        } else {
          let inputPassword = password;
          let userPassword;
          userPassword = myVal.password;
          if (bcrypt.compareSync(inputPassword, userPassword)) {
            returnVal = {
              data: "Valid",
              id: myVal.userID,
              imageurl: "assets/default.png",
            };
          } else {
            returnVal = {
              data: "Incorrect Password",
            };
          }
        }
        res.send(returnVal);
      })
    
      .post("/register", async function (req, res) {
        let email = req.body.email;
        let firstName = req.body.firstname;
        let lastName = req.body.lastname;
        let password = req.body.password;
        let passwordConfirm = req.body.passwordconfirm;
        let returnVal;
        if (!email) {
          returnVal = {
            data: "Please enter an email address.",
          };
          res.send(returnVal);
          return;
        }
        let myVal = await searchUserEmail(email);
        if (myVal) {
          returnVal = {
            data: "Email already exists.",
          };
        } else if (firstName.length == 0 || lastName.length == 0) {
          returnVal = {
            data: "Invalid Name",
          };
        } else if (
          !(
            /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
              firstName
            ) &&
            /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
              lastName
            )
          )
        ) {
          returnVal = {
            data: "Invalid Name",
          };
        } else if (
          !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            email
          )
        ) {
          returnVal = {
            data: "Invalid email address.",
          };
        } else if (password.length < 6) {
          returnVal = {
            data: "Your password needs to be at least 6 characters.",
          };
        } else if (password != passwordConfirm) {
          returnVal = {
            data: "Your passwords don't match.",
          };
        } else {
          addUser(
            email,
            "assets/default.png",
            `${firstName} ${lastName}`,
            hash(password)
          );
          let myVal2 = await searchUserEmail(email);
          while (myVal2 == undefined) {
            myVal2 = await searchUserEmail(email);
          }
          returnVal = {
            data: "Valid",
            id: myVal2.userID,
            imageurl: "assets/default.png",
          };
        }
        res.send(returnVal);
      })
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


function hash(value) {
    let salt = bcrypt.genSaltSync(10);
    let hashVal = bcrypt.hashSync(value, salt);
    return hashVal;
  }
  
  async function searchUserEmail(key) {
    let params = {
      TableName: "ReTale",
      IndexName: "email-index",
      KeyConditionExpression: "#key = :value",
      ExpressionAttributeNames: {
        "#key": "email",
      },
      ExpressionAttributeValues: {
        ":value": key,
      },
    };
  
    await docClient.query(params, async function (err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        return err;
      } else {
        console.log("Query succeeded.");
        returnVal = await data.Items[0];
      }
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 200));
    return returnVal;
  }
  
  async function searchUserID(key) {
    let params = {
      TableName: "ReTale",
      KeyConditionExpression: "#key = :value",
      ExpressionAttributeNames: {
        "#key": "userID",
      },
      ExpressionAttributeValues: {
        ":value": key,
      },
    };
  
    await docClient.query(params, async function (err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        return err;
      } else {
        console.log("Query succeeded.");
        returnVal = await data.Items[0];
      }
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 200));
    return returnVal;
  }
  
  async function addUser(email, imageURL, name, password) {
    let username = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    let charactersLength = characters.length;
    for (let i = 0; i < 15; i++) {
      username += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let params = {
      TableName: "ReTale",
      Item: {
        userID: username,
        email: email,
        imageURL: imageURL,
        name: name,
        password: password,
      },
    };
  
    console.log("Adding a new item...");
    await docClient.put(params, async function (err, data) {
      if (err) {
        console.error(
          "Unable to add item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Added item successfully");
      }
    });
  }