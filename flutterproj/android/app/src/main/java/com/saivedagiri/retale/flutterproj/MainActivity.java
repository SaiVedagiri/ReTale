package com.saivedagiri.retale.flutterproj;


import androidx.annotation.NonNull;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;
import android.content.ContextWrapper;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiManager;
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

public class MainActivity extends FlutterActivity {
    private static final String CHANNEL = "com.saivedagiri.retale.flutterproj/wifi";

    private ListView wifiList;
    private WifiManager wifiManager;

    private final int MY_PERMISSIONS_ACCESS_COARSE_LOCATION = 1;

    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
                .setMethodCallHandler(
                        (call, result) -> {
                            if (call.method.equals("wifi")) {
                                wifiManager = (WifiManager) getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
                                if (!wifiManager.isWifiEnabled()) {
                                    wifiManager.setWifiEnabled(true);
                                }
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
                                        deviceList.add(scanResult.SSID + "\n" + scanResult.frequency + "\n" + scanResult.level + "\n" + scanResult.BSSID + "\n" + distance);
                                    }
                                }

                                ArrayAdapter arrayAdapter = new ArrayAdapter(getContext(), android.R.layout.simple_list_item_1, deviceList.toArray());

                                result.success(deviceList);
                            }
                        }
                );
    }
}
