package com.metacollectapp;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import androidx.core.content.ContextCompat;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class LocationModule extends ReactContextBaseJavaModule {
    private static final String LOCATION_PERMISSION = Manifest.permission.ACCESS_FINE_LOCATION;
    private LocationManager locationManager;
    private LocationListener locationListener;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        locationManager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
    }

    @Override
    public String getName() {
        return "LocationModule";
    }

    @ReactMethod
    public void requestLocationUpdates(final Promise promise) {
    if (ContextCompat.checkSelfPermission(getReactApplicationContext(), LOCATION_PERMISSION) != PackageManager.PERMISSION_GRANTED) {
        promise.reject("PERMISSION_DENIED", "Location permission not granted");
        return;
    }

    Location lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
    if (lastKnownLocation != null) {
        resolveLocationPromise(promise, lastKnownLocation);
    }

    locationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
            resolveLocationPromise(promise, location);
            locationManager.removeUpdates(this);
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {}

        @Override
        public void onProviderEnabled(String provider) {}

        @Override
        public void onProviderDisabled(String provider) {}
    };
      locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, locationListener);
    }

    private void resolveLocationPromise(Promise promise, Location location) {
        WritableMap locationMap = Arguments.createMap();
        locationMap.putDouble("altitude", location.getAltitude());
        locationMap.putDouble("heading", location.getBearing());
        locationMap.putDouble("latitude", location.getLatitude());
        locationMap.putDouble("longitude", location.getLongitude());
        locationMap.putDouble("altitudeAccuracy", location.getAccuracy());
        locationMap.putDouble("speed", location.getSpeed());
        locationMap.putDouble("accuracy", location.getAccuracy());

        promise.resolve(locationMap);
    }

}


