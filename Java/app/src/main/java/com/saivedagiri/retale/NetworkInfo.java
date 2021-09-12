package com.saivedagiri.retale;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;

public class NetworkInfo extends Fragment{

    private ListView wifiList;
    private WifiManager wifiManager;

    private final int MY_PERMISSIONS_ACCESS_COARSE_LOCATION = 1;

    public NetworkInfo(){
        // require a empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_network_info, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        wifiList = getView().findViewById(R.id.wifiList);
        Button buttonScan = getView().findViewById(R.id.scanBtn);

        wifiManager = (WifiManager) getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        if (!wifiManager.isWifiEnabled()) {
            wifiManager.setWifiEnabled(true);
        }



        buttonScan.setOnClickListener(v -> {
            List<ScanResult> wifiDeviceList = null;
            if (ActivityCompat.checkSelfPermission(getActivity(), Manifest.permission.ACCESS_COARSE_LOCATION)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(
                        getActivity(),
                        new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, MY_PERMISSIONS_ACCESS_COARSE_LOCATION
                );
            } else {
                wifiManager.startScan();
                wifiDeviceList = wifiManager.getScanResults();
            }

            final double DISTANCE_MHZ_M = 27.55;

            ArrayList<String> deviceList = new ArrayList<>();
            assert wifiDeviceList != null;
            for (ScanResult scanResult : wifiDeviceList) {
                if(Math.floor(scanResult.frequency / 1000) == 2.0 && scanResult.SSID.equals("MeshForce-dTF3N")) {
                    double distance = Math.pow(10.0, (DISTANCE_MHZ_M - 20 * Math.log10(scanResult.frequency) + Math.abs(scanResult.level)) / 20.0);
                    deviceList.add(scanResult.SSID + " \nFrequency: " + scanResult.frequency + "\nLevel: " + scanResult.level + "\nMAC: " + scanResult.BSSID + "\nDistance: " + distance + " m");
                }
            }

            ArrayAdapter arrayAdapter = new ArrayAdapter(getContext(), android.R.layout.simple_list_item_1, deviceList.toArray());

            wifiList.setAdapter(arrayAdapter);
        });
    }


}