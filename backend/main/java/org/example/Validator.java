package org.example;

public class Validator {
    public Validator() {
    }

    public static boolean checkX(int x) {
        return x < -4 || x > 4;
    }

    public static boolean checkY(float y) {
        return y < -5.0F || y > 3.0F;
    }

    public static boolean checkR(float r) {
        return r < 1.0F || r > 3.0F;
    }
}
