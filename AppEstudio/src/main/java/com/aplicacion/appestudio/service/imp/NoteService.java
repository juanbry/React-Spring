package com.aplicacion.appestudio.service.imp;

import com.aplicacion.appestudio.model.Note;
import com.aplicacion.appestudio.repository.INoteRepository;
import com.aplicacion.appestudio.service.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService implements INoteService {

    @Autowired
    private INoteRepository noteRepository;

    @Override
    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    @Override
    public Optional<Note> findById(Long id) {
        return noteRepository.findById(id);
    }

    @Override
    public Note save(Note note) {
        return noteRepository.save(note);
    }

    @Override
    public void deleteById(Long id) {
        noteRepository.deleteById(id);
    }
}