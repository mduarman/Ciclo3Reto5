package com.usa.g36eq9.repository;

import com.usa.g36eq9.modelo.Boat;
import com.usa.g36eq9.repository.crud.BoatCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public class BoatRepository {
    @Autowired
    private BoatCrudRepository boatCrudRepository;
    public List<Boat> getAll(){
        return (List<Boat>)boatCrudRepository.findAll();
    }
    public Optional<Boat> getBoat(int id){
        return boatCrudRepository.findById(id);
    }
    public Boat save(Boat boat){
        return boatCrudRepository.save(boat);
    }
    public void delete(Boat boat){
        boatCrudRepository.delete(boat);
    }

}
