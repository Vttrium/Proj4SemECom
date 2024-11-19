package br.pedroS.utfpr.FinesWoodW.server.controller;

import br.pedroS.utfpr.FinesWoodW.server.dto.UserDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.User;
import br.pedroS.utfpr.FinesWoodW.server.service.UserService;
import br.pedroS.utfpr.FinesWoodW.server.shared.GenericResponse;

import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    public ResponseEntity<GenericResponse> createUser(
                        @RequestBody @Valid UserDTO user) {

        userService.save( modelMapper.map(user, User.class) );

        return ResponseEntity.ok(new GenericResponse("User saved!"));
    }

}
