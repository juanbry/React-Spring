package com.aplicacion.appestudio.service;
import com.aplicacion.appestudio.model.Note;
import java.util.List;
import java.util.Optional;


public interface INoteService {
    List<Note> findAll();
    Optional<Note> findById(Long id);
    Note save(Note note);
    void deleteById(Long id);
}
