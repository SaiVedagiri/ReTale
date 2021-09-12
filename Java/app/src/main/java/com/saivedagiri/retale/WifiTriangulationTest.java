package com.saivedagiri.retale;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link WifiTriangulationTest#newInstance} factory method to
 * create an instance of this fragment.
 */
public class WifiTriangulationTest extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private static final double EPSILON = 0.000001;

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public WifiTriangulationTest() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment WifiTriangulationTest.
     */
    // TODO: Rename and change types and number of parameters
    public static WifiTriangulationTest newInstance(String param1, String param2) {
        WifiTriangulationTest fragment = new WifiTriangulationTest();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_wifi_triangulation_test, container, false);
    }

    private double[] calculateThreeCircleIntersection(double x0, double y0, double r0,
                                                        double x1, double y1, double r1,
                                                        double x2, double y2, double r2)
    {
        double[] intersectingPoint = new double[2];
        double a, dx, dy, d, h, rx, ry;
        double point2_x, point2_y;

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
        a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

        // Determine the coordinates of point 2.
        point2_x = x0 + (dx * a/d);
        point2_y = y0 + (dy * a/d);

        // Determine the distance from point 2 to either of the intersection points.
        h = Math.sqrt((r0*r0) - (a*a));

        // Now determine the offsets of the intersection points from point 2.
        rx = -dy * (h/d);
        ry = dx * (h/d);

        // Determine the absolute intersection points.
        double intersectionPoint1_x = point2_x + rx;
        double intersectionPoint2_x = point2_x - rx;
        double intersectionPoint1_y = point2_y + ry;
        double intersectionPoint2_y = point2_y - ry;

        System.out.println("INTERSECTION Circle1 AND Circle2: (" + intersectionPoint1_x + "," + intersectionPoint1_y + ")" + " AND (" + intersectionPoint2_x + "," + intersectionPoint2_y + ")");

        /* Lets determine if circle 3 intersects at either of the above intersection points. */
        dx = intersectionPoint1_x - x2;
        dy = intersectionPoint1_y - y2;
        double d1 = distanceFormula(dx, dy);

        dx = intersectionPoint2_x - x2;
        dy = intersectionPoint2_y - y2;
        double d2 = distanceFormula(dx, dy);

        if(Math.abs(d1 - r2) < EPSILON) {
            System.out.println("INTERSECTION Circle1 AND Circle2 AND Circle3: (" + intersectionPoint1_x + "," + intersectionPoint1_y + ")");
            intersectingPoint[0] = intersectionPoint1_x;
            intersectingPoint[1] = intersectionPoint1_y;
        }
        else if(Math.abs(d2 - r2) < EPSILON) {
            System.out.println("INTERSECTION Circle1 AND Circle2 AND Circle3: (" + intersectionPoint2_x + "," + intersectionPoint2_y + ")"); //here was an error
            intersectingPoint[0] = intersectionPoint2_x;
            intersectingPoint[1] = intersectionPoint2_y;
        }
        else {
            System.out.println("INTERSECTION Circle1 AND Circle2 AND Circle3: NONE");
            intersectingPoint[0] = 0.0;
            intersectingPoint[1] = 0.0;
        }
        System.out.println(intersectingPoint);
        return intersectingPoint;
    }

    private double distanceFormula(double dx, double dy)
    {
        return Math.sqrt((dy*dy) + (dx*dx));
    }


}