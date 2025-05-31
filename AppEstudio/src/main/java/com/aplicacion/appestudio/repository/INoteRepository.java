package com.aplicacion.appestudio.repository;

import com.aplicacion.appestudio.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface INoteRepository extends JpaRepository<Note, Long> {
}
