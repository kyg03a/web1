package org.example;

public class AreaHitChecker {
    public AreaHitChecker() {
    }

    public static boolean checkHit(int x, float y, float r) {
        return checkCircle(x, y, r) || checkRectangle(x, y, r) || checkTriangle(x, y, r);
    }

    private static boolean checkCircle(int x, float y, float r) {
        return x <= 0 && y >= 0.0F && Math.pow((double)x, (double)2.0F) + Math.pow((double)y, (double)2.0F) <= (double)(r / 2.0F * (r / 2.0F));
    }

    private static boolean checkRectangle(int x, float y, float r) {
        return x >= 0 && y <= 0.0F && (float)x <= r && y >= -r;
    }

    private static boolean checkTriangle(int x, float y, float r) {
        return x >= 0 && y >= 0.0F && (float)x <= r / 2.0F && y <= r / 2.0F && y <= (float)(-x) + r / 2.0F;
    }
}
