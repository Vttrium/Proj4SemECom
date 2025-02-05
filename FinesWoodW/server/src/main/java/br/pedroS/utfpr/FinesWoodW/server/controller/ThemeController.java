package br.pedroS.utfpr.FinesWoodW.server.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import br.pedroS.utfpr.FinesWoodW.server.dto.ThemeDTO;
import br.pedroS.utfpr.FinesWoodW.server.model.Theme;
import br.pedroS.utfpr.FinesWoodW.server.service.ICrudService;
import br.pedroS.utfpr.FinesWoodW.server.service.IThemeService;

@RestController
@RequestMapping("themes")
public class ThemeController extends CrudController<Theme, ThemeDTO, Long> {
    private static IThemeService themeService;
    private static ModelMapper modelMapper;

    public ThemeController(IThemeService themeService, ModelMapper modelMapper) {
        super(Theme.class, ThemeDTO.class);
        ThemeController.themeService = themeService;
        ThemeController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Theme, Long> getService() {
        return themeService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
