//package com.saivedagiri.retale;
//
//import android.os.Bundle;
//
//import androidx.fragment.app.Fragment;
//
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//
//f
//public class UPCScanner extends Fragment {
//
//    // TODO: Rename parameter arguments, choose names that match
//    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
//    private SurfaceView surfaceView;
//    private BarcodeDetector barcodeDetector;
//    private CameraSource cameraSource;
//    private static final int REQUEST_CAMERA_PERMISSION = 201;
//    //This class provides methods to play DTMF tones
//    private ToneGenerator toneGen1;
//    private TextView barcodeText;
//    private String barcodeData;
//
//
//    public UPCScanner() {
//        // Required empty public constructor
//    }
//
//    /**
//     * Use this factory method to create a new instance of
//     * this fragment using the provided parameters.
//     *
//     * @param param1 Parameter 1.
//     * @param param2 Parameter 2.
//     * @return A new instance of fragment UPCScanner.
//     */
//    // TODO: Rename and change types and number of parameters
//    public static UPCScanner newInstance(String param1, String param2) {
//        UPCScanner fragment = new UPCScanner();
//        Bundle args = new Bundle();
//        args.putString(ARG_PARAM1, param1);
//        args.putString(ARG_PARAM2, param2);
//        fragment.setArguments(args);
//        return fragment;
//    }
//
//    @Override
//    public void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        if (getArguments() != null) {
//            mParam1 = getArguments().getString(ARG_PARAM1);
//            mParam2 = getArguments().getString(ARG_PARAM2);
//        }
//    }
//
//    @Override
//    public View onCreateView(LayoutInflater inflater, ViewGroup container,
//                             Bundle savedInstanceState) {
//        // Inflate the layout for this fragment
//        return inflater.inflate(R.layout.fragment_u_p_c_scanner, container, false);
//    }
//}