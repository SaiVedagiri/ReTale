package com.saivedagiri.retale;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiManager;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

class WifiReceiver extends BroadcastReceiver {

    WifiManager wifiManager;
    ListView wifiDeviceList;

    public WifiReceiver(WifiManager wifiManager, ListView wifiDeviceList) {
        this.wifiManager = wifiManager;
        this.wifiDeviceList = wifiDeviceList;
    }

    public void onReceive(Context context, Intent intent) {
        System.out.println("Wifi: Reached onReceive");
        String action = intent.getAction();
        if (WifiManager.SCAN_RESULTS_AVAILABLE_ACTION.equals(action)) {
            System.out.println("Wifi: action");
            List<ScanResult> wifiList = wifiManager.getScanResults();

            final double DISTANCE_MHZ_M = 27.55;

            ArrayList<String> deviceList = new ArrayList<>();
            for (ScanResult scanResult : wifiList) {
                System.out.println("Wifi List Length: " + wifiList.size());
                if(Math.floor(scanResult.frequency / 1000) == 2.0 && scanResult.SSID.equals("MeshForce-dTF3N")) {
                    double distance = Math.pow(10.0, (DISTANCE_MHZ_M - 20 * Math.log10((scanResult.frequency)) + Math.abs(scanResult.level)) / 20.0);
                    deviceList.add(scanResult.SSID + " \nFrequency: " + scanResult.frequency + "\nLevel: " + scanResult.level + "\nMAC: " + scanResult.BSSID + "\nDistance: " + distance + " m");
                }
            }

            ArrayAdapter arrayAdapter = new ArrayAdapter(context, android.R.layout.simple_list_item_1, deviceList.toArray());

            wifiDeviceList.setAdapter(arrayAdapter);
        }
    }
}
