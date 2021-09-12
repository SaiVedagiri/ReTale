import 'dart:core';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart';
import 'dart:async';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';

String userID = "";
String username = "";
String password = "";
String firstName = "";
String lastName = "";
String confirmPassword = "";
var userJSON = {};

void main() {
  runApp(const MyApp());
}

class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll("#", "");
    if (hexColor.length == 6) {
      hexColor = "FF" + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ReTale',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      routes: {
        "/": (_) => const MyHomePage(),
        "/landing": (_) => const LandingPage(),
        "/map": (_) => const MapPage(),
        "/camera": (_) => const BarcodePage(),
      },
    );
  }
}

GoogleSignIn googleSignIn = GoogleSignIn(
  scopes: [
    'email',
  ],
);

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  initState() {
    super.initState();
    initStateFunction();
  }

  initStateFunction() async {
    var prefs = await SharedPreferences.getInstance();
    userID = prefs.getString('userID')!;
    if (userID != "") {
      String userJSONString = prefs.getString('userJSON')!;
      userJSON = json.decode(userJSONString);
      Navigator.pushReplacementNamed(context, "/landing");
    }
  }

  Future<dynamic> helpContext(BuildContext context, String title, Widget body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: body,
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text("OK"),
                )
              ]);
        });
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    return Scaffold(
      appBar: AppBar(
        title: const Text("ReTale"),
        actions: <Widget>[
          IconButton(
              icon: const Icon(Icons.help),
              onPressed: () async {
                helpContext(
                    context,
                    "Help",
                    const Text.rich(
                      TextSpan(
                        children: <TextSpan>[
                          TextSpan(
                            text: 'Login\n',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                decoration: TextDecoration.underline),
                          ),
                          TextSpan(
                            text:
                                'Use this feature to log in to an existing shopper account.\n',
                            style: TextStyle(fontSize: 20),
                          ),
                          TextSpan(
                            text: '\nSign Up\n',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                decoration: TextDecoration.underline),
                          ),
                          TextSpan(
                            text:
                                'Use this feature to create a new shopper account.\n',
                            style: TextStyle(fontSize: 20),
                          ),
                        ],
                      ),
                    ));
              })
        ],
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Padding(
              padding: EdgeInsets.all(30.0),
            ),
            ListTile(
              title: RaisedButton(
                color: HexColor("00b2d1"),
                onPressed: () {
                  dispose() {
                    SystemChrome.setPreferredOrientations([
                      DeviceOrientation.landscapeRight,
                      DeviceOrientation.landscapeLeft,
                      DeviceOrientation.portraitUp,
                      DeviceOrientation.portraitDown,
                    ]);
                    super.dispose();
                  }

                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const SignInPage()));
                },
                child: const Text("Login"),
              ),
            ),
            ListTile(
                title: RaisedButton(
                    color: HexColor("ff5ded"),
                    onPressed: () {
                      dispose() {
                        SystemChrome.setPreferredOrientations([
                          DeviceOrientation.landscapeRight,
                          DeviceOrientation.landscapeLeft,
                          DeviceOrientation.portraitUp,
                          DeviceOrientation.portraitDown,
                        ]);
                        super.dispose();
                      }

                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const SignUpPage()));
                    },
                    child: const Text("Sign Up"))),
          ],
        ),
      ),
    );
  }
}

class SignInPage extends StatefulWidget {
  const SignInPage({Key? key}) : super(key: key);

  @override
  _SignInPageState createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  Future<dynamic> createAlertDialog(
      BuildContext context, String title, String body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: Text(body),
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text("OK"),
                )
              ]);
        });
  }

  Future<dynamic> helpContext(BuildContext context, String title, Widget body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: body,
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text("OK"),
                )
              ]);
        });
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    googleSignIn.signOut();
    return Scaffold(
      appBar: AppBar(
        title: const Text("Login"),
        actions: <Widget>[
          IconButton(
              icon: const Icon(Icons.help),
              onPressed: () async {
                helpContext(
                    context,
                    "Help",
                    const Text.rich(
                      TextSpan(
                        children: <TextSpan>[
                          TextSpan(
                            text: 'Login\n',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                decoration: TextDecoration.underline),
                          ),
                          TextSpan(
                            text: 'Sign in to an existing ReTale account.\n',
                            style: TextStyle(fontSize: 20),
                          ),
                        ],
                      ),
                    ));
              })
        ],
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(left: 30.0, right: 30.0),
              child: TextField(
                decoration: const InputDecoration(hintText: "Email Address"),
                onChanged: (String str) {
                  setState(() {
                    username = str;
                  });
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 30.0, right: 30.0),
              child: TextField(
                decoration: const InputDecoration(hintText: "Password"),
                obscureText: true,
                onChanged: (String str) {
                  setState(() {
                    password = str;
                  });
                },
              ),
            ),
            ListTile(
                title: ElevatedButton(
                    onPressed: () async {
                      Map<String, String> body = {
                        "Content-type": "application/json",
                        "Origin": "*",
                        "email": username,
                        "password": password
                      };
                      Response response = await post(
                          Uri.parse('https://retale.saivedagiri.com/login'),
                          body: body);
                      //createAlertDialog(context);
                      userJSON = jsonDecode(response.body);
                      if (userJSON["data"] != "Incorrect email address." &&
                          userJSON["data"] != "Incorrect Password") {
                        userID = userJSON["data"];
                        var prefs = await SharedPreferences.getInstance();
                        prefs.setString('userID', userID);
                        prefs.setString('userJSON', response.body);
                        dispose() {
                          SystemChrome.setPreferredOrientations([
                            DeviceOrientation.landscapeRight,
                            DeviceOrientation.landscapeLeft,
                            DeviceOrientation.portraitUp,
                            DeviceOrientation.portraitDown,
                          ]);
                          super.dispose();
                        }

                        Navigator.pushReplacementNamed(context, "/landing");
                      } else {
                        createAlertDialog(context, "Error", userJSON["data"]);
                      }
                    },
                    child: const Text("Submit"))),
            const Padding(
              padding: EdgeInsets.only(top: 30.0),
              child: Text(
                "OR",
                style: TextStyle(
                  fontSize: 20.0,
                ),
              ),
            ),
            const SizedBox(height: 50),
            RaisedButton(
              onPressed: () async {
                final GoogleSignInAccount? googleSignInAccount =
                    await googleSignIn.signIn();
                Map<String, String> body = {
                  "Content-type": "application/json",
                  "Origin": "*",
                  "email": googleSignInAccount!.email,
                  "name": googleSignInAccount.displayName.toString()
                };
                Response response = await post(
                    Uri.parse('https://retale.saivedagiri.com/googleSignIn'),
                    body: body);
                //createAlertDialog(context);
                userJSON = jsonDecode(response.body);
                userID = userJSON["userkey"];
                var prefs = await SharedPreferences.getInstance();
                prefs.setString('userID', userID);
                prefs.setString('userJSON', response.body);
                dispose() {
                  SystemChrome.setPreferredOrientations([
                    DeviceOrientation.landscapeRight,
                    DeviceOrientation.landscapeLeft,
                    DeviceOrientation.portraitUp,
                    DeviceOrientation.portraitDown,
                  ]);
                  super.dispose();
                }

                Navigator.pushReplacementNamed(context, "/landing");
              },
              child: Padding(
                padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const <Widget>[
                    Image(
                        image: AssetImage("assets/google_logo.png"),
                        height: 35.0),
                    Padding(
                      padding: EdgeInsets.only(left: 10),
                      child: Text(
                        'Sign in with Google',
                        style: TextStyle(
                          fontSize: 20,
                          color: Colors.black,
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class SignUpPage extends StatefulWidget {
  const SignUpPage({Key? key}) : super(key: key);

  @override
  _SignUpPageState createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  Future<dynamic> createAlertDialog(
      BuildContext context, String title, String body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: Text(body),
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text("OK"),
                )
              ]);
        });
  }

  Future<dynamic> helpContext(BuildContext context, String title, Widget body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: body,
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text("OK"),
                )
              ]);
        });
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    googleSignIn.signOut();
    return Scaffold(
      appBar: AppBar(
        title: const Text("Sign Up"),
        actions: <Widget>[
          IconButton(
              icon: const Icon(Icons.help),
              onPressed: () async {
                helpContext(
                    context,
                    "Help",
                    const Text.rich(
                      TextSpan(
                        children: <TextSpan>[
                          TextSpan(
                            text: 'Sign Up\n',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                decoration: TextDecoration.underline),
                          ),
                          TextSpan(
                            text: 'Create a new ReTale account.\n',
                            style: TextStyle(fontSize: 20),
                          ),
                        ],
                      ),
                    ));
              })
        ],
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(left: 30.0, right: 30.0),
              child: TextField(
                decoration: const InputDecoration(hintText: "First Name"),
                onChanged: (String str) {
                  setState(() {
                    firstName = str;
                  });
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 30.0, right: 30.0),
              child: TextField(
                decoration: const InputDecoration(hintText: "Last Name"),
                onChanged: (String str) {
                  setState(() {
                    lastName = str;
                  });
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 30.0, right: 30.0),
              child: TextField(
                decoration: const InputDecoration(hintText: "Email Address"),
                onChanged: (String str) {
                  setState(() {
                    username = str;
                  });
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 30.0, right: 30.0),
              child: TextField(
                decoration: const InputDecoration(hintText: "Password"),
                obscureText: true,
                onChanged: (String str) {
                  setState(() {
                    password = str;
                  });
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 30.0, right: 30.0),
              child: TextField(
                decoration: const InputDecoration(hintText: "Confirm Password"),
                obscureText: true,
                onChanged: (String str) {
                  setState(() {
                    confirmPassword = str;
                  });
                },
              ),
            ),
            ListTile(
                title: RaisedButton(
                    onPressed: () async {
                      Map<String, String> body = {
                        "Content-type": "application/json",
                        "Origin": "*",
                        "firstname": firstName,
                        "lastname": lastName,
                        "email": username,
                        "password": password,
                        "passwordconfirm": confirmPassword
                      };
                      Response response = await post(
                          Uri.parse('https://retale.saivedagiri.com/register'),
                          body: body);
                      //createAlertDialog(context);
                      userJSON = jsonDecode(response.body);
                      if (userJSON["data"] == "Valid") {
                        print(userJSON);
                        userID = userJSON["userkey"];
                        var prefs = await SharedPreferences.getInstance();
                        prefs.setString('userID', userID);
                        prefs.setString('userJSON', response.body);
                        dispose() {
                          SystemChrome.setPreferredOrientations([
                            DeviceOrientation.landscapeRight,
                            DeviceOrientation.landscapeLeft,
                            DeviceOrientation.portraitUp,
                            DeviceOrientation.portraitDown,
                          ]);
                          super.dispose();
                        }

                        Navigator.pushReplacementNamed(context, "/landing");
                      } else {
                        createAlertDialog(context, "Error", userJSON["data"]);
                      }
                    },
                    child: const Text("Submit"))),
            const Padding(
              padding: EdgeInsets.only(top: 30.0),
              child: Text(
                "OR",
                style: TextStyle(
                  fontSize: 20.0,
                ),
              ),
            ),
            const SizedBox(height: 50),
            RaisedButton(
              onPressed: () async {
                final GoogleSignInAccount? googleSignInAccount =
                    await googleSignIn.signIn();
                Map<String, String> body = {
                  "Content-type": "application/json",
                  "Origin": "*",
                  "email": googleSignInAccount!.email,
                  "name": googleSignInAccount.displayName.toString()
                };
                Response response = await post(
                    Uri.parse('https://retale.saivedagiri.com/googleSignIn'),
                    body: body);
                //createAlertDialog(context);
                userJSON = jsonDecode(response.body);
                userID = userJSON["userkey"];
                var prefs = await SharedPreferences.getInstance();
                prefs.setString('userID', userID);
                prefs.setString('userJSON', response.body);
                dispose() {
                  SystemChrome.setPreferredOrientations([
                    DeviceOrientation.landscapeRight,
                    DeviceOrientation.landscapeLeft,
                    DeviceOrientation.portraitUp,
                    DeviceOrientation.portraitDown,
                  ]);
                  super.dispose();
                }

                Navigator.pushReplacementNamed(context, "/landing");
              },
              child: Padding(
                padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const <Widget>[
                    Image(
                        image: AssetImage("assets/google_logo.png"),
                        height: 35.0),
                    Padding(
                      padding: EdgeInsets.only(left: 10),
                      child: Text(
                        'Sign in with Google',
                        style: TextStyle(
                          fontSize: 20,
                          color: Colors.black,
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class LandingPage extends StatefulWidget {
  const LandingPage({Key? key}) : super(key: key);

  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  Future<dynamic> createAlertDialog(
      BuildContext context, String title, String body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: Text(body),
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text("OK"),
                )
              ]);
        });
  }

  Future<dynamic> helpContext(BuildContext context, String title, Widget body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: body,
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Text("OK"),
                )
              ]);
        });
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    return Scaffold(
      appBar: AppBar(
        title: Text("ReTale"),
        actions: <Widget>[
          IconButton(
              icon: const Icon(Icons.help),
              onPressed: () async {
                helpContext(
                    context,
                    "Help",
                    const Text.rich(
                      TextSpan(
                        children: <TextSpan>[
                          TextSpan(
                            text: 'ReTale\n',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                decoration: TextDecoration.underline),
                          ),
                          TextSpan(
                            text:
                                'This screen will show you your shopping list.\n',
                            style: TextStyle(fontSize: 20),
                          ),
                        ],
                      ),
                    ));
              })
        ],
      ),
      bottomNavigationBar: BottomAppBar(
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            IconButton(
              icon: const Icon(Icons.checklist),
              onPressed: () {},
            ),
            IconButton(
              icon: const Icon(Icons.map),
              onPressed: () {
                Navigator.pushReplacementNamed(context, "/map");
              },
            ),
            IconButton(
              icon: const Icon(Icons.camera),
              onPressed: () {
                Navigator.pushReplacementNamed(context, "/camera");
              },
            ),
            IconButton(
              icon: const Icon(Icons.shopping_basket_outlined),
              onPressed: () {
                Navigator.pushReplacementNamed(context, "/checkout");
              },
            ),
          ],
        ),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text("Welcome!"),
          ],
        ),
      ),
    );
  }
}

class MapPage extends StatefulWidget {
  const MapPage({Key? key}) : super(key: key);

  @override
  _MapPageState createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  static const platform =
      MethodChannel('com.saivedagiri.retale.flutterproj/wifi');
  String resultString = "Calculating...";
  List<double> coordinates = [0, 0];

  static const duration = Duration(seconds: 1);
  int secondsRemaining = 0;

  void handleTick() {
    setState(() {
      secondsRemaining = secondsRemaining - 1;
    });
  }

  @override
  void initState() {
    super.initState();
    Timer timer = Timer.periodic(duration, (Timer t) {
      if (secondsRemaining != 0) {
        handleTick();
      } else {
        scanWifi();
        setState(() {
          secondsRemaining = 30;
        });
      }
    });
  }

  double distanceFormula(double dx, double dy) {
    return sqrt((dy * dy) + (dx * dx));
  }

  List<double> calculateThreeCircleIntersection(
      double r0, double r1, double r2) {
    //e0:b2:60:45:c2:c1
    double x0 = 0.0;
    double y0 = 0.0;

    //e0:b2:60:45:c2:c9
    double x1 = 0.8;
    double y1 = 3.5;

    //e0:b2:60:45:c2:d1
    double x2 = 3.25;
    double y2 = 0.5;

    double EPSILON = 1.0;
    List<double> intersectingPoint;
    double a, dx, dy, d, h, rx, ry;
    double point2X, point2Y;

    // dx and dy are the vertical and horizontal distances between the circle centers.
    dx = x1 - x0;
    dy = y1 - y0;

    // Determine the straight-line distance between the centers.
    d = distanceFormula(dx, dy);

    /* 'point 2' is the point where the line through the circle
         * intersection points crosses the line between the circle
         * centers.
         */

    // Determine the distance from point 0 to point 2.
    a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);

    // Determine the coordinates of point 2.
    point2X = x0 + (dx * a / d);
    point2Y = y0 + (dy * a / d);

    // Determine the distance from point 2 to either of the intersection points.
    h = sqrt((r0 * r0) - (a * a));

    // Now determine the offsets of the intersection points from point 2.
    rx = -dy * (h / d);
    ry = dx * (h / d);

    // Determine the absolute intersection points.
    double intersectionPoint1X = point2X + rx;
    double intersectionPoint2X = point2X - rx;
    double intersectionPoint1Y = point2Y + ry;
    double intersectionPoint2Y = point2Y - ry;

    // print("INTERSECTION Circle1 AND Circle2: (" + intersectionPoint1X + "," + intersectionPoint1Y + ")" + " AND (" + intersectionPoint2X!! + "," + intersectionPoint2Y + ")");

    /* Lets determine if circle 3 intersects at either of the above intersection points. */
    dx = intersectionPoint1X - x2;
    dy = intersectionPoint1Y - y2;
    double d1 = distanceFormula(dx, dy);

    dx = intersectionPoint2X - x2;
    dy = intersectionPoint2Y - y2;
    double d2 = distanceFormula(dx, dy);

    if ((d1 - r2).abs() < EPSILON) {
      // print("INTERSECTION Circle1 AND Circle2 AND Circle3: (" + intersectionPoint1X + "," + intersectionPoint1Y + ")");
      intersectingPoint = [intersectionPoint1X, intersectionPoint1Y];
    } else if ((d2 - r2).abs() < EPSILON) {
      // print("INTERSECTION Circle1 AND Circle2 AND Circle3: (" + intersectionPoint2X + "," + intersectionPoint2Y + ")"); //here was an error
      intersectingPoint = [intersectionPoint2X, intersectionPoint2Y];
    } else {
      print("INTERSECTION Circle1 AND Circle2 AND Circle3: NONE");
      intersectingPoint = [0.0, 0.0];
    }
    // print(intersectingPoint);
    return intersectingPoint;
  }

  Future<void> scanWifi() async {
    var testVar;
    var result = [];
    try {
      var result = await platform.invokeMethod('wifi');
      testVar = result;
    } on PlatformException catch (e) {
      testVar = e.message!;
    }
    double r0 = 0.0;
    double r1 = 0.0;
    double r2 = 0.0;
    for (int i = 0; i < testVar.length; i++) {
      result.add(testVar[i].split("\n"));
      if (result[i][3] == "e0:b2:60:45:c2:c1") {
        r0 = double.parse(result[i][4]);
      } else if (result[i][3] == "e0:b2:60:45:c2:c9") {
        r1 = double.parse(result[i][4]);
      } else if (result[i][3] == "e0:b2:60:45:c2:d1") {
        r2 = double.parse(result[i][4]);
      }
    }
    print(r0);
    print(r1);
    print(r2);
    setState(() {
      coordinates = calculateThreeCircleIntersection(r0, r1, r2);
    });
    print(coordinates);
  }

  Future<dynamic> createAlertDialog(
      BuildContext context, String title, String body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: Text(body),
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text("OK"),
                )
              ]);
        });
  }

  Future<dynamic> helpContext(BuildContext context, String title, Widget body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: body,
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Text("OK"),
                )
              ]);
        });
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    return Scaffold(
      appBar: AppBar(
        title: Text("ReTale"),
        actions: <Widget>[
          IconButton(
              icon: const Icon(Icons.help),
              onPressed: () async {
                helpContext(
                    context,
                    "Help",
                    const Text.rich(
                      TextSpan(
                        children: <TextSpan>[
                          TextSpan(
                            text: 'ReTale\n',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                decoration: TextDecoration.underline),
                          ),
                          TextSpan(
                            text:
                                'This screen will show you a map of the store relative to you.\n',
                            style: TextStyle(fontSize: 20),
                          ),
                        ],
                      ),
                    ));
              })
        ],
      ),
      bottomNavigationBar: BottomAppBar(
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            IconButton(
              icon: const Icon(Icons.checklist),
              onPressed: () {
                Navigator.pushReplacementNamed(context, "/landing");
              },
            ),
            IconButton(
              icon: const Icon(Icons.map),
              onPressed: () {},
            ),
            IconButton(
              icon: const Icon(Icons.camera),
              onPressed: () {
                Navigator.pushReplacementNamed(context, "/camera");
              },
            ),
            IconButton(
              icon: const Icon(Icons.shopping_basket_outlined),
              onPressed: () {
                Navigator.pushReplacementNamed(context, "/checkout");
              },
            ),
          ],
        ),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "Your current coordinate is (${coordinates[0]}, ${coordinates[1]}). Next coordinate in ${secondsRemaining}",
              style: const TextStyle(fontSize: 20),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

class BarcodePage extends StatefulWidget {
  const BarcodePage({Key? key}) : super(key: key);

  @override
  _BarcodePageState createState() => _BarcodePageState();
}

class _BarcodePageState extends State<BarcodePage> {
  String barcodeVal = "";
  String title = "No item found";

  @override
  void initState() {
    super.initState();
    initStateFunction();
  }

  void initStateFunction() async {
    barcodeVal = await FlutterBarcodeScanner.scanBarcode(
        "ffffff", "Cancel", true, ScanMode.BARCODE);
    setState(() {});
    Response response = await get(
        Uri.parse('https://api.upcitemdb.com/prod/trial/lookup?upc=${barcodeVal}'));
    var myJson = jsonDecode(response.body);
    title = myJson["items"][0]["title"];
  }

  Future<dynamic> createAlertDialog(
      BuildContext context, String title, String body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: Text(body),
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text("OK"),
                )
              ]);
        });
  }

  Future<dynamic> helpContext(BuildContext context, String title, Widget body) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text(title),
              content: body,
              actions: <Widget>[
                MaterialButton(
                  elevation: 5.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Text("OK"),
                )
              ]);
        });
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    return Scaffold(
      appBar: AppBar(
        title: Text("ReTale"),
        actions: <Widget>[
          IconButton(
              icon: const Icon(Icons.help),
              onPressed: () async {
                helpContext(
                    context,
                    "Help",
                    const Text.rich(
                      TextSpan(
                        children: <TextSpan>[
                          TextSpan(
                            text: 'ReTale\n',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                decoration: TextDecoration.underline),
                          ),
                          TextSpan(
                            text:
                                'This screen will allow you to scan products.\n',
                            style: TextStyle(fontSize: 20),
                          ),
                        ],
                      ),
                    ));
              })
        ],
      ),
      bottomNavigationBar: BottomAppBar(
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            IconButton(
              icon: const Icon(Icons.checklist),
              onPressed: () {
                Navigator.pushReplacementNamed(context, "/landing");
              },
            ),
            IconButton(
              icon: const Icon(Icons.map),
              onPressed: () {
                Navigator.pushReplacementNamed(context, "/map");
              },
            ),
            IconButton(
              icon: const Icon(Icons.camera),
              onPressed: () {
              },
            ),
            IconButton(
              icon: const Icon(Icons.shopping_basket_outlined),
              onPressed: () {
                Navigator.pushReplacementNamed(context, "/checkout");
              },
            ),
          ],
        ),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(title),
          ],
        ),
      ),
    );
  }
}
