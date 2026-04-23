package com.luxevogue.boutique;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping({"/about", "/about.html"})
    public String about() {
        return "about";
    }

    @GetMapping({"/cart", "/cart.html"})
    public String cart() {
        return "cart";
    }
}
