package com.aplicacion.appestudio.controller;

import com.aplicacion.appestudio.model.Note;
import com.aplicacion.appestudio.service.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notas")
public class NoteController {

    @Autowired
    private INoteService noteService;

    @GetMapping
    public List<Note> listarNotas() {
        return noteService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Note> obtenerNota(@PathVariable Long id) {
        return noteService.findById(id);
    }

    @PostMapping
    public Note crearNota(@RequestBody Note note) {
        return noteService.save(note);
    }

    @PutMapping("/{id}")
    public Note actualizarNota(@PathVariable Long id, @RequestBody Note note) {
        note.setId(id);
        return noteService.save(note);
    }

    @DeleteMapping("/{id}")
    public void eliminarNota(@PathVariable Long id) {
        noteService.deleteById(id);
    }
}