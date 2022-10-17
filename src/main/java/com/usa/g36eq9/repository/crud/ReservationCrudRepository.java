package com.usa.g36eq9.repository.crud;

import com.usa.g36eq9.modelo.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {
    //@Query("SELECT c.boat, COUNT(c.boat) from Reservation AS c GROUP BY c.boat ORDER BY COUNT(c.boat) DESC ")
    //public List<Object[]> countTotalReservationByBoat();

    @Query("select c.client, count(c.client) from Reservation  as c group by c.client order by count(c.client) desc")
    public List<Object[]> countTotalReservationsByClients();

    // SELECT * FROM Reservation WHERE startDate AFTER dateOne AND devolutionDate BEFORE dateTwo;
    public  List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date dateOne, Date dateTwo);

    // SELECT * FROM Reservation WHERE status = "cancelled"
    public List<Reservation> findAllByStatus(String status);
}
