package br.pedroS.utfpr.FinesWoodW.server.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
public class WebConfig {

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }
}

