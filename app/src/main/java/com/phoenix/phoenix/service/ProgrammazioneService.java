package com.phoenix.phoenix.service;

import com.phoenix.phoenix.entity.Programmazione;
import com.phoenix.phoenix.repository.ProgrammazioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgrammazioneService {
    private ProgrammazioneRepository repository;

    @Autowired
    public ProgrammazioneService(ProgrammazioneRepository repository){this.repository=repository;}

    public List<Programmazione> getAll(){return repository.findAll();}

    public List<Programmazione> getAllFromPellicola(long pellicola){return repository.findProgrammazioneByPellicolaId(pellicola);}

}
