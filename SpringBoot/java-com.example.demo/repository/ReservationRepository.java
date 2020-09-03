package com.example.demo.repository;

import com.example.demo.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query(value = "SELECT COUNT(*) FROM availability a " +
            " WHERE a.place_id=?3 " +
            " AND (?2 >= ?1) " +
            " AND a.starting_date <= ?1 AND a.ending_date >= ?2 " +
            " AND NOT EXISTS( " +
            "   SELECT * FROM reservation r " +
            "   WHERE r.place_id=?3 " +
            "   AND (?2 >= ?1) " +
            "   AND ( " +
            "       ( ?1 > r.starting_date AND ?1 < r.ending_date ) OR " +
            "       ( ?2 > r.starting_date AND ?2 < r.ending_date )  OR " +
            "       ( ?1 < r.starting_date AND ?2 > r.ending_date ) OR " +
            "       ( ?1 = r.starting_date AND ?2 = r.ending_date ) " +
            "    ));", nativeQuery = true)
    int CheckAvailability(Date check_in, Date check_out, Long place_id);

    @Query(value = "SELECT r.* FROM reservation r " +
            " WHERE r.place_id=?3" +
            " AND (?2 >= ?1) " +
            " AND NOT (r.ending_date <= ?1)", nativeQuery = true)
    Reservation[] findReservationsInRange(Date check_in, Date check_out, Long place_id);

    @Query(value = "SELECT COUNT(*) FROM airbnb.availability a " +
            " WHERE a.place_id=?3 " +
            " AND a.starting_date <= ?1 AND a.ending_date >= ?2", nativeQuery = true)
    int placeAvailable(Date check_in, Date check_out, Long place_id);


    @Query(value = "SELECT * FROM reservation WHERE user_id = ?1", nativeQuery = true)
    List<Reservation> MyReservations(Long UserId);

    @Query(value = "SELECT p.host_id FROM place p,reservation r where p.place_id=r.place_id AND r.reservation_id=?1", nativeQuery = true)
    Long ReservationHost(Long ReservationId);

    @Query(value = "SELECT * FROM reservation WHERE place_id=?1", nativeQuery = true)
    Reservation[] ReservationsFor(Long PlaceId);

}
