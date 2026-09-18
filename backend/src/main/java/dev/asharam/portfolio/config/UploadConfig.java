package dev.asharam.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** Serves admin-uploaded images from ./uploads/ under /uploads/**. */
@Configuration
public class UploadConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler("/uploads/**")
        .addResourceLocations("file:./uploads/");
  }
}
