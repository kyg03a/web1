package org.example;

import com.fastcgi.FCGIInterface;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.Objects;

class Server {
    public static void main(String[] args) {
        FCGIInterface fcgiInterface = new FCGIInterface();

        while(fcgiInterface.FCGIaccept() >= 0) {
            if (FCGIInterface.request == null) {
                continue;
            }

            String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
            if (method == null) {
                System.out.println(err("Not supported method HTTP"));
                continue;
            }

            if (method.equals("GET")) {
                long time = System.nanoTime();
                String req = FCGIInterface.request.params.getProperty("QUERY_STRING");

                if (req == null || Objects.equals(req, "")) {
                    System.out.println(err("Empty query string"));
                    continue;
                }

                LinkedHashMap<String, String> m;
                try {
                    m = getValues(req);
                } catch (Exception e) {
                    System.out.println(err("Invalid GET requet"));
                    continue;
                }

                try {
                    if (m.size() != 3) {
                        throw new RuntimeException("Request should contain only x,y,r param");
                    }

                    String xStr = m.get("x");
                    String yStr = m.get("y");
                    String rStr = m.get("r");

                    if (xStr == null || yStr == null || rStr == null) {
                        throw new RuntimeException("No x,y or r param");
                    }

                    int x = Integer.parseInt(xStr);
                    float y = Float.parseFloat(yStr);
                    float r = Float.parseFloat(rStr);

                    if (Validator.checkX(x)) {
                        throw new RuntimeException("X must be in range [-4, 4]");
                    }
                    if (Validator.checkY(y)) {
                        throw new RuntimeException("Y must be in range [-5, 3]");
                    }
                    if (Validator.checkR(r)) {
                        throw new RuntimeException("R must be in range [1, 3]");
                    }

                    boolean isShot = AreaHitChecker.checkHit(x, y, r);

                    System.out.println(resp(isShot, xStr, yStr, rStr, time));

                } catch (NumberFormatException e) {
                    System.out.println(err("Invalid characters in data"));
                } catch (RuntimeException e) {
                    System.out.println(err(e.getMessage()));
                } catch (Exception e) {
                    System.out.println(err("Unknown error"));
                }
            } else {
                System.out.println(err("Data must be sent via GET request!"));
            }
        }
    }

    private static LinkedHashMap<String, String> getValues(String inpString)  {
        String[] args = inpString.split("&");
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        for (String s : args) {
            String[] arg = s.split("=");
            map.put(arg[0], arg[1]);
        }
        return map;
    }
    private static String resp(boolean isShoot, String x, String y, String r, long wt) {
        String content = """
                {"result":"%s","x":"%s","y":"%s","r":"%s","time":"%s","workTime":"%s"}
                """.formatted(isShoot, x, y, r, (double)(System.nanoTime() - wt) / 10000000, LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")));
        return """
                HTTP/1.1 200 OK
                Content-Type: application/json; charset=utf-8
                Content-Length: %d
                
                
                %s
                """.formatted(content.getBytes(StandardCharsets.UTF_8).length, content);
    }

    private static String err(String msg) {
        String content = """
                {"error":"%s"}
                """.formatted(msg);
        return"""
            HTTP/1.1 400 Bad Request
            Content-Type: application/json; charset=utf-8e
            Content-Length: %d
            


            %s\n
            """.formatted(content.getBytes(StandardCharsets.UTF_8).length+1, content);
    }
}