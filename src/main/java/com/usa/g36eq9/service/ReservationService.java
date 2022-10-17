package com.usa.g36eq9.service;

import com.usa.g36eq9.modelo.DTOs.CountClient;
import com.usa.g36eq9.modelo.DTOs.CountStatus;
import com.usa.g36eq9.modelo.Reservation;
import com.usa.g36eq9.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }
    public Optional<Reservation> getReservation(int idReservation){
        return reservationRepository.getReservation(idReservation);
    }
    public Reservation save(Reservation r){
        if(r.getIdReservation() == null){
            return reservationRepository.save(r);
        }else{
            Optional<Reservation> raux = reservationRepository.getReservation(r.getIdReservation());
            if(raux.isPresent()){
                return r;
            }else{
                return reservationRepository.save(r);
            }
        }
    }
    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation() != null){
            Optional<Reservation> q = reservationRepository.getReservation(reservation.getIdReservation());
            if(q.isPresent()){
                if(reservation.getStartDate() != null){
                    q.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate() != null){
                    q.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus() != null){
                    q.get().setStatus(reservation.getStatus());
                }
                if(reservation.getBoat() != null){
                    q.get().setBoat(reservation.getBoat());
                }
                if(reservation.getClient() != null){
                    q.get().setClient(reservation.getClient());
                }
                reservationRepository.save(q.get());
                return q.get();
            }else{
                return reservation;
            }
        }else{
            return reservation;
        }
    }
    public boolean delete(int idReservation){
        boolean flag = false;
        Optional<Reservation> reservation = reservationRepository.getReservation(idReservation);
        if(reservation.isPresent()){
            reservationRepository.delete(reservation.get());
            flag = true;
        }
        return flag;
    }

    public List<CountClient> getTotalClients(){
        return reservationRepository.getTopClients();
    }
    public List<Reservation> getReservationPeriod(String dateA, String dateB){
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd"); // 2022-01-21
        Date a = new Date();
        Date b = new Date();
        try{
            a = parser.parse(dateA);
            b = parser.parse(dateB);
        }catch (ParseException exception){
            exception.printStackTrace();
        }
        if(a.before(b)){
            return reservationRepository.getReservationPeriod(a, b);
        }else{
            return new ArrayList<>();
        }
    }
    public CountStatus getReservationStatus(){
        List<Reservation> completed = reservationRepository.getReservationsByStatus("completed");
        List<Reservation> cancelled = reservationRepository.getReservationsByStatus("cancelled");
        return new CountStatus((long) completed.size(), (long) cancelled.size());
    }

}
