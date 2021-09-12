package com.saivedagiri.retale;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class LandingApp extends AppCompatActivity implements BottomNavigationView.OnNavigationItemSelectedListener {

    BottomNavigationView bottomNavigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_landing_app);

        bottomNavigationView = findViewById(R.id.bottomNavigationView);

        bottomNavigationView.setOnNavigationItemSelectedListener(this);
        bottomNavigationView.setSelectedItemId(R.id.shop_list);

    }

    NetworkInfo networkInfo = new NetworkInfo();

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        getSupportFragmentManager().beginTransaction().replace(R.id.flFragment, networkInfo).commit();
        return true

        switch (item.getItemId()) {
            case R.id.shop_list:
                getSupportFragmentManager().beginTransaction().replace(R.id.container, networkInfo).commit();
                return true;

            case R.id.upc:
//                getSupportFragmentManager().beginTransaction().replace(R.id.container, secondFragment).commit();
                return true;

            case R.id.shopping:
//                getSupportFragmentManager().beginTransaction().replace(R.id.container, thirdFragment).commit();
                return true;
        }
        return false;
    }


}