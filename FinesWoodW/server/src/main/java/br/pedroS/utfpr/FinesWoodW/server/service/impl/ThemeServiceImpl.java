package br.pedroS.utfpr.FinesWoodW.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.pedroS.utfpr.FinesWoodW.server.model.Theme;
import br.pedroS.utfpr.FinesWoodW.server.repository.ThemeRepository;
import br.pedroS.utfpr.FinesWoodW.server.service.IThemeService;

@Service
public class ThemeServiceImpl extends CrudServiceImpl<Theme, Long>
        implements IThemeService {

    private final ThemeRepository themeRepository;

    public ThemeServiceImpl(ThemeRepository themeRepository) {
        this.themeRepository = themeRepository;
    }

    @Override
    protected JpaRepository<Theme, Long> getRepository() {
        return themeRepository;
    }
}