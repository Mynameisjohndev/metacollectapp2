package com.metacollectapp;

import android.content.Context;
import android.hardware.camera2.CameraManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise; 
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FlashlightModule extends ReactContextBaseJavaModule {

    private CameraManager cameraManager;
    private boolean flashlightOn;

    public FlashlightModule(ReactApplicationContext reactContext) {
        super(reactContext);
        cameraManager = (CameraManager) reactContext.getSystemService(Context.CAMERA_SERVICE);
    }

    @NonNull
    @Override
    public String getName() {
        return "Flashlight";
    }

    @ReactMethod
    public void toggleFlashlight(Promise promise) {
    try {
        String cameraId = cameraManager.getCameraIdList()[0];
        cameraManager.setTorchMode(cameraId, true);
        // if (flashlightOn) {
        //     flashlightOn = false;
        //     promise.resolve("Flashlight disabled");
        // } else {      
        //     cameraManager.setTorchMode(cameraId, true);
        //     flashlightOn = true;      
        //     promise.resolve("Flashlight enabled");
        // }
    } catch (Exception e) {
        promise.reject(e);
    }
}

}
